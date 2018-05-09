import { Router } from 'express';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import settings from '../config/settings';

const router = Router();

export function handleError(err, code, req, res) {
    console.error(err);
    return res.render('index', setRenderData(
        settings.BASE_DATA,
        setUserData(false, null, null),
        settings.ERROR_CONTENTS(err, code)
    ));
}

router.use((req, res, next) => {
    // process of 404 Not Found
    const err = new Error('Not found');
    err.code = 990;
    next(err);
});

router.use((err, req, res, next) => {
    return handleError(err, err.code || 999, req, res);
});

export default router;