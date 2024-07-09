import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";

export class SingleCharacter extends Pattern {

    constructor() {
        super("SingleCharacter", "$");
    }

    override resolve(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName]: [string|null, string,string, string] =
            [null, input, pattern, this.name];

        resolve:{
            if (pattern.length < 1) break resolve;

            const patternFirstChar = pattern.charAt(0);
            if (input.charAt(0) !== patternFirstChar) break resolve;

            matchInput = patternFirstChar;
            remainingInput = input.slice(1);
            remainingPattern = pattern.slice(1);
        }

        return {matchInput, remainingInput, remainingPattern, patternName};
    }
}
