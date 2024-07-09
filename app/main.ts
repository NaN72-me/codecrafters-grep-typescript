import * as sugar from "sugar";
import _ from "lodash";

const args = process.argv;
const pattern = args[3];

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

const CHAR_CODE_A = 65;
const CHAR_CODE_Z = 90;
const CHAR_CODE_a = 97;
const CHAR_CODE_z = 122;

function isDigit(c: string): boolean {
  return !_.isNaN(Number.parseInt(c, 10));
}

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }

  if (_.includes(pattern, "\\d"))
    return sugar.Array.some(inputLine.split(""), c=> isDigit(c));

  if (_.includes(pattern, "\\w"))
    return sugar.Array.some(inputLine.split(""), c=>
        c.charCodeAt(0) >= CHAR_CODE_A && c.charCodeAt(0) <= CHAR_CODE_Z ||
        c.charCodeAt(0) >= CHAR_CODE_a && c.charCodeAt(0) <= CHAR_CODE_z ||
        isDigit(c)
    );

  throw new Error(`Unhandled pattern: ${pattern}`);
}

async function main(){
  const inputLine: string = await Bun.stdin.text();

  if (!matchPattern(inputLine, pattern)) {
    console.log("You have failed me!", inputLine, pattern);
    process.exit(1);
  }

  process.exit(0);
}

main()
    .then(r => console.log(r));
