import React from "react";
import io from "socket.io-client";

const socketUrl = "http://localhost:3001";
class TestNotif extends React.Component {
	constructor(props) {
		super(props);

		this.state = { socket: null };
	}

	componentWillMount() {
		this.initSocket();
	}

	initSocket = () => {
		const socket = io(socketUrl);
		this.setState({ socket });
		socket.on("connect", () => {
			console.log("I am connected!");
		});
	};
}

export default TestNotif;
