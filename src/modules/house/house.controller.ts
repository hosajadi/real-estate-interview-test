import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject, Param,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import { I18nService } from 'nestjs-i18n';
import { configService } from 'src/core/config.service';
import { LanguageList } from 'src/core/language';
import { genResp } from 'src/utils/response.utils';
import { HouseService } from './house.service';
import {ExploreHousesDto, CreateHouseDto,} from './house.dto';

@ApiTags('📱 House')
@Controller('house')
export class HouseController {
    defaultLanguage: LanguageList =
        LanguageList[configService.getDefaultLanguage()];
    constructor(
        private readonly coachService: HouseService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @ApiOperation({
        summary: 'Create a house',
    })
    @ApiQuery({ name: 'language', enum: LanguageList, required: true })
    @Post('/create')
    async createHouse(
        @Body() body: CreateHouseDto,
        @Query('language') language: LanguageList = this.defaultLanguage,
    ) {
        const result = await this.coachService.createHouse({
            hostId: Number(body.hostId),
            latitude: Number(body.locationLat),
            longitude: Number(body.locationLng),
            price: Number(body.price),
            coordinates: [
                Number(body.locationLng),
                Number(body.locationLat),
            ]
        });
        return await genResp({
            i18n: this.i18nService,
            data: result,
            statusCode: HttpStatus.OK,
            responseName: 'server.house.HOUSE_CREATED_SUCCESS',
            language,
        });
    }

    @ApiOperation({ summary: 'Explore Coaches by Guests or Customers' })
    @ApiQuery({ name: 'language', enum: LanguageList, required: true })
    @Get('/explore')
    async exploreCoaches(
        @Query('language') language: LanguageList = this.defaultLanguage,
        @Query() query: ExploreHousesDto
    ) {
        if (
            (query.locationLat || query.locationLng) &&
            !(query.locationLat && query.locationLng)
        ) {
            throw new HttpException('Both locationLat and locationLng are required', HttpStatus.BAD_REQUEST);
        }
        query.filterMinDistanceInMiles = Number(query.filterMinDistanceInMiles);
        query.filterMaxDistanceInMiles = Number(query.filterMaxDistanceInMiles);
        if (
            query.filterMinDistanceInMiles &&
            query.filterMaxDistanceInMiles &&
            query.filterMinDistanceInMiles > query.filterMaxDistanceInMiles
        ){
            throw new HttpException('Min distance should be less than max distance', HttpStatus.BAD_REQUEST);
        }
        const result = await this.coachService.exploreCoaches({
            distanceInMilesMax: query.filterMaxDistanceInMiles,
            distanceInMilesMin: query.filterMinDistanceInMiles,
            location: {
                lat: Number(query.locationLat),
                lng: Number(query.locationLng),
            },
            page: query.page,
            pageSize: query.pageSize,
        });
        return await genResp({
            i18n: this.i18nService,
            data: {
                ...result,
            },
            statusCode: HttpStatus.OK,
            responseName: 'server.house.HOUSE_EXPLORE_SUCCESS',
            language,
        });
    }


    @ApiOperation({ summary: 'Get a House by ID' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @Get('/:houseId')
    async getHouseById(
        @Query('language') language: LanguageList = LanguageList[configService.getDefaultLanguage()],
        @Param('houseId') houseId: string
    ) {
        const user = await this.coachService.getHouse(Number(houseId));
        return genResp({
            data: { user },
            responseName: 'server.house.GET_HOUSE_BY_ID_SUCCESS',
            language,
            i18n: this.i18nService,
            statusCode: HttpStatus.OK,
        });
    }
}
