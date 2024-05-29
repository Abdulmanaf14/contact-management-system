import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { ContactsModule } from './components/contacts/contacts.module';
import { User } from './components/users/entities/user.entity';
import { Contact } from './components/contacts/entities/contact.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  SessionModule } from 'nestjs-session';
import session from 'express-session';
import { SECRET_KEY } from './constants';
import { RouterModule } from '@nestjs/core';
import { APP_ROUTES } from './constants/routes';



@Module({
  imports: [
    RouterModule.register(APP_ROUTES),
    ConfigModule.forRoot({ isGlobal: true,
      envFilePath: ['.env.development.local', '.env'], }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('POSTGRES_URL'),
        entities: [User, Contact],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule, ContactsModule, SessionModule.forRoot({
      session: { secret: 'contact use' },
    }),
    ContactsModule,
    UsersModule

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: SECRET_KEY, // change this to a secure key
          resave: false,
          saveUninitialized: false,
          cookie: { maxAge: 360000}, // 1 hour
        }),
      )
      .forRoutes('*');
  }
}
