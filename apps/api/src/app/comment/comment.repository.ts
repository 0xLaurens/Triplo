import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CommentInterface} from "../../../../../libs/models/src/lib/comment/comment.interface";
import {Model} from "mongoose";

@Injectable()
export class CommentRepository {

  constructor(@InjectModel('Comment') private commentModel: Model<CommentInterface>) {
  }

  async findAllComments(): Promise<CommentInterface[]> {
    return this.commentModel.find();
  }
}
