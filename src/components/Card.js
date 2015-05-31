'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';

class Card extends React.Component {
	render(){
		/* jshint ignore:start */
		return (
			<div className="card-face" onClick={this.props.onClick}>{this.props.value}</div>
		)
		/* jshint ignore:end */
	}
}

Card.propTypes = {
	onClick: React.PropTypes.func,
	value: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]) //ensure the start value is a number between 1-9
};

module.exports = Card;