import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  
  await app.listen(process.env.PORT ?? 5000);
  console.log(`Server is running on port ${process.env.PORT ?? 5000}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
