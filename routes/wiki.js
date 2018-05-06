import { Router } from 'express';

import User from '../database/models/User';
import Document from '../database/models/Document';

import {
    setBaseData,
    setContentData,
    setUserData,
    setRenderData
} from '../tools/render-set';

import settings from '../config/settings';

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:title', async (req, res) => {

    try {
        const title = req.params.title;
        const document = await Document.findOne({ title }).populate('revisions.user');
        if (!document) {
            const contentData = {
                ...setContentData(null, null, settings.MENU_LIST.WIKI(title), null),
                ...settings.NOT_FOUND_CONTENTS(title)
            };
            return res.render('index', setRenderData(
                settings.BASE_DATA,
                setUserData(false, null, null),
                contentData
            ));
        }
        const currentRevision = document.revisions[document.revisions.length - 1];
        const renderData = setRenderData(
            settings.BASE_DATA,
            setUserData(false, null, null),
            setContentData(document.title, '', settings.MENU_LIST.WIKI(title), currentRevision.content)
        );
    } catch (err) {
        console.error(err);
        return res.render('index', setRenderData(
            settings.BASE_DATA,
            setUserData(false, null, null),
            setContentData('에러 발생!', err.message, settings.MENU_LIST.ERROR(), err.stack)
        ));
    }

});

export default router;