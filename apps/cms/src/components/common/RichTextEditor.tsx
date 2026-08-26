import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
  Quote,
  RemoveFormatting,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung chi tiết tại đây...',
  minHeight = '180px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const savedSelectionRef = useRef<Range | null>(null);

  // Synchronize incoming value into contentEditable when it changes externally
  useEffect(() => {
    if (editorRef.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedSelectionRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRef.current);
      }
    }
  };

  const exec = (command: string, val: string | undefined = undefined) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html === '<br>' || html === '<p></p>' ? '' : html);
    }
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    restoreSelection();
    if (linkUrl.trim()) {
      if (linkText.trim()) {
        const linkHtml = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium">${linkText.trim()}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      } else {
        document.execCommand('createLink', false, linkUrl.trim());
      }
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleInsertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          if (base64) {
            const imgHtml = `<p><img src="${base64}" alt="Ảnh nội dung" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;" /></p>`;
            document.execCommand('insertHTML', false, imgHtml);
            if (editorRef.current) {
              onChange(editorRef.current.innerHTML);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-50 border-b border-slate-200 select-none text-slate-600">
        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => exec('undo')}
          title="Hoàn tác (Undo)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('redo')}
          title="Làm lại (Redo)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => exec('formatBlock', '<h1>')}
          title="Tiêu đề lớn (H1)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors font-bold text-xs"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('formatBlock', '<h2>')}
          title="Tiêu đề vừa (H2)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors font-bold text-xs"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('formatBlock', '<h3>')}
          title="Tiêu đề nhỏ (H3)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors font-bold text-xs"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('formatBlock', '<p>')}
          title="Đoạn văn thường (Paragraph)"
          className="px-2 py-1 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors font-semibold text-xs text-slate-700"
        >
          Văn bản
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Formats: Bold, Italic, Underline */}
        <button
          type="button"
          onClick={() => exec('bold')}
          title="In đậm (Ctrl+B)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('italic')}
          title="In nghiêng (Ctrl+I)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('underline')}
          title="Gạch chân (Ctrl+U)"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => exec('insertUnorderedList')}
          title="Danh sách dấu chấm"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('insertOrderedList')}
          title="Danh sách đánh số"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Alignments */}
        <button
          type="button"
          onClick={() => exec('justifyLeft')}
          title="Căn trái"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('justifyCenter')}
          title="Căn giữa"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('justifyRight')}
          title="Căn phải"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Link & Image */}
        <button
          type="button"
          onClick={() => {
            saveSelection();
            setShowLinkModal(true);
          }}
          title="Chèn liên kết web"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-blue-600 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleInsertImage}
          title="Chèn ảnh từ máy tính"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-emerald-600 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('formatBlock', '<blockquote>')}
          title="Trích dẫn"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-slate-900 transition-colors"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec('removeFormat')}
          title="Xóa định dạng"
          className="p-1.5 rounded-lg hover:bg-slate-200/80 hover:text-red-600 transition-colors"
        >
          <RemoveFormatting className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Content Editable Canvas ────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="p-4 text-sm text-slate-800 focus:outline-none overflow-y-auto leading-relaxed prose prose-slate max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
      />

      {/* ── Link Insertion Modal ────────────────────────────────────────────── */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 shadow-xl max-w-sm w-full border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              Chèn Liên Kết Web
            </h4>
            <form onSubmit={handleInsertLink} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Chữ hiển thị (tùy chọn)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="VD: Xem chi tiết dự án"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Địa chỉ web (URL) *</label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Chèn Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
