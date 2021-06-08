const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);
const { BACKEND_PORT, MONGO_USER, MONGO_PWD, MONGO_IP, MONGO_PORT, MONGO_DBNAME, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})
const app = express();
const piscinesessionsRouter = require("./routes/piscinesessionsRoutes"); 
const userRouter = require("./routes/userRoutes");

const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
const authData =  { "useNewUrlParser": true, "useCreateIndex": true, "useUnifiedTopology": true};
var msg = ""; 
const connectWithRetry = () => {mongoose.connect(MONGODB_URI,authData)
    .then(() => {console.log("Successfully connected to DB"); msg = "Successfully connected to DB";})
    .catch((e) => {console.log(e); msg = e; setTimeout(connectWithRetry, 5000);});
    }
connectWithRetry();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true
 };
app.use(cors(corsOptions));
app.enable("trust proxy");
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 3000000
    }
}))
app.use(express.json());
app.get("/api/v1", (req,res)=>{res.send("<h2>API Base: " + msg + "</h2>");});
app.use("/api/v1/piscinesessions",piscinesessionsRouter);
app.use("/api/v1/users",userRouter);
const port = BACKEND_PORT;
app.listen(port, () => console.log(`listening on port ${port}`));