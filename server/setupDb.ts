import { pool } from './db';

async function setupDatabase() {
  const client = await pool.connect();
  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create cases table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cases (
        id SERIAL PRIMARY KEY,
        case_number TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        petitioner TEXT NOT NULL,
        respondent TEXT NOT NULL,
        docketed_date TIMESTAMP NOT NULL,
        court_proceedings JSONB,
        parties_involved JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database schema setup completed successfully');
  } catch (err) {
    console.error('Error setting up database schema:', err);
    throw err;
  } finally {
    client.release();
  }
}

setupDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
