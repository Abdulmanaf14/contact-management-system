import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { ContactsModule } from './components/contacts/contacts.module';
import { User } from './components/users/entities/user.entity';
import { Contact } from './components/contacts/entities/contact.entity';
import { ConfigModule } from '@nestjs/config';
import {  SessionModule } from 'nestjs-session';
import session from 'express-session';
import { SECRET_KEY } from './constants';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nizamijju',
      database: 'contacts_db',
      entities: [User, Contact],
      synchronize: true,
    }),
    UsersModule, ContactsModule, SessionModule.forRoot({
      session: { secret: 'contact use' },
    }),],
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
