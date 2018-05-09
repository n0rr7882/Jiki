export const CHECK_LIST = {
    user: [
        { property: 'username', reg: /^(?=.*).{4,20}$/, code: 302 },
        { property: 'email', reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, code: 303 },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/, code: 304 }
    ]
};

export function checkProperty(data, service, strict) {
    let result = {};
    for (const item of CHECK_LIST[service]) {
        if (data[item.property] && item.reg.exec(data[item.property])) {
            result[item.property] = data[item.property];
        } else {
            if (!strict && !data[item.property]) continue;
            return { code: item.code, data: null };
        }
    }
    return { code: 0, data: result };
}
