class CommandNotFoundError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} already exists`);
  }
}

export { CommandNotFoundError };
