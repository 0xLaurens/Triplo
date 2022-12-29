import {MongoMemoryServer} from "mongodb-memory-server";
import {disconnect, Model} from "mongoose";
import {Like, LikeDocument, LikeSchema} from "./like.schema";
import {Test} from "@nestjs/testing";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";

describe("Like Schema",
  () => {
    let mongo: MongoMemoryServer;
    let likeModel: Model<LikeDocument>;

    beforeAll(async () => {
      const app = await Test.createTestingModule({
        imports: [
          MongooseModule.forRootAsync({
            useFactory: async () => {
              mongo = await MongoMemoryServer.create();
              const uri = mongo.getUri();
              return {uri};
            }
          }),
          MongooseModule.forFeature([{name: Like.name, schema: LikeSchema}])
        ]
      }).compile();
      likeModel = app.get<Model<LikeDocument>>(getModelToken(Like.name));

      await likeModel.ensureIndexes();
    });

    afterAll(async () => {
      await disconnect();
      await mongo.stop();
    });

    it("has a required isPositive", () => {
      const model = new likeModel()

      const err = model.validateSync();

      expect(err.errors.isPositive.message).toEqual("Path `isPositive` is required.")
    })

    it("isPositive is of type boolean", () => {
      const model = new likeModel({isPositive: "yo"})

      const err = model.validateSync();

      expect(err.errors.isPositive.message).toEqual("Cast to Boolean failed for value \"yo\" (type string) at path \"isPositive\" because of \"CastError\"")
    })

    it("has a required compositeId", () => {
      const model = new likeModel()

      const err = model.validateSync();

      expect(err.errors.compositeId.message).toEqual("Path `compositeId` is required.")
    })

    it("has a required userId", () => {
      const model = new likeModel()

      const err = model.validateSync();

      expect(err.errors.userId.message).toEqual("Path `userId` is required.")
    })

    it("userId is of type objectId", () => {
      const model = new likeModel({userId: "123"})

      const err = model.validateSync();

      expect(err.errors.userId.message).toEqual("Cast to ObjectId failed for value \"123\" (type string) at path \"userId\" because of \"BSONTypeError\"")
    })

    it("has a required projectId", () => {
      const model = new likeModel()

      const err = model.validateSync();

      expect(err.errors.projectId.message).toEqual("Path `projectId` is required.")
    })

    it("projectId is of type objectId", () => {
      const model = new likeModel({projectId: "123"})

      const err = model.validateSync();

      expect(err.errors.projectId.message).toEqual("Cast to ObjectId failed for value \"123\" (type string) at path \"projectId\" because of \"BSONTypeError\"")
    })

  });
