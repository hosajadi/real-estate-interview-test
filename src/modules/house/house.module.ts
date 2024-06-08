import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { FavoriteModule } from '../favorite/favorite.module';
import { EmailModule } from '../public/mail/email.module';
import { BookingModule } from 'src/modules/booking/booking.module';
import {House, HouseSchema} from "../../schemas/house.schema";
import {UserModule} from "../user/user.module";
import {AppModule} from "../../app.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
        forwardRef(() => UserModule),
        forwardRef(() => AppModule),
    ],
    controllers: [HouseController],
    providers: [HouseService],
    exports: [HouseService],
})
export class HouseModule {}
