import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './core/config.service';
import * as basicAuth from 'express-basic-auth';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    // set global prefix for backend
    app.setGlobalPrefix(configService.getGlobalPrefix());

    // set login for swagger patch
    app.use(
        `/${configService.getSwaggerPatch()}`,
        basicAuth({
            challenge: true,
            users: {
                [configService.getSwaggerCustomername()]:
                    configService.getSwaggerPassword(),
            },
        })
    );

    // enable versioning
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // Use Validation Pipe
    app.useGlobalPipes(new ValidationPipe());

    // setup swagger documents
    if (configService.getSwaggerEnabled() == true) {
        const config = new DocumentBuilder()
            .setTitle(configService.getSwaggerTitle())
            .setDescription(configService.getSwaggerDescription())
            .setContact(
                configService.getSwaggerTitle(),
                configService.getSwaggerSite(),
                configService.getSwaggerEmail()
            )
            .setVersion(configService.getSwaggerVersion())
            .addBearerAuth({
                type: 'http',
                in: 'docs',
                name: 'Authorization',
                bearerFormat: 'jwt',
            })
            .build();
        const document = SwaggerModule.createDocument(app, config, {
            ...configService.getExtraModels(),
        });
        SwaggerModule.setup(configService.getSwaggerPatch(), app, document);
    }

    await app.listen(configService.getHTTPAddress(), () => {
        console.log(
            `Server is running on port ${configService.getHTTPAddress()}`
        );
    });
}
bootstrap();
