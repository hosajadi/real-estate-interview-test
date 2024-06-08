import { Injectable } from '@nestjs/common';
import { Customer } from '../entity/customer.interface';
import { MailerService } from '@nestjs-modules/mailer';
import Mailgun, { Interfaces as MailgunInterfaces } from 'mailgun.js';
import * as FormData from 'form-data';
import { configService } from 'src/core/config.service';

@Injectable()
export class MailService {
    private readonly domain: string;
    private readonly apiKey: string;
    private readonly username: string;
    private readonly mg: MailgunInterfaces.IMailgunClient;
    private readonly fromEmail: string;
    private readonly fromName: string;
    constructor(private mailerService: MailerService) {
        const mailgunConfig = configService.getMailgunConfig();
        this.domain = mailgunConfig.domain;
        this.apiKey = mailgunConfig.apiKey;
        this.username = mailgunConfig.username;
        this.fromEmail = configService.getMailFrom();
        this.fromName = configService.getMailFromName();
        const mailgun = new Mailgun(FormData);
        console.log(this.username, this.apiKey);
        this.mg = mailgun.client({
            username: this.username,
            key: this.apiKey,
            url: mailgunConfig.apiBaseUrl,
        });
    }

    async sampleSendEmail(customer: Customer, code: string, app: string) {
        this.mailerService.sendMail({
            to: customer.email,
            subject: `Welcome to ${app} App | Email confirmation`,
            context: {
                name: customer.name,
                code,
            },
            html: `
        <p>Hey ${customer.name},</p>
        <p>Please enter below code to ${app} App.</p>
        <p>
            Your code is: ${code}
        </p>
        <p>This Code is active for 5 Minute.</p>
          
        <p>If you did not request this email you can safely ignore it.</p>
        `,
        });
    }

    async sendEmail(input: {
        to: string;
        subject: string;
        variables?: any;
        template?: string;
        bodyHTML?: string;
        bodyText?: string;
    }) {
        try {
            const info = {
                from: `${this.fromName} <${this.fromEmail}>`,
                to: input.to,
                subject: input.subject,
                template: input.template,
                'h:X-Mailgun-Variables': JSON.stringify(input.variables),
                text: input.bodyText,
                html: input.bodyHTML,
            };

            console.table({
                apikey: this.apiKey,
                username: this.username,
                domain: this.domain,
            });

            const response = await this.mg.messages.create(this.domain, info);
            console.log(response);
            return { sent: true };
        } catch (e) {
            console.error(e);
            return { sent: false };
        }
    }
}
export enum EmailTemplateEnum {
    USER_EMAIL_VERIFICATION = 'customer-email-verification',
}
