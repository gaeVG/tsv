class UpdateOneUserError extends Error {
  constructor(source: string) {
    super(`Cannot update user ${source}`);
    this.name = 'UpdateOneUserError';
  }
}

export { UpdateOneUserError };
