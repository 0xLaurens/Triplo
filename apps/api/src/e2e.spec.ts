import request = require('supertest');

import {MongooseModule} from "@nestjs/mongoose";
import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';

import {MongoClient} from 'mongodb';
import {MongoMemoryReplSet} from "mongodb-memory-server";
import {disconnect} from "mongoose";

import {AuthModule} from './app/auth/auth.module';
import {gender} from "@triplo/models";
import {Neo4jModule} from "nest-neo4j/dist";
import {TokenMiddleware} from "./app/auth/token.middleware";
import {ProjectModule} from "./app/project/project.module";
import {ConfigModule} from "@nestjs/config";
import {ProjectController} from "./app/project/project.controller";
import {CommentModule} from "./app/comment/comment.module";
import {CommentController} from "./app/comment/comment.controller";
import {LikeController} from "./app/like/like.controller";
import {LikeModule} from "./app/like/like.module";

let mongod: MongoMemoryReplSet;
let uri: string;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    Neo4jModule.forRoot({
      scheme: "bolt",
      host: "localhost",
      port: 7687,
      username: "neo4j",
      password: "neox"
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryReplSet.create({replSet: {count: 2}})
        uri = mongod.getUri();
        return {uri};
      }
    }),
    AuthModule,
    CommentModule,
    LikeModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class TestAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(
        CommentController,
        ProjectController,
        LikeController
      )
  }
}


