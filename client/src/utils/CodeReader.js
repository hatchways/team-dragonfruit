///////// This component is for rendering the fetched code in the read-only mode/////////
// The fetched code should be passed to this component as props //
// Example:

// axios.get("/api/users/code").then((response) => {
// 	response.data[0].code;
// });

import React from "react";
import { Editor, EditorState, RichUtils, convertFromRaw } from "draft-js";
import PrismDecorator from "draft-js-prism";
import Prism from "prismjs";
import "../../src/prism.css";

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

class CodeReader extends React.Component {
  constructor(props) {
    super(props);

    var decorator = new PrismDecorator({
      defaultSyntax: "javascript",
    });
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: this.props.code,
    });

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      var decorator = new PrismDecorator({
        defaultSyntax: "javascript",
      });
      var contentState = convertFromRaw({
        entityMap: {},
        blocks: this.props.code,
      });
      this.setState({
        editorState: EditorState.createWithContent(contentState, decorator),
      });
    }
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
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
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
      <div className='RichEditor-root'>
        <div className={className} onClick={this.focus}>
          <Editor
            readOnly={true}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref='editor'
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default CodeReader;
