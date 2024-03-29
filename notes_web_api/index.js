import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import groupRouter from './routers/groupRouter.js';
import noteRouter from './routers/noteRouter.js';
import errorHandlingMidleware from './middlewares/errorHandlingMiddleware.js';
import { NotFoundError } from './errors/CustomErrors.js';


const SERVER_PORT = config.get('server.port');
const SERVER_HOST = config.get('server.host');
const CORS_ORIGIN_WHITE_LIST = config.get('cors.origin_white_list');
const app = express();

const corsOptions = {
    origin: CORS_ORIGIN_WHITE_LIST,
    credentials: true,
    optionSuccessStatus: 204,
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/notes', noteRouter);
app.use('*', async (req, res, next) => { next(new NotFoundError('Requested resource was not found')); });
app.use(errorHandlingMidleware);
await startApp();

async function startApp() {
    try {        
        await app.listen(SERVER_PORT, 
            SERVER_HOST, 
            () => console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`));
    }
    catch(e){
        console.log(e);        
    }
}