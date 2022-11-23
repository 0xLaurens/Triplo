import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import {environment} from "../environments/environment";
import {UserModule} from "./user/user.module";
import {ProjectModule} from "./project/project.module";

@Module({
  imports: [
    UserModule,
    ProjectModule,
    MongooseModule.forRoot(environment.MONGO_URL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
