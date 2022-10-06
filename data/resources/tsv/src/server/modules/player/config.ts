import { Vector4 } from '../../../core/libs';
import { SkinCharacter, UserCharacter } from '../../../core/declares/user';
import { InventoryContainerEnum } from '../../../core/declares/inventory';
import { StatusEnum } from '../../../core/declares/status';

export default {
  name: 'player',
  debug: process.env.DEBUG_MODULES.split(', ').includes('player'),
  userCharacterDefault: {
    description: {
      firstname: undefined,
      lastname: undefined,
      age: 0,
      sex: 'M',
      model: 'mp_m_freemode_01',
    },
    isDead: false,
    skin: {} as SkinCharacter,
    inventories: [
      {
        container: InventoryContainerEnum.POCKET,
        items: [
          {
            name: 'bread',
            count: 2,
          },
          {
            name: 'water',
            count: 2,
          },
        ],
      },
    ],
    accounts: [
      {
        name: 'mzb',
        amount: 1500,
      },
    ],
    status: [
      {
        name: StatusEnum.HEALTH,
        value: 200,
      },
      {
        name: StatusEnum.HUNGER,
        value: 100000,
      },
      {
        name: StatusEnum.THRIST,
        value: 100000,
      },
    ],
    position: new Vector4(268.75, -956.4, 31.22, 180),
  } as UserCharacter,
};
