import { Module, forwardRef } from '@nestjs/common';
import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { cwd } from 'process';
import { configService } from './core/config.service';
import { EmailModule } from './modules/public/mail/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { UserVerificationModule } from './modules/user/verification/userVerificationModule';
import { HouseModule } from './modules/house/house.module';
import { BookingModule } from './modules/booking/booking.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import {AuthModule} from "./modules/auth/auth.module";
import {AppService} from "./app.service";
import {IdCounter, IdCounterSchema} from "./schemas/id.schema";

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(cwd(), '/src/i18n/'),
                watch: true,
            },
            resolvers: [
                new QueryResolver(['lang', 'l']),
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
            ],
        }),
        MongooseModule.forRoot(configService.getMongoUri(), {useNewUrlParser: true,}),
        EmailModule,
        AuthModule,
        UserVerificationModule,
        HouseModule,
        BookingModule,
        FavoriteModule,
        forwardRef(() => UserModule),
        MongooseModule.forFeature([
            {name: IdCounter.name, schema: IdCounterSchema,}
        ]),
    ],
    controllers: [],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
