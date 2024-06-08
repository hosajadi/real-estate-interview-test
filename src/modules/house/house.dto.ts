import {
    IsNotEmpty,
    IsNumber,
    Min,
    IsOptional,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateHouseDto {
    @ApiProperty({
        description: 'The longitude of the location',
        type: Number,
        required: true,
        example: 40.73061,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    locationLng: number;

    @ApiProperty({
        description: 'The latitude of the location',
        type: Number,
        required: true,
        example: 40.73061,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    locationLat: number;

    @ApiProperty({
        description: 'The price of the house',
        type: Number,
        required: true,
        example: 40000,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number;

    @ApiProperty({
        description: 'The host id',
        type: Number,
        required: true,
        example: 4006,
    })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    hostId: number;
}

export class ExploreHousesDto {
    @ApiProperty({
        example: 1,
        description: 'The page number',
        required: true,
        type: Number,
    })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number;

    @ApiProperty({
        example: 10,
        description: 'The number of coaches to return',
        required: true,
        type: Number,
    })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    pageSize: number;

    @ApiProperty({
        description: 'The longitude of the location',
        type: Number,
        required: true,
        example: -73.935242,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    locationLng: number;

    @ApiProperty({
        description: 'The latitude of the location',
        type: Number,
        required: true,
        example: 40.73061,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    locationLat: number;

    @ApiProperty({
        example: 5,
        description: 'The minimum distance between the coaches and the user in miles',
        required: true,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    filterMinDistanceInMiles: number;

    @ApiProperty({
        example: 10,
        description: 'The maximum distance between the coaches and the user in miles',
        required: true,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    filterMaxDistanceInMiles: number;
}
