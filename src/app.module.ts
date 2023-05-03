import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { GameModule } from './game/game.module';
import { GameEntity } from './game/entity/game.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TempModule } from './temp/temp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [UserEntity, GameEntity],
      synchronize: true,
      dropSchema: true,
    }),
    UserModule,
    GameModule,
    AuthModule,
    TempModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
