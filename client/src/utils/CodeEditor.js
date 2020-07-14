///////////// This file should be modified before final use /////////////

import axios from "axios";
import React from "react";
import PrismDraft from "./PrismDraft";

class CodeEditor extends React.Component {
	state = { code: [] };

	componentDidMount() {
		axios.get("/api/users/code").then((response) => {
			console.log(response.data);
			this.setState({ code: response.data[0].code });
		});
	}

	render() {
		return (
			<PrismDraft
				code={this.state.code}
				sendCode={() => {
					return;
				}}
			/>
		);
	}
}

export default CodeEditor;
