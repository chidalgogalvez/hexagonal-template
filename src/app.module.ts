import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from './modules/user/infraestructure/user.infrastructure.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoader } from './config/env/config-loader';
import { MongooseModule } from '@nestjs/mongoose';
import mongoDBConfig from './config/database/config-mongodb';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import throttlerConfig from './config/rate-limit/config-throttle';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        mongoDBConfig(configService),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        throttlerConfig(configService),
      ],
    }),
    UserInfrastructureModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }