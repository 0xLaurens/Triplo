import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CommentRepository} from "./comment.repository";
import {CommentInterface} from "@triplo/models";


@Controller("comments")
export class CommentController {
  constructor(private commentRepo: CommentRepository) {
  }


  @Post()
  async createComment(
    @Body() comment: CommentInterface
  ): Promise<CommentInterface> {
    return this.commentRepo.createComment(comment)
  }

  @Get()
  async findAllComments(): Promise<CommentInterface[]> {
    return this.commentRepo.findAllComments();
  }

  @Get(":commentId")
  async findCommentById(@Param("commentId") commentId: string): Promise<CommentInterface> {
    return this.commentRepo.findCommentById(commentId)
  }

  @Put(":commentId")
  async updateComment(
    @Param("commentId") commentId: string,
    @Body() changes: CommentInterface): Promise<CommentInterface> {

    return this.commentRepo.updateComment(commentId, changes)
  }

  @Delete(":commentId")
  async deleteComment(@Param("commentId") commentId: string): Promise<CommentInterface> {
    return this.commentRepo.deleteComment(commentId)
  }
}
