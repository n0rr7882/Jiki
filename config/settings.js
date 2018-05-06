import User from '../database/models/User';
import Document from '../database/models/Document';

export default {
    BASE_DATA: {
        wikiName: '테스트위키',
        license: '<strong>Jiki</strong>: community-based wiki witten in JavaScript',
        logoPath: '/resources/jiki-logo.002.png'
    },
    FRONT_PAGE: 'Front page',
    MENU_LIST: {
        WIKI: docTitle => ([
            { name: '문서', href: `/w/${docTitle}` },
            { name: '편집', href: `/edit/${docTitle}` },
            { name: '토론', href: `/discuss/${docTitle}` },
            { name: '역사', href: `/history/${docTitle}` },
            { name: '역링크', href: `/backlink/${docTitle}` }
        ]),
        EDIT: docTitle => ([
            { name: '문서', href: `/w/${docTitle}` },
            { name: '삭제', href: `/delete/${docTitle}` },
            { name: '이동', href: `/move/${docTitle}` }
        ]),
        HISTORY: docTitle => ([
            { name: '문서', href: `/w/${docTitle}` },
            { name: '원본', href: `/raw/${docTitle}` }
        ]),
        DEFAULT: docTitle => ([
            { name: '문서', href: `/w/${docTitle}` }
        ]),
        ERROR: () => ([
            { name: '대문으로', href: `/` }
        ])
    },
    NOT_FOUND_CONTENTS: docTitle => ({
        title: docTitle,
        subtitle: '아직 만들어지지 않은 문서입니다.',
        content: `
            <p>
                "<a href="/w/${docTitle}">${docTitle}</a>"문서가 존재하지 않습니다.
            </p>
            <p>
                <strong><a href="/edit/${docTitle}">문서 생성하기</a></strong>를 눌러 문서를 생성해주세요!
            </p>
        `
    }),
    EDIT_CONTENTS: (docTitle, version, docContent) => {
        const title = `${docTitle} (edit)`;
        const subtitle = version ?
            `문서를 편집하여 v${version}로 업데이트합니다.` :
            `"${docTitle}"문서를 생성합니다.`;
        const content = `
            <form method="POST" action="/edit/${docTitle}">
                <div class="field">
                    <label class="label">내용</label>
                    <div class="control">
                        <textarea class="textarea edit-content">${version ? docContent : ''}</textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">${version ? '변경' : '생성'} 사유</label>
                    <div class="control">
                    <input class="input">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">${version ? '업데이트' : '생성하기'}</button>
                    </div>
                    <div class="control">
                        <button class="button is-light">미리보기</button>
                    </div>
                </div>
            </form>
        `;
        return { title, subtitle, content };
    }
}