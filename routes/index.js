import { Router } from 'express';
import path from 'path';
import settings from '../config/settings';

import wiki from './wiki';
import edit from './edit';
import history from './history';
import diff from './diff';
import raw from './raw';

import user from './user';
import login from './login';
import register from './register';

import error from './error';

const router = Router();

router.get('/', (req, res) => res.redirect(path.join('/w', settings.FRONT_PAGE)));
router.use('/w', wiki);
router.use('/edit', edit);
router.use('/history', history);
router.use('/diff', diff);
router.use('/raw', raw);

router.use('/user', user);
router.use('/login', login);
router.use('/register', register);
router.use(error);

export default router;