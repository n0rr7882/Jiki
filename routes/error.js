import { Router } from 'express';
import path from 'path';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import settings from '../config/settings';

const router = Router();

router.use((req, res, next) => {
    // process of 404 Not Found
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    console.error(err);
    return res.render('index', setRenderData(
        settings.BASE_DATA,
        setUserData(false, null, null),
        setContentData('에러 발생!', err.message, settings.MENU_LIST.ERROR(), err.stack)
    ));
});

export default router;