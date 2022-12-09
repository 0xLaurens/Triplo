import {Injectable} from '@nestjs/common';

import {JwtPayload, verify, sign} from 'jsonwebtoken';
import {hash, compare} from 'bcryptjs';

import mongoose, {Model} from 'mongoose';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';

import {Identity, IdentityDocument} from './identity.schema';
import {User, UserDocument} from '../user/user.schema';
import {Neo4jService} from "nest-neo4j/dist";

@Injectable()
export class AuthRepository {
  constructor(
    private readonly neo4jService: Neo4jService,
    @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {
  }

  async createUser(name: string, emailAddress: string): Promise<string> {
    const user = new this.userModel({name, emailAddress});
    await user.save();
    return user.id;
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
      })
    })
  }

  async registerUser(password: string, email: string, username: string, gender: string) {
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const generatedHash = await hash(password, parseInt(process.env.SALT_ROUNDS, 10));
      const identity = new this.identityModel({hash: generatedHash, email: email});
      await identity.save({session})

      const user  = new this.userModel({email: email, username: username, gender: gender});
      await user.save({session})

      const neo = await this.neo4jService.write(`CREATE (u:User {id: "${user._id}", email: "${user.email}", username: "${user.username}"})`)
      if (!neo) {
        await session.abortTransaction()
      }
    });
    return await session.endSession()
  }

  async generateToken(email: string, password: string): Promise<string> {
    const identity = await this.identityModel.findOne({email: email});
    if (!identity || !(await compare(password, identity.hash))) throw new Error("user not authorized");

    const user = await this.userModel.findOne({email: email});

    return new Promise((resolve, reject) => {
      sign({email, id: user.id, username: user.username}, process.env.JWT_SECRET, (err: Error, token: string) => {
        if (err) reject(err);
        else resolve(token);
      });
    })
  }
}
