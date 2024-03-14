var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const chat_controller = require("../controllers/chatController");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
	const token = req.params.token;
	try {
		const response = jwt.verify(token, process.env.JWT_KEY);
		console.log(response);
		return res.send(200);
	} catch (err) {
		return res.send(404);
	}
}

//USER ROUTERS

router.get("/users", user_controller.user_list_get);

router.get("/users/:id", user_controller.user_get);

router.post("/users/", user_controller.user_post);

router.put("/users/:id", user_controller.user_put);

router.delete("/users/:id", user_controller.user_delate);

//CHATS ROUTERS
//THE BODY NEED A TO AND A FROM AS WELL AS THE MESSAGE TEXT
router.get("/chats", chat_controller.chat_list_get);

router.get("/chats/:id", chat_controller.chat_get);

router.post("/chats", chat_controller.chat_post);

// LOGIN ROUTERS

router.post("/login", user_controller.login_post);

router.get("/logout", user_controller.logout_get);

router.get("/token/:token", verifyToken);

module.exports = router;
