'use strict';

var React = require('react/addons');
var Util = require('Util');

var Dice = React.createClass({
	getInitialState(){
		return {
			value: 1
		};
	},
	roll(){
		this.setState({ value: Util.randomInRange(1, 6) });

		return this.state.value;
	}
});

module.exports = Dice;