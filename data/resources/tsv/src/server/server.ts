import { EnumLogContainer, LogData } from '../core/declares/log';
import { UserManager } from '../core/libs/user';
import { SocietiesManager } from '../core/libs/society';
import { EntranceManager } from './libs/entrance';
import { DBManager } from './libs/db';
import { BucketManager } from './libs/bucket';
import { DiscordApp } from './libs/discord';
import { ZoneManager } from './libs/zone';
import { Core } from '../core';

const log: LogData = {
  namespace: 'Server',
  container: EnumLogContainer.Class,
};

class Server extends Core {
  orm: DBManager;
  users: UserManager;
  buckets: BucketManager;
  discord: DiscordApp;
  societies: SocietiesManager;
  zones: ZoneManager;
  entrances: EntranceManager;

  constructor() {
    super();
    log.location = this.locale('global.location.constructor');
    this.log.safemode({ ...log, message: this.locale('server.main.constructor.creating') });
    log.isChild = true;
    this.orm = new DBManager();
    this.users = new UserManager();
    this.buckets = new BucketManager();
    this.societies = new SocietiesManager();
    this.zones = new ZoneManager();
    this.entrances = new EntranceManager();
    // this.discord = new DiscordApp(
    //   'OTkyOTEwMjI3NDQxNzMzNjUz.GqRCOe.Y1lkOSsDBRiCRqUREY75msQLKaFOiEt15c2JLc',
    // );

    this.log.confirm({
      ...log,
      message: 'Le serveur est prêt',
      isLast: true,
    });
  }
}

export { Server };
