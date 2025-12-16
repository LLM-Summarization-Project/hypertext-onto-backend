import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OntologyModule } from './ontology/ontology.module';
import { HyperlinkModule } from './hyperlink/hyperlink.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),PrismaModule, OntologyModule, HyperlinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

