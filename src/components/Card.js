'use strict';

var React = require('react/addons');

var Card = React.createClass({
	propTypes: {
		value: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]) //ensure the start value is a number between 1-9
	},
	/**
	 * Set the initial state of our card
	 * @return {object}
	 */
	getInitialState(){
		return {
			isFlippable: true, //can the card be flipped
			flipped: false //is the card flipped
		};
	},
	flip(){
		if(!this.state.flipped){
			this.setState({ flipped: true });
		} else if(this.state.isFlippable){
			this.setState({ flipped: false });
		}
	},
	render(){
		/* jshint ignore:start */
		return (
			<div className="card-face" onClick={this.flip}>{this.value}</div>
		)
		/* jshint ignore:end */
	}
});

module.exports = Card;