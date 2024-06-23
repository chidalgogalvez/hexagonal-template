import { MongooseModuleOptions } from '@nestjs/mongoose';
import { IMongoConfiguration } from '../env/config-loader';
import { ConfigService } from '@nestjs/config';

const mongoDBConfig = (
  configService: ConfigService<Record<string, unknown>, false>,
): MongooseModuleOptions => {
  const mongoConfig: IMongoConfiguration = configService.get('mongo');
  return {
    uri: mongoConfig.uri,
    auth: {
      username: mongoConfig.username,
      password: mongoConfig.password,
    },
    dbName: mongoConfig.databaseName,
  };
};

export default mongoDBConfig;
