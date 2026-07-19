import React, { useState } from 'react';
import { LESSONS } from '../lessons';
import { convertFractionToDecimal, convertDecimalToFraction, DivisionResult } from '../utils/mathHelpers';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Percent, 
  ArrowLeftRight, 
  Repeat, 
  Calculator,
  Smile,
  Zap,
  Info
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface LearnPanelProps {
  lang: 'en' | 'th';
  soundEnabled: boolean;
}

const iconMap: Record<string, any> = {
  'fraction-to-decimal': Percent,
  'decimal-to-fraction': ArrowLeftRight,
  'recurring-to-fraction': Repeat,
  'patterns': Compass
};

export default function LearnPanel({ lang, soundEnabled }: LearnPanelProps) {
  const [activeTopicId, setActiveTopicId] = useState(LESSONS[0].id);
  const activeTopic = LESSONS.find(l => l.id === activeTopicId) || LESSONS[0];

  // Fraction to Decimal Calculator states
  const [calcNum, setCalcNum] = useState<number>(3);
  const [calcDen, setCalcDen] = useState<number>(8);
  const [divisionResult, setDivisionResult] = useState<DivisionResult | null>(null);

  // Decimal to Fraction Calculator states
  const [calcDecimal, setCalcDecimal] = useState<string>('0.45');
  const [fractionResult, setFractionResult] = useState<{
    numerator: number;
    denominator: number;
    stepsEn: string[];
    stepsTh: string[];
  } | null>(null);

  const handleRunDivision = () => {
    playClickSound(soundEnabled);
    const res = convertFractionToDecimal(calcNum, calcDen);
    setDivisionResult(res);
  };

  const handleRunDecimalConversion = () => {
    playClickSound(soundEnabled);
    const res = convertDecimalToFraction(calcDecimal);
    setFractionResult(res);
  };

  // Translations
  const text = {
    tabsHeader: lang === 'en' ? 'Select a Topic' : 'เลือกบทเรียนที่จะศึกษา',
    takeaways: lang === 'en' ? 'Key Takeaways' : 'สาระสำคัญประจำบทเรียน',
    playgroundTitle: lang === 'en' ? 'Interactive Math Playground' : 'สนามเด็กเล่นคณิตศาสตร์ (ทดลองคำนวณ)',
    calculatorLabel: lang === 'en' ? 'Try Custom Numbers' : 'ลองป้อนตัวเลขที่คุณต้องการคำนวณ',
    fractionInput: lang === 'en' ? 'Enter any Fraction:' : 'ป้อนเศษส่วนใดๆ:',
    decimalInput: lang === 'en' ? 'Enter any Decimal (e.g., 0.1666... or 0.35):' : 'ป้อนทศนิยมใดๆ (เช่น 0.1666... หรือ 0.35):',
    convertBtn: lang === 'en' ? 'Calculate & Show Steps' : 'คำนวณและแสดงวิธีคิดอย่างละเอียด',
    result: lang === 'en' ? 'Resulting Decimal:' : 'ทศนิยมที่ได้:',
    type: lang === 'en' ? 'Decimal Type:' : 'ประเภททศนิยม:',
    terminating: lang === 'en' ? 'Terminating Decimal' : 'ทศนิยมรู้จบ',
    repeating: lang === 'en' ? 'Recurring (Repeating) Decimal' : 'ทศนิยมซ้ำ',
    divisionSteps: lang === 'en' ? 'Step-by-Step Long Division Log' : 'บันทึกการทำงานของการหารยาวทีละขั้น',
    algebraicSteps: lang === 'en' ? 'Step-by-Step Algebraic Conversion' : 'แสดงสมการแก้โจทย์ทีละขั้นตอน',
    simplestFraction: lang === 'en' ? 'Simplest Fraction:' : 'เศษส่วนอย่างต่ำ:',
    exampleHeader: lang === 'en' ? 'Solved Example' : 'โจทย์ตัวอย่างพร้อมวิธีทำ'
  };

  const ActiveIcon = iconMap[activeTopicId] || BookOpen;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Visual Tab Selection Row */}
      <div className="space-y-3">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-500" />
          {text.tabsHeader.toUpperCase()}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {LESSONS.map((lesson) => {
            const TopicIcon = iconMap[lesson.id] || BookOpen;
            const isSelected = activeTopicId === lesson.id;
            
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setActiveTopicId(lesson.id);
                  setDivisionResult(null);
                  setFractionResult(null);
                }}
                className={`flex flex-col items-center justify-center p-5 rounded-3xl border-4 text-center transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-slate-950 bg-amber-100 text-slate-950 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900 shadow-sm'
                }`}
              >
                <div className={`p-3 rounded-2xl mb-3 border-2 border-slate-950 transition-colors ${
                  isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  <TopicIcon className="h-5 w-5" />
                </div>
                <span className="text-xs font-black leading-tight">
                  {lang === 'en' ? lesson.titleEn : lesson.titleTh}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lesson Content Card */}
      <div className="bg-white rounded-3xl border-4 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] overflow-hidden grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-4 divide-slate-950">
        
        {/* Left Column: Explanations and Examples */}
        <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-900 border-2 border-slate-950 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <ActiveIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-none">
                {lang === 'en' ? activeTopic.titleEn.toUpperCase() : activeTopic.titleTh}
              </h1>
            </div>
          </div>

          {/* Bilingual Explanations */}
          <div className="space-y-4 text-slate-900 leading-relaxed text-sm font-bold">
            <p className="bg-indigo-50 border-2 border-indigo-400 rounded-2xl p-4">
              {activeTopic.contentEn}
            </p>
            <p className="text-slate-600 italic font-medium bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
              {activeTopic.contentTh}
            </p>
          </div>

          {/* Examples Card */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 space-y-3">
            <div className="text-xs font-black text-amber-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Info className="h-4 w-4 text-amber-600" />
              {text.exampleHeader}
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="font-mono whitespace-pre-line text-xs sm:text-sm bg-white p-3 rounded-xl border-2 border-amber-200 font-bold text-amber-900">
                {activeTopic.exampleEn}
              </div>
              <div className="font-sans whitespace-pre-line text-xs sm:text-sm bg-white p-3 rounded-xl border-2 border-amber-200 font-bold text-slate-600 italic">
                {activeTopic.exampleTh}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Takeaways */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-rose-50/50 space-y-6">
          <h3 className="text-sm font-black text-rose-950 tracking-wider uppercase flex items-center gap-2">
            <Zap className="h-5 w-5 text-rose-500 fill-rose-500" />
            {text.takeaways}
          </h3>

          <ul className="space-y-4">
            {(lang === 'en' ? activeTopic.keyPointsEn : activeTopic.keyPointsTh).map((point, index) => (
              <li key={index} className="flex gap-3 text-sm text-slate-900 leading-relaxed font-bold">
                <span className="flex-none flex h-6 w-6 items-center justify-center rounded-lg bg-rose-200 border border-rose-400 text-rose-900 text-xs font-mono font-black">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Mathematics Playground Area */}
      <div className="bg-white rounded-3xl border-4 border-slate-950 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-indigo-500" />
          <h2 className="text-2xl font-black text-slate-900">
            {text.playgroundTitle.toUpperCase()}
          </h2>
        </div>

        {/* Calculator 1: Fraction to Decimal (Runs on first 3 tabs) */}
        {['fraction-to-decimal', 'patterns'].includes(activeTopicId) && (
          <div className="space-y-4 border-t-4 border-dashed border-slate-200 pt-6">
            <div className="text-sm font-black text-indigo-950 uppercase tracking-wider">
              {text.calculatorLabel} (Fraction → Decimal)
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 max-w-lg">
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={calcNum}
                  onChange={(e) => setCalcNum(parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-2 text-center rounded-xl border-2 border-slate-900 font-mono text-lg focus:bg-amber-50 focus:outline-none font-black"
                  placeholder="Num"
                />
                <div className="h-1 w-24 bg-slate-900 my-2 rounded-full" />
                <input
                  type="number"
                  value={calcDen}
                  onChange={(e) => setCalcDen(parseInt(e.target.value) || 1)}
                  className="w-20 px-2 py-2 text-center rounded-xl border-2 border-slate-900 font-mono text-lg focus:bg-amber-50 focus:outline-none font-black"
                  placeholder="Den"
                />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 rotate-90 sm:rotate-0" />

              <button
                onClick={handleRunDivision}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-all cursor-pointer border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
              >
                {text.convertBtn}
              </button>
            </div>

            {/* Division Results Display */}
            {divisionResult && (
              <div className="rounded-2xl border-4 border-indigo-400 p-5 space-y-4 animate-fade-in bg-indigo-50">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-xl border-2 border-indigo-200 shadow-[3px_3px_0px_0px_rgba(129,140,248,0.2)]">
                    <div className="text-xs text-indigo-950 font-black uppercase tracking-wider">{text.result}</div>
                    <div className="text-2xl font-mono font-black text-indigo-600 mt-1">
                      {divisionResult.formattedText}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-2 border-indigo-200 shadow-[3px_3px_0px_0px_rgba(129,140,248,0.2)]">
                    <div className="text-xs text-indigo-950 font-black uppercase tracking-wider">{text.type}</div>
                    <div className="text-sm font-black mt-1 flex items-center gap-1.5 text-slate-900">
                      <div className={`h-3 w-3 rounded-full border border-slate-950 ${divisionResult.isRepeating ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      {divisionResult.isRepeating ? text.repeating : text.terminating}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-indigo-950 font-black uppercase tracking-wider">{text.divisionSteps}</div>
                  <div className="bg-slate-950 rounded-xl p-4 border-2 border-slate-900 font-mono text-xs text-indigo-200 space-y-1.5 max-h-48 overflow-y-auto">
                    {divisionResult.divisionSteps.map((step, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-slate-500 font-bold select-none">[{i+1}]</span>
                        <span className="font-bold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculator 2: Decimal to Fraction (Runs on middle tabs) */}
        {['decimal-to-fraction', 'recurring-to-fraction'].includes(activeTopicId) && (
          <div className="space-y-4 border-t-4 border-dashed border-slate-200 pt-6">
            <div className="text-sm font-black text-indigo-950 uppercase tracking-wider">
              {text.calculatorLabel} (Decimal → Fraction)
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 max-w-lg">
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  value={calcDecimal}
                  onChange={(e) => setCalcDecimal(e.target.value)}
                  className="w-64 px-3 py-2.5 rounded-xl border-2 border-slate-900 font-mono text-base focus:bg-amber-50 focus:outline-none font-black"
                  placeholder="e.g. 0.45 or 0.7777..."
                />
                <span className="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-wide">
                  Formats: 0.35 | 0.7777... | 0.363636... | 0.16666...
                </span>
              </div>

              <button
                onClick={handleRunDecimalConversion}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm transition-all cursor-pointer border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0"
              >
                {text.convertBtn}
              </button>
            </div>

            {/* Fraction Results Display */}
            {fractionResult && (
              <div className="rounded-2xl border-4 border-emerald-400 p-5 space-y-4 animate-fade-in bg-emerald-50">
                <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 shadow-[3px_3px_0px_0px_rgba(52,211,153,0.2)] flex items-center gap-6 max-w-sm">
                  <div className="space-y-0.5">
                    <div className="text-xs text-emerald-950 font-black uppercase tracking-wider">{text.simplestFraction}</div>
                    <div className="text-xs text-emerald-700 font-bold">({lang === 'en' ? 'Reduced fraction form' : 'รูปเศษส่วนอย่างต่ำ'})</div>
                  </div>
                  
                  {/* Math formatted fraction display */}
                  <div className="flex items-center gap-1">
                    <div className="text-slate-900 font-mono text-2xl font-black">{calcDecimal}</div>
                    <div className="text-slate-400 font-mono text-xl mx-2 font-black">=</div>
                    <div className="flex flex-col items-center">
                      <span className="text-indigo-600 font-mono text-2xl font-black">{fractionResult.numerator}</span>
                      <div className="h-1 w-12 bg-slate-900 my-1 rounded-full" />
                      <span className="text-indigo-600 font-mono text-2xl font-black">{fractionResult.denominator}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-emerald-950 font-black uppercase tracking-wider">{text.algebraicSteps}</div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 text-xs">
                    {/* English Steps */}
                    <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 font-mono text-slate-700 space-y-1.5 font-bold shadow-[3px_3px_0px_0px_rgba(52,211,153,0.15)]">
                      {fractionResult.stepsEn.map((step, i) => (
                        <div key={i} className="flex gap-1.5">
                          <span className="text-indigo-600 font-black select-none">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Thai Steps */}
                    <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 text-slate-600 space-y-1.5 font-sans font-medium shadow-[3px_3px_0px_0px_rgba(52,211,153,0.15)]">
                      {fractionResult.stepsTh.map((step, i) => (
                        <div key={i} className="flex gap-1.5">
                          <span className="text-emerald-500 font-black select-none">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
