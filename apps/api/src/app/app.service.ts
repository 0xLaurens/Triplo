import { Injectable } from '@nestjs/common';
import { Message } from '@triplo/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return {result: 200, message: "Yo what's up guys!"};
  }
}

