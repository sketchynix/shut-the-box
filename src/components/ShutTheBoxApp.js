'use strict';

var React = require('react/addons');
var Card = require('Card');
var Dice = require('Dice');
var Util = require('Util');

// CSS
require('normalize.css');
require('../styles/main.css');

var ShutTheBoxApp = React.createClass({

	getInitialState(){
		return {
			diceHaveBeenRolled: false,
			diceNeedReRoll: false,
			dice: [],
			cards: []
		};
	},
	rollDice(){

	},
	endTurn(){

	},
	render() {
		/* jshint ignore:start */
		var diceStartMessage = !this.state.diceHaveBeenRolled ? <p>Please roll the dice to start the game</p> : '';

		var diceReRollMessage = this.state.diceNeedReRoll ? <p>Please roll the dice again</p> : '';

		var dice = this.state.dice.map(function(die){
			return <li className="dice-list-item"> <Dice /> </li>
		});

		var cards = this.state.cards.map(function(card, index){
			return <li className="card-list-item"> <Card value="{index}" /> </li>
		});

		var gameOverMessage = this.state.isGameOver ? <div>
	            <h2>GAME OVER.</h2>
	            <h4>Score <span>{thsi.state.score}</span></h4>
	        </div> : '';

		return (
			<div className='shut-the-box-game-wrap' role="main">
				<h3>Shut the door</h3>
				<h5>Dice</h5>
				<ul className="dice-list">
		            {dice}
		        </ul>

				{diceStartMessage}
				{diceReRollMessage}

				<h5>Cards</h5>
				<ul className="cards-list">
					{cards}
				</ul>

				{gameOverMessage}

		        <button onClick="{this.rollDice}">Roll Dice</button>
		        <button ng-click="{this.endTurn}">End Turn</button>
			</div>
		);
		/* jshint ignore:end */
	}
});

React.render(<ShutTheBoxApp />, document.getElementById('content'));

module.exports = ShutTheBoxApp;

