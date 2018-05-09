import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import requestIp from 'request-ip';
import cors from 'cors';

import path from 'path';

import constants from './config/constants';
import settings from './config/settings';

import authentication from './tools/authentication';

import routes from './routes';

import './database/db';

const app = express();

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger(constants.LOG_FORMAT));
app.use(cookieParser(constants.COOKIE_SALT, { signed: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIp.mw());
app.use(fileUpload());
app.use(cors());

app.use(authentication);

app.use(routes);

app.listen(constants.PORT, () => {
    console.log(`"${settings.BASE_DATA.wikiName}" 서버가 ${constants.PORT}번 포트에서 요청을 기다리고 있습니다...`);
});