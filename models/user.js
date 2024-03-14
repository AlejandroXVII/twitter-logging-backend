const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	full_name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	chats: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
			chat_id: { type: Schema.Types.ObjectId, ref: "Chat" },
		},
	],
});

module.exports = mongoose.model("user", userSchema);
