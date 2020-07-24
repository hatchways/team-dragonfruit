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
		usersMap.set(userID, socket.id);

		socket.on("disconnect", (socket) => {
			//// remove user from usersMap when they disconnect
			const userID = getByValue(usersMap, socket.id);
			usersMap.delete(userID);
			console.log("User with this ID is disconnected: ", userID);
		});
	});
};

const notify = (userID, event) => {
	const socketID = usersMap.get(userID);
	io.to(socketID).emit("notification", event);
};

const getByValue = (map, searchValue) => {
	for (let [key, value] of map.entries()) {
		if (value === searchValue) return key;
	}
};

module.exports = { init, notify };
