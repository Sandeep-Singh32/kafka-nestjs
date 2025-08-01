import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService){

  }
  getHello(): string {
    console.log("configService --", this.configService.get("PORT"));
    return 'Hello World!';
  }
}
