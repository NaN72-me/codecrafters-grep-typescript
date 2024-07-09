import _ from "lodash";

interface PatternResult {
    matchInput: string | null;
    remainingInput: string;
    remainingPattern: string;
    patternName: string;
}

class Pattern {
    constructor(
        public readonly pattern: (arg0: string, arg1: string, arg2: string) => PatternResult
    ) {
        this.pattern = pattern;
    }
}

function isDigit(c: string): boolean {
    return !_.isNaN(Number.parseInt(c, 10));
}

export const Patterns = {
    Digit: new Pattern((pattern,input) => {
        const patternName = "Digit" as const;
        let [matchInput, remainingInput, remainingPattern]: [string|null, string, string] = [null, input, pattern];

        const PATTERN = "\\d" as const;
        if (!_.startsWith(pattern, PATTERN)) return {matchInput, remainingInput, remainingPattern, patternName};

        const firstChar = input.charAt(0);
        if (!isDigit(firstChar)) return {matchInput, remainingInput, remainingPattern, patternName};

        matchInput = firstChar;
        remainingInput = input.slice(1);
        remainingPattern = pattern.slice(PATTERN.length);

        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    Alphanumeric: new Pattern((pattern,input) => {
        const patternName = "Alphanumeric" as const;
        let [matchInput, remainingInput, remainingPattern]: [string|null, string, string] = [null, input, pattern];

        const PATTERN = "\\w" as const;
        if (!pattern.startsWith(PATTERN)) return {matchInput, remainingInput, remainingPattern, patternName};

        const CHAR_CODE_A = 65 as const;
        const CHAR_CODE_Z = 90 as const;
        const CHAR_CODE_a = 97 as const;
        const CHAR_CODE_z = 122 as const;

        const firstChar = input.charAt(0);
        const firstCharCode = firstChar.charCodeAt(0);
        if (!(firstCharCode >= CHAR_CODE_A && firstCharCode<= CHAR_CODE_Z ||
            firstCharCode >= CHAR_CODE_a && firstCharCode <= CHAR_CODE_z ||
            isDigit(firstChar)
        )) return {matchInput, remainingInput, remainingPattern, patternName};

        matchInput = firstChar;
        remainingInput = input.slice(1);
        remainingPattern = pattern.slice(PATTERN.length);

        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    SquareBrackets: new Pattern((pattern,input) => {
        const patternName = "SquareBrackets" as const;
        let [matchInput, remainingInput, remainingPattern]: [string|null, string, string] = [null, input, pattern];

        const start = pattern.indexOf("[");
        const end = pattern.indexOf("]");

        if (start !== 0) return {matchInput, remainingInput, remainingPattern, patternName};
        if (end === -1) return {matchInput, remainingInput, remainingPattern, patternName};

        const subPattern = pattern.substring(start + 1, end);
        remainingInput = input.slice(end + 1);
        remainingPattern = pattern.slice(end + 1);

        const isNegation = subPattern.startsWith("^");
        const subPatternChars = subPattern.split("");

        if (!isNegation) {
            matchInput = subPatternChars.find(c => input.includes(c)) ?? null;
            return {matchInput, remainingInput, remainingPattern, patternName};
        }

        matchInput = input.split("").find(c => !subPatternChars.includes(c)) ?? null;
        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    StartLineAnchor: new Pattern((pattern, input, originalLine) => {
        const patternName = "StartLineAnchor" as const;
        let [matchInput, remainingInput, remainingPattern]: [string | null, string, string] = [null, input, pattern];

        const PATTERN = "^" as const;
        if (!pattern.startsWith(PATTERN)) return {matchInput, remainingInput, remainingPattern, patternName};

        const subPattern = pattern.split(" ")[0].slice(PATTERN.length);
        // console.log({subPattern, originalLine});
        if (!originalLine.startsWith(subPattern)) return {matchInput, remainingInput, remainingPattern, patternName};

        matchInput = subPattern;
        remainingInput = input.slice(matchInput.length + PATTERN.length);
        remainingPattern = pattern.slice(PATTERN.length + matchInput.length);

        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    EndLineAnchor: new Pattern((pattern, input, originalLine) => {
        const patternName = "EndLineAnchor" as const;
        let [matchInput, remainingInput, remainingPattern]: [string | null, string, string] = [null, input, pattern];

        const PATTERN = "$" as const;
        const subPatternFull = pattern.split(" ")[0];
        if (!subPatternFull.endsWith(PATTERN)) return {matchInput, remainingInput, remainingPattern, patternName};

        const subPattern = subPatternFull.slice(0, subPatternFull.length - PATTERN.length);
        // console.log({subPattern, originalLine, bool: !originalLine.endsWith(subPattern)});
        if (subPattern.length === 0) return {matchInput, remainingInput, remainingPattern, patternName};
        if (!originalLine.endsWith(subPattern)) return {matchInput, remainingInput, remainingPattern, patternName};

        matchInput = subPattern;
        remainingInput = input.replace(subPattern, "");
        remainingPattern = pattern.replace(subPatternFull, "");

        // console.log({matchInput, remainingInput, remainingPattern});
        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    SingleCharacter: new Pattern((pattern,input) => {
        const patternName = "SingleCharacter" as const;
        let [matchInput, remainingInput, remainingPattern]: [string|null, string, string] = [null, input, pattern];
        if (pattern.length < 1) return {matchInput, remainingInput, remainingPattern, patternName};

        const patternFirstChar = pattern.charAt(0);
        if (input.charAt(0) !== patternFirstChar) return {matchInput, remainingInput, remainingPattern, patternName};

        matchInput = patternFirstChar;
        remainingInput = input.slice(1);
        remainingPattern = pattern.slice(1);

        return {matchInput, remainingInput, remainingPattern, patternName};
    }),
    Void: new Pattern((pattern,input) => {
        const patternName = "Void" as const;
        let [matchInput, remainingInput, remainingPattern]: [string | null, string, string] = [input.charAt(0), input.slice(1), pattern];
        return {matchInput, remainingInput, remainingPattern, patternName};
    }),

    values: function(): Pattern[] {
        // @ts-ignore
        return Object.values(Patterns)
            .filter(it => it instanceof Pattern);
    },
}