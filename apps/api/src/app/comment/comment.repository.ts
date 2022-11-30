import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CommentInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class CommentRepository {

  constructor(@InjectModel('Comment') private commentModel: Model<CommentInterface>) {
  }

  async findAllComments(): Promise<CommentInterface[]> {
    return this.commentModel.find();
  }

  async updateComment(commentId: string, comment: Partial<CommentInterface>): Promise<CommentInterface> {
    return this.commentModel.findByIdAndUpdate(commentId, comment, {new: true})
  }

  async findCommentById(commentId: string): Promise<CommentInterface> {
    return this.commentModel.findById(commentId)
  }

  deleteComment(commentId: string): Promise<CommentInterface> {
    return this.commentModel.findByIdAndDelete(commentId).exec()
  }

  createComment(comment: Partial<CommentInterface>): Promise<CommentInterface> {
    return this.commentModel.create(comment)
  }
}
