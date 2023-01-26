import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards,
} from "@nestjs/common";
import {LikeRepository} from "./like.repository";
import {LikeInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";


// @UseGuards(AuthenticationGuard)
@Controller("like")
export class LikeController {
  constructor(private likeRepo: LikeRepository) {
  }

  @Post()
  async createLike(
    @Body() like: LikeInterface
  ): Promise<LikeInterface> {
    return this.likeRepo.createLike(like)
  }

  @Get(":likeId")
  async findLikeById(@Param("likeId") likeId: string): Promise<LikeInterface> {
    return this.likeRepo.findLikeById(likeId)
  }

  @Put(":likeId")
  async updateLike(
    @Param("likeId") likeId: string,
    @Body() changes: LikeInterface): Promise<LikeInterface> {

    return this.likeRepo.updateLike(likeId, changes)
  }

  @Delete(":likeId")
  async deleteLike(@Param("likeId") likeId: string): Promise<LikeInterface> {
    return this.likeRepo.deleteLike(likeId)
  }

  @Get(":userId/:projectId")
  async findLikeCompositeId (@Param("userId") userId: string, @Param("projectId") projectId): Promise<LikeInterface> {
    return this.likeRepo.findLikeCompositeId(userId, projectId)
  }

}
