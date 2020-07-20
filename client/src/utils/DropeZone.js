import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = (theme) => ({
	btn: {
		color: "white",
		padding: "0.7rem 1rem",
		borderRadius: "2rem",
		background: "turquoise",
		textTransform: "capitalize",
		fontSize: "1rem",
		margin: "3rem 0",
		"&:hover": {
			backgroundColor: "#43dd9a",
			color: "#6E3ADB",
		},
	},
	icon: {
		opacity: "0.3",
		height: "64px",
		width: "64px",
	},
});

class DropZone extends Component {
	constructor(props) {
		super(props);
		this.state = { hightlight: false };
		this.fileInputRef = React.createRef();

		this.openFileDialog = this.openFileDialog.bind(this);
		this.onFilesAdded = this.onFilesAdded.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDragLeave = this.onDragLeave.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	openFileDialog() {
		if (this.props.disabled) return;
		this.fileInputRef.current.click();
	}

	onFilesAdded(evt) {
		if (this.props.disabled) return;
		const files = evt.target.files;
		if (this.props.onFilesAdded) {
			const array = this.fileListToArray(files);
			this.props.onFilesAdded(array);
		}
	}

	onDragOver(evt) {
		evt.preventDefault();

		if (this.props.disabled) return;

		this.setState({ hightlight: true });
	}

	onDragLeave() {
		this.setState({ hightlight: false });
	}

	onDrop(event) {
		event.preventDefault();

		if (this.props.disabled) return;

		const files = event.dataTransfer.files;
		if (this.props.onFilesAdded) {
			const array = this.fileListToArray(files);
			this.props.onFilesAdded(array);
		}
		this.setState({ hightlight: false });
	}

	fileListToArray(list) {
		const array = [];
		for (var i = 0; i < list.length; i++) {
			array.push(list.item(i));
		}
		return array;
	}

	render() {
		const { classes } = this.props;
		return (
			<div
				className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
				onClick={this.openFileDialog}
				style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
				<input
					ref={this.fileInputRef}
					className="FileInput"
					type="file"
					multiple
					onChange={this.onFilesAdded}
				/>
				
				<CloudUploadIcon fontSize="large" className={classes.icon} />
				<Button className={classes.btn}>Choose file</Button>
			</div>
		);
	}
}

export default withStyles(useStyles)(DropZone);
