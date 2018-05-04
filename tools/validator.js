export const CHECK_LIST = {
    user: [
        { property: 'username', reg: /^(?=.*).{4,20}$/, message: '4~20자 사이의 username을 기입해주세요.' },
        { property: 'email', reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: '올바른 email을 기입해주세요.' },
        { property: 'password', reg: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/, message: '8~20자 사이의 숫자를 포함한 암호를 기입해주세요.' }
    ]
};

export default {
    checkProperty(data, service, strict) {
        let result = {};
        for (const item of CHECK_LIST[service]) {
            if (data[item.property] && item.reg.exec(data[item.property])) {
                result[item.property] = data[item.property];
            } else {
                if (!strict && !data[item.property]) continue;
                return { message: item.message, data: null };
            }
        }
        return { message: 'SUCCESS', data: result };
    }
};
