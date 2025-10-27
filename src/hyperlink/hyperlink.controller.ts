// src/hyperlink/hyperlink.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { HyperlinkService } from './hyperlink.service';

@Controller('hyperlink')
export class HyperlinkController {
  constructor(private readonly hyperlinkService: HyperlinkService) {}

  // GET /hyperlink
  @Get()
  getAllKeys() {
    return this.hyperlinkService.getAllKeys();
  }

  // GET /hyperlink/:word
  @Get(':word')
  getContent(@Param('word') word: string) {
    return this.hyperlinkService.getContent(word);
  }
}
