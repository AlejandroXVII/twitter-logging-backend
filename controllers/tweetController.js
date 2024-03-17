const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Tweet = require("../models/tweet");

exports.all_tweet_list_get = asyncHandler(async (req, res, next) => {
	const allTweet = await Tweet.find().exec();
	return res.send(Object.values(allTweet));
});

exports.tweet_list_get = asyncHandler(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		const tweets = await User.findOne(
			{
				username: req.body.username,
			},
			{ projection: { _id: 0, tweets: 1 } }
		).exec();
		return res.send(tweets);
	}
});

exports.tweet_get = asyncHandler(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		const tweets = await Tweet.findById(req.body.id).exec();
		return res.send(tweets);
	}
});
