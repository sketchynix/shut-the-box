'use strict';

import FluxComponent from 'flummox/component';
import React from 'react';

class Card extends React.Component {
	constructor(){
		this.propTypes = {
			onClick: React.PropTypes.func,
			value: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]) //ensure the start value is a number between 1-9
		};
	}

	render(){
		/* jshint ignore:start */
		return (
			<div className="card-face" onClick={this.props.onClick}>{this.props.value}</div>
		)
		/* jshint ignore:end */
	}
}

module.exports = Card;