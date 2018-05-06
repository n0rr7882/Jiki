import { Router } from 'express';
import path from 'path';
import settings from '../config/settings';

import error from './error';

import wiki from './wiki';
import edit from './edit';

const router = Router();

router.get('/', (req, res) => res.redirect(path.join('/w', settings.FRONT_PAGE)));
router.use('/w', wiki);
router.use('/edit', edit);
router.use(error);

export default router;