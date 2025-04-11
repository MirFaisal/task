import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, string> {
    return {
      message: 'Hello World! This is a NestJS application.',
      status: 'success',
    };
  }
}
