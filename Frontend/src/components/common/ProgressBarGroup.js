import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {ProgressBar, Tooltip,Overlay} from 'react-bootstrap'

class ProgressBarGroup extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            ref: null,
            show: true 
        }
        this.onEntering = this.onEntering.bind(this)
    }

    onEntering(e) {    
        e.style.left = `${this.props.now}%` /* Isn't pretty */
        this.setState({ref: e})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.now !== this.props.now)
            this.state.ref.style.left = `${nextProps.now}%` /* Isn't pretty */
    }

    render() {

        const sharedProps = {
            container: this,
            target: this.target,
            show: this.state.show
        }

        return(
            <div>
                <label>{this.props.label}</label>
                <ProgressBar 
                    min={this.props.min}
                    max={this.props.max}
                    now={this.props.now}
                    label={''}
                    bsClass={`progress-bar ${this.props.bsClass}`} />
                
                <Overlay {...sharedProps} placement={'top'} onEntering={this.onEntering}>
                    <Tooltip id={this.props.id} className="progress-bar-tooltip">{`${this.props.now ? this.props.now : 0}%`}</Tooltip>
                </Overlay>
            </div>
        )
    }
}

export default ProgressBarGroup