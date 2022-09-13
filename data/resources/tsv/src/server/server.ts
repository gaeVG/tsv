import { EnumLogContainer, LogData } from '../core/declares/log';
import { UserManager } from '../core/libs/user';
import { SocietiesManager } from '../core/libs/society';
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

  constructor() {
    super();
    log.location = this.locale('global.location.constructor');
    this.log.safemode({ ...log, message: this.locale('server.main.constructor.creating') });

    this.orm = new DBManager();
    this.users = new UserManager();
    this.buckets = new BucketManager();
    this.societies = new SocietiesManager();
    this.zones = new ZoneManager();
    // this.discord = new DiscordApp(
    //   'OTkyOTEwMjI3NDQxNzMzNjUz.GqRCOe.Y1lkOSsDBRiCRqUREY75msQLKaFOiEt15c2JLc',
    // );

    this.log.confirm({
      namespace: 'Main',
      container: '',
      location: '',
      message: 'Le serveur est prêt',
      isChild: true,
      isLast: true,
    });
  }
}

export { Server };
