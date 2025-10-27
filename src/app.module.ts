import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OntologyModule } from './ontology/ontology.module';

@Module({
  imports: [OntologyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
