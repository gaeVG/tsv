// Dependencies
import { Player } from '@native/models';
// Declarations
import {
  UserCharacter,
  IUser,
  UserIdentifier,
  UserIdentifierEnum,
  UserAlreadyExistError,
  UserNotFoundError,
  UserMissingIdentifierError,
  UserGroupEnum,
} from '@declares/user';
import { IAccount } from '@declares/account';
import { LogData, EnumLogContainer } from '@declares/log';
import { IAdaptativeCard } from '@declares/cards';
import { BucketDimension } from '@declares/bucket';
// ORM entities
import { Users as UsersEntity, UserCharacters as CharactersEntity, Accounts } from '@entities';
// User class
import { User } from '@libs/user';
// Module
import config from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${config.moduleName.charAt(0).toUpperCase() + config.moduleName.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: config.debug,
};

/**
 * Create a new player on the database
 * @param source - Player source
 * @returns {Promise<UsersEntity>} User entity
 */
async function createPlayerOnDB(source: string): Promise<UsersEntity> {
  log.location = 'createPlayerOnDB()';

  try {
    tsv.log.safemode({
      ...log,
      message: tsv.locale('module.player.createPlayerOnDB.creatingUser'),
    });

    // Get character default data
    const characterDefault = config.userCharacterDefault;

    // Create a new user entity
    const user = new UsersEntity();
    // Setting up user global data
    user.auth = getIdentifiers(source) as UserIdentifier;
    user.group = UserGroupEnum.USER;
    const character = new CharactersEntity();
    // Setting up character global data
    character.description = characterDefault.description;
    character.position = characterDefault.position;
    character.isDead = false;
    // Setting up character status
    character.status = characterDefault.status;
    // Setting up character inventories
    character.inventories = characterDefault.inventories;
    // Setting up character accounts
    character.accounts = characterDefault.accounts.map((account) => new Accounts(account));
    // Pushing character data to user
    user.characters = [character];

    // Save user on database and return it
    return tsv.orm.dataSource.manager.save(user);
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
    });
  }
}
/**
 * Get user from database
 * @param playerSource - Player source
 * @returns {Promise<[UsersEntity, boolean]>} User entity and boolean if user is new
 */
async function getUserFromDB(playerSource: string): Promise<[UsersEntity, boolean]> {
  log.location = 'getUserFromDB()';
  try {
    // Get identifiers from player identifier setting up in env file `IDENTIFIER_TYPE`
    const userIdentifier = getIdentifiers(playerSource) as UserIdentifier;
    let userFromDB = await tsv.orm.dataSource.getMongoRepository(UsersEntity).findOne({
      [`auth.${process.env.IDENTIFIER_TYPE}`]: userIdentifier[process.env.IDENTIFIER_TYPE],
    });

    if (!userFromDB) {
      // User not found, creating a new one
      tsv.log.safemode({
        ...log,
        message: tsv.locale('module.player.onPlayerJoined.newUser', {
          userName: global.GetPlayerName(playerSource),
        }),
      });

      userFromDB = await createPlayerOnDB(playerSource);
      return [userFromDB, true];
    }
    return [userFromDB, false];
  } catch (error) {
    log.location = 'getUserFromDB()';

    if (error instanceof Error) {
      tsv.log.error({
        ...log,
        message: error instanceof Error ? error.message : error,
      });
    }

    return error;
  }
}
/**
 * Function behind the event `onPlayerJoined`, triggered when a player client is connected
 * @param source - Player source
 * @returns {Promise<IUser, boolean, UserCharacter} User from DB, boolean if user is new, and user characters from DB
 */
