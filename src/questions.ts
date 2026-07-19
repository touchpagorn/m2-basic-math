import { Question, SectionInfo } from './types';

export const SECTIONS: SectionInfo[] = [
  {
    id: 'fraction-to-decimal',
    titleEn: '1. Fractions to Decimals',
    titleTh: '1. เศษส่วนเป็นทศนิยม',
    descriptionEn: 'Learn how to convert common fractions into terminating or recurring decimal numbers.',
    descriptionTh: 'เรียนรู้วิธีการแปลงเศษส่วนทั่วไปให้เป็นทศนิยมรู้จบหรือทศนิยมซ้ำ',
    color: 'from-blue-500 to-indigo-600',
    icon: 'Percent'
  },
  {
    id: 'decimal-to-fraction',
    titleEn: '2. Decimals to Fractions',
    titleTh: '2. ทศนิยมเป็นเศษส่วน',
    descriptionEn: 'Master converting terminating decimals back into simplified fractions.',
    descriptionTh: 'ฝึกฝนการแปลงทศนิยมรู้จบกลับไปเป็นเศษส่วนอย่างต่ำ',
    color: 'from-purple-500 to-pink-600',
    icon: 'ArrowLeftRight'
  },
  {
    id: 'recurring-to-fraction',
    titleEn: '3. Recurring Decimals to Fractions',
    titleTh: '3. ทศนิยมซ้ำเป็นเศษส่วน',
    descriptionEn: 'Discover the algebraic method to convert repeating/recurring decimals into fractions.',
    descriptionTh: 'ค้นพบวิธีการทางพีชคณิตในการแปลงทศนิยมซ้ำให้เป็นเศษส่วน',
    color: 'from-emerald-500 to-teal-600',
    icon: 'Repeat'
  },
  {
    id: 'patterns',
    titleEn: '4. Identifying Patterns',
    titleTh: '4. การสังเกตและหาความสัมพันธ์',
    descriptionEn: 'Recognize interesting decimal properties, sequences, and repeating pattern behaviors.',
    descriptionTh: 'ระบุคุณสมบัติที่น่าสนใจของทศนิยม ลำดับ และลักษณะของทศนิยมซ้ำ',
    color: 'from-amber-500 to-orange-600',
    icon: 'Compass'
  }
];

