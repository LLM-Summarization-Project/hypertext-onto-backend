// src/hyperlink/hyperlink.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MOCK_CONTENT } from './hyperlink.data';

@Injectable()
export class HyperlinkService {
  getContent(word: string) {
    const decoded = decodeURIComponent(word);
    const text = MOCK_CONTENT[decoded];
    if (!text) throw new NotFoundException(`ไม่พบข้อมูลสำหรับ "${decoded}"`);
    return { word: decoded, content: text };
  }

  getAllKeys() {
    return Object.keys(MOCK_CONTENT);
  }
}
