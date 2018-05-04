import { Router } from 'express';

import errorHandler from './error';

const router = Router();

router.use(errorHandler);

export default router;