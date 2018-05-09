import mongoose, { Schema } from 'mongoose';
import { password } from '../../tools/password';
const { Types } = Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permission: { type: Number, required: true, default: 1 } // 1: user, 2: admin, 3: owner
}, { timestamps: true });

function encryptPassword(next) {
    if (!this.isModified('password')) return next();
    this.password = password(this.password);
    return next();
}

function removePassword(next) {
    this.select('-password -__v');
    return next();
}

userSchema.pre('save', encryptPassword);
userSchema.pre('update', encryptPassword);
userSchema.pre('find', removePassword);
userSchema.pre('findOne', removePassword);
userSchema.pre('findById', removePassword);

userSchema.methods.comparePassword = function (plainPassword) {
    if (this.password === password(plainPassword)) return true;
    return false;
};

userSchema.statics.login = function (username, plainPassword) {
    return this.where('username', username).where('password', password(plainPassword));
}

export default mongoose.model('user', userSchema);