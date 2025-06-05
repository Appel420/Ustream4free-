// server.mjs
import express from 'express';
import axios from 'axios';
import { WebSocketServer } from 'ws';
import { createServer } from 'node:http';

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on('close', () => console.log('Client disconnected'));
});

app.use(express.json());

app.get('/stats/:platform', async (req, res) => {
    const { platform } = req.params;
    let stats = {};
    try {
        switch (platform) {
            case 'twitch':
                stats = await fetchTwitchStats();
                break;
            case 'youtube':
                stats = await fetchYouTubeStats();
                break;
            case 'twitter':
                stats = await fetchTwitterStats();
                break;
            case 'facebook':
                stats = await fetchFacebookStats();
                break;
            default:
                return res.status(400).json({ error: 'Invalid platform' });
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function fetchTwitchStats() {
    return { viewers: 0, duration: '0h 0m', bitrate: 6000, frameRate: 60 };
}

async function fetchYouTubeStats() {
    return { viewers: 0, duration: '0h 0m', bitrate: 6000, frameRate: 60 };
}

async function fetchTwitterStats() {
    return { viewers: 0, duration: '0h 0m', bitrate: 6000, frameRate: 60 };
}

async function fetchFacebookStats() {
    return { viewers: 0, duration: '0h 0m', bitrate: 6000, frameRate: 60 };
}

server.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});