import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { configService } from 'src/core/config.service';
import { Twilio } from 'twilio';

@Injectable()
export class SMSService {
    private twilioClient: Twilio;
    private twilioVerifyServiceId: string;

    constructor() {
        const twilioConfig = configService.getTwilioConfig();
        this.twilioClient = new Twilio(
            twilioConfig.accountSid,
            twilioConfig.authToken
        );
        this.twilioVerifyServiceId = twilioConfig.verifyServiceId;
        console.log(this.twilioVerifyServiceId)
    }
    
    async sendVerificationCode(input: { phone: string }) {
        try {
            console.log(this.twilioVerifyServiceId)
            const verificationResponse = await this.twilioClient.verify.v2
                .services(this.twilioVerifyServiceId)
                .verifications.create({ to: input.phone, channel: 'sms' });
            return {
                sent: true,
            };
        } catch (e) {
            console.error(e);
            throw new HttpException(
                `Error sending verification code. Please check the phone is correct: ${input.phone}`,
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async verifyCode(input: { phone: string; code: string }) {
        try {
            console.log(input)
            const verificationResponse = await this.twilioClient.verify.v2
                .services(this.twilioVerifyServiceId)
                .verificationChecks.create({
                    to: input.phone,
                    code: input.code,
                });
            return {
                verified: verificationResponse.status === 'approved',
            };
        } catch (e) {
            console.error(e);
            throw new HttpException(
                'Error verifying code',
                HttpStatus.SERVICE_UNAVAILABLE
            );
        }
    }
}
