import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for Neon connection
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a pool with SSL configuration
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5, // Reduce max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Initialize Drizzle with the pool and schema
export const db = drizzle(pool, { schema });

// Test database connection with retries
async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      console.log('Successfully connected to database');
      const result = await client.query('SELECT NOW()');
      console.log('Database time:', result.rows[0].now);
      client.release();
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
    }
  }
  return false;
}

// Run the test immediately
testConnection()
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });