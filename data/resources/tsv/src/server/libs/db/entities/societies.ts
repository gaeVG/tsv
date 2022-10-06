import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { Activities } from './activities';
import { Accounts } from './accounts';

import { SocietyType } from '../../../../core/declares/society';
import { ActivityType } from '../../../../core/declares/activity';
import { PolyZoneType } from '../../../../core/declares/zone';
import { EntranceType } from '../../../../core/declares/entrance';
@Entity()
class Societies {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  owner?: string;

  @Column()
  name: string;

  @Column()
  label?: string;

  @Column()
  isCompagny: boolean;

  @Column()
  building: { zone: PolyZoneType; entrances: EntranceType[] };

  @Column(() => Activities)
  activites?: Activities[];

  @Column(() => Societies)
  societies?: Societies[];

  @Column(() => Accounts)
  account?: Accounts;

  constructor(society: SocietyType) {
    this.id = new ObjectID();
    this.owner = society.owner;
    this.name = society.name;
    this.label = society.label;
    this.isCompagny = society.isCompagny;
    this.building = society.building;
    this.activites = society.activities
      ? society.activities.reduce((activities, activity) => {
          return [
            ...activities,
            new Activities({
              name: activity.name,
              label: activity.label,
              isMain: activity.isMain,
              roles: activity.roles,
              production: activity.production,
            }),
          ];
        }, [])
      : [];
    this.societies =
      society.isCompagny && society.societies
        ? society.societies.reduce((societies, society) => {
            return [
              ...societies,
              new Societies({
                name: society.name,
                label: society.label,
                isCompagny: false,
                building: society.building,
                activities: society.activities.reduce((activities, activity) => {
                  return [
                    ...activities,
                    {
                      name: activity.name,
                      label: activity.label,
                      isMain: activity.isMain,
                      roles: activity.roles.reduce((roles, role) => {
                        return [
                          ...roles,
                          {
                            name: role.name,
                            label: role.label,
                          },
                        ];
                      }, [] as ActivityType[]),
                      production: activity.production,
                    },
                  ];
                }, []),
              }),
            ];
          }, [] as Societies[])
        : [];
  }
}
export { Societies };
