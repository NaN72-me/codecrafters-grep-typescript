import {isDigit, Pattern, PatternResult} from "../Pattern";

const CHAR_CODE_A = 65 as const;
const CHAR_CODE_Z = 90 as const;
const CHAR_CODE_a = 97 as const;
const CHAR_CODE_z = 122 as const;

export class AlphaNumeric extends Pattern {

    constructor() {
        super("AlphaNumeric", "\\w");
    }

    override resolve(pattern: string, input: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName]: [string | null, string, string, string] =
            [null, input, pattern, this.name];

        resolve: {
            if (!pattern.startsWith(this.pattern)) break resolve;

            const firstChar = input.charAt(0);
            const firstCharCode = firstChar.charCodeAt(0);
            if (!(firstCharCode >= CHAR_CODE_A && firstCharCode <= CHAR_CODE_Z ||
                firstCharCode >= CHAR_CODE_a && firstCharCode <= CHAR_CODE_z ||
                isDigit(firstChar)
            )) break resolve;

            matchInput = firstChar;
            remainingInput = input.slice(1);
            remainingPattern = pattern.slice(this.pattern.length);
        }

        return {matchInput, remainingInput, remainingPattern, patternName};
    }
}
