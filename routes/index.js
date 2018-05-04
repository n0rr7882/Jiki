import { Router } from 'express';
import path from 'path';
import settings from '../config/settings';

import error from './error';

import wiki from './wiki';
import edit from './edit';

const router = Router();

router.use(path.join('/', settings.DOC_BASE_URL), wiki);
router.use('/edit', edit);
router.use(error);

export default router;