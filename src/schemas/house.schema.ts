import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAddress } from 'src/core/interfaces';
import { configService } from 'src/core/config.service';
import {User} from "./user.schema";

export type HouseDocument = HydratedDocument<House>;

const BIO_PREFERENCES = configService.getBioPreferences();

@Schema({ timestamps: true })
export class House{
    @Prop({ type: Number, unique: true })
    _id: number;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0],
            index: '2dsphere',
        },
    })
    location: {
        type: string,
        coordinates: number[]
    };

    @Prop({ required: true, ref: User.name, type: Number })
    host: User;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const HouseSchema = SchemaFactory.createForClass(House);
