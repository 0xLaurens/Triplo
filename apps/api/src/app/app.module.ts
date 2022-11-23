import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import {environment} from "../environments/environment";
import {UserModule} from "./user/user.module";
import {ProjectModule} from "./project/project.module";
import {CommentModule} from "./comment/comment.module";

@Module({
  imports: [
    UserModule,
    ProjectModule,
    CommentModule,
    MongooseModule.forRoot(environment.MONGO_URL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
