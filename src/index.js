
// This is the entry point of your application. 
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.


import promptSync from "prompt-sync";
import chalk from "chalk";
import { parseCommand } from "./command-parser.js";
import { handleTraineeCommand } from "./traineeCommands.js";
import { handleCourseCommand } from "./courseCommands.js";

const prompt = promptSync();

console.log("🎓 School Manager Started");

while (true) {
  const input = prompt("> ");

  if (input === "QUIT" || input === "q") {
    console.log("Goodbye 👋");
    break;
  }

  const parsed = parseCommand(input);

  if (!parsed) {
    console.log(chalk.red("ERROR: Invalid command"));
    continue;
  }

  if (parsed.command === "TRAINEE") {
    handleTraineeCommand(parsed.subCommand, parsed.args);
  } else if (parsed.command === "COURSE") {
    handleCourseCommand(parsed.subCommand, parsed.args);
  } else {
    console.log(chalk.red("ERROR: Unknown command"));
  }
}