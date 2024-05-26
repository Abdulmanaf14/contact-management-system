import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_VERSION, HOST, PORT, debugLevel } from './constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: debugLevel
	});
	// app.use(
	// 	session({
	// 	  secret: 'my-secret',
	// 	  resave: false,
	// 	  saveUninitialized: false,
	// 	  cookie: { maxAge: 3600000 }, // 1 hour
	// 	}),
	//   );

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(PORT, HOST, () => {
		Logger.debug(
			`Server v${APP_VERSION} listening at http://${HOST}:${PORT}/`,
			'contact-management-app',
		);
	});
}
bootstrap();
