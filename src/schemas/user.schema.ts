import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: Number, unique: true })
    _id: number;

    @Prop()
    user_name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ default: false })
    email_verified: boolean;

    @Prop({
        unique: true,
        minlength: 11,
        maxlength: 11,
    })
    phone_number: string

    @Prop({type: String})
    profile_photo: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({'location.coordinates': '2dsphere'})
