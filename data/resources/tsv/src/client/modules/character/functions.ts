import { Character } from '../../../core/declares/user';
import { IUser } from '../../../core/declares/user';
import { IBucket } from '../../../core/declares/bucket';
import { LogData, EnumLogContainer } from '../../../core/declares/log';
import { Player, Fading, Model, Vector3 } from '../../../core/libs';
import moduleConfig from './config';
import { tsp } from '../../';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Function,
  isModuleDisplay: moduleConfig.debug,
};

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
async function initializeCharacter(character: Character): Promise<Player> {
  const playerModel = await loadCharacter(character.model);
  global.SetPlayerModel(PlayerId(), playerModel.Hash);
  const player = new Player();
  player.Character.setDefaultComponentVariation();
  // TODO: Importer le skin du joueur si il en a un
  playerModel.markAsNoLongerNeeded();
  global.RequestCollisionAtCoord(character.position.x, character.position.y, character.position.z);
  player.Ped.Position = new Vector3(
    character.position.x,
    character.position.y,
    character.position.z,
  );
  player.Ped.Heading = character.position.w;
  //NetworkResurrectLocalPlayer(-268.75, -956.4, 3.22, 180, true, true);
  player.Ped.Task.clearAllImmediately();
  player.Ped.Weapons.removeAll();
  player.PvPEnabled = true;
  global.ClearPlayerWantedLevel(player.Handle);
  player.Ped.IsPositionFrozen = false;

  return player;
}
async function spawnCharacter(user: IUser): Promise<void> {
  log.location = 'spawnCharacter()';
  await initializeCharacter(user.character);

  tsv.log.debug({
    ...log,
    message: 'Arrêt du loading screen',
  });

  global.ShutdownLoadingScreen();
  global.ShutdownLoadingScreenNui();

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

function selectCharacter(user: IUser, isNewPlayer: boolean, characters: Character[]) {
  try {
    if (!isNewPlayer) {
      // TODO: Créer une interface pour la sélection du personnage à jouer
      user.character = characters[0];
      tsv.events.trigger({
        name: 'setCharacter',
        module: 'character',
        onNet: true,
        data: [user],
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
function newCharacter(user: IUser, character: Character) {
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
        user.character = character;

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
