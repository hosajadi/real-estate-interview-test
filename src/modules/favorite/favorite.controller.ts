import {
    Controller,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { I18nService } from 'nestjs-i18n';
import { configService } from 'src/core/config.service';
import { ILoggedInUserRequest } from 'src/core/interfaces';
import { LanguageList } from 'src/core/language';
import { UserGuard } from 'src/guards/user-guard.service';
import { genResp } from 'src/utils/response.utils';

@ApiTags('📱 Favorite')
@Controller('favorite')
export class FavoriteController {
    defaultLanguage: LanguageList =
        LanguageList[configService.getDefaultLanguage()];
    constructor(
        private readonly favoriteService: FavoriteService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @ApiOperation({ summary: 'Get all liked houses by user' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get('like/list')
    async getLikedHouses(
        @Req() req: ILoggedInUserRequest,
        @Query('language') language: LanguageList = this.defaultLanguage,
    ) {
        const houses = await this.favoriteService.getAllLikedHouses(req.user._id);
        return await genResp({
            i18n: this.i18nService,
            data: {houses},
            statusCode: HttpStatus.OK,
            responseName: 'server.favorite.FAVORITE_LIST_SUCCESS',
            language,
        });
    }

    @ApiOperation({ summary: 'like a house' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post('like/:houseId')
    async likeAHouse(
        @Req() req: ILoggedInUserRequest,
        @Query('language')
        language: LanguageList = this.defaultLanguage,
        @Param('houseId') houseId: string
    ) {
        await this.favoriteService.likeHouse(req.user._id, Number(houseId));
        return await genResp({
            i18n: this.i18nService,
            data: {liked: true},
            statusCode: HttpStatus.OK,
            responseName: 'server.favorite.LIKE_HOUSE_SUCCESS',
            language,
        });
    }

    @ApiOperation({ summary: 'unlike a house' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post('unlike/:houseId')
    async unlikeAHouse(
        @Req() req: ILoggedInUserRequest,
        @Query('language') language: LanguageList = this.defaultLanguage,
        @Param('houseId') houseId: string
    ) {
        await this.favoriteService.unlikeHouse(req.user._id, Number(houseId));
        return await genResp({
            i18n: this.i18nService,
            data: {unliked: true},
            statusCode: HttpStatus.OK,
            responseName: 'server.favorite.UNLIKE_HOUSE_SUCCESS',
            language,
        });
    }
}
