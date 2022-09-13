class CommandAlreadyExistsError extends Error {
  constructor(commandName: string) {
    super(`Command ${commandName} already exists`);
  }
}

export { CommandAlreadyExistsError };
