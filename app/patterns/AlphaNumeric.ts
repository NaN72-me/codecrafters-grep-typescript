import _ from "lodash";
import {isDigit, Pattern, PatternResult} from "../Pattern";

class Digit extends Pattern {
    constructor() {
        super("Digit", "\\d");
    }

    override resolve(pattern: string, input: string): PatternResult {
        let [matchInput, remainingInput, remainingPattern]: [string|null, string, string] = [null, input, pattern];

        resolve: {
            if (!_.startsWith(pattern, this.pattern)) break resolve;

            const firstChar = input.charAt(0);
            if (!isDigit(firstChar)) break resolve;

            matchInput = firstChar;
            remainingInput = input.slice(1);
            remainingPattern = pattern.slice(this.pattern.length);
        }

        return {matchInput, remainingInput, remainingPattern, patternName: this.name};
    }
}
