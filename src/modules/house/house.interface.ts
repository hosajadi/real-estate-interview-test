import {
    ICoordinates,
    IReportMeta,
} from 'src/core/interfaces';
import {House} from "../../schemas/house.schema";

export interface ICreateHouseServiceInput {
    longitude: number;
    latitude: number;
    coordinates: number[];
    price: number;
    hostId: number;
}

export interface IExploreHousesServiceInput {
    location: ICoordinates;
    distanceInMilesMax: number;
    distanceInMilesMin: number;
    page: number;
    pageSize: number;
}

export interface IExploreHousesServiceOutput {
    meta: IReportMeta;
    houses: House[];
}

