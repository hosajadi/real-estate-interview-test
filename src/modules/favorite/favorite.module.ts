import {forwardRef, Module} from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import {Favorite, FavoriteSchema} from "../../schemas/favorite.schema";
import {HouseModule} from "../house/house.module";
import {AppModule} from "../../app.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Favorite.name, schema: FavoriteSchema },
        ]),
        forwardRef(()=> AuthModule),
        forwardRef(()=> HouseModule),
        forwardRef(()=> AppModule)
    ],
    providers: [FavoriteService],
    controllers: [FavoriteController],
    exports: [FavoriteService],
})
export class FavoriteModule {}
