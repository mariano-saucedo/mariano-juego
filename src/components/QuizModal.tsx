import React, { useState } from 'react';
import { LevelNode, QuizQuestion } from '../types';
import { soundFx } from '../utils/soundEffects';

interface QuizModalProps {
  levelNode: LevelNode;
  onClose: () => void;
  onComplete: (levelId: string, starsEarned: number, xpEarned: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  levelNode,
  onClose,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions: QuizQuestion[] = levelNode.questions;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedIndex === null || isAnswered) return;

    setIsAnswered(true);
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      soundFx.playCorrect();
      setCorrectCount(prev => prev + 1);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Calculate finished results
      setIsFinished(true);
      const total = questions.length;
      const ratio = correctCount / total;
      let stars = 1;
      if (ratio >= 0.8) stars = 3;
      else if (ratio >= 0.5) stars = 2;

      soundFx.playLevelUp();
      onComplete(levelNode.id, stars, levelNode.xpReward);
    }
  };

  if (isFinished) {
    const total = questions.length;
    const ratio = correctCount / total;
    let stars = 1;
    if (ratio >= 0.8) stars = 3;
    else if (ratio >= 0.5) stars = 2;

    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-slate-950 border-2 border-emerald-400 flex items-center justify-center text-4xl mb-4 shadow-lg badge-shimmer">
            🎉
          </div>

          <h3 className="font-extrabold text-2xl text-white">
            ¡Nivel Completado!
          </h3>
          <p className="text-sm font-semibold text-indigo-400 mt-1">
            {levelNode.title}
          </p>

          {/* Stars display */}
          <div className="flex gap-2 my-4">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`material-symbols-outlined text-4xl ${
                  star <= stars ? 'text-amber-400 animate-bounce' : 'text-slate-700'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl w-full border border-slate-800 my-2 space-y-2 text-xs font-bold text-slate-300">
            <div className="flex justify-between items-center">
              <span>Aciertos:</span>
              <span className="text-emerald-400 text-sm">{correctCount} de {total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Experiencia Ganada:</span>
              <span className="text-indigo-400 text-sm">+{levelNode.xpReward} XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Gemas de Recompensa:</span>
              <span className="text-amber-400 text-sm">+15 💎</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-game w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm py-3 px-6 rounded-2xl mt-4 flex items-center justify-center gap-2 border-indigo-900"
          >
            <span className="material-symbols-outlined">map</span>
            <span>Continuar Explorando</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 max-w-xl w-full border border-slate-800 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-indigo-400">
              {levelNode.icon}
            </span>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white line-clamp-1">
                {levelNode.title}
              </h3>
              <p className="text-[11px] font-bold text-slate-400">
                Pregunta {currentIndex + 1} de {questions.length}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 progress-glow"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
          <span className="inline-block bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2">
            {currentQuestion.topic}
          </span>
          <h4 className="font-extrabold text-base sm:text-lg text-white leading-snug">
            {currentQuestion.question}
          </h4>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            let buttonStyle = 'bg-slate-950 text-slate-200 border-slate-800 hover:bg-slate-800/80';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-rose-500/20 text-rose-300 border-rose-500 font-bold';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-indigo-950 text-indigo-200 border-indigo-500 font-bold ring-2 ring-indigo-500';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`btn-game text-left p-3.5 sm:p-4 rounded-2xl border font-semibold text-xs sm:text-sm flex items-center justify-between transition-all ${buttonStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrectOption && (
                  <span className="material-symbols-outlined text-xl text-emerald-400">check_circle</span>
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <span className="material-symbols-outlined text-xl text-rose-400">cancel</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Box toggle */}
        {!isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">lightbulb</span>
              <span>{showHint ? 'Ocultar Pista' : 'Pedir Pista al Tutor'}</span>
            </button>
          </div>
        )}

        {showHint && !isAnswered && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-200 p-3 rounded-xl text-xs font-medium flex items-start gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-amber-400 text-base shrink-0 mt-0.5">help</span>
            <p><strong>Pista:</strong> {currentQuestion.hint}</p>
          </div>
        )}

        {/* Feedback Explanation after answer */}
        {isAnswered && (
          <div className={`p-4 rounded-2xl border text-xs font-medium flex items-start gap-3 animate-in fade-in ${
            selectedIndex === currentQuestion.correctIndex
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-200'
          }`}>
            <span className="material-symbols-outlined text-2xl shrink-0">
              {selectedIndex === currentQuestion.correctIndex ? 'sentiment_very_satisfied' : 'info'}
            </span>
            <div>
              <p className="font-extrabold text-sm mb-0.5">
                {selectedIndex === currentQuestion.correctIndex ? '¡Excelente respuesta! 🌟' : '¡Casi lo logras!'}
              </p>
              <p>{currentQuestion.explanation}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-800 flex justify-end gap-3">
          {!isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedIndex === null}
              className={`btn-game py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white ${
                selectedIndex === null
                  ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-700'
              }`}
            >
              Comprobar Respuesta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-game bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-900 py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2"
            >
              <span>{currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Nivel'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
