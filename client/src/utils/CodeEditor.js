import React, { useEffect } from "react";
import Prism from "prismjs";
import "../../src/prism.css";

const CodeEditor = (props) => {
	useEffect(() => {
		Prism.highlightAll();
	});

	const codeSample = `
						onSubmit(e) {
							e.preventDefault();
							const job = {
								title: 'Developer',
								company: 'Facebook' 
								};
							}
					`;

	return (
		<div>
			<pre>
				{/* <code className={`language-${props.language}`}> */}
				<code className="language-javascript">
					{`${props.text}`} 
				</code>
			</pre>
		</div>
	);
};

export default CodeEditor;
