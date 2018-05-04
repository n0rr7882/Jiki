import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import path from 'path';

import constants from './config/constants';

import routes from './routes';

import './database/db';

const app = express();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(constants.LOG_FORMAT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());

app.use(routes);

app.listen(constants.PORT, () => {
    console.log(`Server listen to port: ${constants.PORT}`);
});