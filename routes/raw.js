import { Router } from 'express';

import User from '../database/models/User';
import Document from '../database/models/Document';
import { IRevision } from '../database/interfaces';

import {
    setBaseData,
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import { handleError } from './error';

import settings from '../config/settings';

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:title', async (req, res) => {

    try {

        const { title } = req.params;
        const { version } = req.query;

        const document = await Document.findOne({ title });

        if (!document) {
            return res.render('index', setRenderData(
                settings.BASE_DATA,
                req.user,
                settings.NO_DOCUMENT_CONTENTS(title)
            ));
        }

        const revision = document.revisions[(document.revisions.length - version) || 0];

        if (!revision) {
            return handleError(new Error(), 601, req, res);
        }

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            settings.RAW_CONTENTS(title, version, revision.content)
        ));

    } catch (err) {
        return handleError(err, 600, req, res);
    }

});

export default router;