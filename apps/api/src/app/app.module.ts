import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {environment} from "../environments/environment";
import {UserModule} from "./user/user.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(environment.MONGO_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
