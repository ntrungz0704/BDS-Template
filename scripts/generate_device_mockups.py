"""
Automated Multi-Device Mockup Generator
Composites Desktop, Tablet, and Mobile screenshots into a professional 3D showcase
similar to ThemeForest / Flatsome presentation mockups.
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Paths
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = WORKSPACE_ROOT / "apps" / "marketplace" / "public" / "images" / "mockups" / "raw"
OUTPUT_DIR = WORKSPACE_ROOT / "apps" / "marketplace" / "public" / "images" / "mockups"

CANVAS_WIDTH = 1280
CANVAS_HEIGHT = 800

def create_rounded_mask(size, radius):
    """Creates a smooth anti-aliased 8-bit alpha mask for rounded corners."""
    scale = 4
    w, h = size[0] * scale, size[1] * scale
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, w - 1, h - 1], radius=radius * scale, fill=255)
    return mask.resize(size, Image.LANCZOS)

def create_drop_shadow(image_rgba, offset=(0, 15), blur_radius=25, shadow_alpha=120):
    """Creates a natural realistic drop shadow behind an RGBA element."""
    w, h = image_rgba.size
    shadow_w = w + blur_radius * 4
    shadow_h = h + blur_radius * 4
    
    shadow_layer = Image.new('RGBA', (shadow_w, shadow_h), (0, 0, 0, 0))
    alpha = image_rgba.split()[-1]
    
    lut = [int(i * (shadow_alpha / 255.0)) for i in range(256)]
    shadow_alpha_chan = alpha.point(lut)
    
    black_shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    black_solid = Image.new('RGBA', (w, h), (10, 15, 25, 255))
    black_shadow.paste(black_solid, (0, 0), shadow_alpha_chan)
    
    paste_x = blur_radius * 2 + offset[0]
    paste_y = blur_radius * 2 + offset[1]
    
    shadow_layer.paste(black_shadow, (paste_x, paste_y))
    shadow_blurred = shadow_layer.filter(ImageFilter.GaussianBlur(blur_radius))
    
    return shadow_blurred, (paste_x, paste_y)

def find_image(folder_path, prefixes):
    """Finds an image file starting with any of the prefixes in prefixes list."""
    valid_exts = ['.png', '.jpg', '.jpeg', '.webp', '.bmp']
    for prefix in prefixes:
        for ext in valid_exts:
            p = folder_path / f"{prefix}{ext}"
            if p.exists():
                return p
    return None

def crop_and_fit(img, target_size):
    """Scales image to fit target width and crops from top-down (hero focus)."""
    target_w, target_h = target_size
    img_w, img_h = img.size
    
    # Scale based on width
    scale = target_w / float(img_w)
    new_w = target_w
    new_h = int(img_h * scale)
    
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    
    if new_h >= target_h:
        # Crop from top
        return resized.crop((0, 0, target_w, target_h))
    else:
        # If too short, scale by height instead
        scale = target_h / float(img_h)
        new_w = int(img_w * scale)
        new_h = target_h
        resized = img.resize((new_w, new_h), Image.LANCZOS)
        # Center crop horizontally
        left = (new_w - target_w) // 2
        return resized.crop((left, 0, left + target_w, target_h))

def render_desktop_monitor(desktop_img, width=760, height=480):
    """Renders a sleek modern desktop monitor / iMac frame."""
    bezel = 14
    screen_w = width - bezel * 2
    screen_h = height - bezel * 2 - 32 # bottom chin
    radius = 16
    
    monitor = Image.new('RGBA', (width, height + 80), (0, 0, 0, 0))
    draw = ImageDraw.Draw(monitor)
    
    # Outer Bezel Body
    draw.rounded_rectangle([0, 0, width - 1, height - 1], radius=radius, fill=(24, 28, 36, 255), outline=(50, 56, 68, 255), width=2)
    
    # Camera dot
    draw.ellipse([width // 2 - 3, 5, width // 2 + 3, 11], fill=(12, 14, 18, 255))
    
    # Bottom Chin accent
    draw.line([(bezel, height - 26), (width - bezel, height - 26)], fill=(35, 40, 50, 255), width=1)
    
    # Stand neck
    stand_w = 110
    stand_neck_x = (width - stand_w) // 2
    draw.rectangle([stand_neck_x, height - 2, stand_neck_x + stand_w, height + 50], fill=(200, 205, 215, 255))
    draw.rectangle([stand_neck_x, height - 2, stand_neck_x + 10, height + 50], fill=(160, 165, 175, 255)) # shade
    
    # Stand base
    base_w = 230
    base_h = 16
    base_x = (width - base_w) // 2
    base_y = height + 50
    draw.rounded_rectangle([base_x, base_y, base_x + base_w, base_y + base_h], radius=6, fill=(215, 220, 230, 255), outline=(170, 175, 185, 255), width=1)
    
    # Fit Screen Content
    screen_content = crop_and_fit(desktop_img, (screen_w, screen_h))
    screen_mask = create_rounded_mask((screen_w, screen_h), 4)
    monitor.paste(screen_content, (bezel, bezel), screen_mask)
    
    return monitor

def render_tablet(tablet_img, width=280, height=390):
    """Renders a sleek iPad / tablet frame."""
    bezel = 14
    screen_w = width - bezel * 2
    screen_h = height - bezel * 2
    radius = 24
    
    tablet = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(tablet)
    
    # Tablet body
    draw.rounded_rectangle([0, 0, width - 1, height - 1], radius=radius, fill=(20, 24, 32, 255), outline=(60, 68, 82, 255), width=2)
    
    # Camera dot
    draw.ellipse([width // 2 - 2, 5, width // 2 + 2, 9], fill=(10, 12, 16, 255))
    
    # Screen
    screen_content = crop_and_fit(tablet_img, (screen_w, screen_h))
    screen_mask = create_rounded_mask((screen_w, screen_h), 12)
    tablet.paste(screen_content, (bezel, bezel), screen_mask)
    
    return tablet

def render_mobile(mobile_img, width=170, height=340):
    """Renders a modern smartphone / iPhone frame."""
    bezel = 8
    screen_w = width - bezel * 2
    screen_h = height - bezel * 2
    radius = 30
    
    phone = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(phone)
    
    # Phone body
    draw.rounded_rectangle([0, 0, width - 1, height - 1], radius=radius, fill=(15, 18, 24, 255), outline=(70, 78, 92, 255), width=2)
    
    # Screen
    screen_content = crop_and_fit(mobile_img, (screen_w, screen_h))
    screen_mask = create_rounded_mask((screen_w, screen_h), 22)
    phone.paste(screen_content, (bezel, bezel), screen_mask)
    
    # Dynamic Island / Notch
    island_w = 46
    island_h = 13
    island_x = (width - island_w) // 2
    draw.rounded_rectangle([island_x, bezel + 3, island_x + island_w, bezel + 3 + island_h], radius=7, fill=(12, 14, 18, 255))
    draw.ellipse([island_x + island_w - 11, bezel + 7, island_x + island_w - 5, bezel + 13], fill=(22, 26, 34, 255)) # lens
    
    return phone

def composite_mockup(folder_path, output_path):
    """Generates the full 3D multi-device mockup from folder."""
    desktop_file = find_image(folder_path, ['desktop', 'pc', '1', 'hero', 'home'])
    tablet_file = find_image(folder_path, ['tablet', 'ipad', '2', 'tab'])
    mobile_file = find_image(folder_path, ['mobile', 'phone', '3', 'ip', 'iphone'])
    
    if not desktop_file:
        print(f"[SKIP] {folder_path.name}: Ch\u01b0a c\u00f3 desktop.png")
        return False
        
    desktop_img = Image.open(desktop_file).convert('RGBA')
    tablet_img = Image.open(tablet_file).convert('RGBA') if tablet_file else desktop_img
    mobile_img = Image.open(mobile_file).convert('RGBA') if mobile_file else desktop_img
    
    # Create base canvas (Transparent or clean subtle background)
    canvas = Image.new('RGBA', (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    
    # 1. Render Desktop Monitor
    monitor = render_desktop_monitor(desktop_img, width=780, height=480)
    mon_x = (CANVAS_WIDTH - 780) // 2 + 50 # slightly offset to right to balance tablet on left
    mon_y = 60
    
    # Shadow for Monitor
    shadow_mon, offset_m = create_drop_shadow(monitor, offset=(0, 20), blur_radius=30, shadow_alpha=90)
    canvas.alpha_composite(shadow_mon, (mon_x - offset_m[0], mon_y - offset_m[1]))
    canvas.alpha_composite(monitor, (mon_x, mon_y))
    
    # 2. Render Tablet (Left side, foreground)
    tablet = render_tablet(tablet_img, width=290, height=410)
    tab_x = 70
    tab_y = 310
    
    shadow_tab, offset_t = create_drop_shadow(tablet, offset=(10, 18), blur_radius=25, shadow_alpha=110)
    canvas.alpha_composite(shadow_tab, (tab_x - offset_t[0], tab_y - offset_t[1]))
    canvas.alpha_composite(tablet, (tab_x, tab_y))
    
    # 3. Render Mobile (Front right of tablet / center foreground)
    mobile = render_mobile(mobile_img, width=175, height=350)
    mob_x = 280
    mob_y = 400
    
    shadow_mob, offset_mb = create_drop_shadow(mobile, offset=(10, 15), blur_radius=22, shadow_alpha=130)
    canvas.alpha_composite(shadow_mob, (mob_x - offset_mb[0], mob_y - offset_mb[1]))
    canvas.alpha_composite(mobile, (mob_x, mob_y))
    
    # Save output
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    slug = folder_path.name
    
    png_out = OUTPUT_DIR / f"{slug}.png"
    webp_out = OUTPUT_DIR / f"{slug}.webp"
    
    canvas.save(png_out, "PNG", optimize=True)
    canvas.save(webp_out, "WEBP", quality=90)
    print(f"[OK] \u0110\u00e3 t\u1ea1o th\u00e0nh c\u00f4ng mockup cho: {slug} -> {png_out.name}")
    return True

def main():
    folders = sorted([d for d in RAW_DIR.iterdir() if d.is_dir()])
    count = 0
    for f in folders:
        if composite_mockup(f, OUTPUT_DIR):
            count += 1
    print(f"\n=======================================================")
    print(f"HO\u00c0N T\u1ea4T: \u0110\u00e3 t\u1ea1o {count}/{len(folders)} mockups.")
    print(f"Th\u01b0 m\u1ee5c k\u1ebft qu\u1ea3: {OUTPUT_DIR}")
    print(f"=======================================================")

if __name__ == '__main__':
    main()
