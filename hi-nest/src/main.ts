import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if true, it removes properties that are not in the DTO
      forbidNonWhitelisted: true, // if true, it throws an error if properties that are not in the DTO are sent
      transform: true, // if true, it automatically transforms the data type to the DTO data type
    }),
  );
  await app.listen(3000);
}
bootstrap();
