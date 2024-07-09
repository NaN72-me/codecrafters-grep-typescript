import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";

export class Void extends Pattern {

    constructor() {
        super("Void", "");
    }

    override resolve(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName]: [string | null,string, string, string] =
            [input.charAt(0), input.slice(1), pattern, this.name];
        return {matchInput, remainingInput, remainingPattern, patternName};
    }
}
