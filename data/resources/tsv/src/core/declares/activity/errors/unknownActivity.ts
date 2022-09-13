class UnknownActivityError extends Error {
  constructor(activity: { for: string; job: string; role: string }) {
    super(`Unknown activity ${activity.job} for ${activity.for} with role ${activity.role}`);
  }
}

export { UnknownActivityError };
