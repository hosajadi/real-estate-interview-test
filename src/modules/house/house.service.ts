import { Injectable, NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import {House, HouseDocument} from 'src/schemas/house.schema';
import {
    IExploreHousesServiceInput,
    IExploreHousesServiceOutput,
    ICreateHouseServiceInput,
} from './house.interface';
import { generateReportMeta } from 'src/utils/report.utils';
import {UserService} from "../user/user.service";
import {AppService} from "../../app.service";

@Injectable()
export class HouseService {
    constructor(
        @InjectModel(House.name)
        private readonly houseModel: Model<House>,
        private readonly userService: UserService,
        private readonly appService: AppService,
    ) {}
    async getHouse(houseId: number): Promise<House> {
        const house = await this.houseModel.findById(houseId).lean();

        if (!house) {
            throw new NotFoundException('The house not found!');
        }

        return house;
    }
    async createHouse(input: ICreateHouseServiceInput): Promise<House>{
        const user = await this.userService.getUserById(input.hostId);
        if (!user) {
            throw new NotFoundException('The host not found!');
        }
        const newId = await this.appService.getNextSequenceValue('house');
        const house = await this.houseModel.create({
            _id: newId,
            host: input.hostId,
            location: {
                type: 'Point',
                coordinates: input.coordinates,
            }
        });
        return house;
    }
    async exploreCoaches(
        input: IExploreHousesServiceInput
    ): Promise<IExploreHousesServiceOutput> {
        const { location, distanceInMilesMax, distanceInMilesMin, pageSize, page } = input;

        const houses = await this.houseModel.aggregate([
            {
                $geoNear: {
                    distanceField: 'dist.calculated',
                    near: {
                        type: 'Point',
                        coordinates: [
                            Number(location.lng),
                            Number(location.lat),
                        ],
                    },
                    maxDistance: distanceInMilesMax ? distanceInMilesMax * 1609.34 : 10 ** 12,
                    minDistance: distanceInMilesMin ? distanceInMilesMin * 1609.34 : 0,
                    spherical: true,
                    includeLocs: 'dist.location',
                    query: {},
                    key: 'location.coordinates',
                },
            },
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [
                        { $skip: Number(pageSize) * (Number(page) - 1) },
                        { $limit: Number(pageSize) },
                    ],
                },
            },
        ]);
        return {
            meta: generateReportMeta({
                page: page,
                pageSize: pageSize,
                total: houses[0].metadata[0] ? houses[0].metadata[0].totalCount : 0,
            }),
            houses: houses[0].data,
        };
    }
}
