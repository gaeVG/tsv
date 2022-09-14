import {
  Character,
  IUser,
  UserIdentifier,
  UserIdentifierEnum,
  UserAlreadyExistError,
  UserNotFoundError,
  UserMissingIdentifierError,
  UserGroupEnum,
} from '../../../core/declares/user';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { IAdaptativeCard } from '../../../core/declares/cards';
import { Users as UsersEntity, UserCharacters as CharactersEntity } from '../../libs/db/entities';
import { Player } from '../../../core/libs';
import moduleConfig from './config';
import { tsv } from '../../../server';
import { User } from '../../../core/libs/user';
import { BucketDimension } from '../../../core/declares/bucket';
import { StatusManager } from '../../../core/libs/status';
import { InventoryManager } from '../../../core/libs/inventory';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

async function createPlayerOnDB(source: string): Promise<UsersEntity> {
  log.location = 'createPlayerOnDB()';

  try {
    tsv.log.safemode({
      ...log,
      message: tsv.locale('module.player.createPlayerOnDB.creatingUser'),
    });
    const characterDefault = moduleConfig.userCharacterDefault;
    const user = new UsersEntity();
    user.auth = getIdentifiers(source) as UserIdentifier;
    user.group = UserGroupEnum.USER;
    const character = new CharactersEntity();
    character.position = characterDefault.position;
    character.status = characterDefault.status;
    character.inventories = characterDefault.inventories;
    character.model = characterDefault.model;
    character.isDead = false;
    user.characters = [character];

    return tsv.orm.dataSource.manager.save(user);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
async function onPlayerJoined(source: string): Promise<void> {
  log.location = 'onPlayerJoined()';
  const userFromSource = new Player(parseInt(source));
  let user: User;
  let isNewPlayer = false;

  tsv.log.debug({
    ...log,
    message: tsv.locale('module.player.event.onPlayerJoined.playerJoinedSession', {
      userSource: source,
    }),
  });
  log.isChild = true;

  try {
    let userFromDB = await tsv.orm.dataSource.getMongoRepository(UsersEntity).findOneBy({
      [`auth.${process.env.IDENTIFIER_TYPE}`]: (getIdentifiers(source) as UserIdentifier)[
        process.env.IDENTIFIER_TYPE
      ],
    });

    if (!userFromDB) {
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.player.onPlayerJoined.newUser', {
          userName: userFromSource.Name,
        }),
      });

      userFromDB = await createPlayerOnDB(source);
      isNewPlayer = true;
    }

    tsv.log.safemode({
      ...log,
      message: `Création de l'utilisateur ${userFromSource.Name} (ID: ${userFromDB.id})`,
    });

    user = tsv.users.addOne({
      id: userFromDB.id.toString(),
      source: source,
      identifiers: userFromDB.auth,
      group: userFromDB.group,
    }) as User;

    tsv.events.trigger({
      name: 'playerConnecting',
      module: 'player',
      onNet: true,
      target: user.source,
      data: [
        user as IUser,
        isNewPlayer,
        userFromDB.characters.length > 0
          ? userFromDB.characters.reduce((characters, character) => {
              characters.push({
                description: character.description,
                model: character.model,
                position: character.position,
                status: character.status,
                inventories: character.inventories,
                skin: character.skin,
                activities: character.activities,
              } as Character);

              return characters;
            }, [] as Character[])
          : [],
      ],
    });
  } catch (error) {
    if (error instanceof Error) {
      if (process.env.EXECUTION_MODE !== 'production') {
        tsv.log.error({
          ...log,
          message: error instanceof Error ? error.message : error,
        });
      }

      if (process.env.EXECUTION_MODE !== 'safemode') global.DropPlayer(source, error.message);

      return;
    }
  }
}
async function playerConnecting(
  source: string,
  playerName: string,
  setKickReason: (reason: string) => void,
  deferrals: {
    defer: () => void;
    handover: (args: unknown) => void;
    done: (failureReason?: string) => void;
    presentCard: (
      card: IAdaptativeCard | string,
      cb: (data: unknown, rawData: string) => void,
    ) => void;
    update: (message: string) => void;
  },
) {
  //deferrals.defer();
  // TODO: Make adaptative card for user connection
  // const passwordCard: IAdaptativeCard = {
  //   type: 'AdaptiveCard',
  //   minHeight: '100px',
  //   body: [
  //     {
  //       type: 'Container',
  //       items: [
  //         {
  //           type: 'TextBlock',
  //           horizontalAlignment: 'Left',
  //           text: 'Password',
  //         },
  //         {
  //           type: 'Input.Text',
  //           id: 'password',
  //           ['placeholder']: 'Enter Password',
  //         },
  //         {
  //           type: 'Container',
  //           isVisible: false,
  //           items: [
  //             {
  //               type: 'TextBlock',
  //               weight: 'Bolder',
  //               color: 'Attention',
  //               text: 'Error: Invalid password entered!',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'Action.Submit',
  //       title: 'Enter',
  //     },
  //   ],
  //   $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  //   version: '1.2',
  // };
  tsv.log.debug({
    ...log,
    location: 'onPlayerConnecting()',
    message: `Déclenchement de l'évènement`,
  });

  // const channel = tsv.discord.client.channels.cache.get(
  //   '746378498729574520',
  // ) as TextBasedChannel;
  // channel.send(`Le joueur ${user.Name} est incroyablement connecté!`);

  try {
    const player = new Player(parseInt(source));
    const identifiers = (getIdentifiers(source) as UserIdentifier) || null;

    if (identifiers === null) {
      throw new UserMissingIdentifierError(player);
    }

    const user = tsv.users.getOneByIdentifier(UserIdentifierEnum.FIVEM, identifiers.fivem);

    if (user !== undefined) {
      throw new UserAlreadyExistError(player);
    }

    // deferrals.presentCard(passwordCard, () => {
    //   setTimeout(() => {
    //     console.log('là');
    tsv.log.debug({
      ...log,
      location: 'onPlayerConnecting()',
      message: `Player ${playerName} connected`,
    });
    deferrals.handover({
      id: '',
      source: source,
      Name: playerName,
    } as IUser);
    deferrals.done();
    //   }, 10);
    // });
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof UserMissingIdentifierError || error instanceof UserAlreadyExistError) {
        tsv.log.error({
          ...log,
          message: error.message,
        });
        setKickReason(error.message);
      }
    }
    tsv.log.error({ ...log, location: 'onPlayerConnecting()', message: error.message });
    deferrals.done(error.message);
  }
}
async function playerDropped(source: string): Promise<void> {
  log.location = 'playerDropped()';
  tsv.log.debug({
    ...log,
    message: `User ${source} disconnected`,
  });
  log.isChild = true;

  try {
    const user = tsv.users.getOneBySource(source) as IUser;
    tsv.users.removeOne(user);
    tsv.buckets.dropUserFromBucket(user);

    tsv.log.debug({
      ...log,
      message: `User ${user.Name} removed`,
      isLast: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        location: 'playerDropped()',
        message: error instanceof Error ? error.message : error,
        isLast: true,
      });
    }
  }
}
async function playerHosting(source: string): Promise<void> {
  log.location = 'playerHosting()';
  let user: IUser;
  try {
    while (user !== undefined) {
      user = tsv.users.getOneBySource(source) as IUser;
      if (user == undefined) {
        continue;
      }

      tsv.buckets.addUserIntoBucket(user, {
        id: BucketDimension.MAIN,
        host: parseInt(source),
      });

      tsv.events.trigger({ name: 'init-status', module: 'status' });
      tsv.events.trigger({ name: 'init-zones', module: 'zones' });
    }
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}

function onPlayerSpawn(_: any, user: IUser): IUser | Error {
  try {
    tsv.buckets.addUserIntoBucket(user, { id: BucketDimension.MAIN });
    return tsv.users.updateOne({
      ...user,
      isReady: true,
    });
  } catch (error) {
    tsv.log.error({
      ...log,
      location: 'onPlayerSpawn()',
      message: error instanceof Error ? error.message : error,
      isLast: true,
    });

    if (error instanceof UserNotFoundError && process.env.EXECUTION_MODE !== 'safemode') {
      global.DropPlayer(user.source, error.message);
    }

    return error;
  }
}
function getIdentifiers(source: string): UserIdentifier | Error {
  log.location = 'getIdentifiers()';
  tsv.log.safemode({
    ...log,
    message: `Recherche des identifier pour la source ${source}`,
  });
  log.isChild = true;

  const playerIdentifiers = getPlayerIdentifiers(source).reduce((identifiers, identifier) => {
    const identifierSplit: string = identifier.split(':')[1];
    if (
      identifier.startsWith(UserIdentifierEnum.FIVEM) &&
      identifierSplit !== 'licence2' &&
      process.env.IDENTIFIER_TYPE === 'fivem'
    ) {
      identifiers.fivem = identifierSplit;
    } else if (
      identifier.startsWith(UserIdentifierEnum.STEAM) &&
      process.env.IDENTIFIER_TYPE === 'steam'
    ) {
      identifiers.steam = identifierSplit;
    } else if (identifier.startsWith(UserIdentifierEnum.DISCORD)) {
      identifiers.discord = identifierSplit;
    }

    return identifiers;
  }, {} as UserIdentifier);

  Object.entries(playerIdentifiers).forEach(([key, value]) => {
    tsv.log.safemode({
      ...log,
      message: ` Identifiant ${key} enregistré : ${value}`,
    });
  });

  if (Object.entries.length === 0) {
    return new UserMissingIdentifierError(new Player(parseInt(source)));
  } else {
    return playerIdentifiers;
  }
}

export {
  createPlayerOnDB,
  onPlayerJoined,
  playerConnecting,
  playerDropped,
  playerHosting,
  getIdentifiers,
  onPlayerSpawn,
};
