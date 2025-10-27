import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OntologyModule } from './ontology/ontology.module';
import { HyperlinkModule } from './hyperlink/hyperlink.module';

@Module({
  imports: [OntologyModule,HyperlinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
