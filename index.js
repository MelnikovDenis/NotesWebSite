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
app.use(function(err, req, res, next) {
    if(err?.statusCode) {
        res.status(err.statusCode).json({name: err.name, message: err.message});
    }
    else {
        console.log(err);
        res.status(500).json({name: 'UNKNOWN_INTERNAL_ERROR', message: 'Unknown internal server error' });
    }
});

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