const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Chat = require("../models/chat");

exports.chat_list_get = asyncHandler(async (req, res, next) => {
	const allChat = await Chat.find().exec();
	return res.send(Object.values(allChat));
});

exports.chat_get = asyncHandler(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		const chat = await Chat.findById(req.params.id).exec();
		return res.send(chat);
	}
});

exports.chat_post = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from a request.
	const errors = validationResult(req);
	const to_user = await User.findById(req.body.to_user_id).exec();
	const from_user = await User.findById(req.body.from_user_id).exec();

	const chatIndex = to_user.chats.findIndex(
		(chat) => String(chat.user_id) === req.body.from_user_id
	);
	//SAVE THE NEW CHAT OR ADD THE MESSAGE TO ONE CHAT
	let chat;
	if (chatIndex === -1) {
		chat = new Chat({
			messages: [
				{
					sender_id: req.body.from_user_id,
					text: req.body.text,
				},
			],
		});
		from_user.chats.push({
			user_id: req.body.to_user_id,
			chat_id: chat._id,
		});
		to_user.chats.push({
			user_id: req.body.from_user_id,
			chat_id: chat._id,
		});
	} else {
		chat = await Chat.findById(to_user.chats[chatIndex].chat_id).exec();
		chat.messages.push({
			sender_id: req.body.from_user_id,
			text: req.body.text,
		});
	}
	if (!errors.isEmpty()) {
		res.send(400);
		return;
	} else {
		// Data from form is valid
		await chat.save();
		await from_user.save();
		await to_user.save();
		res.send(chat);
	}
});
