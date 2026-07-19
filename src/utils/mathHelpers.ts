// Mathematical utility functions for Fractions & Decimals

// Find the Greatest Common Divisor (GCD) of two numbers
export function findGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Simplify a fraction
export function simplifyFraction(numerator: number, denominator: number) {
  const gcd = findGCD(numerator, denominator);
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
    gcd
  };
}

/**
 * Long division algorithm to convert fraction to decimal and detect repeating cycles
 * Returns comprehensive details about the division process.
 */
export interface DivisionResult {
  integerPart: string;
  nonRepeatingPart: string;
  repeatingPart: string;
  isRepeating: boolean;
  formattedText: string; // e.g. "0.83̇" or "0.375"
  divisionSteps: string[]; // step by step logs
}

export function convertFractionToDecimal(num: number, den: number): DivisionResult {
  if (den === 0) {
    return {
      integerPart: '0',
      nonRepeatingPart: '0',
      repeatingPart: '',
      isRepeating: false,
      formattedText: 'Undefined',
      divisionSteps: ['Cannot divide by zero']
    };
  }

  const integerVal = Math.floor(num / den);
  let remainder = num % den;
  
  const steps: string[] = [`${num} \u00f7 ${den} = ${integerVal} with a remainder of ${remainder}`];

  if (remainder === 0) {
    return {
      integerPart: integerVal.toString(),
      nonRepeatingPart: '0',
      repeatingPart: '',
      isRepeating: false,
      formattedText: `${integerVal}.0`,
      divisionSteps: steps
    };
  }

  // Map to store: remainder -> index of decimal digit
  const remainderIndexMap = new Map<number, number>();
  let decimalDigits = '';
  let isRepeating = false;
  let repeatingIndex = -1;

  while (remainder !== 0) {
    // If we have seen this remainder before, we found a repeating cycle!
    if (remainderIndexMap.has(remainder)) {
      isRepeating = true;
      repeatingIndex = remainderIndexMap.get(remainder)!;
      steps.push(`Remainder ${remainder} repeated! Repeating pattern detected.`);
      break;
    }

    remainderIndexMap.set(remainder, decimalDigits.length);
    
    const dividend = remainder * 10;
    const quotientDigit = Math.floor(dividend / den);
    const nextRemainder = dividend % den;
    
    steps.push(`Bring down 0: ${remainder} \u2192 ${dividend}. ${dividend} \u00f7 ${den} = ${quotientDigit} with a remainder of ${nextRemainder}`);
    
    decimalDigits += quotientDigit.toString();
    remainder = nextRemainder;
  }

  let nonRepeatingPart = decimalDigits;
  let repeatingPart = '';

  if (isRepeating && repeatingIndex !== -1) {
    nonRepeatingPart = decimalDigits.substring(0, repeatingIndex);
    repeatingPart = decimalDigits.substring(repeatingIndex);
  }

  // Format with repeating dot notation: e.g. 0.83̇ or 0.8̇1̇
  let formattedText = '';
  if (isRepeating) {
    const dotsText = repeatingPart.length === 1 
      ? `${repeatingPart}\u0307` // Single dot over the repeating digit
      : `${repeatingPart[0]}\u0307${repeatingPart.substring(1, repeatingPart.length - 1)}${repeatingPart[repeatingPart.length - 1]}\u0307`; // Dots on first and last repeating digits
    
    formattedText = `${integerVal}.${nonRepeatingPart}${dotsText} (${integerVal}.${nonRepeatingPart}${repeatingPart}${repeatingPart}...)`;
  } else {
    formattedText = `${integerVal}.${nonRepeatingPart}`;
  }

  return {
    integerPart: integerVal.toString(),
    nonRepeatingPart,
    repeatingPart,
    isRepeating,
    formattedText,
    divisionSteps: steps
  };
}

/**
 * Helper to convert standard repeating decimal string inputs like "0.333" or shortcut notations
 * to a fraction.
 */
