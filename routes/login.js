import { Router } from 'express';
import { sign } from 'jsonwebtoken';

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
        settings.LOGIN_CONTENTS()
    ));

});

router.post('/', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {

        }
    } catch (err) {
        return handleError(err, 999, req, res);
    }

});

export default router;