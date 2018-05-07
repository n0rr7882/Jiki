import { Router } from 'express';

import User from '../database/models/User';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import { handleError } from './error';

import settings from '../config/settings';

const router = Router();

router.get('/', async (req, res) => {

    return res.render('index', setRenderData(
        settings.BASE_DATA,
        setUserData(false, null, null),
        settings.REGISTER_CONTENTS()
    ));

});

export default router;