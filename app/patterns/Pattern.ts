import {PatternResult} from "../Pattern";

export class Pattern {
    constructor(public readonly name:string, public readonly pattern: string) {}

    resolve(pattern: string, input: string, originalLine: string): PatternResult {
        return {matchInput: null, remainingInput: input, remainingPattern: pattern, patternName: this.name};
    }
}