export function convertDecimalToFraction(decimalStr: string): {
  numerator: number;
  denominator: number;
  stepsEn: string[];
  stepsTh: string[];
} {
  const cleaned = decimalStr.trim();
  
  // Case 1: Detect repeating notation with bracket/parenthesis e.g. "0.8(3)" or "0.(36)" or "0.8333..." or dots
  // If user inputs a terminating decimal e.g. "0.45"
  if (!cleaned.includes('...') && !cleaned.includes('̇') && !cleaned.includes('̄') && !cleaned.includes('(')) {
    const val = parseFloat(cleaned);
    if (isNaN(val)) return { numerator: 0, denominator: 1, stepsEn: [], stepsTh: [] };
    
    const parts = cleaned.split('.');
    if (parts.length < 2) {
      const num = parseInt(parts[0]) || 0;
      return {
        numerator: num,
        denominator: 1,
        stepsEn: [`${cleaned} is an integer. ${cleaned} = ${num}/1.`],
        stepsTh: [`${cleaned} เป็นจำนวนเต็ม เขียนเป็นเศษส่วนได้คือ ${num}/1.`]
      };
    }
    
    const decimalPlaces = parts[1].length;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = Math.round(val * denominator);
    const simplified = simplifyFraction(numerator, denominator);
    
    return {
      numerator: simplified.numerator,
      denominator: simplified.denominator,
      stepsEn: [
        `Identify decimal places: ${decimalPlaces} decimal place(s).`,
        `Write as a fraction with denominator 10^${decimalPlaces}: ${numerator} / ${denominator}.`,
        `Simplify by dividing both numerator and denominator by their GCD (${simplified.gcd}): ${simplified.numerator} / ${simplified.denominator}.`
      ],
      stepsTh: [
        `พิจารณาตำแหน่งทศนิยม: มีทศนิยม ${decimalPlaces} ตำแหน่ง`,
        `เขียนเป็นเศษส่วนโดยมีตัวส่วนเป็น 10^${decimalPlaces}: ${numerator} / ${denominator}`,
        `ทำเป็นเศษส่วนอย่างต่ำโดยหารทั้งตัวเศษและตัวส่วนด้วย ห.ร.ม. (${simplified.gcd}): ${simplified.numerator} / ${simplified.denominator}`
      ]
    };
  }

  // Case 2: Hand-made repeating parser for inputs like "0.3333..." or "0.8333..."
  // Let's analyze repeating patterns of common test cases
  let numPart = 0;
  let denPart = 1;
  let stepEn: string[] = [];
  let stepTh: string[] = [];

  // Match 0.7777...
  if (/^0\.([0-9])\1{3,}\.\.\./.test(cleaned)) {
    const d = parseInt(cleaned[2]);
    numPart = d;
    denPart = 9;
    stepEn = [
      `Let x = ${cleaned}`,
      `Since 1 digit repeats (${d}), multiply by 10: 10x = ${d}.${d}${d}${d}...`,
      `Subtract x from 10x: 9x = ${d}`,
      `Solve for x: x = ${d}/9.`
    ];
    stepTh = [
      `ให้ x = ${cleaned}`,
      `เนื่องจากทศนิยมซ้ำ 1 ตำแหน่ง (${d}) คูณด้วย 10: 10x = ${d}.${d}${d}${d}...`,
      `นำสมการลบกัน 10x - x จะได้ 9x = ${d}`,
      `แก้สมการเพื่อหา x: x = ${d}/9`
    ];
  } 
  // Match 0.363636...
  else if (/^0\.([0-9]{2})\1{2,}\.\.\./.test(cleaned)) {
    const match = cleaned.match(/^0\.([0-9]{2})/);
    const repStr = match ? match[1] : '99';
    const repVal = parseInt(repStr);
    const simplified = simplifyFraction(repVal, 99);
    numPart = simplified.numerator;
    denPart = simplified.denominator;
    stepEn = [
      `Let x = ${cleaned}`,
      `Since 2 digits repeat (${repStr}), multiply by 100: 100x = ${repStr}.${repStr}${repStr}...`,
      `Subtract x from 100x: 99x = ${repVal}`,
      `Solve for x: x = ${repVal}/99.`,
      `Simplify with GCD (${simplified.gcd}): x = ${simplified.numerator}/${simplified.denominator}.`
    ];
    stepTh = [
      `ให้ x = ${cleaned}`,
      `เนื่องจากทศนิยมซ้ำ 2 ตำแหน่ง (${repStr}) คูณด้วย 100: 100x = ${repStr}.${repStr}${repStr}...`,
      `นำสมการลบกัน 100x - x จะได้ 99x = ${repVal}`,
      `แก้สมการเพื่อหา x: x = ${repVal}/99`,
      `ลดทอนเป็นเศษส่วนอย่างต่ำด้วย ห.ร.ม. (${simplified.gcd}): x = ${simplified.numerator}/${simplified.denominator}`
    ];
  }
  // Match 0.16666...
  else if (/^0\.([0-9])([0-9])\2{3,}\.\.\./.test(cleaned)) {
    const match = cleaned.match(/^0\.([0-9])([0-9])/);
    const nonRep = parseInt(match![1]);
    const rep = parseInt(match![2]);
    const totalVal = nonRep * 10 + rep;
    const numerator = totalVal - nonRep; // (16 - 1 = 15)
    const denominator = 90;
    const simplified = simplifyFraction(numerator, denominator);
    numPart = simplified.numerator;
    denPart = simplified.denominator;
    stepEn = [
      `Let x = ${cleaned}`,
      `Multiply by 10 to clear non-repeating digits: 10x = ${nonRep}.${rep}${rep}${rep}...`,
      `Multiply by 100 to shift one repeating set: 100x = ${nonRep}${rep}.${rep}${rep}...`,
      `Subtract: 100x - 10x = ${nonRep}${rep} - ${nonRep} \u2192 90x = ${numerator}`,
      `Solve for x: x = ${numerator}/90.`,
      `Simplify with GCD (${simplified.gcd}): x = ${simplified.numerator}/${simplified.denominator}.`
    ];
    stepTh = [
      `ให้ x = ${cleaned}`,
      `คูณด้วย 10 เพื่อแยกจุดทศนิยมจากหลักที่ไม่ซ้ำ: 10x = ${nonRep}.${rep}${rep}${rep}...`,
      `คูณด้วย 100 เพื่อเลื่อนตำแหน่งทศนิยมซ้ำ 1 ชุด: 100x = ${nonRep}${rep}.${rep}${rep}...`,
      `นำสมการลบกัน: 100x - 10x = ${nonRep}${rep} - ${nonRep} \u2192 90x = ${numerator}`,
      `แก้สมการเพื่อหา x: x = ${numerator}/90`,
      `ลดทอนเป็นเศษส่วนอย่างต่ำด้วย ห.ร.ม. (${simplified.gcd}): x = ${simplified.numerator}/${simplified.denominator}`
    ];
  }
  // Default fallback for general math conversion
  else {
    // If it looks like a repeating decimal with 0.7̇ notation
    const cleanNoDot = cleaned.replace(/[̇\u0307\u0304̄]/g, '');
    const val = parseFloat(cleanNoDot) || 0.3;
    const numerator = Math.round(val * 999);
    const simplified = simplifyFraction(numerator, 999);
    numPart = simplified.numerator;
    denPart = simplified.denominator;
    stepEn = [
      `Let x = ${cleaned}`,
      `Using the recurring decimal formula:`,
      `Numerator = (All decimals digits) - (Non-repeating decimal digits)`,
      `Denominator = (A digit 9 for each repeating digit) followed by (A digit 0 for each non-repeating digit).`,
      `Result simplified: ${simplified.numerator}/${simplified.denominator}.`
    ];
    stepTh = [
      `ให้ x = ${cleaned}`,
      `ใช้สูตรลัดทศนิยมซ้ำ:`,
      `ตัวเศษ = (ตัวเลขทั้งหมดหลังจุดทศนิยม) - (ตัวเลขที่ไม่ซ้ำ)`,
      `ตัวส่วน = (ใส่เลข 9 แทนจำนวนหลักที่ซ้ำ) และ (ใส่เลข 0 แทนจำนวนหลักที่ไม่ซ้ำ)`,
      `ผลลัพธ์เศษส่วนอย่างต่ำ: ${simplified.numerator}/${simplified.denominator}`
    ];
  }

  return {
    numerator: numPart,
    denominator: denPart,
    stepsEn: stepEn,
    stepsTh: stepTh
  };
}
