import _ from "lodash";
import {Digit} from "./patterns/Digit";
import {AlphaNumeric} from "./patterns/AlphaNumeric";
import {SquareBrackets} from "./patterns/SquareBrackets";
import {StartLineAnchor} from "./patterns/StartLineAnchor";
import {EndLineAnchor} from "./patterns/EndLineAnchor";
import {SingleCharacter} from "./patterns/SingleCharacter";
import {Void} from "./patterns/Void";

export interface PatternResult {
    matchInput: string | null;
    remainingInput: string;
    remainingPattern: string;
    patternName: string;
    matchedPattern: string | null;
}

export function isDigit(c: string): boolean {
    return !_.isNaN(Number.parseInt(c, 10));
}

export const Patterns = [
    new Digit(),
    new AlphaNumeric(),
    new SquareBrackets(),

    new StartLineAnchor(),
    new EndLineAnchor(),

    new SingleCharacter(),
    new Void(),
]