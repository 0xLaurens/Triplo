/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationError, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {HttpExceptionFilter} from "./filters/http.filter";
import {MongooseExceptionFilter} from "./filters/mongoose.filter";
import {ValidationException} from "./filters/validation.exception";
import {ValidationFilter} from "./filters/validation.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(
    new MongooseExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  )
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => {

      const messages = errors.map(
        error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`
      );

      return new ValidationException(messages);
    }
  }));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
