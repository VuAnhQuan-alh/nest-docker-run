import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Constants } from './commons/constants';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(Constants.pre_router);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  await app.listen(1050);

  if (process.env.NODE_ENV === 'development')
    console.log(
      `Application is running on: ${await app.getUrl()}${Constants.pre_router}`,
    );
}

bootstrap().then();
