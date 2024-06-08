import { IGeneralResponse } from 'src/core/interfaces';
export interface IVerifyCustomerEmailResponse extends IGeneralResponse {
    data: {
        verified: boolean;
    };
}
export interface ICreateUserEmailVerificationServiceInput {
    userId: number;
    email: string;
}

export interface IVerifyCustomerEmailServiceInput {
    email: string;
    verificationCode: string;
}

export interface IVerifyCustomerEmailServiceOutput {
    verified: boolean;
}
