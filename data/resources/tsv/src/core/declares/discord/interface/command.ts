interface IDiscordCommandOption {
  name: string;
  description: string;
  type: number;
  require: boolean;
}

interface IDiscordCommand {
  name: string;
  description: string;
  options: IDiscordCommandOption[];
}

export { IDiscordCommand };
