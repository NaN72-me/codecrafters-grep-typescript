import {PatternResult} from "../Pattern";

export class Pattern {
    constructor(public readonly name:string, public readonly pattern: string) {}

    _resolveOnce(pattern: string, input: string, originalLine: string): PatternResult {
        return {matchInput: null, remainingInput: input, remainingPattern: pattern, patternName: this.name, matchedPattern: null};
    }

    resolve(pattern: string, input: string, originalLine: string): PatternResult {
        const resolve =  this._resolveOnce(pattern, input, originalLine);

        if (!resolve.remainingPattern.startsWith("+")) return resolve;

        // console.log("once",{resolve});
        if (resolve.matchedPattern === resolve.matchInput) {
            resolve.remainingPattern = resolve.remainingPattern.slice(1);

            // console.log("nil",{resolve});
            return resolve;
        }

        // console.log("+",{resolve});
        return this.resolve(
            resolve.matchedPattern + resolve.remainingPattern,
            resolve.remainingInput,
            originalLine
        );
    }
}