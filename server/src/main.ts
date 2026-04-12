import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://rgb-studio-test-p92tzqw56-elshodibadullayev28-7531s-projects.vercel.app',
      'https://rgb-studio.vercel.app',
      process.env.CLIENT_URL,
    ].filter((o): o is string => !!o),
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
