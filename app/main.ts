import {Patterns} from "./Pattern";
import _ from "lodash";

const args = process.argv;
const pattern = args[3];

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

function matchPatternFull(fullInput: string, pattern: string): boolean {
  const lines = fullInput.split("\n");
  return lines.filter(it=>it!=="")
      .every(line => matchPatternLine(line, pattern));
}

function matchPatternLine(line: string, pattern: string): boolean {
  let remainingInput = line.trim();
  let remainingPattern = pattern.trim();

  while (remainingPattern.length > 0) {
    if (remainingInput.length === 0) return false;

    const results = Patterns.values()
        .map(it => it.pattern(remainingPattern,remainingInput, line))
        .filter(it => !_.isNil(it.matchInput));
    // console.log("matchPatternLine", {remainingInput, remainingPattern, results});

    const result = results.find(it => it.matchInput !== null);
    if (_.isNil(result)) return false;

    remainingInput = result.remainingInput;
    remainingPattern = result.remainingPattern;
  }

  return true;
}

async function main(){
  const inputLine: string = await Bun.stdin.text();

  if (!matchPatternFull(inputLine, pattern)) {
    console.log("You have failed me!", inputLine, pattern);
    process.exit(1);
  }

  process.exit(0);
}

main()
    .then(r => console.log(r));
