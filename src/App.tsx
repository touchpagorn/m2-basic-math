import React, { useState, useEffect } from 'react';
import { UserStats, QuestionType } from './types';
import Dashboard from './components/Dashboard';
import PracticePanel from './components/PracticePanel';
import LearnPanel from './components/LearnPanel';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  Home, 
  BookOpen, 
  GraduationCap, 
  Trophy,
  RotateCcw
} from 'lucide-react';
import { playClickSound } from './utils/audio';

const STORAGE_KEY = 'grade8_math_practice_stats';

const defaultStats: UserStats = {
  score: 0,
  completedCount: 0,
  correctCount: 0,
  streak: 0,
  sectionProgress: {
    'fraction-to-decimal': { completed: [false, false, false, false, false], score: 0 },
    'decimal-to-fraction': { completed: [false, false, false, false, false], score: 0 },
    'recurring-to-fraction': { completed: [false, false, false, false, false], score: 0 },
    'patterns': { completed: [false, false, false, false, false], score: 0 }
  }
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'practice'>('home');
  const [activeSection, setActiveSection] = useState<QuestionType | 'full-quiz' | null>(null);
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Load stats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
  }, []);

  // Update stats handler
  const handleUpdateStats = (isCorrect: boolean, sectionId: QuestionType, indexInSec: number) => {
    setStats(prev => {
      // Create fresh deep copy of the section progress
      const freshProgress = { ...prev.sectionProgress };
      const secProg = { ...freshProgress[sectionId] };
      const freshCompleted = [...secProg.completed];
      
      let scoreIncrement = 0;
      let newStreak = prev.streak;

      // Only award points and mark completed if this is the first time answering correctly
      if (!freshCompleted[indexInSec]) {
        if (isCorrect) {
          freshCompleted[indexInSec] = true;
          scoreIncrement = 10; // 10 points for correct answers
          newStreak += 1;
        } else {
          newStreak = 0; // reset streak on incorrect answer
        }
      }

      const updatedStats: UserStats = {
        score: prev.score + scoreIncrement,
        completedCount: prev.completedCount + 1,
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        streak: newStreak,
        sectionProgress: {
          ...freshProgress,
          [sectionId]: {
            completed: freshCompleted,
            score: secProg.score + scoreIncrement
          }
        }
      };

      // Save to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  // Reset all progress stats
  const handleResetProgress = () => {
    playClickSound(soundEnabled);
    setStats(defaultStats);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStats));
    setShowResetConfirm(false);
  };

  // Sound and Language toggles
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'th' : 'en';
    setLang(nextLang);
    playClickSound(soundEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Play a quick test click to confirm sound is on
      setTimeout(() => playClickSound(true), 50);
    }
  };

  const selectSection = (section: QuestionType | 'full-quiz') => {
    playClickSound(soundEnabled);
    setActiveSection(section);
    setActiveTab('practice');
  };

  // Render navigation translations
  const text = {
    title: lang === 'en' ? 'Grade 8 Math Zone' : 'คณิตศาสตร์ ม.2',
    homeTab: lang === 'en' ? 'Home' : 'หน้าหลัก',
    learnTab: lang === 'en' ? 'Learn' : 'บทเรียน',
    practiceTab: lang === 'en' ? 'Practice' : 'ฝึกฝน',
    resetBtn: lang === 'en' ? 'Reset Progress' : 'ล้างสถิติ',
    credits: lang === 'en' ? 'Interactive Practice for English & Thai Programs' : 'โปรแกรมทบทวนคณิตศาสตร์สองภาษาเพื่อการเรียนรู้แบบมีปฏิสัมพันธ์'
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-900 flex flex-col justify-between font-sans">
      
      {/* Top Header Row */}
      <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-amber-200 px-4 py-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => {
              playClickSound(soundEnabled);
              setActiveTab('home');
              setActiveSection(null);
            }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 select-none group"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-400 text-white flex items-center justify-center font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                {text.title.toUpperCase()}
              </h1>
              <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-1">
                Decimals & Fractions Master
              </p>
            </div>
          </div>

          {/* Navigation links & Option buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Nav tabs (Only active when NOT in an active worksheet, or allows returning) */}
            {activeSection === null && (
              <nav className="hidden sm:flex items-center bg-white p-1 rounded-xl border-2 border-slate-900 text-xs font-black text-slate-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveTab('home');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === 'home' ? 'bg-amber-400 text-slate-950 border border-slate-900 font-black' : 'hover:text-slate-900'
                  }`}
                >
                  <Home className="h-3.5 w-3.5" />
                  {text.homeTab}
                </button>
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveTab('learn');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === 'learn' ? 'bg-amber-400 text-slate-950 border border-slate-900 font-black' : 'hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {text.learnTab}
                </button>
              </nav>
            )}

            {/* Utility Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                title={lang === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
                className="flex items-center gap-1 h-9 px-2.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 transition-all text-slate-900 cursor-pointer text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                <Languages className="h-4 w-4 text-slate-700" />
                <span className="font-mono">{lang === 'en' ? 'EN' : 'TH'}</span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
                className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 transition-all text-slate-900 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-slate-800" />
                ) : (
                  <VolumeX className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {/* Reset Progress stats */}
              {(stats.score > 0 || stats.completedCount > 0) && (
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setShowResetConfirm(true);
                  }}
                  title={text.resetBtn}
                  className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-rose-400 bg-rose-50 hover:bg-rose-100 transition-all text-rose-700 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-8">
        {/* Navigation router */}
        {activeSection !== null ? (
          <PracticePanel 
            sectionId={activeSection}
            onBackToDashboard={() => {
              setActiveSection(null);
              setActiveTab('home');
            }}
            lang={lang}
            soundEnabled={soundEnabled}
            onUpdateStats={handleUpdateStats}
          />
        ) : activeTab === 'home' ? (
          <Dashboard 
            stats={stats}
            onSelectSection={selectSection}
            onSelectTab={setActiveTab}
            lang={lang}
          />
        ) : (
          <LearnPanel 
            lang={lang}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Footer Details */}
      <footer className="bg-slate-900 text-white border-t-4 border-slate-950 px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          <p><span className="opacity-60 font-bold">SUBJECT:</span> <span className="font-black uppercase tracking-wider text-amber-300">Basic Mathematics 2</span></p>
          <p><span className="opacity-60 font-bold">TOPIC:</span> <span className="font-black uppercase tracking-wider text-amber-300">Fractions & Decimals</span></p>
        </div>
        <p className="font-black text-amber-400 text-sm tracking-wide">TOTAL: 20 QUESTIONS</p>
      </footer>

      {/* Mobile Sticky Navigation (Only when NOT in quiz) */}
      {activeSection === null && (
        <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-900 p-1.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-1.5 z-40 w-auto">
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              setActiveTab('home');
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'home' ? 'bg-amber-400 text-slate-950 border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Home className="h-4 w-4" />
            {text.homeTab}
          </button>
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              setActiveTab('learn');
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'learn' ? 'bg-amber-400 text-slate-950 border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {text.learnTab}
          </button>
        </div>
      )}

      {/* Custom Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-4 border-slate-950 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-rose-100 text-rose-600 border-2 border-slate-950 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce-subtle">
              <RotateCcw className="h-8 w-8 stroke-[2.5]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase">
                {lang === 'en' ? 'Reset Progress?' : 'ล้างสถิติทั้งหมด?'}
              </h3>
              <p className="text-sm text-slate-600 font-bold leading-relaxed">
                {lang === 'en' 
                  ? 'Are you sure you want to reset all your progress? This will delete your score, daily streak, and completion logs.' 
                  : 'คุณต้องการล้างความก้าวหน้าทั้งหมดใช่หรือไม่? คะแนน สะสมสตรีค และประวัติการทำโจทย์จะถูกลบและเริ่มใหม่ทั้งหมด'}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setShowResetConfirm(false);
                }}
                className="px-5 py-3 rounded-2xl border-4 border-slate-950 bg-white hover:bg-slate-50 text-slate-700 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {lang === 'en' ? 'CANCEL' : 'ยกเลิก'}
              </button>
              <button
                onClick={handleResetProgress}
                className="px-5 py-3 rounded-2xl border-4 border-slate-950 bg-rose-500 hover:bg-rose-600 text-white font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {lang === 'en' ? 'YES, RESET' : 'ใช่, ล้างสถิติ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
