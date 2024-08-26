import 'dotenv/config';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, sqlite } from '.';

async function runMigration() {
    await migrate(db, { migrationsFolder: './drizzle' });
    await sqlite.close();
}

runMigration()