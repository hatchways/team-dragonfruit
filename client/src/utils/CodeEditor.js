// import React, { useEffect } from "react";
// import Prism from "prismjs";
// import "../../src/prism.css";

// const CodeEditor = (props) => {
// 	useEffect(() => {
// 		Prism.highlightAll();
// 	});

// 	return (
// 		<div>
// 			<pre>
// 				{/* <code className={`language-${props.language}`}> */}
// 				<code className="language-javascript">
// 					{`
// 					onSubmit(e) {
// 						e.preventDefault();
// 						const job = {
// 							title: 'Developer',
// 							company: 'Facebook'
// 							};
// 						}
// 				`}
// 				</code>
// 			</pre>
// 		</div>
// 	);
// };

import axios from "axios";
import React from "react";
import { useEffect } from "react";
import PrismDemo from "./PrismDemo";

class CodeEditor extends React.Component {
	state = { code: [] };

	componentDidMount() {
		axios.get("/api/users/code").then((response) => {
			console.log(response.data[0].code);
			this.setState({ code: response.data[0].code });
		});
	}

	render() {
		return (
			<PrismDemo
				code={this.state.code}
				sendCode={() => console.log(this.state.code)}
			/>
		);
	}
}

export default CodeEditor;
