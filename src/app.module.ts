import "./polyfill"
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contextMiddleware } from './middlewares';
import { ApiConfigService } from './shared/api-config.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { SeedService } from "./console/seed.service";
import { ConsoleModule } from 'nestjs-console';
import { HealthCheckerModule } from './modules/health_check/health-check.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) =>
                configService.typeOrmConfig,
            inject: [ApiConfigService],
        }),
        UserModule,
        ConsoleModule,
        HealthCheckerModule],
    controllers: [],
    providers: [SeedService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
