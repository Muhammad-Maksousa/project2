/*const Redis = require("ioredis");

// Use environment variables or fallback to defaults
const redisClient = new Redis({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '192.168.157.128',
    password: process.env.REDIS_PASSWORD || '12345',
    connectTimeout: 60000, // 1 minute timeout is usually sufficient
    // Optional: Retry strategy for reconnecting
    retryStrategy(times) {
        // exponential backoff up to 60s
        return Math.min(times * 100, 60000);
    },
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err.message);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

const checkCache = async (req, res, next) => {
    try {
        // Lazy connect if not already connected
        if (!redisClient.status || redisClient.status !== 'ready') {
            await redisClient.connect(); // connect is async and non-blocking
        }

        const cached = await redisClient.get(req.path);
        if (cached) {
            return res.status(200).json({
                status: "Success",
                data: JSON.parse(cached),
            });
        }else{
            req.redisClient = redisClient
        }

        next();
    } catch (err) {
        console.warn("Redis not available or failed:", err.message);
        next();
    }
};

module.exports = { checkCache };*/