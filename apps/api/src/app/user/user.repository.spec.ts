import {Test} from "@nestjs/testing";
import {disconnect, Model} from "mongoose";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {MongoClient} from "mongodb";
import {MongoMemoryServer} from "mongodb-memory-server";
import {Neo4jModule} from "nest-neo4j/dist";
import {UserRepository} from "./user.repository";
import {User, UserDocument, UserSchema} from "./user.schema";
import {gender} from "@triplo/models";

describe("UserRepository", () => {
  let service: UserRepository;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  let userModel: Model<UserDocument>;

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
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      ],
      providers: [UserRepository]
    }).compile();

    service = app.get<UserRepository>(UserRepository);

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await userModel.ensureIndexes();

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db("test").collection("users").deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe("CRUD actions for users:", () => {
    const testUser = {
      email: "test@gmail.com",
      gender: gender.male,
      password: "test",
      registered: new Date(),
      username: "test"
    }

    const testUser2 = {
      email: "test2@gmail.com",
      gender: gender.male,
      password: "test",
      registered: new Date(),
      username: "test2"
    }

    const testUser3 = {
      email: "test3@gmail.com",
      gender: gender.male,
      password: "test",
      registered: new Date(),
      username: "test3"
    }

    it("Create user", async () => {
      const user = await service.createUser(testUser)
      const findUser = await service.findUserById(user._id);

      expect(findUser).toHaveProperty("username", testUser.username)
    })

    it("Find all users", async () => {
      await service.createUser(testUser)
      await service.createUser(testUser2)
      await service.createUser(testUser3)

      const users = await service.findAllUsers()

      expect(users).toHaveLength(3)
    })

    it("Update User", async () => {
      const user = await service.createUser(testUser)
      user.username = "fancy_new_username"
      await service.updateUser(user._id, user)

      expect(user).toHaveProperty("username", "fancy_new_username")
    })

    it("Delete User", async () => {
      const user = await service.createUser(testUser)
      const user_deleted = await service.deleteUser(user._id)
      const users = await service.findAllUsers()

      expect(user_deleted).toHaveProperty("username", user.username)
      expect(users).toHaveLength(0)
    })
  })
});
