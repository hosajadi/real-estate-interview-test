import {
    Body,
    Controller,
    HttpStatus,
    Inject,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
    LoginDto,
    RegisterUserDto,
} from './auth.dto';
import { I18nService } from 'nestjs-i18n';
import { configService } from 'src/core/config.service';
import { LanguageList } from 'src/core/language';
import { genResp } from 'src/utils/response.utils';

@ApiTags('📱Authentication')
@Controller('auth')
export class AuthController {
    defaultLanguage: LanguageList = LanguageList[configService.getDefaultLanguage()];
    constructor(
        private readonly authService: AuthService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @ApiOperation({ summary: 'Login User' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Query('language') language: LanguageList = this.defaultLanguage
    ) {
        const { email, password } = body;
        const {
            accessToken,
            refreshToken,
            accessTokenExpiresAt,
            refreshTokenExpiresAt,
        } = await this.authService.login({ email, password });
        return await genResp({
            i18n: this.i18nService,
            data: {
                accessToken,
                refreshToken,
                accessTokenExpiresAt,
                refreshTokenExpiresAt,
            },
            statusCode: HttpStatus.OK,
            responseName: 'server.user.LOGIN_SUCCESS',
            language,
        });
    }

    @ApiOperation({ summary: 'User Register' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @Post('register')
    async registerUser(
        @Body() body: RegisterUserDto,
        @Query('language')
        language: LanguageList = this.defaultLanguage
    ) {
        const {
            user,
            emailVerificationCode,
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
        } = await this.authService.registerUser(body);

        return genResp({
            i18n: this.i18nService,
            data: {
                accessToken,
                accessTokenExpiresAt,
                refreshToken,
                refreshTokenExpiresAt,
                user: user,

                _emailVerificationCode: emailVerificationCode,
            },
            statusCode: HttpStatus.OK,
            responseName: 'server.user.USER_REGISTER_SUCCESS',
            language,
        });
    }
}
