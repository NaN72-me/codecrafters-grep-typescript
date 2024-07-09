import {PatternResult} from "../Pattern";

export class Pattern {
    constructor(public readonly name:string, public readonly pattern: string) {}

    _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        return {matchInput: null, remainingInput: input, remainingPattern: pattern, patternName: this.name, matchedPattern: null};
    }

    resolve(pattern: string, input: string, originalLine: string): PatternResult {
        return this._resolveOnce(pattern, input, originalLine);
    }
}