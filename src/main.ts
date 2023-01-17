import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Constants } from './commons/constants';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix(Constants.pre_router);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(1050);

  // if (process.env.NODE_ENV === 'production')
  console.log(
    `Application is running on: ${await app.getUrl()}${Constants.pre_router}`,
  );
}

bootstrap().then();
