import { Router } from 'express';
import path from 'path';
import settings from '../config/settings';

const router = Router();

router.use((req, res, next) => {
    // process of 404 Not Found
    res.redirect('/');
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message });
});

export default router;