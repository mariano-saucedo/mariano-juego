import React from 'react';
import { UserProfile } from '../types';
import { soundFx } from '../utils/soundEffects';

interface SettingsModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onUpdateName: (newName: string) => void;
  onToggleSound: (enabled: boolean) => void;
  onToggleOffline: (isOffline: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  userProfile,
  onClose,
  onUpdateName,
  onToggleSound,
  onToggleOffline
}) => {
  const [nameInput, setNameInput] = React.useState(userProfile.name);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">settings</span>
            <span>Configuración de Juego</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Cerrar configuración"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Change Name form */}
        <form onSubmit={handleSaveName} className="space-y-2">
          <label className="text-xs font-bold text-slate-400 block">
            Nombre de Jugador:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-slate-500"
            />
            <button
              type="submit"
              className="btn-game bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-xl border-indigo-900"
            >
              Guardar
            </button>
          </div>
        </form>

        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-indigo-400">volume_up</span>
              <div>
                <p className="font-extrabold text-xs text-white">Efectos de Sonido</p>
                <p className="text-[10px] text-slate-400">Audio para respuestas y nivel</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={userProfile.soundEnabled}
              onChange={(e) => {
                soundFx.setEnabled(e.target.checked);
                onToggleSound(e.target.checked);
              }}
              className="w-5 h-5 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400">wifi_off</span>
              <div>
                <p className="font-extrabold text-xs text-white">Simular Modo Sin Conexión</p>
                <p className="text-[10px] text-slate-400">Sincronización local de datos</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={userProfile.isOffline}
              onChange={(e) => onToggleOffline(e.target.checked)}
              className="w-5 h-5 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* System info */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-[11px] text-slate-400 font-medium space-y-1">
          <p><strong>Idioma predeterminado:</strong> Español (México)</p>
          <p><strong>Compatibilidad:</strong> Multiplataforma (PC, Android, iOS, iPad)</p>
          <p><strong>Motor de IA:</strong> Gemini 2.5 Flash Server-side</p>
        </div>

        <button
          onClick={onClose}
          className="btn-game bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-2xl w-full border-indigo-900"
        >
          Listo
        </button>
      </div>
    </div>
  );
};
