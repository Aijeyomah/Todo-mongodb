import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const todoSchema = new Schema({
    title: {type: String, required: true, max: 64},
    desc: {type: String, required: true},
    status: {type: String, enum: ['pending', 'done'], default: 'pending'},
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export default model('Todo', todoSchema);