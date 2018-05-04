import mongoose, { Schema } from 'mongoose';

const helloSchema = new Schema({
    hello: String,
    world: String
}, { timestamps: true });

export default mongoose.model('hello', helloSchema);