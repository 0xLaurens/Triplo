import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {LikeInterface} from "@triplo/models"
import {Model} from "mongoose";
import {Neo4jService} from "nest-neo4j";

@Injectable()
export class LikeRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel('Like') private likeModel: Model<LikeInterface>,
  ) {
  }

  async createLike(like: Partial<LikeInterface>): Promise<LikeInterface> {
    // const queryResult = await this.neo4jService.write('CREATE (l:`like`) SET l=$props RETURN properties(l) AS like')
    // return queryResult.records[0].toObject().like;
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
