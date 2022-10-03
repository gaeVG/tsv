import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { Log } from '../../../core/libs/log';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { Invoices, Parkings, Users, Vehicles } from './entities';
import config from '../../../config';

const _t = config.locale;

const log: LogData = {
  namespace: 'Database',
  container: EnumLogContainer.Class,
};

class DBManager {
  dataSource: DataSource;

  constructor() {
    log.location = _t('global.location.constructor');
    Log.safemode({
      ...log,
      message: _t('core.orm.manager.constructor.creating'),
    });
    log.isChild = true;

    this.dataSource = new DataSource({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 27017,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fivem',
      synchronize: true,
      logging: process.env.EXECUTION_MODE === 'safemode',
      entities: [Users, Vehicles, Parkings, Invoices],
      subscribers: [],
      migrations: [],
      useUnifiedTopology: true,
    } as MongoConnectionOptions);

    this.dataSource
      .initialize()
      .then(async () => {
        if (this.dataSource.isInitialized) {
          Log.confirm({
            ...log,
            message: _t('server.orm.manager.constructor.databaseReady'),
            isLast: true,
          });
        } else {
          Log.error({
            ...log,
            message: _t('server.orm.manager.constructor.databaseNotReady'),
            isLast: true,
          });
        }
      })
      .catch((error) => {
        Log.error({
          ...log,
          message: error,
          isLast: true,
        });
      });
  }
}

export { DBManager };