export const QUESTIONS: Question[] = [
  // ==================== SECTION 1: FRACTIONS TO DECIMALS ====================
  {
    id: 'f2d_1',
    section: 'fraction-to-decimal',
    questionTextEn: 'Convert the fraction 3/8 into a decimal.',
    questionTextTh: 'จงแปลงเศษส่วน 3/8 ให้เป็นทศนิยม',
    hintEn: 'Divide the numerator (3) by the denominator (8) using long division.',
    hintTh: 'หารตัวเศษ (3) ด้วยตัวส่วน (8) โดยใช้วิธีหารยาว',
    answerType: 'decimal',
    correctDecimal: '0.375',
    explanationEn: 'To convert 3/8 to a decimal, divide 3 by 8:\n3 ÷ 8 = 0.375.\nSince the division terminates (reaches a remainder of 0), this is a terminating decimal.',
    explanationTh: 'ในการแปลง 3/8 เป็นทศนิยม ให้หาร 3 ด้วย 8:\n3 ÷ 8 = 0.375\nเนื่องจากการหารนี้สิ้นสุดลง (เหลือเศษเป็น 0) จึงเรียกว่า ทศนิยมรู้จบ'
  },
  {
    id: 'f2d_2',
    section: 'fraction-to-decimal',
    questionTextEn: 'Convert the fraction 7/20 into a decimal.',
    questionTextTh: 'จงแปลงเศษส่วน 7/20 ให้เป็นทศนิยม',
    hintEn: 'Tip: You can multiply both numerator and denominator by 5 to get a denominator of 100!',
    hintTh: 'คำแนะนำ: คุณสามารถคูณทั้งตัวเศษและตัวส่วนด้วย 5 เพื่อทำให้ตัวส่วนเป็น 100 ได้!',
    answerType: 'decimal',
    correctDecimal: '0.35',
    explanationEn: 'Method 1: Long division\n7 ÷ 20 = 0.35.\n\nMethod 2: Base-10 conversion\nMultiply numerator and denominator by 5:\n(7 × 5) / (20 × 5) = 35 / 100 = 0.35.',
    explanationTh: 'วิธีที่ 1: การหารยาว\n7 ÷ 20 = 0.35\n\nวิธีที่ 2: การทำให้ส่วนเป็นพหุคูณของ 10\nคูณตัวเศษและตัวส่วนด้วย 5:\n(7 × 5) / (20 × 5) = 35 / 100 = 0.35'
  },
  {
    id: 'f2d_3',
    section: 'fraction-to-decimal',
    questionTextEn: 'Convert the fraction 5/6 into a decimal.',
    questionTextTh: 'จงแปลงเศษส่วน 5/6 ให้เป็นทศนิยม',
    hintEn: 'When you divide 5 by 6, the digit 3 repeats infinitely.',
    hintTh: 'เมื่อคุณหาร 5 ด้วย 6 ตัวเลข 3 จะเกิดการซ้ำกันไปเรื่อยๆ อย่างไม่สิ้นสุด',
    answerType: 'choice',
    options: [
      { value: '0.83', labelEn: '0.83 (terminating)', labelTh: '0.83 (ทศนิยมรู้จบ)' },
      { value: '0.8333...', labelEn: '0.8333... (written as 0.83̇ with a dot over 3)', labelTh: '0.8333... (เขียนเป็น 0.83̇ โดยใส่จุดเหนือเลข 3)' },
      { value: '0.8383...', labelEn: '0.8383... (written as 0.8̇3̇ with dots over 8 and 3)', labelTh: '0.8383... (เขียนเป็น 0.8̇3̇ โดยใส่จุดเหนือเลข 8 และ 3)' },
      { value: '0.85', labelEn: '0.85', labelTh: '0.85' }
    ],
    correctChoiceValue: '0.8333...',
    explanationEn: 'Divide 5 by 6:\n5 ÷ 6 = 0.83333...\nThe digit 3 repeats infinitely. We write this recurring decimal as 0.83̇ (with a dot above the repeating 3) or 0.83̄ (with a bar over 3).',
    explanationTh: 'หาร 5 ด้วย 6:\n5 ÷ 6 = 0.83333...\nตัวเลข 3 ซ้ำกันไปเรื่อยๆ อย่างไม่มีที่สิ้นสุด เราเขียนทศนิยมซ้ำนี้ได้เป็น 0.83̇ (มีจุดเหนือเลข 3 ที่ซ้ำ) หรือ 0.83̄ (มีขีดเหนือเลข 3)'
  },
  {
    id: 'f2d_4',
    section: 'fraction-to-decimal',
    questionTextEn: 'Convert the fraction 9/11 into a decimal.',
    questionTextTh: 'จงแปลงเศษส่วน 9/11 ให้เป็นทศนิยม',
    hintEn: 'Dividing 9 by 11 gives a repeating two-digit block.',
    hintTh: 'การหาร 9 ด้วย 11 จะได้กลุ่มตัวเลขสองหลักซ้ำกันไปเรื่อยๆ',
    answerType: 'choice',
    options: [
      { value: '0.81', labelEn: '0.81', labelTh: '0.81' },
      { value: '0.8181...', labelEn: '0.8181... (written as 0.8̇1̇ with dots over 8 and 1)', labelTh: '0.8181... (เขียนเป็น 0.8̇1̇ โดยใส่จุดเหนือเลข 8 และ 1)' },
      { value: '0.8111...', labelEn: '0.8111... (written as 0.81̇ with a dot over 1)', labelTh: '0.8111... (เขียนเป็น 0.81̇ โดยใส่จุดเหนือเลข 1)' },
      { value: '0.9090...', labelEn: '0.9090... (written as 0.9̇0̇)', labelTh: '0.9090... (เขียนเป็น 0.9̇0̇)' }
    ],
    correctChoiceValue: '0.8181...',
    explanationEn: 'Divide 9 by 11:\n9 ÷ 11 = 0.818181...\nThe sequence "81" repeats infinitely. In math notation, we place dots over the start and end of the repeating sequence, writing it as 0.8̇1̇ or 0.81̄.',
    explanationTh: 'หาร 9 ด้วย 11:\n9 ÷ 11 = 0.818181...\nกลุ่มตัวเลข "81" ซ้ำกันไปเรื่อยๆ อย่างไม่สิ้นสุด ในทางคณิตศาสตร์จะเขียนจุดไว้บนตัวเลขเริ่มต้นและตัวเลขสุดท้ายของกลุ่มที่ซ้ำ คือ 0.8̇1̇ หรือเขียนแถบขีดเป็น 0.81̄'
  },
  {
    id: 'f2d_5',
    section: 'fraction-to-decimal',
    questionTextEn: 'Convert the fraction 5/16 into a decimal.',
    questionTextTh: 'จงแปลงเศษส่วน 5/16 ให้เป็นทศนิยม',
    hintEn: 'Perform division 5 ÷ 16. It will terminate after 4 decimal places.',
    hintTh: 'ทำการหาร 5 ÷ 16 ทศนิยมจะสิ้นสุดลงหลังจากตำแหน่งที่ 4',
    answerType: 'decimal',
    correctDecimal: '0.3125',
    explanationEn: 'Divide 5 by 16 using long division:\n5 ÷ 16 = 0.3125.\nSince there is no remainder after four decimal places, this is a terminating decimal.',
    explanationTh: 'หาร 5 ด้วย 16 โดยใช้วิธีหารยาว:\n5 ÷ 16 = 0.3125\nเนื่องจากไม่มีเศษเหลือหลังจากหารไป 4 ตำแหน่ง ทศนิยมนี้จึงเป็นทศนิยมรู้จบ'
  },

  // ==================== SECTION 2: DECIMALS TO FRACTIONS ====================
  {
    id: 'd2f_1',
    section: 'decimal-to-fraction',
    questionTextEn: 'Convert the terminating decimal 0.45 into a fraction in its simplest (reduced) form.',
    questionTextTh: 'จงแปลงทศนิยม 0.45 ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: '0.45 has two decimal places, so write it as 45/100, then simplify by dividing both by 5.',
    hintTh: '0.45 มีทศนิยมสองตำแหน่ง เขียนได้เป็น 45/100 จากนั้นทำให้เป็นเศษส่วนอย่างต่ำด้วยการหารทั้งคู่ด้วย 5',
    answerType: 'fraction',
    correctFraction: { numerator: 9, denominator: 20 },
    explanationEn: '1. Write the decimal as a fraction with a power of 10 in the denominator:\n0.45 = 45 / 100.\n2. Simplify by finding the Greatest Common Divisor (GCD) of 45 and 100, which is 5:\n45 ÷ 5 = 9\n100 ÷ 5 = 20\nSo, 0.45 = 9/20.',
    explanationTh: '1. เขียนทศนิยมให้อยู่ในรูปเศษส่วนที่มีส่วนเป็นพหุคูณของ 10:\n0.45 = 45 / 100\n2. ทำเป็นเศษส่วนอย่างต่ำโดยหาตัวหารร่วมมาก (ห.ร.ม.) ของ 45 และ 100 ซึ่งคือ 5:\n45 ÷ 5 = 9\n100 ÷ 5 = 20\nดังนั้น 0.45 = 9/20'
  },
  {
    id: 'd2f_2',
    section: 'decimal-to-fraction',
    questionTextEn: 'Convert the terminating decimal 0.125 into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยม 0.125 ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: '0.125 has three decimal places, which is 125/1000. Divide both parts by 125.',
    hintTh: '0.125 มีทศนิยมสามตำแหน่ง เขียนเป็น 125/1000 จากนั้นหารด้วย 125 ทั้งเศษและส่วน',
    answerType: 'fraction',
    correctFraction: { numerator: 1, denominator: 8 },
    explanationEn: '1. Write as a fraction: 0.125 = 125 / 1000.\n2. Simplify the fraction. Both 125 and 1000 are divisible by 125:\n125 ÷ 125 = 1\n1000 ÷ 125 = 8\nSo, 0.125 = 1/8.',
    explanationTh: '1. เขียนเป็นเศษส่วน: 0.125 = 125 / 1000\n2. ทอนให้เป็นเศษส่วนอย่างต่ำ ทั้ง 125 และ 1000 สามารถหารลงตัวด้วย 125:\n125 ÷ 125 = 1\n1000 ÷ 125 = 8\nดังนั้น 0.125 = 1/8'
  },
  {
    id: 'd2f_3',
    section: 'decimal-to-fraction',
    questionTextEn: 'Convert the terminating decimal 0.84 into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยม 0.84 ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Write as 84/100. Both numbers are even, so start by dividing by 2 or 4.',
    hintTh: 'เขียนเป็น 84/100 ทั้งคู่เป็นจำนวนคู่ ลองหารด้วย 2 หรือ 4 ดูนะ',
    answerType: 'fraction',
    correctFraction: { numerator: 21, denominator: 25 },
    explanationEn: '1. Write as a fraction: 0.84 = 84 / 100.\n2. Find the GCD of 84 and 100, which is 4:\n84 ÷ 4 = 21\n100 ÷ 4 = 25\nThus, the simplest form is 21/25.',
    explanationTh: '1. เขียนเป็นเศษส่วน: 0.84 = 84 / 100\n2. หา ห.ร.ม. ของ 84 และ 100 ซึ่งคือ 4:\n84 ÷ 4 = 21\n100 ÷ 4 = 25\nดังนั้น รูปเศษส่วนอย่างต่ำคือ 21/25'
  },
  {
    id: 'd2f_4',
    section: 'decimal-to-fraction',
    questionTextEn: 'Convert 2.35 into an improper fraction in simplest form.',
    questionTextTh: 'จงแปลง 2.35 ให้เป็นเศษเกินในรูปเศษส่วนอย่างต่ำ',
    hintEn: '2.35 is equal to 235/100. Simplify it by dividing the numerator and denominator by 5.',
    hintTh: '2.35 มีค่าเท่ากับ 235/100 ทำให้อยู่ในรูปอย่างต่ำด้วยการหารตัวเศษและตัวส่วนด้วย 5',
    answerType: 'fraction',
    correctFraction: { numerator: 47, denominator: 20 },
    explanationEn: '1. Write as a fraction: 2.35 = 235 / 100.\n2. Divide both numerator and denominator by their common factor, 5:\n235 ÷ 5 = 47\n100 ÷ 5 = 20\nTherefore, 2.35 as an improper fraction is 47/20 (or as a mixed number 2 7/20).',
    explanationTh: '1. เขียนเป็นเศษส่วน: 2.35 = 235 / 100\n2. หารทั้งตัวเศษและตัวส่วนด้วยตัวประกอบร่วม ซึ่งคือ 5:\n235 ÷ 5 = 47\n100 ÷ 5 = 20\nดังนั้น 2.35 ในรูปเศษเกินคือ 47/20 (หรือคิดเป็นเศษส่วนคละได้ 2 7/20)'
  },
  {
    id: 'd2f_5',
    section: 'decimal-to-fraction',
    questionTextEn: 'Convert the decimal 0.064 into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยม 0.064 ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Three decimal places means 64/1000. Try simplifying by dividing both by 8.',
    hintTh: 'ทศนิยมสามตำแหน่งหมายถึง 64/1000 ลองลดทอนเศษส่วนโดยหารด้วย 8 ทั้งสองฝั่งดูสิ',
    answerType: 'fraction',
    correctFraction: { numerator: 8, denominator: 125 },
    explanationEn: '1. Write as a fraction: 0.064 = 64 / 1000.\n2. Simplify by dividing the numerator and denominator by their GCD, which is 8:\n64 ÷ 8 = 8\n1000 ÷ 8 = 125\nThus, 0.064 = 8/125.',
    explanationTh: '1. เขียนเป็นเศษส่วน: 0.064 = 64 / 1000\n2. ลดทอนโดยหารเศษและส่วนด้วย ห.ร.ม. ซึ่งคือ 8:\n64 ÷ 8 = 8\n1000 ÷ 8 = 125\nดังนั้น 0.064 = 8/125'
  },

  // ==================== SECTION 3: RECURRING DECIMALS TO FRACTIONS ====================
  {
    id: 'r2f_1',
    section: 'recurring-to-fraction',
    questionTextEn: 'Convert the recurring decimal 0.7777... (written as 0.7̇) into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยมซ้ำ 0.7777... (เขียนแทนด้วย 0.7̇) ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Let x = 0.777... Then 10x = 7.777... Subtract the two equations.',
    hintTh: 'สมมติให้ x = 0.777... จะได้ 10x = 7.777... นำสมการทั้งสองมาลบกัน',
    answerType: 'fraction',
    correctFraction: { numerator: 7, denominator: 9 },
    explanationEn: 'Let x = 0.7777...   (Equation 1)\nMultiply by 10:\n10x = 7.7777...   (Equation 2)\n\nSubtract Equation 1 from Equation 2:\n10x - x = (7.7777...) - (0.7777...)\n9x = 7\nx = 7/9.\n\nShortcut Rule: For a single repeating digit directly after the decimal point, the fraction is just that digit over 9.',
    explanationTh: 'ให้ x = 0.7777... (สมการที่ 1)\nคูณด้วย 10:\n10x = 7.7777... (สมการที่ 2)\n\nนำสมการที่ 2 ลบด้วยสมการที่ 1:\n10x - x = (7.7777...) - (0.7777...)\n9x = 7\nx = 7/9\n\nสูตรลัด: หากมีตัวเลขซ้ำ 1 ตำแหน่งทันหลังจุดทศนิยม เศษส่วนที่ได้คือตัวเลขซ้ำนั้นหารด้วย 9'
  },
  {
    id: 'r2f_2',
    section: 'recurring-to-fraction',
    questionTextEn: 'Convert the recurring decimal 0.363636... (written as 0.3̇6̇) into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยมซ้ำ 0.363636... (เขียนแทนด้วย 0.3̇6̇) ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Let x = 0.3636... Since there are two repeating digits, multiply by 100 to get 100x = 36.3636...',
    hintTh: 'ให้ x = 0.3636... เนื่องจากมีตัวเลขซ้ำกันสองหลัก ให้คูณด้วย 100 จะได้ 100x = 36.3636...',
    answerType: 'fraction',
    correctFraction: { numerator: 4, denominator: 11 },
    explanationEn: 'Let x = 0.363636...   (Equation 1)\nSince two digits repeat, multiply by 100:\n100x = 36.363636...   (Equation 2)\n\nSubtract Equation 1 from Equation 2:\n100x - x = 36.363636... - 0.363636...\n99x = 36\nx = 36 / 99.\n\nSimplify the fraction by dividing both numerator and denominator by 9:\n36 ÷ 9 = 4\n99 ÷ 9 = 11\nSo, x = 4/11.',
    explanationTh: 'ให้ x = 0.363636... (สมการที่ 1)\nเนื่องจากมีตัวเลขซ้ำกัน 2 หลัก คูณด้วย 100:\n100x = 36.363636... (สมการที่ 2)\n\nนำสมการที่ 2 ลบด้วยสมการที่ 1:\n100x - x = 36.363636... - 0.363636...\n99x = 36\nx = 36 / 99\n\nทอนเป็นเศษส่วนอย่างต่ำด้วยการหารเศษและส่วนด้วย 9:\n36 ÷ 9 = 4\n99 ÷ 9 = 11\nดังนั้น x = 4/11'
  },
  {
    id: 'r2f_3',
    section: 'recurring-to-fraction',
    questionTextEn: 'Convert the recurring decimal 0.16666... (written as 0.16̇) into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยมซ้ำ 0.16666... (เขียนแทนด้วย 0.16̇) ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Let x = 0.1666... Multiply by 10 to get 10x = 1.666... and by 100 to get 100x = 16.666...',
    hintTh: 'ให้ x = 0.1666... คูณด้วย 10 เพื่อเลื่อนทศนิยมซ้ำเป็น 10x = 1.666... และคูณด้วย 100 เป็น 100x = 16.666...',
    answerType: 'fraction',
    correctFraction: { numerator: 1, denominator: 6 },
    explanationEn: 'Let x = 0.16666...   (Equation 1)\nMultiply by 10 (to bring non-repeating part over):\n10x = 1.6666...   (Equation 2)\nMultiply Equation 1 by 100:\n100x = 16.6666...   (Equation 3)\n\nSubtract Equation 2 from Equation 3:\n100x - 10x = 16.6666... - 1.6666...\n90x = 15\nx = 15 / 90.\n\nSimplify by dividing by 15:\n15 ÷ 15 = 1\n90 ÷ 15 = 6\nSo, x = 1/6.\n\nShortcut: (Total digits after decimal - Non-repeating digits) / (9 for each repeating, 0 for each non-repeating) = (16 - 1) / 90 = 15/90 = 1/6.',
    explanationTh: 'ให้ x = 0.16666... (สมการที่ 1)\nคูณด้วย 10 (เพื่อเลื่อนจุดเลยตัวเลขที่ไม่ซ้ำ):\n10x = 1.6666... (สมการที่ 2)\nคูณสมการที่ 1 ด้วย 100:\n100x = 16.6666... (สมการที่ 3)\n\nนำสมการที่ 3 ลบด้วยสมการที่ 2:\n100x - 10x = 16.6666... - 1.6666...\n90x = 15\nx = 15 / 90\n\nทอนให้เป็นเศษส่วนอย่างต่ำด้วยการหารด้วย 15:\n15 ÷ 15 = 1\n90 ÷ 15 = 6\nดังนั้น x = 1/6\n\nสูตรลัดไทย: (ตัวเลขทั้งหมดหลังจุด - ตัวที่ไม่ซ้ำ) / (ตัวซ้ำแทนด้วย 9 ตัวไม่ซ้ำแทนด้วย 0) = (16 - 1) / 90 = 15 / 90 = 1/6'
  },
  {
    id: 'r2f_4',
    section: 'recurring-to-fraction',
    questionTextEn: 'Convert the recurring decimal 0.27777... (written as 0.27̇) into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยมซ้ำ 0.27777... (เขียนแทนด้วย 0.27̇) ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Use the same method as the previous question: 100x - 10x = 27.777... - 2.777...',
    hintTh: 'ใช้วิธีเดียวกับข้อที่แล้วเลย: 100x - 10x = 27.777... - 2.777...',
    answerType: 'fraction',
    correctFraction: { numerator: 5, denominator: 18 },
    explanationEn: 'Let x = 0.27777... (Equation 1)\nMultiply by 10:\n10x = 2.7777... (Equation 2)\nMultiply by 100:\n100x = 27.7777... (Equation 3)\n\nSubtract Equation 2 from Equation 3:\n100x - 10x = 27.7777... - 2.7777...\n90x = 25\nx = 25 / 90.\n\nSimplify by dividing numerator and denominator by 5:\n25 ÷ 5 = 5\n90 ÷ 5 = 18\nSo, x = 5/18.',
    explanationTh: 'ให้ x = 0.27777... (สมการที่ 1)\nคูณด้วย 10:\n10x = 2.7777... (สมการที่ 2)\nคูณด้วย 100:\n100x = 27.7777... (สมการที่ 3)\n\nนำสมการที่ 3 ลบด้วยสมการที่ 2:\n100x - 10x = 27.7777... - 2.7777...\n90x = 25\nx = 25 / 90\n\nทอนเศษส่วนอย่างต่ำโดยหารด้วย 5 ทั้งเศษและส่วน:\n25 ÷ 5 = 5\n90 ÷ 5 = 18\nดังนั้น x = 5/18'
  },
  {
    id: 'r2f_5',
    section: 'recurring-to-fraction',
    questionTextEn: 'Convert the recurring decimal 0.123123... (written as 0.1̇23̇) into a fraction in simplest form.',
    questionTextTh: 'จงแปลงทศนิยมซ้ำ 0.123123... (เขียนแทนด้วย 0.1̇23̇) ให้เป็นเศษส่วนอย่างต่ำ',
    hintEn: 'Three digits repeat (1, 2, 3), so multiply x by 1000 to get 1000x = 123.123123...',
    hintTh: 'ตัวเลขซ้ำกันสามหลัก (1, 2, 3) ให้คูณ x ด้วย 1000 จะได้ 1000x = 123.123123...',
    answerType: 'fraction',
    correctFraction: { numerator: 41, denominator: 333 },
    explanationEn: 'Let x = 0.123123123...   (Equation 1)\nSince 3 digits repeat, multiply by 1000:\n1000x = 123.123123123...   (Equation 2)\n\nSubtract Equation 1 from Equation 2:\n1000x - x = 123.123123... - 0.123123...\n999x = 123\nx = 123 / 999.\n\nSimplify by dividing both numerator and denominator by 3:\n123 ÷ 3 = 41\n999 ÷ 3 = 333\nSo, x = 41/333.',
    explanationTh: 'ให้ x = 0.123123123... (สมการที่ 1)\nเนื่องจากตัวเลขซ้ำมี 3 หลัก คูณด้วย 1000:\n1000x = 123.123123123... (สมการที่ 2)\n\nนำสมการที่ 2 ลบด้วยสมการที่ 1:\n1000x - x = 123.123123... - 0.123123...\n999x = 123\nx = 123 / 999\n\nทอนเศษส่วนอย่างต่ำด้วยการหารเศษและส่วนด้วย 3:\n123 ÷ 3 = 41\n999 ÷ 3 = 333\nดังนั้น x = 41/333'
  },

  // ==================== SECTION 4: IDENTIFYING PATTERNS ====================
  {
    id: 'pat_1',
    section: 'patterns',
    questionTextEn: 'Look at the pattern:\n• 1/3 = 0.3333...\n• 2/3 = 0.6666...\nWhat fraction value corresponds to the pattern 0.9999...?',
    questionTextTh: 'สังเกตรูปแบบต่อไปนี้:\n• 1/3 = 0.3333...\n• 2/3 = 0.6666...\nเศษส่วนค่าใดควรจะสอดคล้องกับรูปแบบทศนิยม 0.9999...?',
    hintEn: 'Add 1/3 and 2/3 together, or follow the pattern of adding 1 to the numerator.',
    hintTh: 'ลองบวก 1/3 กับ 2/3 เข้าด้วยกัน หรือทำตามลำดับโดยเพิ่มเศษทีละ 1',
    answerType: 'choice',
    options: [
      { value: '3/3', labelEn: '3/3 (which equals 1)', labelTh: '3/3 (ซึ่งมีค่าเท่ากับ 1)' },
      { value: '9/10', labelEn: '9/10 (0.9)', labelTh: '9/10 (0.9)' },
      { value: '9/99', labelEn: '9/99', labelTh: '9/99' },
      { value: '3/9', labelEn: '3/9', labelTh: '3/9' }
    ],
    correctChoiceValue: '3/3',
    explanationEn: 'Following the pattern:\n1/3 = 0.333...\n2/3 = 0.666...\n3/3 = 0.999...\nIndeed, 3/3 = 1. Mathematically, 0.9999... is exactly equal to 1. One simple proof is adding 1/3 + 2/3 = 3/3 = 1, which in decimals is 0.333... + 0.666... = 0.999...',
    explanationTh: 'ทำตามรูปแบบ:\n1/3 = 0.333...\n2/3 = 0.666...\n3/3 = 0.999...\nซึ่งจริงแล้ว 3/3 = 1 ในทางคณิตศาสตร์ 0.9999... มีค่าเท่ากับ 1 ทุกประการ พิสูจน์ง่ายๆ ได้โดยการนำ 1/3 + 2/3 = 3/3 = 1 ซึ่งเมื่อเขียนเป็นทศนิยมคือ 0.333... + 0.666... = 0.999...'
  },
  {
    id: 'pat_2',
    section: 'patterns',
    questionTextEn: 'If 1/7 = 0.1̇42857̇ (which means 0.142857142857...), which of the following is the recurring decimal representation of 3/7?',
    questionTextTh: 'ถ้า 1/7 = 0.1̇42857̇ (ซึ่งหมายถึง 0.142857142857...) ข้อใดคือรูปทศนิยมซ้ำของ 3/7?',
    hintEn: 'The repeating sequence of 1/7 (142857) shifts circularly. Estimate 3/7 ≈ 3 × 0.14 = 0.42. Which sequence starts with 4?',
    hintTh: 'กลุ่มตัวเลขซ้ำของ 1/7 (142857) จะหมุนเวียนเป็นวงกลม ลองประมาณค่า 3/7 ≈ 3 × 0.14 = 0.42 กลุ่มตัวเลขไหนที่ขึ้นต้นด้วย 4?',
    answerType: 'choice',
    options: [
      { value: '0.357142', labelEn: '0.3̇57142̇', labelTh: '0.3̇57142̇' },
      { value: '0.428571', labelEn: '0.4̇28571̇', labelTh: '0.4̇28571̇' },
      { value: '0.285714', labelEn: '0.2̇85714̇', labelTh: '0.2̇85714̇' },
      { value: '0.571428', labelEn: '0.5̇71428̇', labelTh: '0.5̇71428̇' }
    ],
    correctChoiceValue: '0.428571',
    explanationEn: 'The decimal expansions for fractions with a denominator of 7 (1/7, 2/7, 3/7, etc.) all use the cyclic sequence of digits [1, 4, 2, 8, 5, 7].\n• Since 3/7 = 3 × 1/7 ≈ 0.428571...\nWe look for the cyclic shift that starts with 4. That sequence is 428571.\nTherefore, 3/7 = 0.4̇28571̇.',
    explanationTh: 'ทศนิยมของเศษส่วนที่มีส่วนเป็น 7 (1/7, 2/7, 3/7, ...) จะมีกลุ่มตัวเลขซ้ำที่วนเป็นวงกลมเดียวกันคือ [1, 4, 2, 8, 5, 7]\n• เนื่องจาก 3/7 = 3 × 1/7 ซึ่งมีค่าประมาณ 0.428571...\nเราจึงมองหาการเรียงลำดับกลุ่มตัวเลขเดิมที่เริ่มต้นด้วยเลข 4 ซึ่งก็คือ 428571\nดังนั้น 3/7 = 0.4̇28571̇'
  },
  {
    id: 'pat_3',
    section: 'patterns',
    questionTextEn: 'Identify the next fraction in this sequence pattern:\n1/2,  2/4,  3/8,  4/16,  ...',
    questionTextTh: 'จงระบุเศษส่วนถัดไปในอนุกรมรูปแบบนี้:\n1/2,  2/4,  3/8,  4/16,  ...',
    hintEn: 'Observe the numerators (1, 2, 3, 4...) and denominators (2, 4, 8, 16...) separately.',
    hintTh: 'สังเกตตัวเศษ (1, 2, 3, 4...) และตัวส่วน (2, 4, 8, 16...) แยกกัน',
    answerType: 'fraction',
    correctFraction: { numerator: 5, denominator: 32 },
    explanationEn: '• The numerators increase by 1: 1, 2, 3, 4, so the next is 5.\n• The denominators double (multiply by 2) at each step: 2, 4, 8, 16, so the next is 16 × 2 = 32.\nTherefore, the next fraction in the pattern is 5/32.',
    explanationTh: '• ตัวเศษเพิ่มขึ้นทีละ 1: 1, 2, 3, 4 ดังนั้นตัวถัดไปคือ 5\n• ตัวส่วนเพิ่มขึ้นสองเท่า (คูณด้วย 2) ในแต่ละลำดับ: 2, 4, 8, 16 ดังนั้นตัวถัดไปคือ 16 × 2 = 32\nดังนั้น เศษส่วนถัดไปในรูปแบบนี้คือ 5/32'
  },
  {
    id: 'pat_4',
    section: 'patterns',
    questionTextEn: 'Observe the recurring decimal pattern of 11ths:\n• 1/11 = 0.0̇9̇\n• 2/11 = 0.1̇8̇\n• 3/11 = 0.2̇7̇\nFollowing this pattern, what is the recurring decimal value of 5/11?',
    questionTextTh: 'สังเกตรูปแบบทศนิยมซ้ำของส่วน 11:\n• 1/11 = 0.0̇9̇\n• 2/11 = 0.1̇8̇\n• 3/11 = 0.2̇7̇\nตามรูปแบบนี้ ทศนิยมซ้ำของ 5/11 จะมีค่าเท่าใด?',
    hintEn: 'The sum of the two repeating digits is always 9, and the digits are multiples of 9 (9 × numerator).',
    hintTh: 'ผลรวมของตัวเลขซ้ำสองหลักมีค่าเท่ากับ 9 เสมอ และเลขสองหลักนี้เป็นพหุคูณของ 9 (9 × ตัวเศษ)',
    answerType: 'choice',
    options: [
      { value: '0.36', labelEn: '0.3̇6̇', labelTh: '0.3̇6̇' },
      { value: '0.45', labelEn: '0.4̇5̇', labelTh: '0.4̇5̇' },
      { value: '0.45', labelEn: '0.45 (terminating)', labelTh: '0.45 (ทศนิยมรู้จบ)' },
      { value: '0.54', labelEn: '0.5̇4̇', labelTh: '0.5̇4̇' }
    ],
    correctChoiceValue: '0.45',
    explanationEn: 'The pattern for n/11 is a repeating decimal of two digits where the digits are equal to 9 × n.\n• For n = 1: 9 × 1 = 09 → 0.0̇9̇\n• For n = 2: 9 × 2 = 18 → 0.1̇8̇\n• For n = 3: 9 × 3 = 27 → 0.2̇7̇\n• For n = 5: 9 × 5 = 45 → 0.4̇5̇.\nThus, 5/11 = 0.4545... or 0.4̇5̇.',
    explanationTh: 'รูปแบบสำหรับ n/11 คือทศนิยมซ้ำ 2 หลัก ซึ่งตัวเลขซ้ำนั้นมีค่าเท่ากับ 9 × n\n• สำหรับ n = 1: 9 × 1 = 09 → 0.0̇9̇\n• สำหรับ n = 2: 9 × 2 = 18 → 0.1̇8̇\n• สำหรับ n = 3: 9 × 3 = 27 → 0.2̇7̇\n• สำหรับ n = 5: 9 × 5 = 45 → 0.4̇5̇\nดังนั้น 5/11 = 0.4545... หรือเขียนเป็น 0.4̇5̇'
  },
  {
    id: 'pat_5',
    section: 'patterns',
    questionTextEn: 'The fractions 1/2, 1/4, 1/5, 1/8, and 1/10 all result in terminating decimals (0.5, 0.25, 0.2, 0.125, 0.1). What common mathematical property of their denominators causes this?',
    questionTextTh: 'เศษส่วน 1/2, 1/4, 1/5, 1/8 และ 1/10 ล้วนทำให้เกิดทศนิยมรู้จบ (0.5, 0.25, 0.2, 0.125, 0.1) คุณสมบัติทางคณิตศาสตร์ร่วมใดของตัวส่วนที่ทำให้เกิดผลเช่นนี้?',
    hintEn: 'Look at the prime factorization of 2, 4, 5, 8, and 10. Do you see any numbers other than 2 and 5?',
    hintTh: 'ลองดูตัวประกอบเฉพาะของ 2, 4, 5, 8 และ 10 คุณเห็นตัวเลขอื่นนอกจาก 2 และ 5 หรือไม่?',
    answerType: 'choice',
    options: [
      { value: 'even', labelEn: 'All the denominators are even numbers.', labelTh: 'ตัวส่วนทั้งหมดเป็นเลขคู่' },
      { value: 'prime_2_5', labelEn: 'Their prime factorizations contain ONLY the prime numbers 2 and/or 5.', labelTh: 'ตัวประกอบเฉพาะของตัวส่วนมีเพียงเลข 2 และ/หรือ 5 เท่านั้น' },
      { value: 'multiples_10', labelEn: 'All the denominators are factors or multiples of 10.', labelTh: 'ตัวส่วนทั้งหมดเป็นตัวประกอบหรือพหุคูณของ 10' },
      { value: 'smaller_12', labelEn: 'The denominators are all numbers smaller than 12.', labelTh: 'ตัวส่วนทั้งหมดมีค่าน้อยกว่า 12' }
    ],
    correctChoiceValue: 'prime_2_5',
    explanationEn: 'In base-10, a fully simplified fraction a/b can be written as a terminating decimal if and only if the prime factors of the denominator b are only 2 and/or 5. This is because the prime factors of the base 10 are 2 and 5. If the denominator has other prime factors (like 3, 7, or 11), the division will never end, resulting in a repeating/recurring decimal.',
    explanationTh: 'ในระบบเลขฐาน 10 เศษส่วนอย่างต่ำ a/b จะเขียนในรูปทศนิยมรู้จบได้ก็ต่อเมื่อตัวส่วน b มีตัวประกอบเฉพาะเป็น 2 และ/หรือ 5 เท่านั้น เพราะตัวประกอบเฉพาะของฐาน 10 คือ 2 และ 5 หากตัวส่วนมีตัวประกอบเฉพาะอื่นๆ (เช่น 3, 7, หรือ 11) ผลหารจะไม่มีวันลงตัว และเกิดเป็นทศนิยมซ้ำอย่างไม่รู้จบ'
  }
];
