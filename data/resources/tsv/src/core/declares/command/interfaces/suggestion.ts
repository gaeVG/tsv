interface ICommandSuggestion {
  type?: Array<{ type: string }>;
  help?: string;
  validate: boolean;
}

export { ICommandSuggestion };
