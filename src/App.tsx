import React, { useState, useEffect } from 'react';
import { AvatarCustomization, Badge, LevelNode, Mission, NavigationTab, SubjectType, UserProfile } from './types';
import { GAME_LEVELS, INITIAL_BADGES, INITIAL_MISSIONS, INITIAL_USER_PROFILE } from './data/mockData';
import { Header } from './components/Header';
import { ProfileView } from './components/ProfileView';
import { LevelMap } from './components/LevelMap';
import { QuizModal } from './components/QuizModal';
import { AiTutorView } from './components/AiTutorView';
import { MissionsView } from './components/MissionsView';
import { BadgesView } from './components/BadgesView';
import { ContestModeView } from './components/ContestModeView';
import { AvatarModal } from './components/AvatarModal';
import { SettingsModal } from './components/SettingsModal';
import { AiGeneratorModal } from './components/AiGeneratorModal';

export default function App() {
  // Load initial saved profile from localStorage if available
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('eduquest_mexico_profile');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('eduquest_mexico_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem('eduquest_mexico_missions');
      return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
    } catch {
      return INITIAL_MISSIONS;
    }
  });

  const [levels, setLevels] = useState<LevelNode[]>(GAME_LEVELS);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('perfil');

  // Modals state
  const [activeLevelModal, setActiveLevelModal] = useState<LevelNode | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAiGenModalOpen, setIsAiGenModalOpen] = useState(false);
  const [aiGenSubject, setAiGenSubject] = useState<SubjectType>('matematicas');

  // Sync state with localStorage for progress saving
  useEffect(() => {
    try {
      localStorage.setItem('eduquest_mexico_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('eduquest_mexico_badges', JSON.stringify(badges));
    } catch {
      // ignore
    }
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem('eduquest_mexico_missions', JSON.stringify(missions));
    } catch {
      // ignore
    }
  }, [missions]);

  // Handle completing a quiz level
  const handleCompleteLevel = (levelId: string, starsEarned: number, xpEarned: number) => {
    setUserProfile(prev => {
      const isAlreadyCompleted = prev.completedLevelIds.includes(levelId);
      const newCompleted = isAlreadyCompleted ? prev.completedLevelIds : [...prev.completedLevelIds, levelId];
      const newXp = prev.xp + xpEarned;
      let newLevel = prev.level;
      let nextXp = prev.nextLevelXp;

      if (newXp >= nextXp) {
        newLevel += 1;
        nextXp += 200;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: nextXp,
        completedLevelIds: newCompleted,
        gems: prev.gems + 15
      };
    });

    // Update level status in list
    setLevels(prev => prev.map(l => {
      if (l.id === levelId) {
        return { ...l, status: 'completed', stars: Math.max(l.stars || 0, starsEarned) };
      }
      return l;
    }));

    // Increment mission progress
    setMissions(prev => prev.map(m => {
      if (m.id === 'm-1') {
        const nextProg = Math.min(m.maxProgress, m.progress + 1);
        return { ...m, progress: nextProg, completed: nextProg >= m.maxProgress };
      }
      return m;
    }));
  };

  // Reward XP helper (from Contest Mode, etc)
  const handleRewardXp = (amount: number) => {
    setUserProfile(prev => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      let nextXp = prev.nextLevelXp;

      if (newXp >= nextXp) {
        newLevel += 1;
        nextXp += 200;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: nextXp
      };
    });
  };

  // Claim Mission reward
  const handleClaimMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission || mission.claimed) return;

    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, claimed: true } : m));

    setUserProfile(prev => ({
      ...prev,
      xp: prev.xp + mission.rewardXp,
      gems: prev.gems + mission.rewardGems
    }));
  };

  // Avatar update
  const handleSaveAvatar = (newAvatar: AvatarCustomization) => {
    setUserProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  // Generated custom AI level callback
  const handleQuestionsGenerated = (questions: any[], subjectTitle: string) => {
    setIsAiGenModalOpen(false);

    const customLevelNode: LevelNode = {
      id: `custom-ai-${Date.now()}`,
      subject: aiGenSubject,
      levelNumber: 99,
      title: subjectTitle,
      description: 'Reto personalizado de opción múltiple generado por la Inteligencia Artificial.',
      icon: 'auto_awesome',
      stars: 0,
      status: 'unlocked',
      xpReward: 200,
      questions
    };

    setActiveLevelModal(customLevelNode);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-28 lg:pl-72 lg:pb-8 lg:pt-8 px-4 sm:px-8 selection:bg-indigo-500/30">
      {/* Top Header & Desktop Sidebar Navigation */}
      <Header
        userProfile={userProfile}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Active Tab Content View */}
      <main className="max-w-6xl mx-auto animate-in fade-in">
        {currentTab === 'perfil' && (
          <ProfileView
            userProfile={userProfile}
            badges={badges}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'mapa' && (
          <LevelMap
            levels={levels}
            userProfile={userProfile}
            onSelectLevel={setActiveLevelModal}
            onOpenAiGenerator={(subject) => {
              setAiGenSubject(subject);
              setIsAiGenModalOpen(true);
            }}
          />
        )}

        {currentTab === 'tutor' && (
          <AiTutorView userProfile={userProfile} />
        )}

        {currentTab === 'misiones' && (
          <MissionsView
            userProfile={userProfile}
            missions={missions}
            onClaimMission={handleClaimMission}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'logros' && (
          <BadgesView badges={badges} />
        )}

        {currentTab === 'competencia' && (
          <ContestModeView
            userProfile={userProfile}
            onRewardXp={handleRewardXp}
          />
        )}
      </main>

      {/* Quiz Modal overlay */}
      {activeLevelModal && (
        <QuizModal
          levelNode={activeLevelModal}
          onClose={() => setActiveLevelModal(null)}
          onComplete={handleCompleteLevel}
        />
      )}

      {/* Avatar Customizer Modal */}
      {isAvatarModalOpen && (
        <AvatarModal
          userProfile={userProfile}
          onClose={() => setIsAvatarModalOpen(false)}
          onSaveAvatar={handleSaveAvatar}
        />
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal
          userProfile={userProfile}
          onClose={() => setIsSettingsModalOpen(false)}
          onUpdateName={(newName) => setUserProfile(prev => ({ ...prev, name: newName }))}
          onToggleSound={(enabled) => setUserProfile(prev => ({ ...prev, soundEnabled: enabled }))}
          onToggleOffline={(isOffline) => setUserProfile(prev => ({ ...prev, isOffline }))}
        />
      )}

      {/* AI Quiz Generator Modal */}
      {isAiGenModalOpen && (
        <AiGeneratorModal
          initialSubject={aiGenSubject}
          onClose={() => setIsAiGenModalOpen(false)}
          onQuestionsGenerated={handleQuestionsGenerated}
        />
      )}
    </div>
  );
}
