import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import { EditorState } from "draft-js";

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
	overrides: {
		MUIRichTextEditor: {
			root: {
				marginBottom: "50px",
				width: "85%",
				paddingLeft: "50px",
				paddingRight: "50px",
			},
			editor: {
				border: "1px solid gray",
				minHeight: "300px",
				overFlow: "scroll",
			},
		},
	},
});

class MyEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
		this.onChange = (editorState) => {
			this.setState({ editorState });
			const contentState = this.state.editorState.getCurrentContent();
			const text = contentState.getPlainText();
			this.props.sendCode(text);
		};
	}

	render() {
		return (
			<MuiThemeProvider theme={defaultTheme}>
				<MUIRichTextEditor
					label="Enter your code here..."
					editorState={this.state.editorState}
					onChange={this.onChange}
				/>
			</MuiThemeProvider>
		);
	}
}

export default MyEditor;
