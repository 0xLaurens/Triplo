import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {LikeInterface} from "@triplo/models"
import {Model} from "mongoose";

@Injectable()
export class LikeRepository {
  constructor(@InjectModel('Like') private likeModel: Model<LikeInterface>) {
  }

  async createLike(like: Partial<LikeInterface>): Promise<LikeInterface> {
    return this.likeModel.create(like)
  }

  async updateLike(likeId: string, like: Partial<LikeInterface>): Promise<LikeInterface> {
    return this.likeModel.findByIdAndUpdate(likeId, like, {new: true})
  }

  async findLikeById(likeId: string): Promise<LikeInterface> {
    return this.likeModel.findById(likeId)
  }

  async deleteLike(likeId: string): Promise<LikeInterface> {
    return this.likeModel.findByIdAndDelete(likeId)
  }


}
