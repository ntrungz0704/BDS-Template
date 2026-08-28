import { 
  Plus_Jakarta_Sans,
  Playfair_Display,
  Cormorant_Garamond,
  Lora,
  Inter,
  Manrope,
  DM_Sans,
  Montserrat,
  Space_Grotesk,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Sora,
  Syne,
  Work_Sans,
  Archivo,
  Jost,
  Outfit,
  Source_Serif_4
} from 'next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-plus-jakarta-sans' });
export const playfairDisplay = Playfair_Display({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-playfair-display' });
export const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-cormorant-garamond', weight: ['300', '400', '500', '600', '700'] });
export const lora = Lora({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-lora' });
export const inter = Inter({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-inter' });
export const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
export const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });
export const montserrat = Montserrat({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-montserrat' });
export const spaceGrotesk = Space_Grotesk({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-space-grotesk' });
export const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-ibm-plex-sans', weight: ['300', '400', '500', '600'] });
export const ibmPlexSerif = IBM_Plex_Serif({ subsets: ['latin'], display: 'swap', variable: '--font-ibm-plex-serif', weight: ['300', '400', '500', '600'] });
export const sora = Sora({ subsets: ['latin'], display: 'swap', variable: '--font-sora' });
export const syne = Syne({ subsets: ['latin'], display: 'swap', variable: '--font-syne' });
export const workSans = Work_Sans({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-work-sans' });
export const archivo = Archivo({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-archivo' });
export const jost = Jost({ subsets: ['latin'], display: 'swap', variable: '--font-jost' });
export const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-outfit' });
export const sourceSerif4 = Source_Serif_4({ subsets: ['latin', 'vietnamese'], display: 'swap', variable: '--font-source-serif-4' });

export const fontVariables = [
  plusJakartaSans.variable,
  playfairDisplay.variable,
  cormorantGaramond.variable,
  lora.variable,
  inter.variable,
  manrope.variable,
  dmSans.variable,
  montserrat.variable,
  spaceGrotesk.variable,
  ibmPlexSans.variable,
  ibmPlexSerif.variable,
  sora.variable,
  syne.variable,
  workSans.variable,
  archivo.variable,
  jost.variable,
  outfit.variable,
  sourceSerif4.variable
].join(' ');

