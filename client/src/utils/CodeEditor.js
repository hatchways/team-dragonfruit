///////////// This file should be modified before final use. /////////////
// The sendCode prop should be set properly according to the parent component //
// that is responsible for handling the editor content // 


import React from "react";
import PrismDraft from "./PrismDraft";

const CodeEditor = () => {
	
		return (
			<PrismDraft
				sendCode={() => {
					return;
				}}
			/>
		);

};

export default CodeEditor;
