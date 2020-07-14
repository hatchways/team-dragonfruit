import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import { EditorState } from "draft-js";
import CodeEditor from "./CodeEditor";
import CodeIcon from "@material-ui/icons/Code";
import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";
import "../../src/prism.css";

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
	overrides: {
		MUIRichTextEditor: {
			root: {
				margin: "0 auto",
				marginBottom: "50px",
				width: "85%",
				paddingLeft: "50px",
				paddingRight: "50px",
				height: "80%",
			},
			editor: {
				border: "1px solid gray",
				minHeight: "300px",
				overFlow: "scroll",
				borderRadius: "5px",
			},
		},
	},
});

class MyEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 	editorState: EditorState.createEmpty(
			// 		new PrismDecorator({ prism: Prism }),
			// 	),
			editorState: EditorState.createEmpty(),
			text: "",
			language: "",
		};
	}

	componentDidMount() {
		this.setState({ language: this.props.language });
	}

	onChange = (editorState) => {
		this.setState({ editorState });
		const contentState = this.state.editorState.getCurrentContent();
		const text = contentState.getPlainText();
		this.props.sendCode(text);
		console.log(text);
		this.setState({ text });
		console.log("changed");
		console.log("language is:", this.state.language);
	};

	save = (data) => {
		console.log(data);
		this.setState({ text: data });
	};

	render() {
		return (
			<MuiThemeProvider theme={defaultTheme}>
				<MUIRichTextEditor
					editorState={this.state.editorState}
					onChange={this.onChange}
					label="Enter your code here..."
					controls={[
						"title",
						"bold",
						"italic",
						"underline",
						"strikethrough",
						"highlight",
						"link",
						"media",
						"save",
						"code-block",
					]}
					onSave={this.save}
					customControls={[
						{
							name: "code-block",
							icon: <CodeIcon />,
							type: "block",
							blockWrapper: <CodeEditor />,
						},
					]}
				/>
			</MuiThemeProvider>
		);
	}
}

export default MyEditor;
