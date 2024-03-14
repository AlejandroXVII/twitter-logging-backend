const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	location: { type: String, required: false },
	birthday: { type: Date, required: true },
	password: { type: String, required: true },
	chats: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
			chat_id: { type: Schema.Types.ObjectId, ref: "Chat" },
		},
	],
	tweets: [
		{
			tweet_id: { type: Schema.Types.ObjectId, ref: "Tweet" },
		},
	],
	following: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
		},
	],
	followers: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
		},
	],
	likes: [
		{
			tweet_id: { type: Schema.Types.ObjectId, ref: "Tweet" },
		},
	],
});

module.exports = mongoose.model("user", userSchema);
