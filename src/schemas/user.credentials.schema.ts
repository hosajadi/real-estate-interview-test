import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {User} from './user.schema';

export type UserCredentialsDocument = HydratedDocument<UserCredentials>;

@Schema({ timestamps: true })
export class UserCredentials {
    @Prop({
        required: true,
        type: Number,
        ref: User.name,
    })
    user: number;

    @Prop({
        required: true,
    })
    password: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const UserCredentialsSchema = SchemaFactory.createForClass(UserCredentials);
