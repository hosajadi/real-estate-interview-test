import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import {UserToken, UserTokenSchema,} from 'src/schemas/user.token.schema';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserVerificationModule } from '../user/verification/userVerificationModule';
import {
    UserCredentials,
    UserCredentialsSchema,
} from 'src/schemas/user.credentials.schema';
import { JwtModule } from '@nestjs/jwt';
import { HouseModule } from 'src/modules/house/house.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserCredentials.name,
                schema: UserCredentialsSchema,
            },
            { name: UserToken.name, schema: UserTokenSchema },
        ]),
        JwtModule.register({}),
        forwardRef(() => UserModule),
        forwardRef(() => UserVerificationModule),
        forwardRef(() => HouseModule),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
