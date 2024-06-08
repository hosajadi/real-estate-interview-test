import {
    Controller,
    Post,
    Body,
    HttpStatus,
    Inject,
    Query,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import {
    ApiAcceptedResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import {VerifyCustomerEmailDto,} from './verification.req.dto';
import { I18nService } from 'nestjs-i18n';
import { genResp } from 'src/utils/response.utils';
import {
    IVerifyCustomerEmailResponse,
} from './verification.interface';
import { configService } from 'src/core/config.service';
import { LanguageList } from 'src/core/language';

@ApiTags('📱 APP > Customer Verification')
@Controller('app/customer/verification')
export class VerificationController {
    constructor(
        private readonly customerVerificationService: VerificationService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}
    @ApiOperation({
        summary: 'Verify Customer Email',
        description:
            'This API is used to verify customer email via verification code.',
        tags: ['Customer Verification'],
    })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiAcceptedResponse({
        description: 'Customer Email Verified',
    })
    @Post('email')
    async verifyCustomerEmail(
        @Body() body: VerifyCustomerEmailDto,
        @Query('language')
        language: LanguageList = LanguageList[
            configService.getDefaultLanguage()
        ]
    ): Promise<IVerifyCustomerEmailResponse> {
        const { verified } =
            await this.customerVerificationService.verifyCustomerEmail(body);
        return await genResp({
            i18n: this.i18nService,
            data: { verified },
            statusCode: HttpStatus.OK,
            responseName: 'server.customer.VERIFY_CUSTOMER_EMAIL_SUCCESS',
            language,
        });
    }
}
