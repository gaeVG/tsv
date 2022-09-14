import { UserCharacter } from '../../../core/declares/user';
import { IUser } from '../../../core/declares/user';
import { IBucket } from '../../../core/declares/bucket';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { Player, Fading, Model, Vector3 } from '../../../core/libs';
import moduleConfig from './config';
import { tsv } from '../../';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

/**
 * Checks if the character model exists and if it is loaded by the system
 * @param {string} hashModel The hash of the player model
 * @returns A promise from the model
 */
async function loadCharacter(hashModel: string): Promise<Model> {
  log.location = 'loadCharacter()';

  tsv.log.safemode({
    ...log,
    message: `Chargement du model ${hashModel}`,
  });
  log.isChild = true;

  const model = new Model(hashModel);
  if (!model.IsInCdImage || !model.IsValid) {
    tsv.log.warning({
      ...log,
      message: `Le model du joueur n'est pas encore chargé ou n'est pas valide...`,
      isLast: true,
    });

    return null;
  }

  if (!model.IsLoaded) {
    tsv.log.safemode({
      ...log,
      message: 'Le model du joueur est en cours de chargement...',
    });

    if (!(await model.request())) return await loadCharacter(hashModel);
    tsv.log.confirm({
      ...log,
      message: `Le model du joueur ${model.Hash} a été chargé`,
      isLast: true,
    });
  }

  return model;
}
/**
 * Setup all character features
 * @param {UserCharacter} character Character description
 * @returns A promise from the configured player
 */
async function initializeCharacter(user: IUser): Promise<Player> {
  log.location = 'initializeCharacter()';
  tsv.log.safemode({
    ...log,
    message: `Initialisation du personnage`,
  });
  log.isChild = true;

  // Loading the player model
  const playerModel = await loadCharacter(user.characterDescription.model);
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

  return player;
}
/**
 * Trigger the appearance of the character in the game instance
 * @param {IUser} user The interface representing the player
 * @param {UserCharacter} character The interface representing the user character
 */
async function spawnCharacter(user: IUser): Promise<void> {
  log.location = 'spawnCharacter()';

  const player = await initializeCharacter(user);
  if (player instanceof Error) {
    spawnCharacter(user);
  }

  tsv.log.debug({
    ...log,
    message: tsv.locale('module.character.events.spanwCharacter.initialized'),
  });

  tsv.events.trigger({
    name: 'onPlayerSpawn',
    module: 'player',
    onNet: true,
    data: [user],
    callback: (_, updatedUser: IUser | Error) => {
      if (updatedUser instanceof Error) {
        return tsv.log.error({
          ...log,
          message: updatedUser.message,
        });
      }

      tsv.nui.trigger({ name: 'setUser', module: 'app', payload: user });
      tsv.activities.addActivity(updatedUser.activities);

      // Exit the loading screen
      global.ShutdownLoadingScreen();
      global.ShutdownLoadingScreenNui();

      Fading.fadeIn(2000).then(() => {
        tsv.log.debug({
          ...log,
          message: `Chargement du personnage terminé`,
          isLast: true,
        });
      });
    },
  });
}
/**
 *
 * @param {IUser} user The interface representing the player
 * @param {boolean} isNewPlayer If the player has no characters registered in the database
 * @param {Array<UserCharacter>} characters An array of characters stored in database
 */
function selectCharacter(user: IUser, isNewPlayer: boolean, characters: UserCharacter[]) {
  try {
    if (!isNewPlayer) {
      // TODO: Créer une interface pour la sélection du personnage à jouer
      // Pour le moment, on prend le premier personnage de la liste
      const userCharacter = characters[0];

      tsv.events.trigger({
        name: 'setCharacter',
        module: 'character',
        onNet: true,
        data: [user, userCharacter],
        callback: (_, updatedUser: IUser | Error) => {
          if (updatedUser instanceof Error) {
            throw updatedUser;
          }
          spawnCharacter(updatedUser);
        },
      });
    } else {
      newCharacter(user, characters[0]);
    }
  } catch (error) {
    tsv.log.error({
      ...log,
      message: tsv.locale('module.character.setCharacter.error', {
        userId: user.id,
        errorMessage: error.message,
      }),
    });
  }
}
/**
 * Trigger the creation of a new user
 * @param {IUser} user The interface representing the player
 * @param {UserCharacter} character The description of the player character
 */
function newCharacter(user: IUser, character: UserCharacter): void {
  log.location = 'newCharacter()';

  try {
    tsv.events.trigger({
      name: 'setNewCharacterIntoBucket',
      module: 'character',
      onNet: true,
      data: [user],
      callback: (bucket: IBucket | Error) => {
        if (bucket instanceof Error) {
          throw bucket;
        }

        spawnCharacter(user);

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
      },
    });
  } catch (error) {
    tsv.log.error({
      ...log,
      message: error instanceof Error ? error.message : error,
      isLast: true,
    });
  }
}

export { spawnCharacter, newCharacter, selectCharacter };
