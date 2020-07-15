import React from "react";
import {
	Editor,
	EditorState,
	RichUtils,
	convertFromRaw,
	convertToRaw,
} from "draft-js";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { makeStyles } from "@material-ui/core/styles";
import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";
import "../../src/prism.css";

const useStyles = makeStyles((theme) => ({
	iconBtn: {
		borderRadius: "2rem",
		cursor: "default",
	},
}));

const BLOCK_TYPES = [
	{ label: "Quote", style: "blockquote", icon: <FormatQuoteIcon /> },
	{
		label: "UL",
		style: "unordered-list-item",
		icon: <FormatListBulletedIcon />,
	},
	{ label: "OL", style: "ordered-list-item", icon: <FormatListNumberedIcon /> },
	{
		label: "Code",
		style: "code-block",
		icon: <CodeIcon />,
	},
];

const INLINE_STYLES = [
	{ label: "Bold", style: "BOLD", icon: <FormatBoldIcon /> },
	{ label: "Italic", style: "ITALIC", icon: <FormatItalicIcon /> },
	{ label: "Underline", style: "UNDERLINE", icon: <FormatUnderlinedIcon /> },
];

const InlineStyleControls = (props) => {
	var currentStyle = props.editorState.getCurrentInlineStyle();
	const classes = useStyles();
	return (
		<div className="RichEditor-controls">
			{INLINE_STYLES.map((type) => (
				<div key={type.label}>
					<IconButton className={classes.iconBtn}>
						{type.icon}
						<StyleButton
							active={currentStyle.has(type.style)}
							label={type.label}
							onToggle={props.onToggle}
							style={type.style}
						/>
					</IconButton>
				</div>
			))}
		</div>
	);
};

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}

	render() {
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

const styleMap = {
	CODE: {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

const BlockStyleControls = (props) => {
	const classes = useStyles();
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="RichEditor-controls">
			{BLOCK_TYPES.map((type) => (
				<div key={type.label}>
					<IconButton className={classes.iconBtn}>
						{type.icon}
						<StyleButton
							active={type.style === blockType}
							label={type.label}
							onToggle={props.onToggle}
							style={type.style}
						/>
					</IconButton>
				</div>
			))}
		</div>
	);
};

class PrismEditor extends React.Component {
	constructor(props) {
		super(props);

		var decorator = new PrismDecorator({
			defaultSyntax: "javascript",
		});
		var contentState = convertFromRaw({
			entityMap: {},
			blocks: [],
		});

		this.state = {
			editorState: EditorState.createWithContent(contentState, decorator),
		};

		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => {
			this.setState({ editorState });
			const contentState = editorState.getCurrentContent();
			const converted = convertToRaw(contentState);
			this.props.sendCode(converted.blocks);
		};

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
	}

	componentDidMount() {
		Prism.highlightAll();
	}

	_handleKeyCommand(command) {
		const { editorState } = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_toggleBlockType(blockType) {
		this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
		);
	}

	render() {
		const { editorState } = this.state;
		let className = "RichEditor-editor";
		const contentState = editorState.getCurrentContent();

		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== "unstyled") {
				className += " RichEditor-hidePlaceholder";
			}
		}

		return (
			<div className="RichEditor-root">
				<BlockStyleControls
					editorState={editorState}
					onToggle={this.toggleBlockType}
				/>
				<InlineStyleControls
					editorState={editorState}
					onToggle={this.toggleInlineStyle}
				/>
				<div className={className} onClick={this.focus}>
					<Editor
						blockStyleFn={getBlockStyle}
						customStyleMap={styleMap}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						placeholder="Enter your text:"
						ref="editor"
						spellCheck={true}
					/>
				</div>
			</div>
		);
	}
}

export default PrismEditor;
