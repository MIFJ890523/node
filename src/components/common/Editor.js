import React, {Component} from 'react'
import {isEqual} from 'underscore'
import {Editor, EditorState, RichUtils} from 'draft-js'
import {stateFromHTML} from 'draft-js-import-html'
import { connect } from 'react-redux'


class RichEditorExample extends Component {

	onChange(editorState) {

		this.setState({editorState})
		if (this.props.onChange) {
			this.props.onChange(editorState)
		}
	}

	_handleKeyCommand(command) {
		const {editorState} = this.state
		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			this.onChange(newState)
			return true
		}
		return false
	}

	_onTab(e) {
		const maxDepth = 4
		this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
	}

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		)
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		)
	}

	constructor(props) {
		super(props)

		this.state = {
			error: false,
			editorState: props.getHtmlState && props.getHtmlState.editorState !== "undefined" ? EditorState.createWithContent( stateFromHTML( props.getHtmlState.editorState ) ) : EditorState.createEmpty()
		}

		this.onChange = this.onChange.bind(this)
		this.focus = () => this.refs.editor.focus()
		this.handleKeyCommand = (command) => this._handleKeyCommand(command)
		this.onTab = (e) => this._onTab(e)
		this.toggleBlockType = (type) => this._toggleBlockType(type)
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.getHtmlState, this.props.getHtmlState)) {

			let editorState = EditorState.createWithContent( stateFromHTML( nextProps.getHtmlState.editorState.texto || nextProps.getHtmlState.editorState.texto=='' ? nextProps.getHtmlState.editorState.texto : this.props.getHtmlState.editorState.texto ? this.props.getHtmlState.editorState.texto : '' ) )
			let error = nextProps.getHtmlState.editorState.error || false
			this.setState({ editorState, error})
		}
	}

	render() {

		const {editorState} = this.state
	    let className = 'RichEditor-editor'
	    var contentState = editorState.getCurrentContent()

	    if (!contentState.hasText()) {
	      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
	        className += ' RichEditor-hidePlaceholder'
	      }
	    }

		return (
			<div className={this.state.error ? "has-error RichEditor-root" : "RichEditor-root"} >
		        <BlockStyleControls
		          editorState={editorState}
		          onToggle={this.toggleBlockType} />
		        <InlineStyleControls
		          editorState={editorState}
		          onToggle={this.toggleInlineStyle} />
		        <div className={className} onClick={this.focus}>
					<Editor
						blockStyleFn={getBlockStyle}
						customStyleMap={styleMap}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						onTab={this.onTab}
						placeholder="Texto ..."
						ref="editor"
						spellCheck />
				</div>
			</div>
		)
	}
}

// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	}
}

function getBlockStyle(block) {
	switch (block.getType()) {
		case 'blockquote': 
			return 'RichEditor-blockquote'
		default: return null
	}
}

class StyleButton extends React.Component {
	constructor() {
	super()
		this.onToggle = (e) => {
			e.preventDefault()
			this.props.onToggle(this.props.style)
		}
	}

	render() {

		let className = 'RichEditor-styleButton'
	    if (this.props.active) {
			className += ' RichEditor-activeButton'
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		)
  	}
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'Lista', style: 'unordered-list-item'},
  {label: 'Lista numerada', style: 'ordered-list-item'},
  // {label: 'Code Block', style: 'code-block'}
]

const BlockStyleControls = (props) => {
  const {editorState} = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        (<StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />)
      )}
    </div>
  )
}

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  // {label: 'Monospace', style: 'CODE'}
]

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        (<StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />)
      )}
    </div>
  )
}



const mapStateToProps = (state) => {
	return {
		getHtmlState: state.ProposalAssignment.get('GetHTML').toJS()
	}
}


const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditorExample)