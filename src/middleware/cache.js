/*const Redis = require('redis');
const redisClient = Redis.createClient({
    // the url field should be like this: redis://stuffstuffstuff
    url: 'redis://192.168.157.128:6379',
    legacyMode: true
});
const DEFAULT_EXPIRATION_INT = 3600; //1 hour

checkCache = async (req, res, next) => {
    await redisClient.connect();
    const cachedData = await redisClient.get(req.path);
    if (cachedData) {
        return res.status(200).json({
            status: "Success",
            data: JSON.parse(cachedData),
        });
    } else {
        req.redisClient = redisClient;
        next();
    }
};

module.exports = {
    checkCache: checkCache,
};
*/