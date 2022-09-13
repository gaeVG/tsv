class HandleReactionCollector {
  constructor(message, reactions, instances) {
    this.handleReactionCollector(message, reactions, instances);
  }

  handleReactionCollector(message) {
    const filter = (reaction) => reaction.emoji.name === '❌';
    message
      .awaitReactions({ filter }, { max: 2, time: 60000, errors: ['time'] })
      .then((collected) => console.log(`Collected ${collected.size} reactions`))
      .catch(console.error);
  }
}

module.exports = HandleReactionCollector;
