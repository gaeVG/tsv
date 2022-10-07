//import { EnumLogContainer } from '@declares/log';
// Core
import { tsv } from '@tsv';

async function interactionCreate(interaction) {
  if (!interaction.isCommand()) return;

  tsv.discord.commands.map(async (command) => {
    if (interaction.commandName === command.name) {
      switch (command.name) {
        default:
          command.callback(interaction, (log: { name: string; arguments: any[] }) => {
            if (log !== undefined) {
              // tsv.log.debug({
              //   namespace: 'Bot',
              //   container: EnumLogContainer.Event,
              //   location: 'interactionCreate()',
              //   message: tsv.locale(log.name, log.arguments),
              // });
            }
          });
      }
    }
  });
}

export { interactionCreate };
