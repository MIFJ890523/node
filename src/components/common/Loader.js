import React, {Component} from "react"

import {connect} from "react-redux"

class Loader extends Component {

    showLoader() {
        if (this.props.isLoader) {
            return (
                <div className="loader-component">
                    <div className="text-center">
                        <i className="fa fa-4x fa-spinner fa-pulse fa-3x fa-fw" />
                        <h3>Esto puede tardar varios minutos, espere por favor...</h3>
                    </div>
            	</div>
            )
        } else {
            return null
        }
    }

		constructor(props, context) {
            super(props, context)
            this.showLoader = this.showLoader.bind(this)
		}

    render() {
        return (this.showLoader())
    }
}

const mapStateToProps = (state) => {
    return {
		isLoader: state.Loader.get('isLoader')
    }
}

export default connect(mapStateToProps)(Loader)
