import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Verification,
    VerificationDocument,
} from 'src/schemas/verification.schema';
import {generateVerificationCode,} from 'src/utils/user.utils';
import { UserService } from 'src/modules/user/user.service';
import { VerificationStatusEnum } from 'src/enums/customer.verification.schema.enum';
import { EmailTemplateEnum, MailService } from 'src/modules/public/mail/services/mail.service';
import {
    ICreateUserEmailVerificationServiceInput,
    IVerifyCustomerEmailServiceInput, IVerifyCustomerEmailServiceOutput
} from "./verification.interface";

@Injectable()
export class VerificationService {
    constructor(
        @InjectModel(Verification.name)
        private verificationModel: Model<VerificationDocument>,
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) {}
    async createUserEmailVerification(input: ICreateUserEmailVerificationServiceInput): Promise<Verification> {
        const user = await this.userService.getUserById(input.userId);
        if (!user){
            throw new NotFoundException('The user not found!');
        }

        const verificationCode = generateVerificationCode(6, true);
        const result = await this.verificationModel.create({
            user: input.userId,
            email: input.email,
            code: verificationCode,
        });

        this.mailService.sendEmail({
                to: input.email,
                subject: 'Email Verification',
                template: EmailTemplateEnum.USER_EMAIL_VERIFICATION,
                variables: {
                    code: verificationCode,
                    userName: user.user_name,
                    email: user.email
                },
            })
            .catch((e) => {
                console.log(e);
            });
        return result;
    }

    async verifyCustomerEmail(
        data: IVerifyCustomerEmailServiceInput
    ): Promise<IVerifyCustomerEmailServiceOutput> {
        const verification = await this.verificationModel.findOneAndUpdate(
            {
                email: data.email,
                code: data.verificationCode,
                status: VerificationStatusEnum.PENDING,
                expiredAt: { $gt: new Date() },
                customer: { $ne: null },
            },
            {
                $set: { status: VerificationStatusEnum.VERIFIED },
            },
            { new: true }
        );
        if (!verification){
            throw new BadRequestException('Invalid verification code');
        }

        const user = await this.userService.updateUserEmailVerified(
            verification.user
        );
        if (!user){
            throw new NotFoundException('The user not found');
        }

        return {
            verified: true,
        };
    }
}
