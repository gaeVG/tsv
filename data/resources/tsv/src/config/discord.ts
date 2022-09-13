const discord = {
  oAuth: false,
  scopes: ['bot', 'applications.commands'],
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  partials: ['USER'],
  commands: [
    {
      translate: {
        url: 'https://api-free.deepl.com/v2/translate',
        targetDefault: 'FR',
        sourceDefault: 'EN',
      },
    },
    {
      clean: {
        bulkDeleteDefault: 100,
      },
    },
  ],
  embed: {
    color: 'DEFAULT',
    author: {
      name: 'Loubot',
      iconURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IFa6hc44dd7XNI0An_Na8WdWJc6SxP0gwdNjXhmkk3HY0a7IVrw2pthjjSDTexpF7aQ&usqp=CAU',
      url: 'https://git.cenne.xyz/gaev/discordBot',
    },
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IFa6hc44dd7XNI0An_Na8WdWJc6SxP0gwdNjXhmkk3HY0a7IVrw2pthjjSDTexpF7aQ&usqp=CAU',
    footer: {
      text: 'Embeds.Default.Footer',
      iconURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IFa6hc44dd7XNI0An_Na8WdWJc6SxP0gwdNjXhmkk3HY0a7IVrw2pthjjSDTexpF7aQ&usqp=CAU',
    },
  },
};

export default discord;
