import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import constants from '../config/constants';

const router = Router();

router.use((req, res, next) => {
    if (req.cookies && req.cookies['ene']) {
        verify(req.cookies[constants.COOKIE_KEY], constants.JWT_SALT, (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
        });
    }
    return next();
});

export default router;