import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {
    @Prop({required: true})
    hash: string;

    @Prop({
        required: true,
        unique: true,
      })
      email: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
