import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CommentInterface} from "@triplo/models";
import {Model} from "mongoose";
import * as mongoose from "mongoose";

@Injectable()
export class CommentRepository {

  constructor(@InjectModel('Comment') private commentModel: Model<CommentInterface>) {
  }

  async getTopLevelComments(projectId: string): Promise<CommentInterface[]> {
    return this.commentModel.aggregate([
      {$match: {project: new mongoose.Types.ObjectId(projectId)}},
      {$graphLookup: {from: 'comments', startWith: '$_id', connectFromField: '_id', connectToField: 'parent', as: 'replies', restrictSearchWithMatch: {project: projectId}}}
    ]);
  }

  async getCommentReplies(commentId: string)  {
    return this.commentModel.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(commentId)}},
      {$graphLookup: {from: 'comments', startWith: '$_id', connectFromField: '_id', connectToField: 'parent', as: 'replies', depthField: 'depth'}},
      {$unwind: '$replies'},
      {$sort: {'replies.depth': 1, 'replies.created': 1}}
    ]);
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

  private async inc_reply(commentId: string): Promise<CommentInterface> {
    return this.commentModel.findByIdAndUpdate(commentId, {$inc: {replyCount: 1}})
  }

  async createReply(projectId: string, commentId: string, comment: CommentInterface) {
    comment.parent = commentId;
    await this.inc_reply(commentId);
    return this.createComment(projectId, comment);
  }


}
