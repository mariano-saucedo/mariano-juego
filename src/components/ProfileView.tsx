import React from 'react';
import { Badge, UserProfile } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  badges: Badge[];
  onOpenAvatarModal: () => void;
  onOpenSettings: () => void;
  onSelectTab: (tab: any) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  badges,
  onOpenAvatarModal,
  onOpenSettings,
  onSelectTab
}) => {
  const unlockedBadges = badges.filter(b => b.unlocked);
  const xpPercentage = Math.min(100, Math.round((userProfile.xp / userProfile.nextLevelXp) * 100));

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Profile Banner Card */}
      <section className="relative bg-slate-900/90 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 card-depth overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Avatar & Action Buttons */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div 
              onClick={onOpenAvatarModal}
              className="relative group cursor-pointer transition-transform hover:scale-105"
            >
              <div 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-500/50 shadow-2xl flex items-center justify-center text-7xl sm:text-8xl relative overflow-hidden bg-slate-800"
                style={{ backgroundColor: userProfile.avatar.skinTone }}
              >
                {userProfile.avatar.outfit === 'explorer' && '🤠'}
                {userProfile.avatar.outfit === 'scientist' && '🥼'}
                {userProfile.avatar.outfit === 'astronaut' && '👨‍🚀'}
                {userProfile.avatar.outfit === 'aztec' && '👑'}
                {userProfile.avatar.outfit === 'hero' && '🦸‍♂️'}

                {/* Hover edit badge */}
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-3xl">edit</span>
                </div>
              </div>

              {/* Level Badge Circle */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 font-black text-lg w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-xl badge-shimmer">
                {userProfile.level}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full min-w-[180px]">
              <button 
                onClick={onOpenAvatarModal}
                className="btn-game bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 border-indigo-800"
              >
                <span className="material-symbols-outlined text-base">brush</span>
                <span>Editar Avatar</span>
              </button>
              <button 
                onClick={onOpenSettings}
                className="btn-game bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 border-slate-700"
              >
                <span className="material-symbols-outlined text-base">settings</span>
                <span>Configuración</span>
              </button>
            </div>
          </div>

          {/* User Information & Stats Grid */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left w-full">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="font-extrabold text-2xl sm:text-3xl text-white">
                    {userProfile.name}
                  </h2>
                  <p className="font-semibold text-sm sm:text-base text-indigo-400 flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
                    <span>{userProfile.title}</span>
                  </p>
                </div>

                <div className="bg-slate-800/80 backdrop-blur px-3.5 py-1.5 rounded-2xl border border-slate-700 text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5 self-center md:self-auto">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_fire_department
                  </span>
                  <span>Racha Activa: {userProfile.streak} días</span>
                </div>
              </div>

              {/* Progress to next level bar */}
              <div className="mt-4 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-1.5">
                  <span>Siguiente Nivel (Lvl {userProfile.level + 1})</span>
                  <span className="text-indigo-400">{userProfile.xp} / {userProfile.nextLevelXp} XP</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/80 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500 progress-glow"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-indigo-400 text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span className="font-black text-xl text-white">{userProfile.xp}</span>
                <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Total XP</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-emerald-400 text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  task_alt
                </span>
                <span className="font-black text-xl text-white">{userProfile.completedLevelIds.length}</span>
                <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Módulos</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
                <span className="material-symbols-outlined text-amber-400 text-3xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  leaderboard
                </span>
                <span className="font-black text-xl text-white">#{userProfile.rankingLocal}</span>
                <span className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider">Ranking Local</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Gallery & Subject Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Preview Section */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
              <span>Galería de Insignias ({unlockedBadges.length}/{badges.length})</span>
            </h3>
            <button 
              onClick={() => onSelectTab('logros')}
              className="font-bold text-xs text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
            >
              <span>Ver todas</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 card-depth">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {badges.slice(0, 4).map((badge) => (
                <div 
                  key={badge.id}
                  className={`flex flex-col items-center text-center gap-2 group p-2 rounded-2xl transition-all ${
                    badge.unlocked ? 'cursor-pointer hover:bg-slate-800/50' : 'opacity-40 grayscale'
                  }`}
                >
                  <div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-700 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                      badge.unlocked 
                        ? `bg-gradient-to-br ${badge.colorGradient} badge-shimmer text-white border-indigo-400/50` 
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl sm:text-4xl" style={{ fontVariationSettings: badge.unlocked ? "'FILL' 1" : undefined }}>
                      {badge.icon}
                    </span>
                  </div>
                  <span className="font-bold text-xs text-slate-200 line-clamp-1">
                    {badge.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {badge.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subject Mastery Levels */}
        <section className="flex flex-col gap-4">
          <h3 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-indigo-400" style={{ fontVariationSettings: "'FILL' 1" }}>
              monitoring
            </span>
            <span>Dominio por Materia</span>
          </h3>

          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 card-depth flex flex-col gap-5">
            {/* Matemáticas */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-sky-400">calculate</span>
                  Matemáticas
                </span>
                <span className="text-slate-400">Lvl. {userProfile.subjectLevels.matematicas.level}</span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full progress-glow"
                  style={{ width: `${(userProfile.subjectLevels.matematicas.progressXp / userProfile.subjectLevels.matematicas.maxXp) * 100}%` }}
                />
              </div>
            </div>

            {/* Ciencias */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">science</span>
                  Ciencias
                </span>
                <span className="text-slate-400">Lvl. {userProfile.subjectLevels.ciencias.level}</span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full progress-glow"
                  style={{ width: `${(userProfile.subjectLevels.ciencias.progressXp / userProfile.subjectLevels.ciencias.maxXp) * 100}%` }}
                />
              </div>
            </div>

            {/* Lectura */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-400">menu_book</span>
                  Lectura
                </span>
                <span className="text-slate-400">Lvl. {userProfile.subjectLevels.lectura.level}</span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full progress-glow"
                  style={{ width: `${(userProfile.subjectLevels.lectura.progressXp / userProfile.subjectLevels.lectura.maxXp) * 100}%` }}
                />
              </div>
            </div>

            {/* Historia */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-purple-400">account_balance</span>
                  Historia de México
                </span>
                <span className="text-slate-400">Lvl. {userProfile.subjectLevels.historia.level}</span>
              </div>
              <div className="h-3.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full progress-glow"
                  style={{ width: `${(userProfile.subjectLevels.historia.progressXp / userProfile.subjectLevels.historia.maxXp) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400 font-medium">
                ¡Sigue así! Estás a {userProfile.nextLevelXp - userProfile.xp} XP de subir de nivel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
