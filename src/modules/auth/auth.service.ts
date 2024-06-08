import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable, UnauthorizedException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserToken} from 'src/schemas/user.token.schema';
import {
    ILoginUserServiceInput,
    ILoginUserServiceOutput,
    IRegisterUserServiceInput,
    IRegisterUserServiceOutput,
    ISetPasswordServiceInput,
    ILoginServiceInput,
    ILoginServiceOutput,
    IGenerateAccessTokenServiceInput,
    IGenerateTokenServiceOutput, IGenerateRefreshTokenServiceInput, IVerifyTokenServiceOutput,
} from './auth.interface';
import {UserService} from 'src/modules/user/user.service';
import {UserCredentials} from 'src/schemas/user.credentials.schema';
import {VerificationService} from '../user/verification/verification.service';
import {UserTokenTypeEnum,} from 'src/enums/customer.token.schema.enum';
import {calculateExpirationDate, comparePasswordHash} from 'src/utils/user.utils';
import { configService } from 'src/core/config.service';
import {JwtService} from "@nestjs/jwt";
import {IJWTToken} from "../../core/interfaces";
import {AppService} from "../../app.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserToken.name)
        private readonly userTokenModel: Model<UserToken>,
        @InjectModel(UserCredentials.name)
        private readonly userCredentialsModel: Model<UserCredentials>,
        private readonly userService: UserService,
        private readonly customerVerificationService: VerificationService,
        private readonly jwtService: JwtService,
    ) {}

    async registerUser(input: IRegisterUserServiceInput):Promise<IRegisterUserServiceOutput> {
        const user = await this.userService.getUserByEmail(input.email);
        if (user) {
            throw new BadRequestException('This email is already submitted');
        }

        const newUser = await this.userService.createUser({
            userName: input.userName,
            email: input.email,
        });

        await this.setPassword({
            userId: newUser._id,
            password: input.password,
        });
        const emailVerification = await this.customerVerificationService.createUserEmailVerification(
            {
                userId: newUser._id,
                email: newUser.email,
            });
            const loginResponse=await this.loginUser({
                user: newUser,
                password: input.password,
            });
        return {
            user: {
                id: newUser._id,
                userName: newUser.user_name,
                email: newUser.email,
                createdAt: newUser.created_at,
            },
            emailVerificationCode: emailVerification.code,
            accessToken:loginResponse.accessToken,
            refreshToken:loginResponse.refreshToken,
            accessTokenExpiresAt:loginResponse.accessTokenExpiresAt,
            refreshTokenExpiresAt:loginResponse.refreshTokenExpiresAt
        };
    }
    async setPassword(input: ISetPasswordServiceInput): Promise<void> {
        const { userId, password } = input;

        const existingCredential = await this.userCredentialsModel.findOne({ user: userId }).lean();
        if (existingCredential){
            throw new BadRequestException('User already has a password');
        }

        await this.userCredentialsModel.create({
            user: userId,
            password,
        });
    }

    async loginUser(
        body: ILoginUserServiceInput
    ): Promise<ILoginUserServiceOutput> {
        const { password, user } = body;
        const customerCredentials = await this.userCredentialsModel
            .findOne({ user: user._id })
            .lean();
        if (!customerCredentials){
            throw new UnauthorizedException('Email or password does not match.');
        }

        // compare password
        // const passwordMatched = await comparePasswordHash(
        //     password,
        //     customerCredentials.password
        // );
        const  passwordMatched = password === customerCredentials.password;

        if (!passwordMatched){
            throw new UnauthorizedException('Email or password does not match.');
        }

        const tokenPayload = {
            sub: user._id,
            iat: Date.now(),
        };
        const accessToken = this.generateAccessToken(tokenPayload);
        const refreshToken = await this.generateRefreshToken(tokenPayload);

        return {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
            accessTokenExpiresAt: accessToken.expiresAt,
            refreshTokenExpiresAt: refreshToken.expiresAt,
        };
    }

    async login(input: ILoginServiceInput): Promise<ILoginServiceOutput> {
        const { email, password } = input;
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            const result = await this.loginUser({
                user: user,
                password,
            });
            return {
                ...result,
                user: {
                    id: user._id,
                    email: user.email,
                    userName: user.user_name,
                    createdAt: user.created_at,
                },
            };
        }

        throw new HttpException(
            'Email or password does not match',
            HttpStatus.UNAUTHORIZED
        );
    }

    generateAccessToken(
        payload: IGenerateAccessTokenServiceInput
    ): IGenerateTokenServiceOutput {
        const config = configService.getTokenConfig('access');
        const token = this.jwtService.sign(payload, {
            expiresIn: config.expiresIn,
            secret: config.secret,
        });
        return {
            token: token,
            expiresAt: new Date(calculateExpirationDate(config.expiresIn)),
        };
    }

    async generateRefreshToken(
        payload: IGenerateRefreshTokenServiceInput
    ): Promise<IGenerateTokenServiceOutput> {
        const config = configService.getTokenConfig('refresh');
        const token = this.jwtService.sign(payload, {
            expiresIn: config.expiresIn,
            secret: config.secret,
        });
        const expiredAt = calculateExpirationDate(config.expiresIn);
        //save the refresh token in db
        const newToken = new this.userTokenModel({
            user: payload.sub,
            token,
            type: UserTokenTypeEnum.REFRESH,
            expiredAt,
        });
        await newToken.save();
        return { token, expiresAt: new Date(expiredAt) };
    }

    async verifyAccessToken(token: string): Promise<IVerifyTokenServiceOutput> {
        const config = configService.getTokenConfig('access');
        try {
            const decoded: IJWTToken = this.jwtService.verify(token, {
                secret: config.secret,
            });
            const user = await this.userService.getUserById(decoded.sub);
            if (!user) {
                throw new Error('Customer not found');
            }
            return { verified: true, user };
        } catch (error) {
            return { verified: false, user: null };
        }
    }
}
