export interface LessonTopic {
  id: string;
  titleEn: string;
  titleTh: string;
  keyPointsEn: string[];
  keyPointsTh: string[];
  contentEn: string;
  contentTh: string;
  exampleEn: string;
  exampleTh: string;
}

export const LESSONS: LessonTopic[] = [
  {
    id: 'fraction-to-decimal',
    titleEn: 'Converting Fractions to Decimals',
    titleTh: 'การแปลงเศษส่วนเป็นทศนิยม',
    keyPointsEn: [
      'Divide the top number (numerator) by the bottom number (denominator).',
      'Terminating decimals stop (e.g., 1/4 = 0.25).',
      'Recurring (repeating) decimals repeat a digit or group of digits infinitely (e.g., 1/3 = 0.333...).',
      'Recurring decimals are marked with dots above repeating digits or a horizontal bar (e.g., 0.3̇ or 0.3̄).'
    ],
    keyPointsTh: [
      'หารตัวเลขด้านบน (ตัวเศษ) ด้วยตัวเลขด้านล่าง (ตัวส่วน)',
      'ทศนิยมรู้จบ คือทศนิยมที่หยุดนิ่งหลังหารเสร็จ (เช่น 1/4 = 0.25)',
      'ทศนิยมซ้ำ คือทศนิยมที่ตัวเลขหรือกลุ่มตัวเลขซ้ำไปเรื่อยๆ อย่างไม่สิ้นสุด (เช่น 1/3 = 0.333...)',
      'ทศนิยมซ้ำเขียนสัญลักษณ์แทนด้วย จุดจุดบนตัวเลขที่ซ้ำ หรือขีดนอนยาวเหนือหลักที่ซ้ำ (เช่น 0.3̇ หรือ 0.3̄)'
    ],
    contentEn: 'To change any fraction into a decimal, we perform division. Divide the numerator by the denominator. If the division ends with no remainder, it is a **terminating decimal**. If the remainder never becomes zero but repeats in a pattern, it is a **recurring (repeating) decimal**. \n\n*Why do some fractions terminate and others repeat?* A fully simplified fraction results in a terminating decimal if and only if the denominator has no prime factors other than 2 and 5. If it has prime factors like 3, 7, 11, etc., it will always form a repeating decimal.',
    contentTh: 'การแปลงเศษส่วนให้เป็นทศนิยมสามารถทำได้ด้วย "การหาร" โดยนำตัวเศษเป็นตัวตั้งและตัวส่วนเป็นตัวหาร หากผลหารลงตัวไม่มีเศษเหลือ จะเรียกว่า **ทศนิยมรู้จบ (Terminating Decimal)** แต่ถ้าหารแล้วตัวเลขด้านหลังวนซ้ำไปเรื่อยๆ จะเรียกว่า **ทศนิยมซ้ำ (Recurring Decimal)** \n\n*ทำไมเศษส่วนบางตัวถึงหารลงตัวและบางตัวถึงซ้ำ?* เศษส่วนอย่างต่ำจะแปลงเป็นทศนิยมรู้จบได้ก็ต่อเมื่อ "ตัวส่วน" มีตัวประกอบเฉพาะเป็นตัวเลข 2 และ/หรือ 5 เท่านั้น (เพราะเป็นส่วนหนึ่งของระบบเลขฐาน 10) หากตัวส่วนมีตัวประกอบเป็นเลขอื่น เช่น 3, 7, 11 ผลลัพธ์ที่ได้จะเป็นทศนิยมซ้ำเสมอ',
    exampleEn: '• **Convert 3/5**: 3 ÷ 5 = 0.6 (Terminating)\n• **Convert 2/3**: 2 ÷ 3 = 0.6666... = 0.6̇ (Recurring)',
    exampleTh: '• **ตัวอย่างการแปลง 3/5**: 3 ÷ 5 = 0.6 (ทศนิยมรู้จบ)\n• **ตัวอย่างการแปลง 2/3**: 2 ÷ 3 = 0.6666... = 0.6̇ (ทศนิยมซ้ำ)'
  },
  {
    id: 'decimal-to-fraction',
    titleEn: 'Converting Terminating Decimals to Fractions',
    titleTh: 'การแปลงทศนิยมรู้จบเป็นเศษส่วน',
    keyPointsEn: [
      'Write the decimal as a fraction where the denominator is a power of 10 (10, 100, 1000, etc.).',
      'The number of decimal places determines the number of zeros (e.g., 1 place = tenths, 2 places = hundredths).',
      'Simplify the resulting fraction to its lowest terms by dividing the numerator and denominator by their Greatest Common Divisor (GCD).'
    ],
    keyPointsTh: [
      'เขียนทศนิยมในรูปเศษส่วนที่มีตัวส่วนเป็นพหุคูณของ 10 (10, 100, 1000, ...)',
      'จำนวนตำแหน่งทศนิยมจะเป็นตัวบอกจำนวนเลขศูนย์ (เช่น ทศนิยม 1 ตำแหน่งส่วนเป็น 10, ทศนิยม 2 ตำแหน่งส่วนเป็น 100)',
      'ทอนเศษส่วนที่ได้ให้เป็นเศษส่วนอย่างต่ำเสมอ โดยใช้ตัวหารร่วมมาก (ห.ร.ม.) มาหารทั้งตัวเศษและตัวส่วน'
    ],
    contentEn: 'Terminating decimals are easily converted because they represent values out of tenths, hundredths, thousandths, and so on. \n- 0.x has 1 decimal place, so it is written as x/10.\n- 0.xx has 2 decimal places, so it is written as xx/100.\n- 0.xxx has 3 decimal places, so it is written as xxx/1000.\nOnce you write the fraction, always check if you can simplify it by dividing both numbers by their highest common factor.',
    contentTh: 'ทศนิยมรู้จบสามารถแปลงเป็นเศษส่วนได้ง่ายมาก เพราะตัวเลขหลังทศนิยมคือส่วนในสิบ ส่วนในร้อย หรือส่วนในพัน\n- ทศนิยม 1 ตำแหน่ง (0.x) เขียนแทนด้วย x/10\n- ทศนิยม 2 ตำแหน่ง (0.xx) เขียนแทนด้วย xx/100\n- ทศนิยม 3 ตำแหน่ง (0.xxx) เขียนแทนด้วย xxx/1000\nเมื่อเขียนอยู่ในรูปเศษส่วนแล้ว อย่าลืมตัดทอนตัวเศษและตัวส่วนให้เป็นเศษส่วนอย่างต่ำด้วยตัวหารร่วมที่มีค่ามากที่สุด',
    exampleEn: '• **Convert 0.75**: \n  0.75 has 2 decimal places → 75/100. \n  Divide both top and bottom by 25:\n  75 ÷ 25 = 3\n  100 ÷ 25 = 4\n  Answer: **3/4**',
    exampleTh: '• **ตัวอย่างการแปลง 0.75**:\n  0.75 มีทศนิยม 2 ตำแหน่ง → 75/100\n  หารด้วย 25 ทั้งตัวเศษและตัวส่วน:\n  75 ÷ 25 = 3\n  100 ÷ 25 = 4\n  คำตอบ: **3/4**'
  },
  {
    id: 'recurring-to-fraction',
    titleEn: 'Converting Recurring Decimals to Fractions',
    titleTh: 'การแปลงทศนิยมซ้ำเป็นเศษส่วน',
    keyPointsEn: [
      'Use algebra: Set the recurring decimal to equal x (Equation 1).',
      'Multiply x by a power of 10 to shift the decimal point exactly past one repeating block (Equation 2).',
      'Subtract Equation 1 from Equation 2 to completely eliminate the infinite decimal tail!',
      'Solve for x and simplify the fraction.'
    ],
    keyPointsTh: [
      'ใช้พีชคณิต: กำหนดให้ทศนิยมซ้ำมีค่าเท่ากับ x (สมการที่ 1)',
      'คูณ x ด้วยพหุคูณของ 10 เพื่อเลื่อนตำแหน่งทศนิยมไปหลังกลุ่มที่ซ้ำ 1 ชุดพอดี (สมการที่ 2)',
      'นำสมการที่ 2 ลบกับสมการที่ 1 เพื่อหักล้างทศนิยมส่วนที่ซ้ำกันอย่างไร้ขีดจำกัดออกไป!',
      'แก้สมการหาค่าของ x แล้วลดทอนเป็นเศษส่วนอย่างต่ำ'
    ],
    contentEn: 'Converting recurring decimals is a classic algebraic trick. By shifting the decimal point and subtracting the original value, the infinite repeating decimals cancel each other out, leaving you with integers!\n\n**The Shortcut Formula:**\n- **Numerator**: The entire number formed by the decimal digits minus the non-repeating digits.\n- **Denominator**: Write a digit 9 for each repeating digit, followed by a digit 0 for each non-repeating digit.\n*Example*: 0.2555... = 0.25̇\n- Numerator = 25 (all digits) - 2 (non-repeating) = 23\n- Denominator = One 9 (since 1 digit repeats) and one 0 (since 1 digit does not repeat) = 90.\n- Result = 23/90.',
    contentTh: 'การแปลงทศนิยมซ้ำเป็นเศษส่วนเป็นความรู้ทางพีชคณิตที่สวยงามมาก การเลื่อนจุดทศนิยมแล้วนำเศษทศนิยมที่ซ้ำกันมาลบกันจะช่วยกำจัดส่วนซ้ำที่ยาวไปถึงอินฟินิตี้ให้หายไปจนเหลือเพียงจำนวนเต็ม!\n\n**สูตรลัดพิจารณาเศษส่วนทศนิยมซ้ำ:**\n- **ตัวเศษ**: นำตัวเลขทั้งหมดหลังจุดทศนิยมมาตั้ง ลบด้วย ตัวเลขหลังจุดส่วนที่ไม่ซ้ำ\n- **ตัวส่วน**: แทนจำนวนหลักที่ซ้ำด้วยเลข 9 และแทนจำนวนหลักที่ไม่ซ้ำด้วยเลข 0 เสมอ\n*ตัวอย่าง*: 0.2555... = 0.25̇\n- ตัวเศษ = 25 (เลขทั้งหมดหลังจุด) - 2 (เลขที่ไม่ซ้ำ) = 23\n- ตัวส่วน = ใส่ 9 หนึ่งตัว (เพราะซ้ำ 1 หลัก) และใส่ 0 หนึ่งตัว (เพราะไม่ซ้ำ 1 หลัก) = 90\n- ผลลัพธ์ = 23/90',
    exampleEn: '• **Convert 0.5̇ (0.555...)**:\n  Let x = 0.555...\n  10x = 5.555...\n  10x - x = 5\n  9x = 5  →  x = **5/9**',
    exampleTh: '• **ตัวอย่างการแปลง 0.5̇ (0.555...)**:\n  ให้ x = 0.555...\n  10x = 5.555...\n  10x - x = 5\n  9x = 5  →  x = **5/9**'
  },
  {
    id: 'patterns',
    titleEn: 'Identifying Patterns and Sequences',
    titleTh: 'การสังเกตและหาความสัมพันธ์ในคณิตศาสตร์',
    keyPointsEn: [
      'Mathematics contains highly regular patterns. Analyzing denominators reveals the decimal structure directly.',
      'Dividing by 9, 99, 999 etc. creates immediate repeating digits equal to the numerator (e.g., 4/9 = 0.444..., 12/99 = 0.1212...).',
      'Dividing by 11 creates a pattern repeating in multiples of 9 (e.g., 1/11 = 0.0909..., 2/11 = 0.1818...).',
      'Dividing by 7 generates a famous circular cyclic repetition of 6 digits: 1, 4, 2, 8, 5, 7.'
    ],
    keyPointsTh: [
      'คณิตศาสตร์มีกฎและโครงสร้างที่สมมาตร การสังเกตตัวส่วนจะช่วยให้รู้ประเภทและลักษณะทศนิยมได้ทันที',
      'การหารด้วย 9, 99, 999 จะทำให้เกิดทศนิยมซ้ำตามตัวเลขตัวเศษทันที (เช่น 4/9 = 0.444..., 12/99 = 0.1212...)',
      'การหารด้วย 11 จะทำให้เกิดกลุ่มทศนิยมซ้ำที่เป็นพหุคูณของ 9 เสมอ (เช่น 1/11 = 0.0909..., 2/11 = 0.1818...)',
      'การหารด้วย 7 จะสร้างกลุ่มทศนิยมซ้ำที่มีชื่อเสียงมากซึ่งวนรอบเป็นวงกลม 6 ตัวเลข: 1, 4, 2, 8, 5, 7'
    ],
    contentEn: 'Recognizing patterns in decimals helps develop advanced number sense. \n- **The "Nines" rule**: Any digit divided by 9 repeats infinitely: a/9 = 0.ȧ. Two digits divided by 99 repeat: ab/99 = 0.ȧḃ.\n- **The "Elevens" rule**: ab/11 results in repeating decimals where the two repeating digits are equal to 9 × numerator. \n- **The "Sevens" rule**: Dividing by 7 cycles through 142857. Notice how 1/7 ≈ 0.142, 2/7 ≈ 0.285, 3/7 ≈ 0.428... They all contain the exact same digit circle, just starting at different entry points!',
    contentTh: 'การระบุรูปแบบความสัมพันธ์ของตัวเลขช่วยให้เด็กๆ พัฒนาทักษะและไหวพริบทางคณิตศาสตร์ในระดับสูง\n- **กฎเลข 9**: จำนวนใดๆ ที่หารด้วย 9 จะเป็นทศนิยมซ้ำตัวนั้นทันที เช่น a/9 = 0.ȧ หรือหารด้วย 99 จะซ้ำสองตัว เช่น ab/99 = 0.ȧḃ\n- **กฎเลข 11**: เศษส่วนส่วนด้วย 11 จะเป็นทศนิยมซ้ำสองตัว โดยกลุ่มตัวเลขที่ซ้ำมีค่าเท่ากับ 9 คูณกับตัวเศษ\n- **กฎเลข 7**: ตัวหาร 7 จะมีรูปแบบทศนิยมซ้ำที่เวียนวนเป็นวงกลมคือ 142857 เสมอ สังเกตว่า 1/7 ≈ 0.142, 2/7 ≈ 0.285, 3/7 ≈ 0.428... ทุกตัวมีตัวเลขชุดเดียวกัน แค่มีจุดเริ่มต้นของตัวเลขที่แตกต่างกันออกไปตามขนาดของเศษ!',
    exampleEn: '• **3/9** = 0.3333... = 1/3\n• **5/9** = 0.5555...\n• **4/11** = 9 × 4 = 36 → 0.363636... = 0.3̇6̇',
    exampleTh: '• **3/9** = 0.3333... = 1/3\n• **5/9** = 0.5555...\n• **4/11** = 9 × 4 = 36 → 0.363636... = 0.3̇6̇'
  }
];
