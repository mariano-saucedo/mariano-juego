import React, { useState } from 'react';
import { AvatarCustomization, UserProfile } from '../types';
import { soundFx } from '../utils/soundEffects';

interface AvatarModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onSaveAvatar: (newAvatar: AvatarCustomization) => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  userProfile,
  onClose,
  onSaveAvatar
}) => {
  const [avatar, setAvatar] = useState<AvatarCustomization>({ ...userProfile.avatar });

  const outfits: { id: AvatarCustomization['outfit']; label: string; emoji: string }[] = [
    { id: 'explorer', label: 'Explorador', emoji: '🤠' },
    { id: 'scientist', label: 'Científico', emoji: '🥼' },
    { id: 'astronaut', label: 'Astronauta', emoji: '👨‍🚀' },
    { id: 'aztec', label: 'Guerrero', emoji: '👑' },
    { id: 'hero', label: 'Superhéroe', emoji: '🦸‍♂️' }
  ];

  const skinTones = ['#fcd34d', '#f87171', '#60a5fa', '#34d399', '#a78bfa'];

  const handleSave = () => {
    soundFx.playClick();
    onSaveAvatar(avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in-95">
        <h3 className="font-extrabold text-xl text-white">
          Personaliza tu Avatar 🎨
        </h3>

        {/* Live Preview Avatar */}
        <div 
          className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center text-7xl relative"
          style={{ backgroundColor: avatar.skinTone }}
        >
          {avatar.outfit === 'explorer' && '🤠'}
          {avatar.outfit === 'scientist' && '🥼'}
          {avatar.outfit === 'astronaut' && '👨‍🚀'}
          {avatar.outfit === 'aztec' && '👑'}
          {avatar.outfit === 'hero' && '🦸‍♂️'}
        </div>

        {/* Outfits Selector */}
        <div className="w-full space-y-2">
          <label className="text-xs font-bold text-slate-400 block text-left">
            Elige tu Atuendo:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {outfits.map((o) => (
              <button
                key={o.id}
                onClick={() => setAvatar(prev => ({ ...prev, outfit: o.id }))}
                className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                  avatar.outfit === o.id
                    ? 'bg-indigo-950 border-indigo-500 ring-2 ring-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="text-2xl">{o.emoji}</span>
                <span className="text-[10px] font-bold text-slate-200">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Background/Skin tone selector */}
        <div className="w-full space-y-2">
          <label className="text-xs font-bold text-slate-400 block text-left">
            Color de Fondo:
          </label>
          <div className="flex gap-3 justify-center">
            {skinTones.map((color) => (
              <button
                key={color}
                onClick={() => setAvatar(prev => ({ ...prev, skinTone: color }))}
                className={`w-9 h-9 rounded-full border-2 transition-transform ${
                  avatar.skinTone === color ? 'scale-110 border-white ring-2 ring-indigo-500' : 'border-slate-700'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="w-full flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="btn-game flex-1 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs py-3 rounded-2xl border-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="btn-game flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 rounded-2xl border-emerald-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
