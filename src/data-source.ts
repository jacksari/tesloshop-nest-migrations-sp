import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const typeOrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
    // migrations: ['src/migrations/*.ts'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations_typeorm',
    // cli: {
    //     // entitiesDir: 'src/entities',
    //     migrationsDir: 'src/migrations',
    //     subscribersDir: 'subscriber',
    // },
} as DataSourceOptions;

const datasource = new DataSource(typeOrmConfig); // config is one that is defined in datasource.config.ts file
// datasource.initialize();
export default datasource;
