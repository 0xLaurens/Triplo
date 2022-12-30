import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';
import {environment} from "../environments/environment";
import {UserModule} from "./user/user.module";
import {ProjectModule} from "./project/project.module";
import {CommentModule} from "./comment/comment.module";
import {AuthModule} from "./auth/auth.module";
import {TaskModule} from "./task/task.module";
import {LikeController} from "./like/like.controller";
import {CommentController} from "./comment/comment.controller";
import {ProjectController} from "./project/project.controller";
import {TaskController} from "./task/task.controller";
import {UserController} from "./user/user.controller";
import {LikeModule} from "./like/like.module";
import {Neo4jModule} from 'nest-neo4j/dist';
import {TokenMiddleware} from "./auth/token.middleware";


@Module({
  imports: [
    AuthModule,
    LikeModule,
    TaskModule,
    UserModule,
    ProjectModule,
    CommentModule,
    MongooseModule.forRoot(environment.MONGO_URL),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_URL,
      port: 7687,
      username: 'neo4j',
      password: process.env.NEO4J_PASSWORD
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(
        LikeController,
        CommentController,
        ProjectController,
        TaskController,
        UserController
      )
  }
}
