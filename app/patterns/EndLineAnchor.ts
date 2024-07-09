import {PatternResult} from "../Pattern";
import {Pattern} from "./Pattern";

export class EndLineAnchor extends Pattern {

    constructor() {
        super("EndLineAnchor", "$");
    }

    override resolve(pattern: string, input: string, originalLine: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern, patternName]: [string | null,string, string, string] =
            [null, input, pattern, this.name];

        resolve: {
            const subPatternFull = pattern.split(" ")[0];
            if (!subPatternFull.endsWith(this.pattern)) break resolve;

            const subPattern = subPatternFull.slice(0, subPatternFull.length - this.pattern.length);
            // console.log({subPattern, originalLine, bool: !originalLine.endsWith(subPattern)});

            if (subPattern.length === 0) break resolve;
            if (!originalLine.endsWith(subPattern)) break resolve;

            matchInput = subPattern;
            remainingInput = input.replace(subPattern, "");
            remainingPattern = pattern.replace(subPatternFull, "");
        }

        // console.log({matchInput, remainingInput, remainingPattern});
        return {matchInput, remainingInput, remainingPattern, patternName};
    }
}
