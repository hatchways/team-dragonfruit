///////////// This file is a wrapper and should be modified before final use. /////////////
// The sendCode prop should be set properly according to the parent component //
// that is responsible for handling the editor content //

// <PrismDraft> is an editor with toolbar //
// <CodeReader> is a renderer in read-only mode //

import axios from "axios";
import React from "react";
import PrismDraft from "./PrismDraft";
import CodeReader from "./CodeReader";

class Editor extends React.Component {
	state = { code: [] };

	async componentDidMount() {
		const response = await axios.get("/api/users/snippet");
		console.log("fetched from db: ", response.data);

		// Some hardcoded example
		this.setState({ code: response.data[4].code });
	}
	render() {
		return (
			<CodeReader
				code={this.state.code}
				sendCode={() => {
					return;
				}}
			/>
		);
	}
}

export default Editor;
