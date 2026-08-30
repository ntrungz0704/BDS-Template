'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Sparkles, Send, X, MessageSquare, Phone, 
  MessageCircle, RefreshCw, AlertCircle, CheckCircle2, ChevronDown, User, Clock, History
} from 'lucide-react';
import { askGeminiAssistant, getDailyAiUsage, AiProjectItem } from '../../services/aiService';
import axios from 'axios';

export interface AIChatWidgetProps {
  websiteName?: string;
  slogan?: string;
  hotline?: string;
  zalo?: string;
  email?: string;
  address?: string;
  projects?: AiProjectItem[];
  currentProject?: string;
  tenantId?: string;
  themeColor?: 'blue' | 'gold' | 'emerald' | 'dark';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function getFullTimestamp(): string {
  try {
    const now = new Date();
    const time = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
    const date = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);
    return time + ' ' + date;
  } catch {
    return new Date().toLocaleTimeString('vi-VN');
  }
}

function getOrCreateGuestSessionId(): string {
  if (typeof window === 'undefined') return 'guest_default';
  let sid = localStorage.getItem('AI_GUEST_SESSION_ID');
  if (!sid) {
    sid = 'guest_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('AI_GUEST_SESSION_ID', sid);
  }
  return sid;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  websiteName = 'Sàn Giao Dịch BĐS Uy Tín',
  slogan = 'Nâng Tầm Không Gian Sống',
  hotline = '0905.568.888',
  zalo = '0905.568.888',
  email = 'contact@bds-realestate.vn',
  address = 'TP. Hồ Chí Minh / Hà Nội',
  projects = [],
  currentProject,
  tenantId,
  themeColor = 'blue',
}) => {
  const cleanTitle = websiteName
    .replace(/^LP\s*#?\d+\s*-\s*/i, '')
    .replace(/^Template\s*#?\d+\s*-\s*/i, '')
    .replace(/\s*Launch Funnel/i, '')
    .trim();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [usage, setUsage] = useState({ used: 0, max: 10, remaining: 10 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Dạ em chào anh/chị ạ! Em là chuyên viên hỗ trợ tư vấn của ' + cleanTitle + '.\n\nEm có thể hỗ trợ anh/chị tra cứu bảng giá, chính sách chiết khấu, tiến độ thanh toán hoặc tư vấn hướng nhà phong thủy. Anh/chị đang quan tâm căn nào để em gửi thông tin chi tiết ạ?',
      time: getFullTimestamp(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const guestSid = getOrCreateGuestSessionId();
      axios.get(API_URL + '/api/ai/usage', { withCredentials: true })
        .then(res => {
          if (res.data?.data) {
            setUsage({
              used: res.data.data.used,
              max: res.data.data.max,
              remaining: res.data.data.remaining,
            });
          }
        })
        .catch(() => {
          setUsage(getDailyAiUsage());
        });

      axios.get(API_URL + '/api/ai/history?guestSessionId=' + guestSid, { withCredentials: true })
        .then(res => {
          const sessions = res.data?.data?.sessions;
          if (sessions && sessions.length > 0) {
            const activeSession = sessions[0];
            if (activeSession.messages && activeSession.messages.length > 0) {
              const formatted = activeSession.messages.map((m: any) => ({
                id: m.id,
                sender: m.role === 'user' ? 'user' : 'ai',
                text: m.content,
                time: m.timeStr || getFullTimestamp(),
              }));
              setMessages(formatted);
            }
          }
        })
        .catch(() => {});
    }
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
    '🧭 Hướng nhà & phong thủy hợp tuổi',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const guestSid = getOrCreateGuestSessionId();
    const sendTime = getFullTimestamp();

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      time: sendTime,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const apiRes = await axios.post(API_URL + '/api/ai/chat', {
        question: query,
        guestSessionId: guestSid,
        tenantId,
        contextData: {
          websiteName,
          slogan,
          hotline,
          zalo,
          email,
          address,
          projects,
          currentProject,
        },
      }, { withCredentials: true, timeout: 12000 });

      if (apiRes.data?.data) {
        const replyData = apiRes.data.data;
        const aiMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: replyData.reply,
          time: replyData.timeStr || getFullTimestamp(),
        };

        setMessages(prev => [...prev, aiMsg]);
        setUsage({
          used: replyData.used,
          max: replyData.max,
          remaining: replyData.remaining,
        });
      }
    } catch (e: any) {
      try {
        const response = await askGeminiAssistant(query, {
          websiteName,
          slogan,
          hotline,
          zalo,
          email,
          address,
          projects,
          currentProject,
        });

        const aiMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: response.text,
          time: getFullTimestamp(),
        };

        setMessages(prev => [...prev, aiMsg]);
        setUsage(getDailyAiUsage());
      } catch (err) {
        console.error(err);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const isLimitReached = usage.remaining <= 0;

  return (
    <>
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

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[99999] w-[92vw] sm:w-[420px] h-[600px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slideUp text-left select-none">
          
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
                  <h3 className="font-black text-sm text-white truncate max-w-[190px]">{cleanTitle}</h3>
                  <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[9px] font-black rounded uppercase">
                    AI Agent
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-0.5" />
                  <span>Sẵn sàng tư vấn 24/7 (RAG Data)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rate limit status bar */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lượt hỏi hôm nay:</span>
              <span className={'font-mono font-bold ' + (usage.remaining <= 2 ? 'text-rose-600' : 'text-emerald-600')}>
                {usage.remaining}/{usage.max}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Reset 00:00 VN</span>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={'flex gap-2.5 ' + (m.sender === 'user' ? 'justify-end' : 'justify-start')}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={'max-w-[82%] ' + (m.sender === 'user' ? 'items-end' : 'items-start') + ' flex flex-col'}>
                  <div
                    className={'p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ' + (
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    )}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text.replace(/\*\*/g, '').replace(/\*/g, '')}</p>
                  </div>
                  
                  {/* Timestamp with seconds */}
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1 font-mono">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    <span>{m.time}</span>
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-xs mt-1 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start animate-fade-in">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1 font-medium">AI đang tra cứu dữ liệu...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts - Clean 2-column Grid without horizontal scrollbar */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200/70 grid grid-cols-2 gap-1.5 shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping || isLimitReached}
                className="px-2.5 py-1.5 bg-white hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-xl text-[11px] font-medium transition-all border border-slate-200 text-left truncate shadow-xs disabled:opacity-50"
              >
                <span className="truncate">{prompt}</span>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping || isLimitReached}
              placeholder={isLimitReached ? 'Đã hết lượt hôm nay (00:00 reset)...' : 'Hỏi về giá, căn đẹp, phong thủy, vay...'}
              className="flex-1 bg-slate-100 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping || isLimitReached}
              className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md disabled:opacity-40 transition-all shrink-0 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Direct Contact CTA */}
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-[11px] text-slate-300 shrink-0">
            <span className="text-slate-400 text-[10px]">Cần tư vấn trực tiếp?</span>
            <div className="flex items-center gap-2">
              <a
                href={'tel:' + hotline.replace(/[^0-9]/g, '')}
                className="px-2 py-0.5 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-colors flex items-center gap-1 text-[10px]"
              >
                <Phone className="w-2.5 h-2.5" />
                <span>{hotline}</span>
              </a>
              <a
                href={'https://zalo.me/' + zalo.replace(/[^0-9]/g, '')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-1 text-[10px]"
              >
                <MessageCircle className="w-2.5 h-2.5" />
                <span>Zalo</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChatWidget;
