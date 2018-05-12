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

router.get('/:title', async (req, res) => {

    try {

        const { title } = req.params;
        const { version } = req.query;

        const document = await Document.findOne({ title });
        const revision = document ? document.revisions[(document.revisions.length - version) || 0] : null;
        const oldVersion = document ? version || document.revisions.length : 0;
        const newVersion = document ? (document.revisions.length + 1) : 1;

        const contentData = settings.EDIT_CONTENTS(
            title,
            oldVersion,
            newVersion,
            revision ? revision.content : ''
        );

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            contentData
        ));

    } catch (err) {
        return handleError(err, 500, req, res);
    }

});

router.post('/:title', async (req, res) => {

    try {

        const { title } = req.params;
        const { clientIp, body: { content, comment } } = req;

        let document = await Document.findOne({ title });
        if (!document) {
            document = new Document({ title, revisions: [] });
        }

        const revision = new IRevision({
            user: req.user || undefined,
            clientIp,
            content,
            comment
        });

        await document.pushRevision(revision).save();

        return res.redirect(`/w/${title}`);

    } catch (err) {
        return handleError(err, 500, req, res);
    }

});

export default router;