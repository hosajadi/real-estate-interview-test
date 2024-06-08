import {forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { BookingService } from './booking.service';
import { AuthModule } from '../auth/auth.module';
import { BookingController } from './booking.controller';
import {EmailModule} from "../public/mail/email.module";
import {User, UserSchema} from "../../schemas/user.schema";
import {HouseModule} from "../house/house.module";
import {AppModule} from "../../app.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Booking.name, schema: BookingSchema },
            { name: User.name, schema: UserSchema },
        ]),
        forwardRef(()=> AuthModule),
        forwardRef(()=> HouseModule),
        forwardRef(()=> AppModule),
    ],
    providers: [BookingService],
    controllers: [BookingController],
})
export class BookingModule {}
