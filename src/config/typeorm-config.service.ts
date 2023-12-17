import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: process.env.DB_CONNECTION as any,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false, // Puedes cambiar a true para sincronizar automáticamente (no recomendado en producción)
            migrationsTableName: 'migration_table',
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            // cli: {
            //     migrationsDir: 'src/migrations',
            // },
        };
    }
}
