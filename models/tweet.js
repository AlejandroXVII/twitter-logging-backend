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
});

module.exports = mongoose.model("tweet", tweetSchema);
