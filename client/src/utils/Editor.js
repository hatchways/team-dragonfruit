///////////// This file is a wrapper and should be modified before final use. /////////////
// The sendCode prop should be set properly according to the parent component //
// that is responsible for handling the editor content //

// <PrismDraft> is an editor with toolbar and should have a sendCode props which is function //
// to handle the editor content //
// <CodeReader> is a renderer in read-only mode. It should have a code props provided by the wrapper //
// component. The code props contains the content that we want to render. //

import axios from "axios";
import React from "react";
import PrismDraft from "./PrismDraft";
import CodeReader from "./CodeReader";

class Editor extends React.Component {
	state = { code: [] };

	async componentDidMount() {
		// A hardcoded example
		const response = await axios.get("/api/users/snippet");
		console.log("fetched from db: ", response.data);
		this.setState({ code: response.data[0].code });
	}
	render() {
		return (
			<CodeReader code={this.state.code} />

			// <PrismDraft sendCode={() => {
			// 		return;
			// 	}}/>
		);
	}
}

export default Editor;
