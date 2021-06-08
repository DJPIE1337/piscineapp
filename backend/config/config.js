module.exports = {
    BACKEND_PORT: process.env.PORT || 3000,
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER || "admin",
    MONGO_PWD: process.env.MONGO_PWD || "passwd",
    MONGO_DBNAME: process.env.MONGO_DBNAME || "piscineapp",
    REDIS_URL: process.env.REDIS_URL || "redis",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET || "passwd"
}