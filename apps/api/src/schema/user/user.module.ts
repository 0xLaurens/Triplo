import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.schema";
import {UserController} from "../../controllers/user/user.controller";
import {UserRepository} from "../../repository/user/user.repository";

@Module ({
  imports: [
    MongooseModule.forFeature([
      {name: "User", schema: UserSchema}
    ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserRepository
  ]
})

export class UserModule {
}

