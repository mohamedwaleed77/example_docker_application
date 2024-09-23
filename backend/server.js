const express = require('express');
const { createClient } = require('redis');
const cors = require('cors');

const app = express();
const PORT = 4203;

app.use(cors());
app.use(express.json());

const client = createClient({
    url: 'redis://redis:6379' 
});
client.connect()
    .then(() => {
        console.log('Connected to Redis');
        initializeCounter();
    })
    .catch(err => {
        console.error('Failed to connect to Redis:', err);
    });

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

initializeCounter();

app.get('/counter', async (req, res) => {
    try {
        const count = await client.get('counter');
        res.json({ count: parseInt(count) });
    } catch (err) {
        console.error('Failed to fetch counter:', err);
        res.status(500).json({ error: 'Failed to fetch counter' });
    }
});

app.post('/counter/increment', async (req, res) => {
    try {
        const newCount = await client.incr('counter');
        res.json({ count: newCount });
    } catch (err) {
        console.error('Failed to increment counter:', err);
        res.status(500).json({ error: 'Failed to increment counter' });
    }
});

app.post('/counter/reset', async (req, res) => {
    try {
        await client.set('counter', 0);
        res.json({ count: 0 });
    } catch (err) {
        console.error('Failed to reset counter:', err);
        res.status(500).json({ error: 'Failed to reset counter' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
