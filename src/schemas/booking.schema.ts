import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {User} from "./user.schema";
import {House} from "./house.schema";

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
    @Prop({ type: Number, unique: true })
    _id: number;

    @Prop({
        required: true,
        type: Number,
        ref: User.name,
    })
    guest: User;

    @Prop({
        required: true,
        type: Number,
        ref: User.name,
    })
    host: User;

    @Prop({
        required: true,
        type: Number,
        ref: House.name,
    })
    house: House;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
