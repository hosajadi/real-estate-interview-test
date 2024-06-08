import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';
import { User} from './user.schema';
import { VerificationStatusEnum } from '../enums/customer.verification.schema.enum';
import { configService } from 'src/core/config.service';
import { v4 as uuid } from 'uuid';

export type VerificationDocument = HydratedDocument<Verification>;

@Schema({ timestamps: true })
export class Verification {
    @Prop({
        required: false,
        type: Number,
        ref: User.name,
    })
    user: number;

    @Prop({
        required: true,
        default: uuid,
        unique: true,
    })
    code: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop({
        default: () => generateDefaultExpirationDate(),
    })
    expiredAt: Date;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop({ default: VerificationStatusEnum.PENDING })
    status: VerificationStatusEnum;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

const generateDefaultExpirationDate = () => {
    const { expiresInMs } = configService.getVerificationConfig();
    return new Date(Date.now() + expiresInMs);
};
