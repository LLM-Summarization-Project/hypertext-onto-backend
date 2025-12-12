import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:8080', // Next.js dev
      'http://127.0.0.1:8080',
    ],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
