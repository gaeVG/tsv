class DiscordTokenError extends Error {
  constructor() {
    super('Token invalide');
    this.name = 'DiscordTokenError';
  }
}

export { DiscordTokenError };
