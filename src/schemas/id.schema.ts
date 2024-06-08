import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from "./user.schema";

@Schema({ timestamps: true })
export class IdCounter {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ required: true, type: Number, default: 0 })
    seq: number;
}

export const IdCounterSchema = SchemaFactory.createForClass(IdCounter);