describe("Project (e2e)", () => {
  let app: INestApplication;
  let server;
  let module: TestingModule;
  let mongoc: MongoClient;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestAppModule]
    })
      .compile();

    app = module.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();

    mongoc = new MongoClient(uri);
    await mongoc.connect();

    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await mongoc.db("test").collection("identities").deleteMany({});
    await mongoc.db("test").collection("users").deleteMany({});
    await mongoc.db("test").collection("projects").deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });


  describe("single user", () => {
    let credentials
    let login

    beforeEach(() => {

      credentials = {
        gender: gender.male,
        username: 'user',
        password: 'supergeheim123',
        email: 'user@user.nl'
      };

      login = {
        password: 'supergeheim123',
        email: 'user@user.nl'
      };
    });

    it("User registers, logs in", async () => {
      const register = await request(server)
        .post("/api/register")
        .send(credentials)
      expect(register.status).toBe(201);
      expect(register.body).toHaveProperty("_id");
      expect(register.body).toHaveProperty("email");
      expect(register.body).toHaveProperty("username");

      const loginRequest = await request(server)
        .post("/api/login")
        .send(login)
      expect(loginRequest.status).toBe(201);
      expect(loginRequest.body).toHaveProperty("token")

    })

    it("User registers, logs in, Creates project", async () => {
      const register = await request(server)
        .post("/api/register")
        .send(credentials)
      expect(register.status).toBe(201);
      expect(register.body).toHaveProperty("_id");
      expect(register.body).toHaveProperty("email");
      expect(register.body).toHaveProperty("username");

      const loginRequest = await request(server)
        .post("/api/login")
        .send(login)
      expect(loginRequest.status).toBe(201);
      expect(loginRequest.body).toHaveProperty("token")

      const token = loginRequest.body.token;
      const project = {
        Tags: [],
        description: "testproject",
        name: "test"
      }

      const projectRequest = await request(server)
        .post("/api/projects")
        .set("authorization", token)
        .send(project)
      expect(projectRequest.body).toHaveProperty("name", project.name);
      expect(projectRequest.body).toHaveProperty("description", project.description);
      expect(projectRequest.status).toBe(201)
    });

    it("User registers, logs in, Creates project, leave comment", async () => {
      const register = await request(server)
        .post("/api/register")
        .send(credentials)
      expect(register.status).toBe(201);
      expect(register.body).toHaveProperty("_id");
      expect(register.body).toHaveProperty("email");
      expect(register.body).toHaveProperty("username");

      const loginRequest = await request(server)
        .post("/api/login")
        .send(login)
      expect(loginRequest.status).toBe(201);
      expect(loginRequest.body).toHaveProperty("token")

      const token = loginRequest.body.token;
      const project = {
        Tags: [],
        description: "testproject",
        name: "test"
      }

      const projectRequest = await request(server)
        .post("/api/projects")
        .set("authorization", token)
        .send(project)
      expect(projectRequest.body).toHaveProperty("name", project.name);
      expect(projectRequest.body).toHaveProperty("description", project.description);
      expect(projectRequest.status).toBe(201)

      const projectId = projectRequest.body._id

      const comment = {
        message: "Yo I like My own project", project: projectId
      }

      const commentRequest = await request(server)
        .post("/api/projects/" + projectId + "/comments")
        .set("authorization", token)
        .send(comment)

      expect(commentRequest.body).toHaveProperty("message", comment.message)
      expect(commentRequest.body).toHaveProperty("project", comment.project)
      expect(commentRequest.body).toHaveProperty("username", credentials.username)
      expect(commentRequest.body).toHaveProperty("project", projectRequest.body._id)
      expect(projectRequest.status).toBe(201)
    });
  });

  describe("Two users", () => {
    let credA, credB, loginA, loginB
    beforeEach(() => {
      credA = {
        gender: gender.male,
        username: 'userA',
        password: 'supergeheim123',
        email: 'userA@user.nl'
      };

      credB = {
        gender: gender.male,
        username: 'userB',
        password: 'supergeheim123',
        email: 'userB@user.nl'
      };

      loginA = {
        password: 'supergeheim123',
        email: 'userA@user.nl'
      };

      loginB = {
        password: 'supergeheim123',
        email: 'userB@user.nl'
      };
    });

    it("Register both users, Log in, Create Project, Like project", async () => {
      const regA = await request(server)
        .post("/api/register")
        .send(credA)
      expect(regA.status).toBe(201);
      expect(regA.body).toHaveProperty("email", credA.email);
      expect(regA.body).toHaveProperty("username", credA.username);

      const regB = await request(server)
        .post("/api/register")
        .send(credB)
      expect(regB.status).toBe(201);
      expect(regB.body).toHaveProperty("email", credB.email);
      expect(regB.body).toHaveProperty("username", credB.username);

      const logA = await request(server)
        .post("/api/login")
        .send(loginA)
      expect(logA.status).toBe(201);
      expect(logA.body).toHaveProperty("token")
      const tokenA = logA.body.token

      const logB = await request(server)
        .post("/api/login")
        .send(loginB)
      expect(logB.status).toBe(201);
      expect(logB.body).toHaveProperty("token")
      const tokenB = logB.body.token

      const project = {
        Tags: [],
        description: "test",
        name: "project"
      }

      const projectRequest = await request(server)
        .post("/api/projects")
        .set("authorization", tokenA)
        .send(project)
      expect(projectRequest.body).toHaveProperty("_id");
      expect(projectRequest.body).toHaveProperty("LikeCount", 0);
      expect(projectRequest.body).toHaveProperty("DislikeCount", 0);
      expect(projectRequest.body).toHaveProperty("name", project.name);
      expect(projectRequest.body).toHaveProperty("description", project.description);
      expect(projectRequest.status).toBe(201)
      const projectId = projectRequest.body._id

      const like = {
        projectId: projectId,
        userId: regB.body._id,
        isPositive: true
      }

      const likeRequest = await request(server)
        .post("/api/like")
        .set("authorization", tokenB)
        .send(like)
      expect(likeRequest.body).toHaveProperty("compositeId", `${regB.body._id}_${projectId}`);
      expect(likeRequest.body).toHaveProperty("projectId", projectId);
      expect(likeRequest.body).toHaveProperty("userId", regB.body._id);
      expect(likeRequest.status).toBe(201)

      const projectRequestLikeCount = await request(server)
        .get(`/api/projects/${projectId}`)
        .set("authorization", tokenA)
      expect(projectRequestLikeCount.status).toBe(200)
      expect(projectRequestLikeCount.body).toHaveProperty("LikeCount", 1);
      expect(projectRequestLikeCount.body).toHaveProperty("DislikeCount", 0);
    });

    it("Register both users, Log in, Create Project, Dislike project", async () => {
      const regA = await request(server)
        .post("/api/register")
        .send(credA)
      expect(regA.status).toBe(201);
      expect(regA.body).toHaveProperty("email", credA.email);
      expect(regA.body).toHaveProperty("username", credA.username);

      const regB = await request(server)
        .post("/api/register")
        .send(credB)
      expect(regB.status).toBe(201);
      expect(regB.body).toHaveProperty("email", credB.email);
      expect(regB.body).toHaveProperty("username", credB.username);

      const logA = await request(server)
        .post("/api/login")
        .send(loginA)
      expect(logA.status).toBe(201);
      expect(logA.body).toHaveProperty("token")
      const tokenA = logA.body.token

      const logB = await request(server)
        .post("/api/login")
        .send(loginB)
      expect(logB.status).toBe(201);
      expect(logB.body).toHaveProperty("token")
      const tokenB = logB.body.token

      const project = {
        Tags: [],
        description: "test",
        name: "project"
      }

      const projectRequest = await request(server)
        .post("/api/projects")
        .set("authorization", tokenA)
        .send(project)
      expect(projectRequest.body).toHaveProperty("_id");
      expect(projectRequest.body).toHaveProperty("LikeCount", 0);
      expect(projectRequest.body).toHaveProperty("DislikeCount", 0);
      expect(projectRequest.body).toHaveProperty("name", project.name);
      expect(projectRequest.body).toHaveProperty("description", project.description);
      expect(projectRequest.status).toBe(201)
      const projectId = projectRequest.body._id

      const like = {
        projectId: projectId,
        userId: regB.body._id,
        isPositive: false,
      }

      const likeRequest = await request(server)
        .post("/api/like")
        .set("authorization", tokenB)
        .send(like)
      expect(likeRequest.body).toHaveProperty("compositeId", `${regB.body._id}_${projectId}`);
      expect(likeRequest.body).toHaveProperty("projectId", projectId);
      expect(likeRequest.body).toHaveProperty("userId", regB.body._id);
      expect(likeRequest.status).toBe(201)

      const projectRequestLikeCount = await request(server)
        .get(`/api/projects/${projectId}`)
        .set("authorization", tokenA)
      expect(projectRequestLikeCount.status).toBe(200)
      expect(projectRequestLikeCount.body).toHaveProperty("LikeCount", 0);
      expect(projectRequestLikeCount.body).toHaveProperty("DislikeCount", 1);
    });

    it("Register both users, Log in, Create Project, Like then Dislike the project", async () => {
      const regA = await request(server)
        .post("/api/register")
        .send(credA)
      expect(regA.status).toBe(201);
      expect(regA.body).toHaveProperty("email", credA.email);
      expect(regA.body).toHaveProperty("username", credA.username);

      const regB = await request(server)
        .post("/api/register")
        .send(credB)
      expect(regB.status).toBe(201);
      expect(regB.body).toHaveProperty("email", credB.email);
      expect(regB.body).toHaveProperty("username", credB.username);

      const logA = await request(server)
        .post("/api/login")
        .send(loginA)
      expect(logA.status).toBe(201);
      expect(logA.body).toHaveProperty("token")
      const tokenA = logA.body.token

      const logB = await request(server)
        .post("/api/login")
        .send(loginB)
      expect(logB.status).toBe(201);
      expect(logB.body).toHaveProperty("token")
      const tokenB = logB.body.token

      const project = {
        Tags: [],
        description: "test",
        name: "project"
      }

      const projectRequest = await request(server)
        .post("/api/projects")
        .set("authorization", tokenA)
        .send(project)
      expect(projectRequest.body).toHaveProperty("_id");
      expect(projectRequest.body).toHaveProperty("LikeCount", 0);
      expect(projectRequest.body).toHaveProperty("DislikeCount", 0);
      expect(projectRequest.body).toHaveProperty("name", project.name);
      expect(projectRequest.body).toHaveProperty("description", project.description);
      expect(projectRequest.status).toBe(201)
      const projectId = projectRequest.body._id

      const like = {
        projectId: projectId,
        userId: regB.body._id,
        isPositive: true,
      }

      const likeRequest = await request(server)
        .post("/api/like")
        .set("authorization", tokenB)
        .send(like)
      expect(likeRequest.body).toHaveProperty("compositeId", `${regB.body._id}_${projectId}`);
      expect(likeRequest.body).toHaveProperty("projectId", projectId);
      expect(likeRequest.body).toHaveProperty("userId", regB.body._id);
      expect(likeRequest.status).toBe(201)

      let projectRequestLikeCount = await request(server)
        .get(`/api/projects/${projectId}`)
        .set("authorization", tokenA)
      expect(projectRequestLikeCount.status).toBe(200)
      expect(projectRequestLikeCount.body).toHaveProperty("LikeCount", 1);
      expect(projectRequestLikeCount.body).toHaveProperty("DislikeCount", 0);

      const dislike = {
        projectId: projectId,
        userId: regB.body._id,
        isPositive: false,
      }

      const dislikeRequest = await request(server)
        .put(`/api/like/${likeRequest.body._id}`)
        .set("authorization", tokenB)
        .send(dislike)
      expect(dislikeRequest.body).toHaveProperty("_id", likeRequest.body._id);
      expect(dislikeRequest.body).toHaveProperty("compositeId", `${regB.body._id}_${projectId}`);
      expect(dislikeRequest.body).toHaveProperty("projectId", projectId);
      expect(dislikeRequest.body).toHaveProperty("userId", regB.body._id);
      expect(dislikeRequest.status).toBe(200)

      projectRequestLikeCount = await request(server)
        .get(`/api/projects/${projectId}`)
        .set("authorization", tokenA)
      expect(projectRequestLikeCount.status).toBe(200)
      expect(projectRequestLikeCount.body).toHaveProperty("LikeCount", 0);
      expect(projectRequestLikeCount.body).toHaveProperty("DislikeCount", 1);
    });
  });
});

