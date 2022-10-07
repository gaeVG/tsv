// Native wrapper
import { Player, Fading, Model, Vector3, Wait } from '@native//';
// Declarations
import { UserCharacter } from '@declares/user';
import { IUser } from '@declares/user';
import { LogData, EnumLogContainer } from '@declares/log';
// Module
import moduleConfig from './config';
// Core
import { tsv } from '@tsv';

// Log variable
const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

/**
 * Checks if the character model exists and if it is loaded by the system
 * @param {string} hashModel The hash of the player model
 * @param {boolean} isRecursive If the function is called recursively
 * @returns A promise from the model
 */
async function loadCharacter(hashModel: string, isRecursive?: boolean): Promise<Model | Error> {
  log.location = 'loadCharacter()';

  try {
    tsv.log.safemode({
      ...log,
      message: `Chargement du model ${hashModel}`,
    });
    log.isChild = true;

    // Loading the player model
    const model = new Model(hashModel);
    if (!model.IsInCdImage || !model.IsValid) {
      tsv.log.warning({
        ...log,
        message: `Le model du joueur n'est pas encore chargé ou n'est pas valide...`,
        isLast: true,
      });

      await Wait(1000);
      return loadCharacter(hashModel, true);
    }

    if (!model.IsLoaded) {
      tsv.log.safemode({
        ...log,
        message: 'Le model du joueur est en cours de chargement...',
      });

      if (!(await model.request())) {
        if (isRecursive) {
          throw new Error(`Le model du joueur n'a pas pu être chargé...`);
        }
        return await loadCharacter(hashModel, true);
      }

      tsv.log.confirm({
        ...log,
        message: `Le model du joueur ${model.Hash} a été chargé`,
        isLast: true,
      });
    }

    return model;
  } catch (error) {
    return error;
  }
}
/**
 * Setup all character features
 * @param {UserCharacter} character Character description
 * @returns A promise from the configured player
 */
async function initializeCharacter(user: IUser): Promise<Player> {
  log.location = 'initializeCharacter()';

  try {
    tsv.log.safemode({
      ...log,
      message: `Initialisation du personnage`,
    });
    log.isChild = true;

    // Loading the player model
    const playerModel = await loadCharacter(user.characterDescription.model);
    if (playerModel instanceof Error) {
      throw playerModel;
    }

    global.SetPlayerModel(PlayerId(), playerModel.Hash);

    // Treatment of the player model, applications of the variations
    const player = new Player();
    player.Ped.setDefaultComponentVariation();
    // TODO: Importer le skin du joueur si il en a un
    playerModel.markAsNoLongerNeeded();

    // Setup the player position and rotation
    global.RequestCollisionAtCoord(user.position.x, user.position.y, user.position.z);
    player.Ped.Position = new Vector3(user.position.x, user.position.y, user.position.z);
    player.Ped.Heading = user.position.w;
    //NetworkResurrectLocalPlayer(-268.75, -956.4, 3.22, 180, true, true);
    player.Ped.Task.clearAllImmediately();
    player.Ped.Weapons.removeAll();
    player.PvPEnabled = true;
    global.ClearPlayerWantedLevel(player.Handle);
    global.SetMaxWantedLevel(1);
    player.Ped.IsPositionFrozen = false;

    tsv.log.debug({
      ...log,
      message: tsv.locale('module.character.events.spanwCharacter.initialized'),
    });

    return player;
  } catch (error) {
    return error;
  }
}
/**
 * Trigger the appearance of the character in the game instance
 * @param {IUser} user The interface representing the player
 * @param {UserCharacter} character The interface representing the user character
 */
async function spawnCharacter(user: IUser, isRecursive?: boolean): Promise<Error> {
  log.location = 'spawnCharacter()';

  try {
    const player = await initializeCharacter(user);
    if (player instanceof Error) {
      throw player;
    }

    const updatedUser = await (tsv.events.trigger({
      name: 'onPlayerSpawn',
      module: 'player',
      onNet: true,
      isCallback: true,
      data: [user],
    }) as Promise<IUser | Error>);

    if (updatedUser instanceof Error) {
      throw updatedUser;
    }

    tsv.nui.trigger({ name: 'setUser', module: 'app', payload: user });
    tsv.activities.addActivity(updatedUser.activities);

    // Exit the loading screen
    global.ShutdownLoadingScreen();
    global.ShutdownLoadingScreenNui();

    await Fading.fadeIn(2000);
    tsv.log.debug({
      ...log,
      message: `Chargement du personnage terminé`,
      isLast: true,
    });
  } catch (error) {
    if (!isRecursive) {
      return await spawnCharacter(user, true);
    }

    return error;
  }
}
/**
 * Trigger the NUI to display the character selection / creation screen
 * @param {IUser} user The interface representing the player
 * @param {boolean} isNewPlayer If the player has no characters registered in the database
 * @param {Array<UserCharacter>} characters An array of characters stored in database
 * @returns {Promise<Error>} A error promise if an error occurs
 */
async function selectCharacter(
  user: IUser,
  isNewPlayer: boolean,
  characters: UserCharacter[],
): Promise<UserCharacter | Error> {
  let userCharacter: UserCharacter;

  try {
    if (!isNewPlayer) {
      // TODO: Créer une interface pour la sélection du personnage à jouer
      // Pour le moment, on prend le premier personnage de la liste
      userCharacter = characters[0];
    } else {
      userCharacter = createCharacter(user, characters[0]);
    }

    return userCharacter;
  } catch (error) {
    return error;
  }
}
/**
 * Trigger the creation of a new user
 * @param {IUser} user The interface representing the player
 * @param {UserCharacter} character The description of the player character
 */
function createCharacter(user: IUser, character: UserCharacter): UserCharacter {
  log.location = 'newCharacter()';

  try {
    tsv.threads.createThread({
      name: 'new-character',
      timer: 1000,
      callback: () => {
        tsv.log.warning({
          ...log,
          message: `La caméra doit être bloquée...`,
        });

        return true;
      },
    });

    return character;
  } catch (error) {
    return error;
  }
}

export { spawnCharacter, selectCharacter };
