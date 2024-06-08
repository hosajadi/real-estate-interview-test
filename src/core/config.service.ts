import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { BaseConfig } from './base-config.service';

class Config extends BaseConfig {
    public getExtraModels(): SwaggerDocumentOptions {
        return {
            extraModels: [],
        };
    }
}

const configService = new Config(process.env);

type ConfigService = typeof configService;

export { configService, ConfigService };
