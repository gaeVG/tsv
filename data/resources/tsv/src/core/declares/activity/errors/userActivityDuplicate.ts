class UserActivityDuplicateError extends Error {
  constructor(userActivity: { for: string; job: string; role: string }) {
    super(`Activity ${userActivity.for} is already in activity`);
  }
}

export { UserActivityDuplicateError };
