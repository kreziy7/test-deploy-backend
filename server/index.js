require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Database connection configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('sslmode=require') || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
});

// Test connection at startup
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL successfully');
    release();
});

// GET /api/test
app.get('/api/test', async (req, res) => {
    try {
        // Optional check: verify if DB is actually reachable
        await pool.query('SELECT 1');
        res.json({
            message: "Backend working",
            database: "connected"
        });
    } catch (error) {
        res.status(500).json({
            message: "Backend working",
            database: "error",
            error: error.message
        });
    }
});

// GET /api/time
app.get('/api/time', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            message: "Database query error",
            error: error.message
        });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
