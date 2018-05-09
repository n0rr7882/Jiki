import { Router } from 'express';

import User from '../database/models/User';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import settings from '../config/settings';
import constants from '../config/constants';

import { handleError } from './error';
import { checkProperty } from '../tools/validator';

const router = Router();

router.get('/', async (req, res) => {

    try {

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            settings.USER_CONTENTS(req.user, req.clientIp)
        ));

    } catch (err) {
        return handleError(err, 200, req, res);
    }

});

router.get('/edit', async (req, res) => {

    try {

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            settings.USER_EDIT_CONTENTS(req.user)
        ));

    } catch (err) {
        return handleError(err, 200, req, res);
    }
});

router.post('/edit', async (req, res) => {

    try {

        let user = await User.findById(req.user._id);

        if (!user) {
            return handleError(new Error(), 201, req, res);
        }

        const { email, password, confirm } = req.body;

        if (password !== confirm) {
            return handleError(new Error(), 305, req, res);
        }

        const data = checkProperty({ email, password }, 'user', false);

        if (data.code) {
            return handleError(new Error(), data.code, req, res);
        }

        await Object.assign(user, data.data).save();

        return res.redirect('/user');

    } catch (err) {
        return handleError(err, 300, req, res);
    }

});

router.get('/logout', (req, res) => {

    try {

        return res.clearCookie(constants.COOKIE_KEY).redirect('/');

    } catch (err) {
        return handleError(err, 200, req, res);
    }

});

export default router;