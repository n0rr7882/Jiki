export class IRevision {
    constructor({ user, clientIp, content, comment }) {
        this.user = user;
        this.clientIp = clientIp;
        this.content = content;
        this.comment = comment;
    }
}