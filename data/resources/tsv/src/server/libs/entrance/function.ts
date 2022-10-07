// Native wrapper
import { Prop } from '@native/models';
// Declarations
import { IUser } from '@declares/user';
// Core
import { tsv } from '@tsv';

/**
 * Triggers a client event to get the target heading
 * @param target The prop of the entrance target
 * @param user The user who requires information
 * @returns A promise of the heading of the target
 */
function getTargetHeading(target: Prop, user: IUser) {
  return tsv.events.trigger({
    name: 'getEntityHeading',
    module: 'entity',
    onNet: true,
    isCallback: true,
    target: user.source,
    data: [target],
  }) as Promise<number>;
}
/**
 * Triggers a client event to freeze the target
 * @param {Prop} target The prop of the entrance target
 * @param freeze If the target is frozen or not
 * @param user The user who triggers the freeze
 * @returns A promise of the result of the freeze target
 */
function freezeTarget(target: Prop | Prop[], freeze: boolean, user?: IUser): Promise<boolean> {
  return tsv.events.trigger({
    name: 'setEntityFreezePosition',
    module: 'entity',
    onNet: true,
    target: tsv.users.All.map((vUser) => vUser.currentZone === user.currentZone && vUser.source),
    isCallback: true,
    data: [target, freeze],
  }) as Promise<boolean>;
}

export { getTargetHeading, freezeTarget };
