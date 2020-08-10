import React from "react";
import io from "socket.io-client";
import Alert from "@material-ui/lab/Alert";

const socketUrl = "http://localhost:3001";

const style = {
	background: "#6E3ADB",
	width: "20rem",
	height: "5rem",
	position: "absolute",
	bottom: "5rem",
	right: "5rem",
};

class Notification extends React.Component {
	constructor(props) {
		super(props);

		this.state = { socket: null, event: "" };
	}

	componentWillMount() {
		this.initSocket();
	}

	initSocket = () => {
		const socket = io(socketUrl);
		this.setState({ socket });
		// socket.on("connect", this.setState({ event: "Welcome!" }));
		// socket.on("notification", (event) => this.setState({ event }));
	};
	handleClose = () => {
		this.setState({ event: "" });
	};

	render() {
		return (
			<div>
				{this.state.event !== "" ? (
					<Alert
						variant="filled"
						severity="info"
						style={style}
						onClose={this.handleClose}>
						{this.state.event}
					</Alert>
				) : null}
			</div>
		);
	}
}

export default Notification;
