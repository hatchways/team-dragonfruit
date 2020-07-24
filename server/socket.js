const cookie = require("cookie");
const jwt = require("jsonwebtoken");

let usersMap = new Map();

const init = (server) => {
	let io = require("socket.io")(server);

	io.on("connection", (socket) => {
		// getting the user-id by parsing the cookie
		const cookies = cookie.parse(socket.handshake.headers.cookie);
		const token = cookies.accessToken;
		const deciphered = jwt.verify(token, process.env.JWT_SECRET);
		const userID = deciphered._id;
		console.log("Connected! socket-id is: ", socket.id, "user-id is: ", userID);

		//// store the user in the usersMap
		usersMap.set(socket.id, userID);

		socket.on("disconnect", (socket) => {
			//// remove user from usersMap when they disconnect
			usersMap.delete(socket.id);
			console.log("User disconnected");
		});
	});
};

const notify = (userID, event) => {
	const socketID = getByValue(usersMap, userID);
	io.to(socketID).emit("notification", event);
};

const getByValue = (map, searchValue) => {
	for (let [key, value] of map.entries()) {
		if (value === searchValue) return key;
	}
};

module.exports = { init, notify };
