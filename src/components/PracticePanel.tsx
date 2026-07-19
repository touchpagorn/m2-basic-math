import React, { useState, useRef, useEffect } from 'react';
import { Question, QuestionType, FractionValue } from '../types';
import { QUESTIONS, SECTIONS } from '../questions';
import { 
  Check, 
  X, 
  Sparkles, 
  Lightbulb, 
  ChevronRight, 
  RotateCcw, 
  ArrowLeft, 
  Eraser, 
  Edit2, 
  Volume2, 
  HelpCircle,
  Trophy,
  Activity
} from 'lucide-react';
import { playCorrectSound, playIncorrectSound, playClickSound } from '../utils/audio';

interface PracticePanelProps {
  sectionId: QuestionType | 'full-quiz';
  onBackToDashboard: () => void;
  lang: 'en' | 'th';
  soundEnabled: boolean;
  onUpdateStats: (isCorrect: boolean, sectionId: QuestionType, indexInSec: number) => void;
}

export default function PracticePanel({ 
  sectionId, 
  onBackToDashboard, 
  lang, 
  soundEnabled, 
  onUpdateStats 
}: PracticePanelProps) {
  // Filter questions for the active session
  const activeQuestions = React.useMemo(() => {
    if (sectionId === 'full-quiz') {
      return QUESTIONS; // all 20 questions
    }
    return QUESTIONS.filter(q => q.section === sectionId); // 5 questions in the selected section
  }, [sectionId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = activeQuestions[currentIndex];

  // Answer states
  const [decimalAnswer, setDecimalAnswer] = useState('');
  const [fractionAnswer, setFractionAnswer] = useState<FractionValue>({ numerator: 0, denominator: 0 });
  const [choiceAnswer, setChoiceAnswer] = useState('');
  
  // Feedback states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Scratchpad drawing states
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#4f46e5');

  // Reset input states when question changes
  useEffect(() => {
    setDecimalAnswer('');
    setFractionAnswer({ numerator: 0, denominator: 0 });
    setChoiceAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowExplanation(false);
    clearCanvas();
  }, [currentIndex, sectionId]);

  // Handle Canvas Drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    
    // Get mouse or touch coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Resize canvas handler
  useEffect(() => {
    if (scratchpadOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 180;
      }
    }
  }, [scratchpadOpen]);

  // Answer Submission Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    let correct = false;

    if (currentQuestion.answerType === 'decimal') {
      const studentDecimal = parseFloat(decimalAnswer.trim());
      const correctDecimal = parseFloat(currentQuestion.correctDecimal || '0');
      correct = Math.abs(studentDecimal - correctDecimal) < 0.0001;
    } 
    else if (currentQuestion.answerType === 'fraction') {
      const studentNum = fractionAnswer.numerator;
      const studentDen = fractionAnswer.denominator;
      const correctNum = currentQuestion.correctFraction?.numerator || 0;
      const correctDen = currentQuestion.correctFraction?.denominator || 1;
      
      correct = studentNum === correctNum && studentDen === correctDen;
    } 
    else if (currentQuestion.answerType === 'choice') {
      correct = choiceAnswer === currentQuestion.correctChoiceValue;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    setShowExplanation(true);

    // Play sound feedback
    if (correct) {
      playCorrectSound(soundEnabled);
    } else {
      playIncorrectSound(soundEnabled);
    }

    // Update stats
    const indexInSec = QUESTIONS.filter(q => q.section === currentQuestion.section).findIndex(q => q.id === currentQuestion.id);
    onUpdateStats(correct, currentQuestion.section, indexInSec !== -1 ? indexInSec : 0);
  };

  // Translations
  const text = {
    back: lang === 'en' ? 'Back' : 'กลับหน้าแรก',
    hint: lang === 'en' ? 'Need a hint?' : 'ต้องการคำใบ้?',
    submit: lang === 'en' ? 'Submit Answer' : 'ส่งคำตอบ',
    next: lang === 'en' ? 'Next Question' : 'ทำข้อถัดไป',
    congrats: lang === 'en' ? 'Fantastic! Correct Answer' : 'เก่งมาก! ตอบถูกเผงเลย',
    incorrect: lang === 'en' ? 'Incorrect. Keep learning!' : 'ยังไม่ถูกนะ ลองเรียนรู้ขั้นตอนกัน',
    numerator: lang === 'en' ? 'Numerator' : 'ตัวเศษ',
    denominator: lang === 'en' ? 'Denominator' : 'ตัวส่วน',
    placeholderDecimal: lang === 'en' ? 'Type decimal, e.g. 0.35' : 'พิมพ์ทศนิยม เช่น 0.35',
    scratchpad: lang === 'en' ? 'Virtual Scratchpad' : 'กระดานทดเลข',
    clearPad: lang === 'en' ? 'Clear' : 'ล้าง',
    explanation: lang === 'en' ? 'Explanation & Calculations' : 'แสดงวิธีทำและสูตรคำนวณ',
    progress: lang === 'en' ? 'Practice' : 'ฝึกทำโจทย์',
    question: lang === 'en' ? 'Question' : 'ข้อที่',
    of: lang === 'en' ? 'of' : 'จากทั้งหมด',
    finish: lang === 'en' ? 'Finish Practice' : 'จบชุดฝึกฝน',
    streakHeader: lang === 'en' ? 'Keep it up!' : 'พยายามเข้านะ!',
    selectChoice: lang === 'en' ? 'Select the correct option:' : 'เลือกข้อที่ถูกต้อง:'
  };

  const currentSectionInfo = SECTIONS.find(s => s.id === currentQuestion.section);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-4 border-slate-950 pb-6">
        <button
          onClick={() => {
            playClickSound(soundEnabled);
            onBackToDashboard();
          }}
          className="inline-flex items-center gap-2 rounded-2xl border-4 border-slate-950 bg-white px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-slate-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 stroke-[3]" />
          {text.back.toUpperCase()}
        </button>

        {/* Practice Title details */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-100 px-4 py-2 text-xs font-black text-slate-950 border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
            <Activity className="h-3.5 w-3.5 text-indigo-600" />
            {sectionId === 'full-quiz' 
              ? (lang === 'en' ? '20-Question Challenge' : 'ประลองฝีมือ 20 ข้อ')
              : (lang === 'en' ? currentSectionInfo?.titleEn : currentSectionInfo?.titleTh)}
          </span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-3xl p-5 border-4 border-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] space-y-3">
        <div className="flex justify-between items-center text-sm font-black text-slate-900">
          <span>{text.question} {currentIndex + 1} {text.of} {activeQuestions.length}</span>
          <span className="font-mono text-indigo-600 font-black">{Math.round((currentIndex / activeQuestions.length) * 100)}% COMPLETE</span>
        </div>
        <div className="h-5 w-full rounded-full bg-slate-100 border-4 border-slate-950 overflow-hidden p-[2px]">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 border-r-2 border-slate-950" 
            style={{ width: `${((currentIndex) / activeQuestions.length) * 100}%` }} 
          />
        </div>
      </div>

      {/* Main Content Layout with Scratchpad Column */}
      <div className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Side: Question, Inputs, explanations */}
        <div className={`space-y-6 ${scratchpadOpen ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all`}>
          
          {/* Question Card */}
          <div className="bg-white rounded-3xl border-4 border-slate-950 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] space-y-6">
            
            {/* Question Text in both languages */}
            <div className="space-y-3">
              <div className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">
                {lang === 'en' ? '★ Question prompt' : '★ โจทย์ถามว่า'}
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                {currentQuestion.questionTextEn}
              </h2>
              <div className="text-sm sm:text-base text-slate-600 italic font-bold bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
                {currentQuestion.questionTextTh}
              </div>
            </div>

            {/* Answer Input form */}
            <form onSubmit={handleSubmit} className="pt-4 border-t-4 border-dashed border-slate-200 space-y-6">
              
              {currentQuestion.answerType === 'decimal' && (
                <div className="space-y-2 max-w-sm mx-auto text-center">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                    {lang === 'en' ? 'Enter Decimal Answer' : 'พิมพ์คำตอบเป็นทศนิยม'}
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitted}
                    value={decimalAnswer}
                    onChange={(e) => setDecimalAnswer(e.target.value)}
                    placeholder={text.placeholderDecimal}
                    className="w-full px-5 py-4 rounded-2xl border-4 border-slate-950 text-center text-xl font-mono focus:bg-amber-50 focus:outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]"
                  />
                </div>
              )}

              {currentQuestion.answerType === 'fraction' && (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">
                    {lang === 'en' ? 'Enter Simplified Fraction' : 'พิมพ์คำตอบเป็นเศษส่วนอย่างต่ำ'}
                  </label>
                  
                  {/* Vertical fraction builder interface */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-3">
                      <input
                        type="number"
                        required
                        disabled={isSubmitted}
                        placeholder={lang === 'en' ? 'Top' : 'เศษ'}
                        value={fractionAnswer.numerator || ''}
                        onChange={(e) => setFractionAnswer(prev => ({ ...prev, numerator: parseInt(e.target.value) || 0 }))}
                        className="w-24 px-3 py-3 rounded-xl border-4 border-slate-950 text-center font-mono text-xl focus:bg-amber-50 focus:outline-none transition-all disabled:bg-slate-100 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      />
                      <div className="h-1.5 w-28 bg-slate-950 rounded-full" />
                      <input
                        type="number"
                        required
                        disabled={isSubmitted}
                        placeholder={lang === 'en' ? 'Bottom' : 'ส่วน'}
                        value={fractionAnswer.denominator || ''}
                        onChange={(e) => setFractionAnswer(prev => ({ ...prev, denominator: parseInt(e.target.value) || 0 }))}
                        className="w-24 px-3 py-3 rounded-xl border-4 border-slate-950 text-center font-mono text-xl focus:bg-amber-50 focus:outline-none transition-all disabled:bg-slate-100 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.answerType === 'choice' && (
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
                    {text.selectChoice}
                  </label>
                  
                  <div className="grid gap-3">
                    {currentQuestion.options?.map((option) => {
                      const isSelected = choiceAnswer === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => {
                            playClickSound(soundEnabled);
                            setChoiceAnswer(option.value);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border-4 transition-all flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'border-slate-950 bg-amber-100 text-slate-950 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold'
                          } disabled:opacity-80 disabled:cursor-not-allowed`}
                        >
                          <div className="space-y-1">
                            <div className="text-base font-black font-mono">{option.labelEn}</div>
                            {option.labelTh !== option.labelEn && (
                              <div className="text-xs text-slate-500 font-semibold italic">{option.labelTh}</div>
                            )}
                          </div>
                          <div className={`h-6 w-6 rounded-full border-2 border-slate-950 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-slate-950 text-amber-300' : 'bg-white'
                          }`}>
                            {isSelected && <Check className="h-4 w-4 stroke-[4]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Interaction Row (Submit / Show Pad) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-between items-center">
                {/* Visual Sketchpad toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setScratchpadOpen(!scratchpadOpen);
                  }}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black border-4 transition-all cursor-pointer ${
                    scratchpadOpen 
                      ? 'border-slate-950 bg-amber-100 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Edit2 className="h-4 w-4" />
                  {text.scratchpad.toUpperCase()}
                </button>

                <div className="flex gap-2.5 w-full sm:w-auto">
                  {/* Hint Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setShowHint(!showHint);
                    }}
                    className={`px-5 py-3 rounded-2xl border-4 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      showHint 
                        ? 'border-slate-950 bg-amber-100 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Lightbulb className="h-4 w-4" />
                    {lang === 'en' ? 'HINT' : 'คำใบ้'}
                  </button>

                  {/* Submit Button */}
                  {!isSubmitted ? (
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border-4 border-slate-950 bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {text.submit.toUpperCase()}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound(soundEnabled);
                        if (currentIndex < activeQuestions.length - 1) {
                          setCurrentIndex(prev => prev + 1);
                        } else {
                          onBackToDashboard();
                        }
                      }}
                      className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border-4 border-slate-950 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {currentIndex < activeQuestions.length - 1 ? text.next.toUpperCase() : text.finish.toUpperCase()}
                      <ChevronRight className="h-4 w-4 stroke-[3]" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Hint Box */}
            {showHint && (
              <div className="rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 space-y-2 animate-fade-in text-slate-900 font-bold">
                <div className="flex items-center gap-1.5 font-black text-sm text-amber-950">
                  <Lightbulb className="h-4 w-4 text-amber-500 fill-amber-100" />
                  {lang === 'en' ? 'HINT GUIDE' : 'คำแนะนำเพิ่มเติม'}
                </div>
                <p className="text-sm leading-relaxed">{currentQuestion.hintEn}</p>
                {currentQuestion.hintTh !== currentQuestion.hintEn && (
                  <p className="text-xs text-slate-600 font-medium italic">{currentQuestion.hintTh}</p>
                )}
              </div>
            )}
          </div>

          {/* Submission Feedback & Detailed Steps */}
          {isSubmitted && (
            <div className={`rounded-3xl border-4 p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] animate-fade-in ${
              isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'
            }`}>
              
              {/* Correct/Incorrect Badge Header */}
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl border-2 border-slate-950 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                  isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                }`}>
                  {isCorrect ? <Check className="h-6 w-6 stroke-[3]" /> : <X className="h-6 w-6 stroke-[3]" />}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-950">
                    {isCorrect ? text.congrats.toUpperCase() : text.incorrect.toUpperCase()}
                  </h3>
                  <div className="text-xs text-slate-700 font-bold">
                    {lang === 'en' ? 'Review step-by-step math proof below' : 'ทบทวนวิธีคิดและสูตรลับทางคณิตศาสตร์ด้านล่าง'}
                  </div>
                </div>
              </div>

              {/* Step-by-Step explanation card */}
              <div className="bg-white rounded-2xl p-5 border-2 border-slate-950 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-1.5 text-sm font-black text-slate-900 uppercase">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  {text.explanation}
                </div>
                
                <div className="space-y-4 text-slate-900 leading-relaxed text-sm font-bold">
                  {/* English Explanation */}
                  <div className="space-y-1 font-mono whitespace-pre-line bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-xs sm:text-sm">
                    {currentQuestion.explanationEn}
                  </div>
                  
                  {/* Thai Explanation */}
                  <div className="space-y-1 text-xs sm:text-sm border-t-2 border-dashed border-slate-200 pt-4 text-slate-600 italic">
                    <span className="font-black text-slate-800 block mb-1 uppercase">
                      {lang === 'en' ? 'Thai version explanation:' : 'เฉลยภาษาไทย:'}
                    </span>
                    {currentQuestion.explanationTh}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Scratchpad Sketching Canvas */}
        {scratchpadOpen && (
          <div className="lg:col-span-4 bg-white rounded-3xl border-4 border-slate-950 p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] space-y-4 animate-fade-in flex flex-col justify-between self-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase">
                <Edit2 className="h-4 w-4 text-indigo-500" />
                {text.scratchpad}
              </div>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  clearCanvas();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black text-rose-900 hover:bg-rose-50 rounded-xl border-2 border-slate-950 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <Eraser className="h-3 w-3" />
                {text.clearPad}
              </button>
            </div>

            {/* Drawing Canvas Box */}
            <div className="border-2 border-slate-950 rounded-2xl overflow-hidden bg-slate-100 touch-none">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-44 cursor-crosshair block bg-slate-50"
              />
            </div>

            {/* Color selection dots */}
            <div className="flex gap-2.5 justify-center items-center pt-2">
              {['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#171717'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setBrushColor(color);
                  }}
                  className="h-6 w-6 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 active:scale-95"
                  style={{ 
                    backgroundColor: color, 
                    borderColor: brushColor === color ? '#ffffff' : 'transparent',
                    boxShadow: brushColor === color ? '0 0 0 2px #000000' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
