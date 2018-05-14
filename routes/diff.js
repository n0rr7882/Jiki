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

import { diffChars, diffWords, diffLines, convertChangesToXML } from 'diff';

const router = Router();

router.get('/:title', async (req, res) => {

    try {

        const { title } = req.params;
        const { oldv, newv } = req.query;

        const document = await Document.findOne({ title });
        if (!document) {
            return res.render('index', setRenderData(
                settings.BASE_DATA,
                req.user,
                settings.NO_DOCUMENT_CONTENTS(title)
            ));
        }

        const oldContent = document.revisions[document.revisions.length - oldv].content;
        const newContent = document.revisions[document.revisions.length - newv].content;

        const diffChanges = diffWords(oldContent, newContent);
        const diffResult = convertChangesToXML(diffChanges);

        return res.render('index', setRenderData(
            settings.BASE_DATA,
            req.user,
            settings.DIFF_CONTENTS(title, oldv, newv, diffResult)
        ));

    } catch (err) {
        return handleError(err, 600, req, res);
    }

});

export default router;