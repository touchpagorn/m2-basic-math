import React from 'react';
import { SECTIONS } from '../questions';
import { QuestionType, UserStats } from '../types';
import { 
  Percent, 
  ArrowLeftRight, 
  Repeat, 
  Compass, 
  Flame, 
  Trophy, 
  Play, 
  BookOpen, 
  CheckCircle2, 
  Award,
  HelpCircle
} from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  onSelectSection: (section: QuestionType | 'full-quiz') => void;
  onSelectTab: (tab: 'home' | 'learn' | 'practice') => void;
  lang: 'en' | 'th';
}

const iconMap: Record<string, any> = {
  Percent,
  ArrowLeftRight,
  Repeat,
  Compass
};

export default function Dashboard({ stats, onSelectSection, onSelectTab, lang }: DashboardProps) {
  // Translate labels based on selected language
  const text = {
    title: lang === 'en' ? 'Grade 8 Math Zone' : 'ดินแดนคณิตศาสตร์ ม.2',
    subtitle: lang === 'en' ? 'Fractions & Decimals Masterclass' : 'เก่งทศนิยมและเศษส่วนอย่างโปร',
    statsTitle: lang === 'en' ? 'Your Progress Stats' : 'สถิติความก้าวหน้าของคุณ',
    score: lang === 'en' ? 'Total Score' : 'คะแนนสะสม',
    correct: lang === 'en' ? 'Accuracy' : 'ความถูกต้อง',
    streak: lang === 'en' ? 'Daily Streak' : 'สตรีคสะสม',
    completed: lang === 'en' ? 'Completed Tasks' : 'โจทย์ที่ผ่านแล้ว',
    categoryTitle: lang === 'en' ? 'Choose a Topic to Practice' : 'เลือกบทเรียนที่จะฝึกฝน',
    lessonsButton: lang === 'en' ? 'Browse Visual Lessons' : 'อ่านบทเรียนและตัวอย่าง',
    fullQuizButton: lang === 'en' ? 'Take Full 20-Question Challenge' : 'ทำโจทย์วัดระดับความรู้ 20 ข้อรวด!',
    fullQuizSub: lang === 'en' ? 'Covers all required Grade 8 concepts in a structured quiz' : 'ครอบคลุมครบทุกหัวข้อตามหลักสูตร ม.2 พร้อมเฉลยทีละข้อ',
    points: lang === 'en' ? 'pts' : 'คะแนน',
    questions: lang === 'en' ? 'Questions' : 'ข้อ'
  };

  const accuracy = stats.completedCount > 0 
    ? Math.round((stats.correctCount / stats.completedCount) * 100) 
    : 0;

  const themeMap: Record<QuestionType, {
    bg: string;
    border: string;
    shadow: string;
    textTitle: string;
    textSub: string;
    innerBorder: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    num: number;
  }> = {
    'fraction-to-decimal': {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      shadow: 'shadow-[8px_8px_0px_0px_rgba(96,165,250,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(96,165,250,0.4)]',
      textTitle: 'text-blue-900',
      textSub: 'text-blue-700',
      innerBorder: 'border-blue-200',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      iconBg: 'bg-blue-400',
      num: 1
    },
    'decimal-to-fraction': {
      bg: 'bg-rose-50',
      border: 'border-rose-400',
      shadow: 'shadow-[8px_8px_0px_0px_rgba(251,113,133,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(251,113,133,0.4)]',
      textTitle: 'text-rose-900',
      textSub: 'text-rose-700',
      innerBorder: 'border-rose-200',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      iconBg: 'bg-rose-400',
      num: 2
    },
    'recurring-to-fraction': {
      bg: 'bg-emerald-50',
      border: 'border-emerald-400',
      shadow: 'shadow-[8px_8px_0px_0px_rgba(52,211,153,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(52,211,153,0.4)]',
      textTitle: 'text-emerald-900',
      textSub: 'text-emerald-700',
      innerBorder: 'border-emerald-200',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      iconBg: 'bg-emerald-400',
      num: 3
    },
    'patterns': {
      bg: 'bg-indigo-50',
      border: 'border-indigo-400',
      shadow: 'shadow-[8px_8px_0px_0px_rgba(129,140,248,0.3)] hover:shadow-[10px_10px_0px_0px_rgba(129,140,248,0.4)]',
      textTitle: 'text-indigo-900',
      textSub: 'text-indigo-700',
      innerBorder: 'border-indigo-200',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-800',
      iconBg: 'bg-indigo-400',
      num: 4
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-amber-100 border-4 border-amber-400 p-8 text-slate-900 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.25)] md:p-12">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 -mb-16 h-48 w-48 rounded-full bg-orange-400/10 blur-3xl" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-black tracking-wider text-amber-400 uppercase">
            <Award className="h-4 w-4" /> Math ม.2 • Bilingual Grade 8
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            {text.title.toUpperCase()}
          </h1>
          <p className="text-base text-slate-700 md:text-lg font-bold">
            {text.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onSelectSection('full-quiz')}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 border-2 border-slate-950 px-6 py-3.5 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer"
            >
              <Play className="h-5 w-5 fill-current text-amber-400" />
              {text.fullQuizButton}
            </button>
            
            <button
              onClick={() => onSelectTab('learn')}
              className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-900 px-6 py-3.5 font-black text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="h-5 w-5 text-amber-500" />
              {text.lessonsButton}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          {text.statsTitle.toUpperCase()}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Score Card */}
          <div className="rounded-3xl border-4 border-blue-400 bg-blue-50 p-5 shadow-[6px_6px_0px_0px_rgba(96,165,250,0.3)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(96,165,250,0.4)]">
            <div className="text-xs font-black text-blue-950 uppercase tracking-wider">{text.score}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-black text-blue-900">{stats.score}</span>
              <span className="text-xs text-blue-700 font-bold">{text.points}</span>
            </div>
            <div className="mt-3 h-3.5 w-full rounded-full bg-white border-2 border-blue-200 overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-500" 
                style={{ width: `${Math.min(100, stats.score / 10)}%` }} 
              />
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="rounded-3xl border-4 border-emerald-400 bg-emerald-50 p-5 shadow-[6px_6px_0px_0px_rgba(52,211,153,0.3)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(52,211,153,0.4)]">
            <div className="text-xs font-black text-emerald-950 uppercase tracking-wider">{text.correct}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-black text-emerald-900">{accuracy}%</span>
              <span className="text-xs text-emerald-700 font-bold">({stats.correctCount}/{stats.completedCount})</span>
            </div>
            <div className="mt-3 h-3.5 w-full rounded-full bg-white border-2 border-emerald-200 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 transition-all duration-500" 
                style={{ width: `${accuracy}%` }} 
              />
            </div>
          </div>

          {/* Streak Card */}
          <div className="rounded-3xl border-4 border-rose-400 bg-rose-50 p-5 shadow-[6px_6px_0px_0px_rgba(251,113,133,0.3)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(251,113,133,0.4)]">
            <div className="text-xs font-black text-rose-950 uppercase tracking-wider">{text.streak}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-3xl font-black text-rose-900">{stats.streak}</span>
              <Flame className={`h-6 w-6 animate-pulse-subtle ${stats.streak > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            </div>
            <p className="mt-2 text-xs text-rose-700 font-bold uppercase italic">
              {lang === 'en' ? 'Keep practice alive!' : 'สตรีคแสนเร้าใจ!'}
            </p>
          </div>

          {/* Tasks Completed Card */}
          <div className="rounded-3xl border-4 border-indigo-400 bg-indigo-50 p-5 shadow-[6px_6px_0px_0px_rgba(129,140,248,0.3)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(129,140,248,0.4)]">
            <div className="text-xs font-black text-indigo-950 uppercase tracking-wider">{text.completed}</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-black text-indigo-900">{stats.completedCount}</span>
              <span className="text-xs text-indigo-700 font-bold">/ 20</span>
            </div>
            <div className="mt-3 h-3.5 w-full rounded-full bg-white border-2 border-indigo-200 overflow-hidden">
              <div 
                className="h-full bg-indigo-400 transition-all duration-500" 
                style={{ width: `${(stats.completedCount / 20) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-amber-500" />
          {text.categoryTitle.toUpperCase()}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {SECTIONS.map((section) => {
            const IconComponent = iconMap[section.icon] || HelpCircle;
            const completedInSec = stats.sectionProgress[section.id]?.completed.filter(Boolean).length || 0;
            const totalInSec = 5;
            const isFullyCompleted = completedInSec === totalInSec;
            const theme = themeMap[section.id];

            return (
              <div 
                key={section.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${theme.border} ${theme.bg} p-6 ${theme.shadow} transition-all hover:translate-y-[-2px]`}
              >
                <div className="space-y-4">
                  {/* Category Top Banner */}
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl ${theme.iconBg} text-white p-3 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-all`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    {/* Badge */}
                    {isFullyCompleted ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 border-2 border-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-100" /> Complete
                      </span>
                    ) : (
                      <span className={`text-sm font-black ${theme.textTitle} font-mono`}>
                        {completedInSec}/{totalInSec} {text.questions.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className={`text-xl font-black ${theme.textTitle} transition-colors`}>
                      {lang === 'en' ? section.titleEn : section.titleTh}
                    </h3>
                    <p className={`text-sm ${theme.textTitle}/80 font-bold leading-relaxed line-clamp-2`}>
                      {lang === 'en' ? section.descriptionEn : section.descriptionTh}
                    </p>
                  </div>
                </div>

                {/* Card Button */}
                <div className={`mt-6 pt-4 border-t-2 ${theme.innerBorder} flex items-center justify-between`}>
                  <span className={`text-xs font-black uppercase tracking-wider ${theme.textSub} group-hover:underline`}>
                    {lang === 'en' ? 'Start Training' : 'เริ่มฝึกฝนหัวข้อนี้'}
                  </span>
                  <button
                    onClick={() => onSelectSection(section.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white border-2 border-slate-950 transition-all hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer active:translate-y-0"
                  >
                    <Play className="h-4 w-4 fill-current ml-0.5 text-amber-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Large structured card for standard Quiz promotion */}
      <div className="rounded-3xl border-4 border-amber-400 bg-amber-50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(245,158,11,0.25)]">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <h3 className="text-xl font-black text-amber-950 flex items-center justify-center md:justify-start gap-2 uppercase tracking-tight">
            <Trophy className="h-5 w-5 text-amber-500" />
            {text.fullQuizButton}
          </h3>
          <p className="text-sm text-slate-700 font-bold">
            {text.fullQuizSub}
          </p>
        </div>
        <button
          onClick={() => onSelectSection('full-quiz')}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-all active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <Play className="h-4 w-4 fill-current text-amber-400" />
          {lang === 'en' ? 'Start Challenge' : 'ลุยโจทย์ประลองปัญญา'}
        </button>
      </div>
    </div>
  );
}
