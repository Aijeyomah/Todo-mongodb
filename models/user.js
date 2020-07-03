import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});


export default model('User', userSchema);