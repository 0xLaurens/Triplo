import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {InviteSchema} from "./invite.schema";
import {InviteController} from "./invite.controller";
import {InviteRepository} from "./invite.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "Invite", schema: InviteSchema}
    ])
  ],
  controllers: [
    InviteController
  ],
  providers: [
    InviteRepository
  ]
})

export class InviteModule {

}
