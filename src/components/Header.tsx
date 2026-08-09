import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface HeaderProps {
  userProfile: UserProfile;
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  currentTab,
  onSelectTab,
  onOpenSettings
}) => {
  return (
    <>
      {/* TopAppBar (Mobile & Small Tablet) */}
      <header className="flex justify-between items-center px-4 sm:px-6 h-16 w-full fixed top-0 left-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md lg:hidden select-none">
        <div 
          onClick={() => onSelectTab('perfil')}
          className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-full border-2 border-indigo-500 flex items-center justify-center text-xl shadow-md overflow-hidden"
              style={{ backgroundColor: userProfile.avatar.skinTone }}
            >
              {userProfile.avatar.outfit === 'explorer' && '🤠'}
              {userProfile.avatar.outfit === 'scientist' && '🥼'}
              {userProfile.avatar.outfit === 'astronaut' && '👨‍🚀'}
              {userProfile.avatar.outfit === 'aztec' && '👑'}
              {userProfile.avatar.outfit === 'hero' && '🦸‍♂️'}
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">
              {userProfile.level}
            </span>
          </div>
          <div>
            <h1 className="font-extrabold text-base text-indigo-400 leading-none tracking-tight">
              EduQuest
            </h1>
            <span className="text-[11px] font-semibold text-slate-400">
              {userProfile.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Offline indicator */}
          {userProfile.isOffline && (
            <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
              <span className="material-symbols-outlined text-xs">wifi_off</span>
              <span className="hidden sm:inline">Sin Conexión</span>
            </div>
          )}

          {/* Gem count */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded-full px-2.5 py-1 font-bold text-xs text-sky-400 border border-slate-700">
            <span className="material-symbols-outlined text-[16px] text-sky-400">diamond</span>
            <span>{userProfile.gems}</span>
          </div>

          {/* Streak indicator */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded-full px-2.5 py-1 font-bold text-xs text-amber-400 border border-slate-700">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span>{userProfile.streak}🔥</span>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-transform"
            title="Configuración"
            aria-label="Configuración de la app"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </header>

      {/* NavigationDrawer (Desktop Side Navigation) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full py-6 w-72 bg-slate-900/90 backdrop-blur-md border-r border-slate-800 shadow-xl z-40 select-none">
        <div className="px-6 mb-6 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <div>
              <h1 className="font-black text-2xl text-white tracking-tight leading-none">EduQuest</h1>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">México • Bento Edition</span>
            </div>
          </div>

          <div 
            onClick={() => onSelectTab('perfil')}
            className="flex items-center gap-3.5 w-full bg-slate-950/70 p-3 rounded-2xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer group transition-all"
          >
            <div 
              className="w-12 h-12 rounded-full border-2 border-indigo-500 flex items-center justify-center text-2xl shadow-md relative group-hover:scale-105 transition-transform"
              style={{ backgroundColor: userProfile.avatar.skinTone }}
            >
              {userProfile.avatar.outfit === 'explorer' && '🤠'}
              {userProfile.avatar.outfit === 'scientist' && '🥼'}
              {userProfile.avatar.outfit === 'astronaut' && '👨‍🚀'}
              {userProfile.avatar.outfit === 'aztec' && '👑'}
              {userProfile.avatar.outfit === 'hero' && '🦸‍♂️'}

              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-slate-900">
                Lvl {userProfile.level}
              </span>
            </div>
            
            <div className="overflow-hidden flex-1">
              <h2 className="font-bold text-sm text-slate-100 truncate group-hover:text-indigo-400 transition-colors">
                {userProfile.name}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                {userProfile.xp} XP • {userProfile.gems} 💎
              </p>
              <p className="text-[10px] font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                Racha de {userProfile.streak} días
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => onSelectTab('perfil')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'perfil'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              person
            </span>
            <span>Perfil del Estudiante</span>
          </button>

          <button
            onClick={() => onSelectTab('misiones')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'misiones'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">explore</span>
            <span>Misiones y Retos</span>
          </button>

          <button
            onClick={() => onSelectTab('mapa')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'mapa'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">map</span>
            <span>Mapa de Niveles</span>
          </button>

          <button
            onClick={() => onSelectTab('tutor')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'tutor'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">smart_toy</span>
            <span>Tutor IA Personal</span>
          </button>

          <button
            onClick={() => onSelectTab('competencia')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'competencia'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">timer</span>
            <span>Modo Competencia</span>
          </button>

          <button
            onClick={() => onSelectTab('logros')}
            className={`w-full flex items-center gap-3.5 p-3 rounded-2xl font-bold text-sm transition-all ${
              currentTab === 'logros'
                ? 'bg-indigo-600 text-white border-b-4 border-indigo-900 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">emoji_events</span>
            <span>Logros e Insignias</span>
          </button>
        </nav>

        {/* Desktop Footer Actions */}
        <div className="px-4 pt-4 border-t border-slate-800">
          <button
            onClick={onOpenSettings}
            className="w-full btn-game bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 font-bold text-xs py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Configuración y Sonido</span>
          </button>
        </div>
      </aside>

      {/* BottomNavBar (Mobile & Tablet) */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 pb-2 pt-1.5 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-xl rounded-t-2xl lg:hidden select-none">
        <button
          onClick={() => onSelectTab('perfil')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'perfil'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            person
          </span>
          <span className="text-[10px] font-semibold mt-0.5">Perfil</span>
        </button>

        <button
          onClick={() => onSelectTab('misiones')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'misiones'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">explore</span>
          <span className="text-[10px] font-semibold mt-0.5">Misiones</span>
        </button>

        <button
          onClick={() => onSelectTab('mapa')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'mapa'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">map</span>
          <span className="text-[10px] font-semibold mt-0.5">Mapa</span>
        </button>

        <button
          onClick={() => onSelectTab('tutor')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'tutor'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
          <span className="text-[10px] font-semibold mt-0.5">IA Tutor</span>
        </button>

        <button
          onClick={() => onSelectTab('competencia')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'competencia'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">timer</span>
          <span className="text-[10px] font-semibold mt-0.5">Desafíos</span>
        </button>

        <button
          onClick={() => onSelectTab('logros')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            currentTab === 'logros'
              ? 'bg-indigo-600 text-white font-bold -translate-y-1 border-b-4 border-indigo-900'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">emoji_events</span>
          <span className="text-[10px] font-semibold mt-0.5">Logros</span>
        </button>
      </nav>
    </>
  );
};
