import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { configService } from '../../../core/config.service';
import { MailService } from './services/mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: configService.getMailHost(),
                port: configService.getMailPort(),
                secure: configService.getMailSecure(),
                auth: {
                    customer: configService.getMailCustomer(),
                    pass: configService.getMailPassword(),
                },
            },
            defaults: {
                from: `"No Reply" <${configService.getMailFrom()}>`,
            },
            template: {
                dir: process.cwd() + '/src/modules/mail/templates/',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [],
    providers: [MailService],
    exports: [MailService],
})
export class EmailModule {}
