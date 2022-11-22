import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaModule } from "@triplo/schema";
import { MongooseModule } from '@nestjs/mongoose';
import {environment} from "../environments/environment";

@Module({
  imports: [
    SchemaModule,
    MongooseModule.forRoot(environment.MONGO_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
