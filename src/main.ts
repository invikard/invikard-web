
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as mustacheExpress from 'mustache-express';
import * as reactExpress from 'express-react-views';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // app.engine('mustache', mustacheExpress());
  // app.set('view engine', 'mustache');
  app.set('view engine', 'jsx');
  const options = { beautify: true };
  app.engine('jsx', reactExpress.createEngine(options));

  await app.listen(3000);
}
bootstrap();
