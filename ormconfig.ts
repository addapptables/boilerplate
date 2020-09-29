import { ConnectionOptions } from 'typeorm';
import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

const config: ConnectionOptions = {
    type: process.env.DB_TYPE as any,
    url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
    synchronize: Boolean(process.env.DB_SYNCRONIZE),
    entities: [
        "src/**/entities/*.entity.ts",
        "lib/**/entities/*.entity.ts"
    ],
    migrations: [
        "lib/db/migrations/**/*.ts",
        "src/infrastructure/database/migrations/**/*.ts"
    ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "lib/db/migrations"
    }
};

export = config;