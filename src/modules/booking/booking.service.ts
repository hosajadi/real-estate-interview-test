import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from '../../schemas/booking.schema';
import {HouseService} from "../house/house.service";
import {AppService} from "../../app.service";
@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>,
        private readonly houseService: HouseService,
        private readonly appService: AppService
    ) {}

    async bookAHouse(userId: number, houseId: number){
        const house = await this.houseService.getHouse(houseId);
        const booking = await this.bookingModel.findOne({
            house: houseId,
        });
        if (booking) {
            throw new BadRequestException('This house has been already booked!');
        }
        const newId = await this.appService.getNextSequenceValue('booking');
        return this.bookingModel.create({
            _id: newId,
           house: houseId,
           guest: userId,
           host: house.host
        });
    }

    async bookedList(userId: number){
        return this.bookingModel.find({
            guest: userId,
        });
    }
}
