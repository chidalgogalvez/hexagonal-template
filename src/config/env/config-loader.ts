export const configLoader = (): IConfiguration => {
  return {
    port: parseInt(process.env.APP_PORT),
    environment: process.env.NODE_ENV,
    mongo: {
      uri: process.env.MONGO_DATABASE_URI,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      databaseName: process.env.MONGO_DATABASE_NAME,
    },
    throttler: {
      ttl: parseInt(process.env.THROTTLER_TTL),
      limit: parseInt(process.env.THROTTLER_LIMIT),
    },
  };
};

export interface IConfiguration {
  port: number;
  environment: string;
  mongo: IMongoConfiguration;
  throttler: IThrottlerConfiguration;
}

export interface IMongoConfiguration {
  uri: string;
  username: string;
  password: string;
  databaseName: string;
}

export interface IThrottlerConfiguration {
  ttl: number;
  limit: number;
}
