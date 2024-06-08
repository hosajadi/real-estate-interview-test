import {
    Controller, Get,
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
import { I18nService } from 'nestjs-i18n';
import { configService } from 'src/core/config.service';
import { LanguageList } from 'src/core/language';
import { genResp } from 'src/utils/response.utils';
import { BookingService } from './booking.service';
import { UserGuard } from 'src/guards/user-guard.service';
import { ILoggedInUserRequest } from 'src/core/interfaces';

@ApiTags('📱 Booking')
@Controller('booking')
export class BookingController {
    defaultLanguage: LanguageList = LanguageList[configService.getDefaultLanguage()];
    constructor(
        private readonly bookingService: BookingService,
        @Inject(I18nService) private readonly i18nService: I18nService
    ) {}

    @ApiOperation({ summary: 'Book a house by user' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post('/book/:houseId')
    async bookAHouse(
        @Req() req: ILoggedInUserRequest,
        @Query('language') language: LanguageList = this.defaultLanguage,
        @Param('houseId') houseId: string
        ){
        await this.bookingService.bookAHouse(req.user._id, Number(houseId));
        return await genResp({
            i18n: this.i18nService,
            data: {
                booked: true,
            },
            statusCode: HttpStatus.OK,
            responseName: 'server.booking.BOOK_HOUSE_SUCCESS',
            language,
        });
    }

    @ApiOperation({ summary: 'Get Booked list of the user' })
    @ApiQuery({ name: 'language', enum: LanguageList })
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get()
    async bookedList(
        @Req() req: ILoggedInUserRequest,
        @Query('language') language: LanguageList = this.defaultLanguage,
    ){
        const bookedHouses = await this.bookingService.bookedList(req.user._id);
        return await genResp({
            i18n: this.i18nService,
            data: {
                bookedHouses
            },
            statusCode: HttpStatus.OK,
            responseName: 'server.booking.GET_BOOKING_LIST_SUCCESS',
            language,
        });
    }
}
