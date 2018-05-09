import { Router } from 'express';
import path from 'path';
import settings from '../config/settings';

import wiki from './wiki';
import edit from './edit';
import user from './user';
import login from './login';
import register from './register';

import error from './error';

const router = Router();

router.get('/', (req, res) => res.redirect(path.join('/w', settings.FRONT_PAGE)));
router.use('/w', wiki);
router.use('/edit', edit);
router.use('/user', user);
router.use('/login', login);
router.use('/register', register);
router.use(error);

export default router;