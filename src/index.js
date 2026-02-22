
// This is the entry point of your application. 
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.

import promptSync from "prompt-sync";
import chalk from "chalk";
import { parseCommand } from "./command-parser.js";
import { handleTraineeCommand } from "./traineeCommands.js";
import { handleCourseCommand } from "./courseCommands.js";
import { exportHTML } from './exportHTML.js';

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

  const command = parsed.command.toUpperCase();
  const subcommand = parsed.subCommand ? parsed.subCommand.toUpperCase() : null;
  const args = parsed.args;

  if (command === "TRAINEE") {
    handleTraineeCommand(subcommand, args);
  } else if (command === "COURSE") {
    handleCourseCommand(subcommand, args);
  } else if (command === "EXPORT") {
    if (subcommand === "HTML") {
      exportHTML(args);
    } else {
      console.log(chalk.red("ERROR: Invalid subcommand"));
    }
  } else {
    console.log(chalk.red("ERROR: Unknown command"));
  }
}