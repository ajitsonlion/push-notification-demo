/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
require('dotenv').config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'ng-push'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(compression());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();


// PRIVATE_KEY=ciu7paCiU998Nnavqx5H-Vri_i5Az17X05m2oL98fE4 PUBLIC_KEY=BPjCnZI3gJ6eYsbfA6KDBEVUR5c_EySAFxw27_aAZAmPF9TuYMlizvL9FG3J5qMNNl3OzoMkuH4JeWeIS8QpT7s GCM_API_KEY=AIzaSyBFU8SJFY5lCPDv7caWugUkbOGGxeMLnmM EMAIL=mailto:example@yourdomain.org PORT=9999 node dist/apps/api/main.js
