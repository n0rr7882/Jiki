import { Router } from 'express';

import User from '../database/models/User';
import Document from '../database/models/Document';

import {
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import settings from '../config/settings';
import constants from '../config/constants';

import { handleError } from './error';

const router = Router();

router.get('/:title', async (req, res) => {

    try {

        const { title } = req.params;

        const document = await Document.findOne({ title }).populate('revisions.user');
        if (!document) {
            return res.render('index', setRenderData(
                settings.BASE_DATA,
                req.user,
                settings.NO_DOCUMENT_CONTENTS(title)
            ));
        }

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            settings.HISTORY_CONTENTS(title, document)
        ));

    } catch (err) {
        return handleError(err, 600, req, res);
    }

});

export default router;