export function setBaseData(wikiName, license, logoPath) {
    return { wikiName, license, logoPath };
}

export function setUserData(isLogin, username, email, ipAddress) {
    return { isLogin, username, email, ipAddress };
}

export function setContentData(title, subtitle, menu, content) {
    return { title, subtitle, menu, content };
}

export function setRenderData(baseData, userData, contentData) {
    return { baseData, userData, contentData };
}