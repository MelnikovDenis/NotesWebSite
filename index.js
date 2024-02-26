import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import userRouter from './routers/userRouter.js';
import groupRouter from './routers/groupRouter.js';
import noteRouter from './routers/noteRouter.js';

const SERVER_PORT = config.get('server.port');
const SERVER_HOST = config.get('server.host');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/notes', noteRouter);


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