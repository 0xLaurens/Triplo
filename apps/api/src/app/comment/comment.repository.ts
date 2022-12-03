import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CommentInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class CommentRepository {

  constructor(@InjectModel('Comment') private commentModel: Model<CommentInterface>) {
  }

  async getTopLevelComments(projectId: string): Promise<CommentInterface[]> {
    return this.commentModel.find({ project: projectId, parent: null });
  }

  async getCommentReplies(commentId: string) {
    return this.commentModel.find({ parent: commentId });
  }


  async updateComment(commentId: string, comment: Partial<CommentInterface>): Promise<CommentInterface> {
    return this.commentModel.findByIdAndUpdate(commentId, comment, {new: true})
  }

  async getCommentById(commentId: string): Promise<CommentInterface> {
    return this.commentModel.findById(commentId)
  }

  async deleteComment(commentId: string): Promise<CommentInterface> {
    return this.commentModel.findByIdAndDelete(commentId)
  }

  async createComment(projectId: string, comment: Partial<CommentInterface>): Promise<CommentInterface> {
    comment.project = projectId
    return this.commentModel.create(comment)
  }

  async createReply(projectId: string, commentId: string, comment: CommentInterface) {
    comment.parent = commentId;
    return this.createComment(projectId, comment);
  }


}
