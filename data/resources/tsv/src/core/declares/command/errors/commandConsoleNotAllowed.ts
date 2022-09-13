class CommandConsoleNotAllowedError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} already exists`);
  }
}

export { CommandConsoleNotAllowedError };
