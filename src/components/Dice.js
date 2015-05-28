'use strict';

var React = require('react/addons');
var Util = require('./Util');

var Dice = React.createClass({
	propTypes: {
		value: React.PropTypes.oneOf([1,2,3,4,5,6])
	},
	render(){
		return (
			<div className="die">{this.props.value}</div>
		);
	}
});

module.exports = Dice;