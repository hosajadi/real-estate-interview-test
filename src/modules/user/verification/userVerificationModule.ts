import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Verification,
    VerificationSchema,
} from 'src/schemas/verification.schema';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { UserModule } from '../user.module';
import { AuthModule } from '../../auth/auth.module';
import { EmailModule } from 'src/modules/public/mail/email.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Verification.name, schema: VerificationSchema },
        ]),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        EmailModule,
    ],
    providers: [VerificationService],
    controllers: [VerificationController],
    exports: [VerificationService],
})
export class UserVerificationModule {}
