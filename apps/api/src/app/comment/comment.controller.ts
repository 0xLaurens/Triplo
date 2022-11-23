import {Controller, Get} from "@nestjs/common";
import {CommentRepository} from "./comment.repository";
import {CommentInterface} from "../../../../../libs/models/src/lib/comment/comment.interface";


@Controller()
export class CommentController {
  constructor(private commentRepo: CommentRepository) {
  }

  @Get("comments")
  async findAllComments(): Promise<CommentInterface[]> {
    return this.commentRepo.findAllComments();
  }
}
