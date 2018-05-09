import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import constants from '../config/constants';

import User from '../database/models/User';

const router = Router();

function authUser(token) {
    return new Promise((resolve, reject) => {
        verify(token, constants.JWT_SALT, (err, decoded) => {
            if (err) return reject(err);
            if (decoded) return resolve(decoded);
        });
    });
}

router.use(async (req, res, next) => {

    try {

        if (req.cookies && req.signedCookies[constants.COOKIE_KEY]) {
            const { id } = await authUser(req.signedCookies[constants.COOKIE_KEY]);
            const user = await User.findById(id);
            req.user = user;
        }

        return next();

    } catch (err) {
        console.error(err);
        return next();
    }

});

export default router;