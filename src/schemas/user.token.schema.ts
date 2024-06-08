import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {User} from './user.schema';
import {
    UserTokenStatusEnum,
    UserTokenTypeEnum,
} from '../enums/customer.token.schema.enum';

export type UserTokenDocument = HydratedDocument<UserToken>;

@Schema({ timestamps: true })
export class UserToken {
    @Prop({
        required: true,
        type: Number,
        ref: User.name,
    })
    user: number;

    @Prop({
        required: true,
        unique: true,
    })
    token: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop({ default: UserTokenStatusEnum.ACTIVE })
    status: UserTokenStatusEnum;

    @Prop({ default: UserTokenTypeEnum.REFRESH })
    type: UserTokenTypeEnum;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
