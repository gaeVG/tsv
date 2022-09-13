import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { IEventListener, ClientEventNativeEnum } from '../../../core/declares/events';
import { Wait } from '../../../core/libs';
import moduleConfig from './config';
import { tsp } from '../../index';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Event,
  isModuleDisplay: moduleConfig.debug,
};

const hudEvents: IEventListener[] = [
  {
    name: 'setRadarCircular',
    module: 'hud',
    handler: () => {
      log.location = 'setRadarCircular()';

      tsv.threads.createThread({
        name: 'setRadarCircular',
        timer: 8,
        callback: () => {
          log.location = 'requestTexture()';

          if (!HasStreamedTextureDictLoaded('circlemap')) {
            tsv.log.warning({
              ...log,
              message: `La texture circlemap n'est pas chargée`,
            });
            Wait(500).then(() => {
              tsv.log.safemode({
                ...log,
                message: `Tentative de rechargement de la texture circlemap`,
              });
              RequestStreamedTextureDict('circlemap', false);
            });

            return true;
          }

          SetMinimapClipType(1);
          AddReplaceTexture(
            'platform:/textures/graphics',
            'radarmasksm',
            'circlemap',
            'radarmasksm',
          );
          AddReplaceTexture(
            'platform:/textures/graphics',
            'radarmask1g',
            'circlemap',
            'radarmasksm',
          );
          // SetMinimapComponentPosition(
          //   'minimap',
          //   'L',
          //   'B',
          //   -0.01 + minimapOffset,
          //   -0.03,
          //   0.18,
          //   0.258,
          // );
          // SetMinimapComponentPosition(
          //   'minimap_mask',
          //   'L',
          //   'B',
          //   0.2 + minimapOffset,
          //   0.0,
          //   0.065,
          //   0.2,
          // );
          // SetMinimapComponentPosition(
          //   'minimap_blur',
          //   'L',
          //   'B',
          //   -0.0 + minimapOffset,
          //   0.015,
          //   0.252,
          //   0.338,
          // );
          //SetBlipAlpha(GetNorthRadarBlip(), 0);
          SetMinimapClipType(1);
          SetRadarBigmapEnabled(true, false);
          setTimeout(() => SetRadarBigmapEnabled(false, false), 8);

          return false;
        },
      });
    },
  },
  {
    // Listen game native events
    name: ClientEventNativeEnum.onResourceStop,
    module: moduleConfig.name,
    handler: (): void => {
      global.SetNuiFocus(false, false);
    },
  },
];

export { hudEvents };
