import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';
import {environment} from "../environments/environment";
import {UserModule} from "./user/user.module";
import {ProjectModule} from "./project/project.module";
import {CommentModule} from "./comment/comment.module";
import {AuthModule} from "./auth/auth.module";
import {TaskModule} from "./task/task.module";
import {GetUserMiddleware} from "./middleware/get-user.middleware";
import {LikeController} from "./like/like.controller";
import {CommentController} from "./comment/comment.controller";
import {ProjectController} from "./project/project.controller";
import {TaskController} from "./task/task.controller";
import {UserController} from "./user/user.controller";


@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
    ProjectModule,
    CommentModule,
    MongooseModule.forRoot(environment.MONGO_URL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(
        LikeController,
        CommentController,
        ProjectController,
        TaskController,
        UserController
      )
  }
}
