import React, { useState } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { soundFx } from '../utils/soundEffects';

interface AiTutorViewProps {
  userProfile: UserProfile;
}

export const AiTutorView: React.FC<AiTutorViewProps> = ({ userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: `¡Hola, explorador ${userProfile.name}! 🚀 Soy EduBot, tu tutor personal de Inteligencia Artificial en EduQuest México. ¿En qué tema de Matemáticas, Ciencias, Lectura o Historia te gustaría aprender o repasar hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Explícame las fracciones con un ejemplo de pizza 🍕',
        '¿Por qué el ajolote mexicano es tan especial? 🦎',
        '¿Quiénes fueron los Olmecas y los Mayas? 🏛️'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Matemáticas');

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    soundFx.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: query,
          topic: selectedSubject,
          userLevel: userProfile.level,
          contextHistory: messages.slice(-4).map(m => ({ role: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || '¡Qué buena pregunta! Te la explico paso a paso.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions || []
      };

      setMessages(prev => [...prev, tutorMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'tutor',
          text: '¡Ups! Parece que mi antena espacial tuvo una pequeña falla de conexión. Pero no te preocupes: recuerda que practicar tus ejercicios te ayuda a repasar.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto h-[calc(100vh-180px)] min-h-[500px]">
      {/* Tutor Header Card */}
      <div className="bg-slate-900/90 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl p-5 text-white border border-slate-800 shadow-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg border border-indigo-400/50">
            🤖
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl leading-tight text-white">
              Tutor Personal IA • EduBot
            </h2>
            <p className="text-xs text-indigo-300 font-medium">
              Aprende en español con explicaciones claras, ejemplos y pistas.
            </p>
          </div>
        </div>

        {/* Subject selector filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-slate-800 text-slate-200 font-bold text-xs py-2 px-3 rounded-xl border border-slate-700 focus:outline-none hidden sm:block"
        >
          <option value="Matemáticas" className="bg-slate-900 text-white">Matemáticas</option>
          <option value="Ciencias" className="bg-slate-900 text-white">Ciencias</option>
          <option value="Lectura" className="bg-slate-900 text-white">Lectura</option>
          <option value="Historia" className="bg-slate-900 text-white">Historia de México</option>
        </select>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-slate-900/90 rounded-3xl p-4 sm:p-6 border border-slate-800 card-depth overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none border-b-2 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span
                className={`text-[9px] font-bold mt-1.5 block text-right ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>

            {/* Quick action pill suggestions from Tutor */}
            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {msg.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(action)}
                    className="btn-game bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/60 font-bold text-[11px] py-1.5 px-3 rounded-xl transition-all"
                  >
                    💡 {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="self-start flex items-center gap-2 bg-slate-800 text-indigo-400 p-3 rounded-2xl border border-slate-700 text-xs font-bold animate-pulse">
            <span className="material-symbols-outlined text-base animate-spin">sync</span>
            <span>EduBot está pensando la mejor explicación...</span>
          </div>
        )}
      </div>

      {/* Input Chat Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2.5 shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Pregúntale lo que quieras a tu Tutor EduBot..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-white placeholder-slate-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className={`btn-game py-3 px-6 rounded-2xl font-black text-xs sm:text-sm text-white flex items-center gap-2 ${
            !inputQuery.trim() || isLoading
              ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-700'
          }`}
        >
          <span>Preguntar</span>
          <span className="material-symbols-outlined text-base">send</span>
        </button>
      </form>
    </div>
  );
};
