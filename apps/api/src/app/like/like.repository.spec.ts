import {LikeRepository} from "./like.repository";
import {Test} from "@nestjs/testing";
import {disconnect, Model} from "mongoose";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {MongoClient} from "mongodb";
import {MongoMemoryServer} from "mongodb-memory-server";
import {Neo4jModule} from "nest-neo4j/dist";
import {LikeDocument, Like, LikeSchema} from "./like.schema";
import {Project, ProjectDocument, ProjectSchema} from "../project/project.schema";

describe("LikeRepository", () => {
  let service: LikeRepository;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  let likeModel: Model<LikeDocument>;
  let projectModel: Model<ProjectDocument>;

  beforeAll(async () => {
    let uri: string;

    jest.mock("neo4j-driver/lib/driver");

    const app = await Test.createTestingModule({
      imports: [
        Neo4jModule.forRoot({
          scheme: "bolt",
          host: "localhost",
          port: 7687,
          username: "neo4j",
          password: "neox"
        }),
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return {uri};
          }
        }),
        MongooseModule.forFeature([{name: Like.name, schema: LikeSchema}]),
        MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])
      ],
      providers: [LikeRepository]
    }).compile();

    service = app.get<LikeRepository>(LikeRepository);

    likeModel = app.get<Model<LikeDocument>>(getModelToken(Like.name));
    projectModel = app.get<Model<ProjectDocument>>(getModelToken(Project.name));

    await likeModel.ensureIndexes();
    await projectModel.ensureIndexes();
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db("test").collection("likes").deleteMany({});
    await mongoc.db("test").collection("users").deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe("Like a project", () => {
    const testUser = {
      _id: "123",
      email: "test@gmail.com",
      gender: "Male",
      passwordHash: "adfadsvnvzxv",
      registered: new Date(),
      username: "test"
    }
    const testProject = {
      _id: "321",
      DislikeCount: 0,
      LikeCount: 0,
      Tags: [],
      created: new Date(),
      description: "very detailed description",
      name: "test-project"
    }

    const testLike = {
      isPositive: false, projectId: "321", userId: "123"
    }

    it("Like should be created with the right compositeId", async () => {
      const like = await service.createLike(testLike)
      const like_created = await service.findLikeById(like._id)

      expect(like_created.compositeId).toEqual("123_321")
    })
  })
});



