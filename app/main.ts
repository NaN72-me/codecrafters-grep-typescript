import * as sugar from "sugar";
import _ from "lodash";

const args = process.argv;
const pattern = args[3];

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }

  if (_.includes(pattern, "\\d"))
    return sugar.Array.some(inputLine.split(""), c=> !_.isNaN(Number.parseInt(c, 10)));

  throw new Error(`Unhandled pattern: ${pattern}`);
}

async function main(){
  const inputLine: string = await Bun.stdin.text();

  if (!matchPattern(inputLine, pattern)) {
    process.exit(1);
  }

  process.exit(0);
}

main()
    .then(r => console.log(r));
