import React, { useState } from 'react';
import { Badge } from '../types';

interface BadgesViewProps {
  badges: Badge[];
}

export const BadgesView: React.FC<BadgesViewProps> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 text-purple-200 border border-purple-500/30">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span>Salón de la Fama</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Logros e Insignias de Honor
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 font-medium mt-1">
            Demuestra tu dominio en cada materia desbloqueando todas las insignias educativas.
          </p>
        </div>

        <div className="bg-slate-950/80 backdrop-blur p-3.5 rounded-2xl border border-slate-800 text-center shrink-0">
          <span className="font-black text-2xl sm:text-3xl block text-amber-400">
            {unlockedCount} / {badges.length}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            Insignias Obtenidas
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 card-depth">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`flex flex-col items-center text-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group ${
                badge.unlocked
                  ? 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/60 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-1'
                  : 'bg-slate-950/40 border-slate-900 opacity-40 grayscale hover:opacity-70'
              }`}
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-slate-700 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.colorGradient} badge-shimmer text-white border-indigo-400/50`
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-4xl sm:text-5xl" style={{ fontVariationSettings: badge.unlocked ? "'FILL' 1" : undefined }}>
                  {badge.icon}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-100 line-clamp-1">
                  {badge.title}
                </h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5 line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {badge.unlocked ? (
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">check</span>
                  Conseguido
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  Bloqueado
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Badge Details Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-800 shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95">
            <div
              className={`w-24 h-24 rounded-full border-2 border-slate-700 shadow-xl flex items-center justify-center text-5xl mb-4 ${
                selectedBadge.unlocked
                  ? `bg-gradient-to-br ${selectedBadge.colorGradient} text-white badge-shimmer border-indigo-400/50`
                  : 'bg-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: selectedBadge.unlocked ? "'FILL' 1" : undefined }}>
                {selectedBadge.icon}
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-white">
              {selectedBadge.title}
            </h3>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider my-1">
              Categoría: {selectedBadge.category}
            </span>

            <p className="text-xs text-slate-300 font-medium my-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 w-full">
              {selectedBadge.description}
            </p>

            {selectedBadge.unlocked ? (
              <p className="text-[11px] font-bold text-emerald-400 mb-4">
                Desbloqueado el {selectedBadge.unlockedAt || 'recientemente'}
              </p>
            ) : (
              <p className="text-[11px] font-bold text-amber-400 mb-4">
                Sigue jugando y resolviendo lecciones para ganar este logro.
              </p>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="btn-game w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-6 rounded-2xl border-indigo-900"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
