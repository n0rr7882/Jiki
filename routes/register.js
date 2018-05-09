import { Router } from 'express';

import User from '../database/models/User';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import { handleError } from './error';
import { checkProperty } from '../tools/validator';

import settings from '../config/settings';

const router = Router();

router.get('/', async (req, res) => {

    return res.render('index', setRenderData(
        settings.BASE_DATA,
        setUserData(false, null, null),
        settings.REGISTER_CONTENTS()
    ));

});

router.post('/', async (req, res) => {

    try {

        const { username, email, password, confirm } = req.body;

        if (await User.findOne({ username })) {
            return handleError(new Error(), 301, req, res);
        }

        if (password !== confirm) {
            return handleError(new Error(), 305, req, res);
        }

        const data = checkProperty({ username, email, password }, 'user', true);

        if (data.code) {
            return handleError(new Error(), data.code, req, res);
        }

        const user = new User(data.data);

        await user.save();

        return res.redirect('/login');

    } catch (err) {
        return handleError(err, 300, req, res);
    }

});

export default router;