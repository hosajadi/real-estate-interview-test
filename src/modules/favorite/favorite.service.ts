import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Favorite} from "../../schemas/favorite.schema";
import {HouseService} from "../house/house.service";
import {AppService} from "../../app.service";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectModel(Favorite.name)
        private readonly favoriteModel: Model<Favorite>,
        private readonly houseService: HouseService,
        private readonly appService: AppService
    ) {}
    async likeHouse(userId: number, houseId: number){
        await this.houseService.getHouse(houseId);
        const favorite = await this.favoriteModel.findOne({
            user: userId,
            house: houseId,
        });
        if (favorite) {
            throw new BadRequestException("The house has been already liked");
        }
        const newId = await this.appService.getNextSequenceValue('favorite');
        return this.favoriteModel.create({
            _id: newId,
            house: houseId,
            user: userId,
        });
    }

    async unlikeHouse(userId: number, houseId: number){
        await this.houseService.getHouse(houseId);
        const favorite = await this.favoriteModel.findOne({
            user: userId,
            house: houseId,
        });
        if (!favorite) {
            throw new BadRequestException("The house has not been liked");
        }
        return this.favoriteModel.findOneAndDelete({
            _id: favorite._id,
        });
    }

    async getAllLikedHouses(userId: number){
        const favorites = await this.favoriteModel.find({
           user: userId,
        }).populate('house').lean();

        return favorites.map((favorite) => favorite.house);
    }
}
