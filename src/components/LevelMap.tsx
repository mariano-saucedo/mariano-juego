import React, { useState } from 'react';
import { LevelNode, SubjectType, UserProfile } from '../types';

interface LevelMapProps {
  levels: LevelNode[];
  userProfile: UserProfile;
  onSelectLevel: (level: LevelNode) => void;
  onOpenAiGenerator: (subject: SubjectType) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({
  levels,
  userProfile,
  onSelectLevel,
  onOpenAiGenerator
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectType>('matematicas');

  const subjectsInfo: { id: SubjectType; label: string; icon: string; color: string; badgeColor: string }[] = [
    { id: 'matematicas', label: 'Matemáticas', icon: 'calculate', color: 'bg-indigo-600', badgeColor: 'border-indigo-500' },
    { id: 'ciencias', label: 'Ciencias', icon: 'science', color: 'bg-emerald-600', badgeColor: 'border-emerald-500' },
    { id: 'lectura', label: 'Lectura', icon: 'menu_book', color: 'bg-amber-600', badgeColor: 'border-amber-500' },
    { id: 'historia', label: 'Historia', icon: 'account_balance', color: 'bg-purple-600', badgeColor: 'border-purple-500' }
  ];

  const currentSubjectLevels = levels.filter(lvl => lvl.subject === activeSubject);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {subjectsInfo.map((subj) => (
          <button
            key={subj.id}
            onClick={() => setActiveSubject(subj.id)}
            className={`btn-game flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeSubject === subj.id
                ? `${subj.color} text-white border-b-4 border-slate-950 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-102`
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{subj.icon}</span>
            <span>{subj.label}</span>
            {userProfile.completedLevelIds.some(id => levels.find(l => l.id === id)?.subject === subj.id) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Main Map Trail Canvas */}
      <div className="bg-slate-900/90 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 card-depth min-h-[480px] flex flex-col items-center relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Header Title for Current Subject */}
        <div className="text-center mb-8 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-indigo-400 mb-2 shadow-sm">
            <span className="material-symbols-outlined text-base">map</span>
            <span>Ruta del Saber • {subjectsInfo.find(s => s.id === activeSubject)?.label}</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-3xl text-white">
            Aventura de Aprendizaje
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
            Completa los nodos para ganar experiencia (XP), gemas e insignias de maestría.
          </p>
        </div>

        {/* Trail Nodes Path */}
        <div className="flex flex-col items-center gap-10 w-full max-w-md relative z-10 py-4">
          {currentSubjectLevels.map((levelNode, index) => {
            const isCompleted = userProfile.completedLevelIds.includes(levelNode.id);
            const isUnlocked = levelNode.status === 'unlocked' || isCompleted || index === 0;

            // Calculate zigzag alignment for game level path
            const alignments = ['self-center', 'self-end sm:translate-x-12', 'self-center', 'self-start sm:-translate-x-12'];
            const alignmentClass = alignments[index % alignments.length];

            return (
              <div key={levelNode.id} className={`flex flex-col items-center relative ${alignmentClass}`}>
                {/* Connecting Line to next node */}
                {index < currentSubjectLevels.length - 1 && (
                  <div className="absolute top-16 w-1 h-12 bg-dashed border-r-2 border-dashed border-slate-700 z-0" />
                )}

                {/* Level Node Button */}
                <div className="relative group">
                  <button
                    onClick={() => isUnlocked && onSelectLevel(levelNode)}
                    disabled={!isUnlocked}
                    className={`btn-game w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex flex-col items-center justify-center relative z-10 transition-transform ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950 border-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105'
                        : isUnlocked
                        ? 'bg-indigo-600 text-white border-indigo-900 shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-bounce hover:scale-105'
                        : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    {levelNode.bossNode ? (
                      <span className="material-symbols-outlined text-4xl sm:text-5xl text-amber-300 drop-shadow">
                        trophy
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-3xl sm:text-4xl">
                        {isCompleted ? 'check_circle' : isUnlocked ? levelNode.icon : 'lock'}
                      </span>
                    )}

                    {/* Level Number Ribbon */}
                    <span className="absolute -bottom-2 bg-slate-900 text-slate-100 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-slate-700 shadow">
                      Nivel {levelNode.levelNumber}
                    </span>
                  </button>

                  {/* Star Rating Display */}
                  <div className="flex gap-1 justify-center mt-3">
                    {[1, 2, 3].map((starIndex) => (
                      <span
                        key={starIndex}
                        className={`material-symbols-outlined text-base ${
                          starIndex <= (levelNode.stars || (isCompleted ? 3 : 0))
                            ? 'text-amber-400'
                            : 'text-slate-700'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>

                  {/* Level Details Card Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 bg-slate-950 text-white rounded-2xl text-xs border border-slate-800 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                    <h4 className="font-bold text-sm text-emerald-400">{levelNode.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{levelNode.description}</p>
                    <p className="text-[10px] font-bold text-indigo-300 mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">stars</span>
                      <span>Recompensa: +{levelNode.xpReward} XP</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Generator Node: Infinite AI Challenge */}
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => onOpenAiGenerator(activeSubject)}
              className="btn-game bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center gap-3 shadow-lg hover:scale-105 border-indigo-900"
            >
              <span className="material-symbols-outlined text-2xl text-amber-300 animate-spin">
                auto_awesome
              </span>
              <div className="text-left">
                <p className="leading-tight">Generar Reto Infinito con IA</p>
                <p className="text-[10px] text-purple-200 font-medium">Cuestionarios infinitos creados por EduBot</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
