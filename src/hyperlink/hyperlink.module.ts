// src/hyperlink/hyperlink.module.ts
import { Module } from '@nestjs/common';
import { HyperlinkController } from './hyperlink.controller';
import { HyperlinkService } from './hyperlink.service';

@Module({
  controllers: [HyperlinkController],
  providers: [HyperlinkService],
  exports: [HyperlinkService],
})
export class HyperlinkModule {}
