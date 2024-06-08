import { I18nService } from 'nestjs-i18n';
import { LanguageList } from './language';
import { HttpStatus } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';

export interface IGenRespUtilInput {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message?: string;
    code?: string;
    responseName?: string;
    statusCode: HttpStatus;
    i18n?: I18nService;
    language?: LanguageList;
    additionalData?: object;
    mock?: true;
}

export interface IGeneralResponse {
    message: string;
    code: string;
    statusCode: HttpStatus;
    _mock?: boolean;
}

export interface IGenRespUtilOutput extends IGeneralResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
export interface ILoggedInUserRequest extends Request {
    user: UserDocument;
}

export interface ICoordinates {
    lat: number;
    lng: number;
}

export interface IReportMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface IJWTToken {
    sub: number;
    exp?: number;
    iat: number;
}
