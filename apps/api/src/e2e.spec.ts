import request = require('supertest');

import {MongooseModule} from "@nestjs/mongoose";
import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import {MongoClient} from 'mongodb';
import {MongoMemoryReplSet, MongoMemoryServer} from "mongodb-memory-server";
import {disconnect} from "mongoose";

import {AuthModule} from './app/auth/auth.module';
import {gender} from "@triplo/models";
import {Neo4jModule} from "nest-neo4j/dist";
import {UserController} from "./app/user/user.controller";
import {ProjectController} from "./app/project/project.controller";
import {TokenMiddleware} from "./app/auth/token.middleware";
import {ProjectModule} from "./app/project/project.module";
import {RouterModule} from "@nestjs/core";

let mongod: MongoMemoryReplSet;
let uri: string;

@Module({
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
        mongod = await MongoMemoryReplSet.create({replSet: {count: 2}})
        uri = mongod.getUri();
        return {uri};
      }
    }),
    AuthModule,
    ProjectModule,
    RouterModule.register([
      {
        path: "projects",
        module: ProjectModule
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class TestAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        {path: "/login", method: RequestMethod.POST},
        {path: "/register", method: RequestMethod.POST}
      )
      .forRoutes(
        ProjectController,
        UserController
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
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });


  describe("single user", () => {
    let credentials
    let loginCredentials;

    beforeEach(() => {
      credentials = {
        gender: gender.male,
        username: 'user',
        password: 'supergeheim123',
        email: 'user2@user.nl'
      };
      loginCredentials = {
        email: 'user@user.nl',
        password: 'supergeheim123'
      }
    });

    it("User registers, logs in", async () => {
      const register = await request(server)
        .post("/api/register")
        .send(credentials)

      register.req

      expect(register.status).toBe(201);
      expect(register.body).toHaveProperty("_id");
      expect(register.body).toHaveProperty("email");
      expect(register.body).toHaveProperty("username");

      const login = await request(server)
        .post("/api/login")
        .send(loginCredentials)

      expect(login.status).toBe(201)
      expect(login.body).toHaveProperty("token")
    });

    it("User registers, logs in, Creates project", async () => {
      const register = await request(server)
        .post("/api/register")
        .send(credentials)

      register.req

      expect(register.status).toBe(201);
      expect(register.body).toHaveProperty("_id");
      expect(register.body).toHaveProperty("email");
      expect(register.body).toHaveProperty("username");

      const login = await request(server)
        .post("/api/login")
        .send(loginCredentials)

      expect(login.status).toBe(201)
      expect(login.body).toHaveProperty("token")
    });

  });


});

