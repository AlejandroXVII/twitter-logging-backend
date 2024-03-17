const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	text: { type: String, required: true },
	date: { type: Date, required: true },
	likes: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
		},
	],
	retweets: [
		{
			user_id: { type: Schema.Types.ObjectId, ref: "User" },
		},
	],
	comments: [
		{
			tweet_id: { type: Schema.Types.ObjectId, ref: "Tweet" },
		},
	],
});

module.exports = mongoose.model("tweet", tweetSchema);
