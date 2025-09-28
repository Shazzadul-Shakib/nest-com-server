import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception-filters';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { swaggerHtml } from './swagger.static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nest-Com API')
    .setDescription('The Nest-Com API description')
    .setVersion('1.0')
    .addTag('Nest Com')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  // Simple HTML response for Swagger UI
  app.use('/api/docs', (req: Request, res: Response) => {
    res.send(swaggerHtml);
  });
  // Serve the OpenAPI JSON
  app.use('/api/docs-json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

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
