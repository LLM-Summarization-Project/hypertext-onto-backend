import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OntologyModule } from './ontology/ontology.module';
import { HyperlinkModule } from './hyperlink/hyperlink.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [PrismaModule, OntologyModule, HyperlinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

