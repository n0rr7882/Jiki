import mongoose, { Schema } from 'mongoose';
const { Types } = Schema;

const documentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    revisions: [{
        user: { type: Types.ObjectId, ref: 'user' },
        clientIp: { type: String, required: true },
        content: { type: String, required: true },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now }
    }],
    documentACL: { type: Number, required: true, default: 0 },     // 0: none, 1: user, 2: admin, 3:owner
    discussACL: { type: Number, required: true, default: 0 }       // 0: none, 1: user, 2: admin, 3:owner
}, { timestamps: true });

documentSchema.methods.pushRevision = function (revision) {
    this.revisions.unshift(revision);
    return this;
}

export default mongoose.model('document', documentSchema);