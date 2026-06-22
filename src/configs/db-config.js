import pg from 'pg';
import 'dotenv/config'; // Levanta el archivo .env automáticamente

const { Pool } = pg;

const config = {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || "dai_tp",
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);
export default pool;
