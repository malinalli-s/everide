import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, AppTab } from './types';
import { BottomNav } from './components/BottomNav';
import { ProfileSelection } from './components/ProfileSelection';
import { Dashboard } from './components/Dashboard';
import { Explore } from './components/Explore';
import { Learn } from './components/Learn';
import { Profile } from './components/Profile';
import { AIChat } from './components/AIChat';
import { ClassroomActivities } from './components/ClassroomActivities';
import { Academy } from './components/Academy';
import { TeacherProfileResult } from './types';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfileResult | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [subView, setSubView] = useState<string | null>(null);

  const handleLogout = () => {
    setProfile(null);
    setActiveTab('home');
    setSubView(null);
  };

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
    setSubView(null);
  };

  if (!profile) {
    return <ProfileSelection onSelect={setProfile} />;
  }

  const handleNavigate = (view: string) => {
    if (view === 'eval' || view === 'ethics') {
      setActiveTab('learn');
      setSubView(null);
      // We might need a way to tell Learn which section to show, 
      // but for now let's just switch the tab.
      return;
    }
    if (view === 'prompts' || view === 'responsible') {
      setActiveTab('learn');
      setSubView(null);
      return;
    }
    setSubView(view);
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      if (subView === 'activities' && profile === 'teacher') {
        return <ClassroomActivities onBack={() => setSubView(null)} />;
      }
      if (subView === 'radar' || subView === 'recommended') {
        return <Explore />;
      }
      return <Dashboard profile={profile} onNavigate={handleNavigate} />;
    }
    if (activeTab === 'explore') return <Explore />;
    if (activeTab === 'learn') return (
      <Learn 
        profile={profile} 
        onAssessmentComplete={setTeacherProfile} 
        onGoToAcademy={() => setActiveTab('academy')}
      />
    );
    if (activeTab === 'academy') return <Academy teacherProfile={teacherProfile} />;
    if (activeTab === 'profile') return <Profile profile={profile} onLogout={handleLogout} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background-light pb-24 max-w-md mx-auto relative shadow-2xl">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary tracking-tight">EVERIDE</h1>
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="text-xs font-bold">{profile === 'teacher' ? 'D' : 'E'}</span>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (subView || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AIChat />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
