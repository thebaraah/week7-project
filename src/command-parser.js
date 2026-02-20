export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
  if (!userInput) {
    return null;
  }
  const trimmedInput = userInput.trim();

  if (trimmedInput === "") {
    return null;
  }

  const parts = trimmedInput.split(" ");

  const command = parts[0];
  const subCommand = parts[1];
  const args = parts.slice(2);

  return {
    command,
    subCommand,
    args
  };
}


