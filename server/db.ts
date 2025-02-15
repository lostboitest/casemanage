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

// Create a connection pool with error handling
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000, // 5 second timeout
  idleTimeoutMillis: 30000, // 30 seconds before idle clients are closed
  max: 20 // maximum number of clients in the pool
});

// Add error handler for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize Drizzle with the pool and schema
export const db = drizzle(pool, { schema });

// Test the connection
pool.connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    throw err;
  });