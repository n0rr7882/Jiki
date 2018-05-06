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

router.get('/:title', async (req, res) => {

    try {
        const title = req.params.title;
        const document = await Document.findOne({ title });
        const contentData = {
            ...setContentData(null, null, settings.MENU_LIST.EDIT(title), null),
            ...settings.EDIT_CONTENTS(
                title,
                document ? document.revisions.length : 0,
                document ? document.revisions[document.revisions.length - 1].content : ''
            )
        };
        return res.render('index', setRenderData(
            settings.BASE_DATA,
            setUserData(false, null, null),
            contentData
        ));
    } catch (err) {
        console.error(err);
        return res.render('index', setRenderData(
            settings.BASE_DATA,
            setUserData(false, null, null),
            setContentData('에러 발생!', err.message, settings.MENU_LIST.ERROR(), err.stack)
        ));
    }

});

router.post('/', async (req, res) => {

    try {

    } catch (err) {

    }

});

export default router;