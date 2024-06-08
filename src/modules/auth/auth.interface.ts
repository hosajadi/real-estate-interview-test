import {User, UserDocument} from "../../schemas/user.schema";
import { IJWTToken } from 'src/core/interfaces';

export type IGenerateAccessTokenServiceInput = IJWTToken;
export type IGenerateRefreshTokenServiceInput = IJWTToken;
export interface IGenerateTokenServiceOutput {
    token: string;
    expiresAt: Date;
}
export interface IRegisterUserServiceInput {
    userName: string;
    email: string;
    password: string;
}
export interface IRegisterUserServiceOutput {
    user: IUserAccountInfo;
    emailVerificationCode: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}
export interface ISetPasswordServiceInput {
    userId: number;
    password: string;
}
export interface ILoginUserServiceInput {
    user: User;
    password: string;
}
export interface ILoginUserServiceOutput {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
}
export interface ILoginServiceInput {
    email: string;
    password: string;
}
export interface ILoginServiceOutput {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    user: IUserAccountInfo;
}
export interface IUserAccountInfo {
    id: number;
    userName: string;
    email: string;
    createdAt: Date;
}

export interface IVerifyTokenServiceOutput {
    verified: boolean;
    user: UserDocument;
}
