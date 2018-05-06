import mongoose, { Schema } from 'mongoose';
const { Types } = Schema;

const documentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    revisions: [{
        user: { type: Types.ObjectId, ref: 'user' },
        ipAddress: { type: String, required: true },
        content: { type: String, required: true },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now }
    }],
    accessControlList: [{
        permission: { type: String, required: true },   // ['admin', 'normal', 'none', 'all']
        action: { type: String, required: true },       // ['read', 'write', 'all']
        allow: { type: Boolean, required: true }
    }]
}, { timestamps: true });

documentSchema.methods.checkPermission = function (permission, action) {
    let result = true;
    if (permission === 'owner') return result;
    this.accessControlList.forEach(i => {
        if (
            (i.permission === permission || i.permission === 'all') &&
            (i.action === action || i.action === 'all')
        ) result = i.allow;
    });
    return result;
};

export default mongoose.model('document', documentSchema);