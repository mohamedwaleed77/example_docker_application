const express = require('express');
const { createClient } = require('redis');
const cors = require('cors');

// Initialize the Express app
const app = express();
const PORT = 4203;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Create and connect to the Redis client
const client = createClient({
    url: 'redis://redis:6379' // Use the Redis container name and default port
});
client.connect()
    .then(() => {
        console.log('Connected to Redis');
        initializeCounter(); // Initialize the counter once connected
    })
    .catch(err => {
        console.error('Failed to connect to Redis:', err);
    });

// Initialize the counter value in Redis
async function initializeCounter() {
    try {
        const reply = await client.set('counter', 0, { NX: true });
        if (reply === 'OK') {
            console.log('Counter initialized with default value');
        }
    } catch (err) {
        console.error('Error setting up initial data:', err);
    }
}

// Initialize the counter on server start
initializeCounter();

// Endpoint to get the counter value
app.get('/counter', async (req, res) => {
    try {
        const count = await client.get('counter');
        res.json({ count: parseInt(count) });
    } catch (err) {
        console.error('Failed to fetch counter:', err);
        res.status(500).json({ error: 'Failed to fetch counter' });
    }
});

// Endpoint to increment the counter
app.post('/counter/increment', async (req, res) => {
    try {
        const newCount = await client.incr('counter');
        res.json({ count: newCount });
    } catch (err) {
        console.error('Failed to increment counter:', err);
        res.status(500).json({ error: 'Failed to increment counter' });
    }
});

// Endpoint to reset the counter
app.post('/counter/reset', async (req, res) => {
    try {
        await client.set('counter', 0);
        res.json({ count: 0 });
    } catch (err) {
        console.error('Failed to reset counter:', err);
        res.status(500).json({ error: 'Failed to reset counter' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