async function onPlayerJoined(source: string): Promise<[IUser, boolean, UserCharacter[]]> {
  log.location = 'onPlayerJoined()';
  tsv.log.debug({
    ...log,
    message: tsv.locale('module.player.event.onPlayerJoined.playerJoinedSession', {
      userSource: source,
    }),
  });
  log.isChild = true;

  try {
    const userFromSource = new Player(parseInt(source));
    const [userFromDB, isNewPlayer] = await getUserFromDB(source);
    if (userFromDB instanceof Error) {
      throw userFromDB;
    }

    tsv.log.safemode({
      ...log,
      message: `Création de l'utilisateur ${userFromSource.Name} (ID: ${userFromDB.id})`,
    });

    const user = tsv.users.addOne({
      id: userFromDB.id.toString(),
      source: source,
      identifiers: userFromDB.auth,
      group: userFromDB.group,
    }) as User;

    const userCharacters = userFromDB.characters.reduce((characters, character) => {
      return [
        ...characters,
        {
          ...character,
          accounts: character.accounts.map(
            (account) =>
              ({
                id: account._id,
                from: account.from,
                amount: account.amount,
                createdAt: account.createdAt,
                updatedAt: account.updatedAt,
                state: account.state,
              } as IAccount),
          ),
        },
      ];
    }, [] as UserCharacter[]);

    return [user, isNewPlayer, userCharacters];
  } catch (error) {
    log.location = 'onPlayerJoined()';
    if (error instanceof Error) {
      if (process.env.EXECUTION_MODE !== 'production') {
        tsv.log.error({
          ...log,
          message: error instanceof Error ? error.message : error,
        });
      }
      process.env.EXECUTION_MODE !== 'safemode' &&
        global.DropPlayer(source, `Erreur: ${error.message}`);
    }
  }
}
/**
 * Function behind the event `playerConnecting`, triggered when a player is connecting on the server
 * @param source - Player source
 * @param playerName - Player name
 * @param setKickReason - Function to set kick reason
 * @param deferrals - Function to set deferrals
 */
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
/**
 * Function behind the event `playerDropped`, triggered when a player is dropped from the server
 * @param source - Player source
 */
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
/**
 * Function behind the event `CEventNetworkHostSession`, triggered when a player is connecting and is the only one on the server
 * @param source - Player source
 */
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
/**
 * Function behind the event `onPlayerSpawn`, triggered when a player is spawned
 * @param _
 * @param user
 * @returns
 */
function onPlayerSpawn(_: any, user: IUser): IUser | Error {
  try {
    tsv.buckets.addUserIntoBucket(user, { id: BucketDimension.MAIN });
    return tsv.users.updateOne({ id: user.id, isReady: true });
  } catch (error) {
    tsv.log.error({
      ...log,
      location: 'onPlayerSpawn()',
      message: error instanceof Error ? error.message : error,
      isLast: true,
    });

    if (error instanceof UserNotFoundError && process.env.EXECUTION_MODE !== 'safemode') {
      global.DropPlayer(user.source, `Error: ${error.message}`);
    }

    return error;
  }
}
/**
 * Get user identifiers from source
 * @param source - Player source
 * @returns {UserIdentifier | Error} User identifiers
 */
function getIdentifiers(source: string): UserIdentifier | Error {
  log.location = 'getIdentifiers()';
  tsv.log.safemode({
    ...log,
    message: `Recherche des identifier pour la source ${source}`,
  });
  log.isChild = true;

  const playerIdentifiers = getPlayerIdentifiers(source).reduce((identifiers, identifier) => {
    const identifierSplit = identifier.split(':')[1];

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
    } else {
      Object.values(UserIdentifierEnum).forEach((userIdentifier) => {
        if (identifier.startsWith(userIdentifier)) {
          identifiers[userIdentifier] = identifierSplit;
        }
      });
    }

    return identifiers;
  }, {} as UserIdentifier);

  Object.entries(playerIdentifiers).forEach(([key, value]) => {
    tsv.log.safemode({
      ...log,
      message: ` Identifiant ${key} enregistré : ${value}`,
    });
  });

  if (Object.entries(playerIdentifiers).length === 0) {
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
