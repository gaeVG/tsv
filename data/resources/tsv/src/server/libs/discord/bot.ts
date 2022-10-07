// Dependencies
import { REST } from '@discordjs/rest';
import { Client, PartialTypes, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
// Declarations
import { EnumLogContainer } from '@declares/log';
import { LogData } from '@declares/log';
// Core libs
import { Log } from '@libs/log';
// Locale import
import _t from '@config/i18n';
// Discord configuration
import configDiscord from '@config/discord';

// Log variable
const log: LogData = {
  namespace: 'DiscordBot',
  container: EnumLogContainer.Class,
};

class DiscordTokenError extends Error {
  constructor() {
    super('Token invalide');
    this.name = 'DiscordTokenError';
  }
}

class DiscordApp {
  private token: string;
  private partials: PartialTypes[];
  private intents: number[];
  private rest: REST;

  readonly client: Client;
  readonly commands: any[];
  readonly events: any[];

  private on(event, callback) {
    this.client.on(event, () => {
      console.log('on');
      callback();
    });
  }

  constructor() {
    log.location = _t('global.location.constructor');
    try {
      if (process.env.DISCORD_TOKEN === undefined) {
        throw new DiscordTokenError();
      }
    } catch (error) {
      if (error instanceof DiscordTokenError) {
        Log.error({
          ...log,
          message: error.message,
        });
      }
    }

    this.token = process.env.DISCORD_TOKEN;
    this.partials = configDiscord.partials as PartialTypes[];
    this.intents = configDiscord.intents.reduce((intents, intent) => {
      Object.entries(Intents.FLAGS).forEach(([intentFlag, intentValue]) => {
        if (intentFlag === intent) {
          intents.push(intentValue);
        }
      });

      return intents;
    }, [] as number[]);

    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      partials: this.partials,
    });

    this.rest = new REST({ version: '9' }).setToken(this.token);
    this.commands = [];
    this.events = [];

    this.init();
  }

  async init() {
    // log.location = tsv.locale('global.location.init');
    if (!this.token) {
      // tsv.log.error({
      //   namespace: 'Bot',
      //   container: EnumLogContainer.Class,
      //   location: 'init()',
      //   message: tsv.locale('discord.bot.tokenError'),
      // });
      return;
    }

    // tsv.log.debug({
    //   ...log,
    //   message: tsv.locale('discord.bot.init'),
    // });

    this.onReady();
    const login = await this.client.login(this.token);

    if (login === process.env.BOT_TOKEN) {
      // tsv.log.debug({
      //   ...log,
      //   message: tsv.locale('discord.bot.authSucess'),
      // });
    }
  }

  onReady() {
    log.location = 'onReady()';
    this.on('ready', async () => {
      console.log('ready');
      try {
        Object.entries(this.events).map(([eventName, eventCallback]) => {
          this.on(eventName, (interaction) => eventCallback(interaction, this));
        });

        // tsv.log.debug({
        //   ...log,
        //   message: 'discord.bot.loading',
        // });
        await this.rest.put(
          Routes.applicationGuildCommands('992910227441733653', '730163243057807471'),
          { body: this.commands },
        );
        // tsv.log.debug({
        //   ...log,
        //   message: tsv.locale('discord.bot.loadComplete'),
        // });
        // tsv.log.debug({
        //   ...log,
        //   message: 'discord.bot.ready',
        // });
      } catch (error) {
        if (error.code === 50001) {
          // tsv.log.error({
          //   ...log,
          //   message: 'discord.bot.error.badConfiguration.command',
          // });
        } else {
          // tsv.log.error({
          //   ...log,
          //   message: error.message,
          // });
        }
      }
    });
  }
}

export { DiscordApp };
