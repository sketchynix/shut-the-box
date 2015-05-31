'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';

class Dice extends React.Component {
	render(){
		/* jshint ignore:start */
		return (
			<div className="die">{this.props.value}</div>
		);
		/* jshint ignore:end */
	}
}

Dice.propTypes = {
	value: React.PropTypes.oneOf([1,2,3,4,5,6])
};

module.exports = Dice;