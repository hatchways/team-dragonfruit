import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default function CodeEditor() {
	return (
		<div>
			<AceEditor
				placeholder="Your code goes here..."
				mode="javascript"
				theme="monokai"
				name="code snippet"
				fontSize={14}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
}
