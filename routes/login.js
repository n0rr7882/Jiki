import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import User from '../database/models/User';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import { handleError } from './error';

import constants from '../config/constants';
import settings from '../config/settings';

const router = Router();

router.get('/', async (req, res) => {

    return res.render('index', setRenderData(
        settings.BASE_DATA,
        req.user,
        settings.LOGIN_CONTENTS()
    ));

});

router.post('/', async (req, res) => {

    try {

        const { username, password } = req.body;

        if (req.user) {
            return handleError(new Error('Already logged in'), 401, req, res);
        }

        const user = (await User.login(username, password))[0];

        if (!user) {
            return handleError(new Error('Username or Password not validated'), 402, req, res);
        }

        const token = sign({ id: user._id }, constants.JWT_SALT);

        return res.cookie(constants.COOKIE_KEY, token, { signed: true }).redirect('/');

    } catch (err) {
        return handleError(err, 400, req, res);
    }

});

export default router;