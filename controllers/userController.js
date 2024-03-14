const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

//GET ALL THE USERS
exports.user_list_get = asyncHandler(async (req, res, next) => {
	const allUser = await User.find().exec();
	return res.send(Object.values(allUser));
});

//GET AN USER WITH ID
exports.user_get = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).exec();
	return res.send(user);
});

//REGISTER USER
exports.user_post = asyncHandler(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
			const user = new User({
				full_name: req.body.full_name,
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword,
			});
			await user.save();
			return res.status(200).json(user);
		});
	}
});

exports.user_put = asyncHandler(async (req, res, next) => {
	return res.send(403);
});

exports.user_delate = asyncHandler(async (req, res, next) => {
	return res.send(403);
});

exports.login_post = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username }).exec();
	const match = await bcrypt.compare(req.body.password, user.password);
	if (match) {
		jwt.sign({ user: user }, process.env.JWT_KEY, (err, token) => {
			return res.status(200).json({
				userID: user._id,
				token: token,
			});
		});
	} else {
		return res.send(400);
	}
});

exports.logout_get = asyncHandler(async (req, res, next) => {
	res.cookie("token", "", { maxAge: 1 });
	return res.send(200);
});
