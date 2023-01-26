import {Injectable, UseGuards} from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {LikeInterface, ProjectInterface} from "@triplo/models"
import mongoose, {Model} from "mongoose";
import {Neo4jService} from "nest-neo4j";
import {AuthenticationGuard} from "../guard/authentication.guard";

@Injectable()
@UseGuards(AuthenticationGuard)
export class LikeRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel('Like') private likeModel: Model<LikeInterface>,
    @InjectModel('Project') private projectModel: Model<ProjectInterface>,
  ) {
  }

  async createLike(like: Partial<LikeInterface>): Promise<LikeInterface> {
    let created;
    like.compositeId = `${like.userId}_${like.projectId}`
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      created = new this.likeModel({...like})
      await created.save({session})

      const likeInc: number = like.isPositive ? 1 : 0
      const dislikeInc: number = !like.isPositive ? 1 : 0
      await this.projectModel.findByIdAndUpdate(like.projectId, {
        $inc: {
          LikeCount: likeInc,
          DislikeCount: dislikeInc
        }
      }, {session})

      const neo = await this.neo4jService.write(`MATCH(u:User {id: "${created.userId}"}),(p:Project {id: "${created.projectId}"}) CREATE (u)-[l:LIKES {id: "${created._id}", isPositive: ${created.isPositive}}]->(p)`)
      if (!neo) {
        await session.abortTransaction()
      }
    })
    await session.endSession();
    return created;
  }

  async updateLike(likeId: string, like: Partial<LikeInterface>): Promise<LikeInterface> {
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const prev = await this.likeModel.findById(likeId, {}, {session});
      console.log(prev)
      await this.likeModel.findByIdAndUpdate(likeId, {...like}, {session})

      if (like.isPositive != prev.isPositive) {
        const likeInc: number = like.isPositive ? 1 : -1
        const dislikeInc: number = !like.isPositive ? 1 : -1
        await this.projectModel.findByIdAndUpdate(like.projectId, {
          $inc: {
            LikeCount: likeInc,
            DislikeCount: dislikeInc
          }
        })
      }

      const neo = await this.neo4jService.write(`MATCH (u)-[l:LIKES {id: "${likeId}"}]->(p) SET l.isPositive=${like.isPositive}`)
      if (!neo) {
        await session.abortTransaction()
      }
    })
    await session.endSession();
    return this.likeModel.findById(likeId);
  }

  async findLikeById(likeId: string): Promise<LikeInterface> {
    return this.likeModel.findById(likeId)
  }

  async deleteLike(likeId: string): Promise<LikeInterface> {
    const like = await this.likeModel.findById(likeId);
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const like = await this.likeModel.findById(likeId, {}, {session});

      const likeInc: number = like.isPositive ? -1 : 0
      const dislikeInc: number = !like.isPositive ? -1 : 0
      await this.projectModel.findByIdAndUpdate(like.projectId, {$inc: {LikeCount: likeInc, DislikeCount: dislikeInc}})

      await this.likeModel.findByIdAndDelete(likeId, {session});

      const neo = await this.neo4jService.write(`MATCH (u)-[l:LIKES {id: "${likeId}"}]->(p) DELETE (l)`)
      if (!neo) {
        await session.abortTransaction()
      }
    })
    await session.endSession();
    return like;
  }


  async findLikeCompositeId (userId: string, projectId): Promise<LikeInterface> {
    return this.likeModel.findOne({compositeId: `${userId}_${projectId}`})
  }

}
