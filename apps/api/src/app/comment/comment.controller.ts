import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {CommentRepository} from "./comment.repository";
import {CommentInterface} from "@triplo/models";
import {AuthGuard} from "../guard/auth.guard";


@UseGuards(AuthGuard)
@Controller("")
export class CommentController {
  constructor(private commentRepo: CommentRepository) {
  }


  @Post("/projects/:projectId/comments")
  async createComment(
    @Param("projectId") projectId: string, @Body() comment: CommentInterface
  ): Promise<CommentInterface> {
    return this.commentRepo.createComment(projectId, comment)
  }

  @Post("/projects/:projectId/comments/:commentId")
  async createReply(
    @Param("projectId") projectId: string, @Param("commentId") commentId: string, @Body() comment: CommentInterface
  ): Promise<CommentInterface> {
    return this.commentRepo.createReply(projectId, commentId, comment)
  }

  @Get("/projects/:projectId/comments")
  async getTopLevelComments(@Param("projectId") projectId: string): Promise<CommentInterface[]> {
    return this.commentRepo.getTopLevelComments(projectId);
  }

  @Get("/comments/:commentId/replies")
  async getCommentReplies(@Param("commentId") commentId: string): Promise<CommentInterface[]> {
    return this.commentRepo.getCommentReplies(commentId)
  }

  @Get("/comments/:commentId")
  async getCommentById(@Param("commentId") commentId: string): Promise<CommentInterface> {
    return this.commentRepo.getCommentById(commentId)
  }

  @Put("/comments/:commentId")
  async updateComment(
    @Param("commentId") commentId: string,
    @Body() changes: CommentInterface): Promise<CommentInterface> {

    return this.commentRepo.updateComment(commentId, changes)
  }

  @Delete("/comments/:commentId")
  async deleteComment(@Param("commentId") commentId: string): Promise<CommentInterface> {
    return this.commentRepo.deleteComment(commentId)
  }
}
