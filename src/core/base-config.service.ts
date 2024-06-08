import { config } from 'dotenv-safe';
import { join } from 'path';
import { existsSync } from 'fs';

config({
    path: join(__dirname, '../../.env'),
    example: join(__dirname, '../../.env.example'),
    allowEmptyValues: true,
});

export class BaseConfig {
    private readonly baseDir: string;

    constructor(private readonly env: { [k: string]: string | undefined }) {
        let current = __dirname;
        while (!existsSync(join(current, 'node_modules'))) {
            current = join(current, '../');
        }
        this.baseDir = current;
    }

    protected asBool(v: string): boolean {
        return ['t', 'true', '1'].includes(v.toLowerCase());
    }

    public getValue(key: string, throwOnMissing = false): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value || '';
    }
    public getGlobalPrefix(): string {
        return this.getValue('PREFIX_URL');
    }
    public getHTTPAddress(): string {
        return this.getValue('PORT');
    }
    public getSwaggerEnabled(): boolean {
        try {
            return this.asBool(this.getValue('ENABLE_SWAGGER'));
        } catch (e) {
            return false;
        }
    }
    public getSwaggerPatch(): string {
        return this.getValue('SWAGGER_PATCH');
    }
    public getSwaggerCustomername(): string {
        return this.getValue('SWAGGER_USERNAME');
    }
    public getSwaggerPassword(): string {
        return this.getValue('SWAGGER_PASSWORD');
    }
    public getSwaggerTitle(): string {
        return this.getValue('SWAGGER_TITLE');
    }
    public getSwaggerDescription(): string {
        return this.getValue('SWAGGER_DESCRIPTION');
    }
    public getSwaggerVersion(): string {
        return this.getValue('SWAGGER_VERSION');
    }
    public getSwaggerSite(): string {
        return this.getValue('SWAGGER_SITE');
    }
    public getSwaggerEmail(): string {
        return this.getValue('SWAGGER_EMAIL');
    }
    public getDefaultLanguage(): string {
        return this.getValue('DEFAULT_LANGUAGE');
    }
    public getMongoUri(): string {
        return this.getValue('MONGODB_DATABASE_URL');
    }
    public getMailHost(): string {
        return this.getValue('MAIL_HOST');
    }
    public getMailPort(): string {
        return this.getValue('MAIL_PORT');
    }
    public getMailSecure(): boolean {
        try {
            return this.asBool(this.getValue('MAIL_SECURE'));
        } catch (e) {
            return false;
        }
    }
    public getMailCustomer(): string {
        return this.getValue('MAIL_USER');
    }
    public getMailPassword(): string {
        return this.getValue('MAIL_PASSWORD');
    }
    public getMailFrom(): string {
        return this.getValue('MAIL_FROM');
    }
    public getMailFromName(): string {
        return this.getValue('MAIL_FROM_NAME');
    }
    public getTokenConfig(type: 'refresh' | 'access'): {
        expiresIn: string;
        secret: string;
    } {
        return type === 'access' ? {
            expiresIn: this.getValue('ACCESS_TOKEN_EXPIRATION'),
            secret: this.getValue('ACCESS_TOKEN_SECRET'),
        }: {
            expiresIn: this.getValue('REFRESH_TOKEN_EXPIRATION'),
            secret: this.getValue('REFRESH_TOKEN_SECRET'),
        };
    }
    public getVerificationConfig(): { expiresInMs: number } {
        return {
            expiresInMs: Number(
                this.getValue('VERIFICATION_CODE_EXPIRATION_TIME_MS')
            ),
        };
    }

    public getMailgunConfig() {
        return {
            apiKey: this.getValue('MAILGUN_API_KEY'),
            domain: this.getValue('MAILGUN_DOMAIN'),
            apiBaseUrl: this.getValue('MAILGUN_API_BASE_URL'),
            username: this.getValue('MAILGUN_USERNAME'),
        };
    }
    public getTwilioConfig() {
        return {
            accountSid: this.getValue('TWILIO_ACCOUNT_SID'),
            authToken: this.getValue('TWILIO_AUTH_TOKEN'),
            verifyServiceId: this.getValue('TWILIO_VERIFY_SERVICE_ID'),
        };
    }
}
