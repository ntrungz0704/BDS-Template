'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Sparkles, Send, X, MessageSquare, Phone, 
  MessageCircle, RefreshCw, AlertCircle, CheckCircle2, ChevronDown, User
} from 'lucide-react';
import { askGeminiAssistant, getDailyAiUsage } from '../../services/aiService';

export interface AIChatWidgetProps {
  websiteName?: string;
  hotline?: string;
  zalo?: string;
  currentProject?: string;
  themeColor?: 'blue' | 'gold' | 'emerald' | 'dark';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  websiteName = 'Sàn Giao Dịch BĐS',
  hotline = '0905.568.888',
  zalo = '0905.568.888',
  currentProject,
  themeColor = 'blue',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [usage, setUsage] = useState({ used: 0, max: 10, remaining: 10 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 Chào bạn! Tôi là **Trợ Lý Ảo AI Bất Động Sản**. Tôi có thể giúp bạn giải đáp về giá bán, mặt bằng, chính sách vay ngân hàng hoặc tiến độ bàn giao. Bạn đang quan tâm căn hộ hay dự án nào ạ?`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsage(getDailyAiUsage());
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const quickPrompts = [
    '💰 Mức giá & chiết khấu đợt 1',
    '🏦 Chính sách vay ngân hàng 0% lãi',
    '📜 Pháp lý & thời gian nhận sổ hồng',
    '📸 Xem hình ảnh thực tế nhà mẫu',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await askGeminiAssistant(query, {
        websiteName,
        hotline,
        zalo,
        currentProject,
      });

      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: response.text,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      setUsage(getDailyAiUsage());
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const isLimitReached = usage.remaining <= 0;

  return (
    <>
      {/* 1. FLOATING AI TRIGGER BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 z-[9999] flex items-center gap-2 group animate-bounce-slow">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md shadow-xl border border-slate-700/80 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-bold">Trợ Lý AI Tư Vấn BĐS</span>
            <span className="bg-blue-500/30 text-blue-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {usage.remaining}/10
            </span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/80 ring-4 ring-blue-500/20"
            title="Chat với Trợ Lý Ảo AI"
          >
            <Bot className="w-7 h-7 animate-pulse" />
          </button>
        </div>
      )}

      {/* 2. CHATBOT WINDOW */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[99999] w-[92vw] sm:w-[400px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slideUp text-left select-none">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md border border-white/20">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-white">Trợ Lý AI Tư Vấn BĐS</h3>
                  <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[9px] font-black rounded uppercase">
                    Gemini AI
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <span>Lượt hỏi hôm nay:</span>
                  <span className={`font-mono font-bold ${usage.remaining > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {usage.remaining}/{usage.max}
                  </span>
                  <span className="text-[10px] text-slate-400">(Giờ VN)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Thu nhỏ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs text-[10px]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs text-[10px]">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  <span className="text-[11px] text-slate-500 font-medium">AI đang phân tích giỏ hàng...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!isLimitReached && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors border border-slate-200/60 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            {isLimitReached ? (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-[11px]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Đã hết 10 lượt hỏi AI hôm nay. Kết nối trực tiếp chuyên viên:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${hotline}`}
                    className="py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi Hotline</span>
                  </a>
                  <a
                    href={`https://zalo.me/${zalo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Zalo</span>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Hỏi AI về giá, vay ngân hàng, pháp lý..."
                  disabled={isTyping}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-xs font-medium text-slate-800"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-40 shadow-sm shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      )}
    </>
  );
};
export default AIChatWidget;
