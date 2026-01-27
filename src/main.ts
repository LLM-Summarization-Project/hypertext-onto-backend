
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:8080', // Next.js dev
      'http://127.0.0.1:8080',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Hypertext Backend')
    .setDescription('The Hypertext Backend API description')
    .setVersion('1.0')
    .build();
  const document = await SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
