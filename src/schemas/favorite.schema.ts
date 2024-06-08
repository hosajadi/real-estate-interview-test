import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {House} from './house.schema';
import {User} from './user.schema';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ timestamps: true })
export class Favorite {
    @Prop({ type: Number, unique: true })
    _id: number;

    @Prop({ required: true, ref: User.name, type: Number })
    user: User;

    @Prop({ required: true, ref: House.name, type: Number })
    house: House;

    @Prop({ type: Date })
    created_at: Date;

    @Prop({ type: Date })
    updated_at: Date;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

