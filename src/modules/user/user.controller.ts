import {
    Controller,
    Get,
    UseGuards,
    Req,
    Inject,
    Query,
    HttpStatus, Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/guards/user-guard.service';
import { ILoggedInUserRequest } from 'src/core/interfaces';
import { LanguageList } from 'src/core/language';
import { configService } from 'src/core/config.service';
import { genResp } from 'src/utils/response.utils';
import { I18nService } from 'nestjs-i18n';

@ApiTags('📱 User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}
    @ApiOperation({ summary: 'User Profile' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'language', enum: LanguageList })
    @Get('profile')
    @UseGuards(UserGuard)
    async getUserProfile(
        @Req() req: ILoggedInUserRequest,
        @Query('language')
        language: LanguageList = LanguageList[configService.getDefaultLanguage()]
    ) {
        const user = await this.userService.getUserProfile(
            req.user._id
        );
        return genResp({
            data: { user },
            responseName: 'server.user.USER_PROFILE_SUCCESS',
            language,
            i18n: this.i18nService,
            statusCode: HttpStatus.OK,
        });
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @Get('profile/:userId')
    async getUserById(
        @Query('language') language: LanguageList = LanguageList[configService.getDefaultLanguage()],
        @Param('userId') userId: string
    ) {
        const user = await this.userService.getUserById(Number(userId));
        return genResp({
            data: { user },
            responseName: 'server.user.USER_PROFILE_BY_ID_SUCCESS',
            language,
            i18n: this.i18nService,
            statusCode: HttpStatus.OK,
        });
    }
}
