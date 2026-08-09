import React, { useState } from 'react';
import { Mission, UserProfile } from '../types';
import { soundFx } from '../utils/soundEffects';

interface MissionsViewProps {
  userProfile: UserProfile;
  missions: Mission[];
  onClaimMission: (missionId: string) => void;
  onSelectTab: (tab: any) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  userProfile,
  missions,
  onClaimMission,
  onSelectTab
}) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly'>('all');

  const filteredMissions = missions.filter(m => {
    if (filter === 'daily') return m.type === 'daily';
    if (filter === 'weekly') return m.type === 'weekly';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 text-white border border-amber-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 text-amber-200 border border-amber-500/30">
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            <span>Centro de Operaciones</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Misiones y Retos del Día
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/80 font-medium mt-1">
            Gana puntos de experiencia (XP) y gemas completando tus metas diarias.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 text-white p-3.5 rounded-2xl border border-slate-800 shadow-md">
          <span className="material-symbols-outlined text-3xl text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <div>
            <span className="font-extrabold text-base block leading-tight">Racha de {userProfile.streak} días</span>
            <span className="text-[10px] text-slate-400 font-bold">¡Multiplicador de XP activo!</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            filter === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Todas las Misiones
        </button>
        <button
          onClick={() => setFilter('daily')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            filter === 'daily'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Diarias ☀️
        </button>
        <button
          onClick={() => setFilter('weekly')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            filter === 'weekly'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Semanales 🗓️
        </button>
      </div>

      {/* Missions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isReadyToClaim = mission.completed && !mission.claimed;
          const progressPercent = Math.min(100, Math.round((mission.progress / mission.maxProgress) * 100));

          return (
            <div
              key={mission.id}
              className={`bg-slate-900/90 rounded-3xl p-5 border card-depth flex flex-col justify-between gap-4 transition-all ${
                mission.claimed
                  ? 'border-slate-800/60 opacity-60'
                  : isReadyToClaim
                  ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400/50'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border shadow-sm ${
                  mission.claimed
                    ? 'bg-slate-800 text-slate-500 border-slate-700'
                    : isReadyToClaim
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 badge-shimmer'
                    : 'bg-indigo-950/80 text-indigo-400 border-indigo-500/40'
                }`}>
                  <span className="material-symbols-outlined text-2xl">
                    {mission.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-extrabold text-base text-white leading-snug">
                      {mission.title}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      mission.type === 'daily'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    }`}>
                      {mission.type === 'daily' ? 'Diaria' : 'Semanal'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {mission.description}
                  </p>
                </div>
              </div>

              {/* Progress & Reward Footer */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Progreso</span>
                  <span className="text-slate-200">{mission.progress} / {mission.maxProgress}</span>
                </div>

                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      mission.claimed
                        ? 'bg-slate-700'
                        : isReadyToClaim
                        ? 'bg-emerald-400 progress-glow'
                        : 'bg-indigo-500 progress-glow'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold">
                    <span className="text-indigo-400 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">stars</span>
                      +{mission.rewardXp} XP
                    </span>
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">diamond</span>
                      +{mission.rewardGems}
                    </span>
                  </div>

                  {mission.claimed ? (
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Reclamado
                    </span>
                  ) : isReadyToClaim ? (
                    <button
                      onClick={() => {
                        soundFx.playBadgeUnlock();
                        onClaimMission(mission.id);
                      }}
                      className="btn-game bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2 px-4 rounded-xl flex items-center gap-1 shadow animate-bounce border-emerald-700"
                    >
                      <span className="material-symbols-outlined text-base">redeem</span>
                      <span>Reclamar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectTab('mapa')}
                      className="btn-game bg-slate-800 text-indigo-400 hover:bg-slate-700 hover:text-white font-extrabold text-xs py-1.5 px-3 rounded-xl flex items-center gap-1 border-slate-700"
                    >
                      <span>Ir a la Misión</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
