import React, { useState, useEffect } from 'react';
import { LeaderboardUser, UserProfile } from '../types';
import { INITIAL_LEADERBOARD } from '../data/mockData';
import { soundFx } from '../utils/soundEffects';

interface ContestModeViewProps {
  userProfile: UserProfile;
  onRewardXp: (xpAmount: number) => void;
}

export const ContestModeView: React.FC<ContestModeViewProps> = ({
  userProfile,
  onRewardXp
}) => {
  const [activeTab, setActiveTab] = useState<'timer' | 'leaderboard'>('timer');
  
  // Timer Challenge State
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [currentMathProblem, setCurrentMathProblem] = useState<{ num1: number; num2: number; answer: number; options: number[] }>({ num1: 0, num2: 0, answer: 0, options: [] });
  const [gameOver, setGameOver] = useState(false);

  // Generate math speed problem
  const generateProblem = () => {
    const n1 = Math.floor(Math.random() * 20) + 1;
    const n2 = Math.floor(Math.random() * 20) + 1;
    const ans = n1 + n2;

    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 3) {
      const offset = (Math.floor(Math.random() * 10) - 5) || 2;
      if (ans + offset > 0 && ans + offset !== ans) {
        wrongOptions.add(ans + offset);
      }
    }

    const options = [...Array.from(wrongOptions), ans].sort(() => Math.random() - 0.5);
    setCurrentMathProblem({ num1: n1, num2: n2, answer: ans, options });
  };

  const handleStartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    generateProblem();
  };

  useEffect(() => {
    let timerId: any;
    if (isPlaying && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      soundFx.playLevelUp();
      const earnedXp = score * 20;
      if (earnedXp > 0) {
        onRewardXp(earnedXp);
      }
    }
    return () => clearInterval(timerId);
  }, [isPlaying, timeLeft, score, onRewardXp]);

  const handleAnswerOption = (selectedVal: number) => {
    if (!isPlaying) return;

    if (selectedVal === currentMathProblem.answer) {
      soundFx.playCorrect();
      setScore(prev => prev + 1);
    } else {
      soundFx.playWrong();
    }
    generateProblem();
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-900 to-slate-900 rounded-3xl p-6 text-white border border-rose-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 text-rose-200 border border-rose-500/30">
            <span className="material-symbols-outlined text-sm">timer</span>
            <span>Arena de Velocidad</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Modo Competencia y Récords
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80 font-medium mt-1">
            Pon a prueba tus reflejos mentales contra el reloj y escala posiciones en el ranking.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-2xl backdrop-blur shrink-0 border border-slate-800">
          <button
            onClick={() => setActiveTab('timer')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'timer' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reto de 30 Segundos ⏱️
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabla de Líderes 🏆
          </button>
        </div>
      </div>

      {activeTab === 'timer' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 card-depth flex flex-col items-center text-center">
          {!isPlaying && !gameOver && (
            <div className="max-w-md flex flex-col items-center gap-4 my-6">
              <div className="w-24 h-24 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500/40 flex items-center justify-center text-5xl shadow-lg">
                ⚡
              </div>
              <h3 className="font-extrabold text-2xl text-white">
                Desafío Matemático Contrareloj
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Resuelve la mayor cantidad de sumas rápidas en solo 30 segundos. Cada acierto suma puntos y ganas +20 XP extra por cada respuesta correcta.
              </p>
              <button
                onClick={handleStartGame}
                className="btn-game bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-700 font-black text-sm py-4 px-8 rounded-2xl flex items-center gap-2 shadow-lg animate-bounce mt-2"
              >
                <span className="material-symbols-outlined text-2xl">play_arrow</span>
                <span>¡Iniciar Desafío Ahora!</span>
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="w-full max-w-lg flex flex-col items-center gap-6 py-4">
              <div className="flex justify-between items-center w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 font-extrabold text-sm text-white">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="material-symbols-outlined text-xl">timer</span>
                  Tiempo: {timeLeft}s
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="material-symbols-outlined text-xl">sports_score</span>
                  Puntuación: {score}
                </span>
              </div>

              {/* Math Problem Card */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-indigo-500/40 w-full shadow-lg">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
                  Suma Veloz
                </span>
                <h4 className="font-black text-4xl sm:text-5xl text-white">
                  {currentMathProblem.num1} + {currentMathProblem.num2} = ?
                </h4>
              </div>

              {/* Answer Choices */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {currentMathProblem.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerOption(opt)}
                    className="btn-game bg-slate-800 hover:bg-indigo-600 text-white font-black text-2xl py-5 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className="max-w-md flex flex-col items-center gap-4 my-6 animate-in fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500 text-slate-950 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-lg badge-shimmer">
                🏆
              </div>
              <h3 className="font-extrabold text-2xl text-white">
                ¡Tiempo Agotado!
              </h3>
              <p className="text-sm font-semibold text-indigo-400">
                Lograste {score} respuestas correctas
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl w-full border border-slate-800 text-xs font-bold text-slate-300 my-2">
                <p className="flex justify-between items-center">
                  <span>Recompensa de Experiencia:</span>
                  <span className="text-emerald-400 text-sm">+{score * 20} XP</span>
                </p>
              </div>

              <button
                onClick={handleStartGame}
                className="btn-game bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs py-3.5 px-8 rounded-2xl border-indigo-900"
              >
                Jugar de Nuevo
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 card-depth flex flex-col gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">military_tech</span>
              <span>Tabla de Clasificación Local</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Actualizado hoy</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {INITIAL_LEADERBOARD.map((user: LeaderboardUser) => (
              <div
                key={user.rank}
                className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  user.isCurrentUser
                    ? 'bg-indigo-950/80 border-indigo-500/60 font-bold shadow-sm'
                    : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    user.rank === 1 ? 'bg-amber-400 text-amber-950 border border-amber-600' :
                    user.rank === 2 ? 'bg-slate-300 text-slate-900 border border-slate-500' :
                    user.rank === 3 ? 'bg-amber-700 text-amber-100 border border-amber-900' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    #{user.rank}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <span className="material-symbols-outlined text-xl">{user.avatarIcon}</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-white">
                      {user.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Nivel {user.level} • Racha {user.streak}🔥
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-indigo-400 block">{user.xp} XP</span>
                  <span className="text-[10px] text-slate-500 font-bold">Puntuación</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
