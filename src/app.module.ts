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



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('postgres://default:6RiE9VxzpeNI@ep-ancient-bread-a4btpvf3.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'),
        entities: [User, Contact],
        synchronize: true,
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
