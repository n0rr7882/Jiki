const PERMISSION_LIST = {
    '0': 'nonuser',
    '1': 'general',
    '2': 'admin',
    '3': 'owner'
};

const ERROR_LIST = {
    '100': {
        title: '권한 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '101': {
        title: '권한 오류',
        subtitle: '권한이 부족합니다.'
    },
    '102': {
        title: '권한 오류',
        subtitle: '비 로그인 상태로 수행할 수 없는 작업입니다..'
    },
    '200': {
        title: '계정 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '201': {
        title: '계정 오류',
        subtitle: '계정을 찾을 수 없습니다.'
    },
    '300': {
        title: '계정 폼 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '301': {
        title: '계정 폼 오류',
        subtitle: '이미 존재하는 계정의 아이디입니다.'
    },
    '302': {
        title: '계정 폼 오류',
        subtitle: '20자 미만의 아이디를 기입해주세요.'
    },
    '303': {
        title: '계정 폼 오류',
        subtitle: '올바른 이메일을 입력해주세요.'
    },
    '304': {
        title: '계정 폼 오류',
        subtitle: '8~20자 사이의 숫자가 혼합된 암호를 사용해주세요.'
    },
    '305': {
        title: '계정 폼 오류',
        subtitle: '암호 재확인이 잘못 이루어졌습니다.'
    },
    '400': {
        title: '로그인 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '401': {
        title: '로그인 오류',
        subtitle: '이미 로그인 되어 있습니다.'
    },
    '402': {
        title: '로그인 오류',
        subtitle: '아이디 혹은 패스워드가 일치하지 않습니다.'
    },
    '500': {
        title: '편집 오류',
        subtitle: '직업을 수행할 수 없습니다.'
    },
    '501': {
        title: '편집 오류',
        subtitle: '직접 html 태그를 작성할 수 없습니다.'
    },
    '502': {
        title: '편집 오류',
        subtitle: '코멘트는 500자를 넘길 수 없습니다.'
    },
    '503': {
        title: '편집 오류',
        subtitle: '변경사항을 찾을 수 없습니다.'
    },
    '600': {
        title: '문서 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '601': {
        title: '문서 오류',
        subtitle: '문서의 해당 버전을 찾을 수 없습니다.'
    },
    '990': {
        title: 'Not found',
        subtitle: '잘못된 접근입니다.'
    },
    '991': {
        title: 'Server error',
        subtitle: '작업을 수행할 수 없습니다.'
    },
    '999': {
        title: '알 수 없는 오류',
        subtitle: '작업을 수행할 수 없습니다.'
    }
};

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
            { name: '역링크', href: `/backlink/${docTitle}` },
            { name: 'ACL', href: `/acl/${docTitle}` }
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
        ]),
        USER: () => ([
            { name: '대문으로', href: `/` }
        ]),
        REGISTER: () => ([
            { name: '사용자', href: `/user` }
        ])
    },
    WIKI_CONTENTS: function (docTitle, version, content) {
        const title = docTitle;
        const tag = version ? `v${version}` : 'latest';
        const subtitle = '';
        const menu = this.MENU_LIST.WIKI(docTitle);
        return { title, tag, subtitle, menu, content };
    },
    NO_DOCUMENT_CONTENTS: function (docTitle) {
        const title = docTitle;
        const subtitle = '아직 만들어지지 않은 문서입니다.';
        const menu = this.MENU_LIST.WIKI(docTitle);
        const content = `
            <p>
                "<a href="/w/${docTitle}">${docTitle}</a>"문서가 존재하지 않습니다.
            </p>
            <p>
                <strong><a href="/edit/${docTitle}">문서 생성하기</a></strong>를 눌러 문서를 생성해주세요!
            </p>
        `;
        return { title, subtitle, menu, content };
    },
    EDIT_CONTENTS: function (docTitle, oldVersion, newVersion, docContent) {
        const title = docTitle;
        const tag = `edit`;
        const subtitle = oldVersion ?
            `문서를 업데이트합니다. v${oldVersion} -> v${newVersion}` :
            `"${docTitle}"문서를 생성합니다.`;
        const menu = this.MENU_LIST.EDIT(docTitle);
        const content = `
            <form method="POST" action="/edit/${docTitle}">
                <div class="field">
                    <label class="label">내용</label>
                    <div class="control">
                        <textarea name="content" class="textarea edit-content">${oldVersion ? docContent : ''}</textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">${oldVersion ? '변경' : '생성'} 사유</label>
                    <div class="control">
                    <input name="comment" class="input">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">${oldVersion ? '업데이트' : '생성하기'}</button>
                    </div>
                    <div class="control">
                        <button class="button is-light">미리보기</button>
                    </div>
                </div>
            </form>
        `;
        return { title, tag, subtitle, menu, content };
    },
    REGISTER_CONTENTS: function () {
        const title = '회원가입';
        const subtitle = `${this.BASE_DATA.wikiName}에 회원가입합니다.`;
        const menu = this.MENU_LIST.REGISTER();
        const content = `
            <form method="POST" action="/register">
                <div class="field">
                    <label class="label">사용자 이름</label>
                    <div class="control">
                        <input name="username" class="input" placeholder="username">
                    </div>
                </div>
                <div class="field">
                    <label class="label">이메일</label>
                    <div class="control">
                        <input name="email" type="email" class="input" placeholder="email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">패스워드</label>
                    <div class="control">
                        <input name="password" type="password" class="input" placeholder="password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">재확인</label>
                    <div class="control">
                        <input name="confirm" type="password" class="input" placeholder="confirm password">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">가입</button>
                    </div>
                </div>
            </form>
        `;
        return { title, subtitle, menu, content };
    },
    LOGIN_CONTENTS: function () {
        const title = '로그인';
        const subtitle = `${this.BASE_DATA.wikiName}에 로그인합니다.`;
        const menu = this.MENU_LIST.REGISTER();
        const content = `
            <form method="POST" action="/login">
                <div class="field">
                    <label class="label">사용자 이름</label>
                    <div class="control">
                        <input name="username" class="input" placeholder="username">
                    </div>
                </div>
                <div class="field">
                    <label class="label">패스워드</label>
                    <div class="control">
                        <input name="password" type="password" class="input" placeholder="password">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">로그인</button>
                    </div>
                </div>
            </form>
        `;
        return { title, subtitle, menu, content };
    },
    USER_CONTENTS: function (user, clientIp) {
        const title = '내 정보';
        const subtitle = `${user ? user.username : clientIp} (${PERMISSION_LIST[user ? user.permission : 0]})`;
        const menu = this.MENU_LIST.USER();
        const content = `
            <h1>상태</h1>
            <ul>
                <li>${user ? 'Username' : 'Client IP'} : <strong>${user ? user.username : clientIp}</strong></li>
                ${user ? ('<li>Email : <strong>' + user.email + '</strong></li>') : ''}
                <li>Permission : <strong>${PERMISSION_LIST[user ? user.permission : 0]}</strong></li>
                ${user ? '<li><a href="/user/edit">정보 수정</a></li>' : ''}
            </ul>
            <h1>로그인</h1>
            <ul>
                <li><a href="${user ? '/user/logout' : '/login'}">${user ? '로그아웃' : '로그인'}</a></li>
                <li><a href="/register">회원가입</a></li>
            </ul>
            <h1>활동</h1>
            <ul>
                <li><a href="/contribution/${user ? 'user/' + user.username : 'nonuser/' + clientIp}/document">내 문서 기여 목록</a></li>
                <li><a href="/contribution/${user ? 'user/' + user.username : 'nonuser/' + clientIp}/discuss">내 토론 기여 목록</a></li>
            </ul>
        `;
        return { title, subtitle, menu, content };
    },
    USER_EDIT_CONTENTS: function (user) {
        const title = '내 정보 수정';
        const subtitle = `"${user.username}"의 정보를 업데이트합니다.`;
        const menu = this.MENU_LIST.USER();
        const content = `
            <form method="POST" action="/user/edit">
                <div class="field">
                    <label class="label">이메일</label>
                    <div class="control">
                        <input name="email" type="email" class="input" placeholder="email">
                    </div>
                </div>
                <hr>
                <div class="field">
                    <label class="label">패스워드</label>
                    <div class="control">
                        <input name="password" type="password" class="input" placeholder="password">
                    </div>
                </div>
                <div class="field">
                    <label class="label">재확인</label>
                    <div class="control">
                        <input name="confirm" type="password" class="input" placeholder="confirm password">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">수정</button>
                    </div>
                </div>
            </form>
        `;
        return { title, subtitle, menu, content };
    },
    HISTORY_CONTENTS: function (docTitle, document) {
        const title = docTitle;
        const tag = `history`;
        const subtitle = `"${docTitle}"문서의 편집 기록을 탐색합니다.`;
        const menu = this.MENU_LIST.HISTORY(docTitle);
        const content = `
            <form action="/diff/${document.title}" method="get">
                <div class="field is-grouped">
                    <div class="control">
                        <div class="select">
                            <select name="oldv">
                                ${document.revisions.map((item, i) => '<option value="' + (i + 1) + '">v' + (i + 1) + '</option>')}
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <div class="select">
                            <select name="newv">
                                ${document.revisions.map((item, i) => '<option value="' + (i + 1) + '">v' + (i + 1) + '</option>')}
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-primary">비교</button>
                    </div>
                </div>
            </form>
            <table class="table">
                <thead>
                    <tr>
                        <th>버전</th>
                        <th>편집자</th>
                        <th>변경 사유</th>
                        <th>변경일</th>
                    </tr>
                </thead>
                <tbody>
                    ${document.revisions.map((item, i, revisions) => {
                const w = '<a class="tag is-link" href="/w/' + document.title + '?version=' + (revisions.length - i) + '">v' + (revisions.length - i) + '</a> ';
                const raw = '<a class="tag is-info" href="/raw/' + document.title + '?version=' + (revisions.length - i) + '">원본</a> ';
                const edit = '<a class="tag is-light" href="/edit/' + document.title + '?version=' + (revisions.length - i) + '">수정</a> ';
                const changes = item.content.length - (revisions[i + 1] ? revisions[i + 1].content.length : 0);

                let count = '';
                if (changes > 0) {
                    count = '<span class="tag is-success">' + changes + '</span>';
                } else if (changes < 0) {
                    count = '<span class="tag is-danger">' + changes + '</span>';
                } else {
                    count = '<span class="tag is-dark">' + changes + '</span>';
                }

                let user = '';
                if (item.user) {
                    user = '<a class="tag is-light" href="/w/USER:' + item.user.username + '">' + item.user.username + '</a><a class="tag is-link" href="/contribution/user/' + item.user.username + '/document">기여 목록</a>';
                } else {
                    user = '<a href="/contribution/nonuser/' + item.clientIp + '/document">' + item.clientIp + '</a>';
                }

                return (
                    '<tr>' +
                    '<td><div class="tags has-addons">' + w + raw + edit + count + '</div></td>' +
                    '<td><div class="tags has-addons">' + user + '</div></td>' +
                    '<td>' + item.comment + '</td>' +
                    '<td>' + item.createdAt + '</td>' +
                    '</tr>'
                );
            })}
                </tbody>
            </table>
        `;
        return { title, tag, subtitle, menu, content };
    },
    DIFF_CONTENTS: function (docTitle, oldV, newV, diffResult) {
        const title = docTitle;
        const tag = `diff`;
        const subtitle = `v${oldV}문서와 v${newV} 문서를 비교합니다.`;
        const menu = this.MENU_LIST.HISTORY(docTitle);
        const content = `<pre> ${diffResult}</pre>`;
        return { title, tag, subtitle, menu, content };
    },
    RAW_CONTENTS: function (docTitle, version, docContent) {
        const title = docTitle;
        const tag = version ? `v${version}` : 'latest';
        const subtitle = `"${docTitle}"문서의 원본 텍스트입니다.`;
        const menu = this.MENU_LIST.DEFAULT(docTitle);
        const content = `<pre><code>${docContent}</code></pre>`;
        return { title, tag, subtitle, menu, content };
    },
    ERROR_CONTENTS: function (err, code) {
        const { title, subtitle } = ERROR_LIST[code];
        const menu = this.MENU_LIST.ERROR();
        const content = err.stack;
        return { title, subtitle, menu, content };
    }
}