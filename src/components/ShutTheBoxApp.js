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
			dice: [
				{value: 1},
				{value: 1}
			],
			cards: [],
			diceTotal: 0,
			isGameOver: false,
			validRemainingCardCombos: []
		};
	},
	rollDice(){
		var total = 0;

		this.state.dice.forEach(function(die){
			die.value = Util.randomInRange(1, 6);

			total += die.value;
		});

		this.setState({ diceTotal: total });

		this.checkIfGameOver();
	},
	checkIfGameOver(){
		if(!this.calculateCardCombos()){
			this.end();
		}
	},
	/**
	 * Get all of the unflipped cards
	 * @return {array} array of numbers
	 */
	getUnflippedCardNumbers(){
		var unusedNumbers = [];

		for(var i = 0, len = this.state.cards.length, card; i < len; i++){
			card = this.state.cards[i];

			if(card.isFlippable){
				unusedNumbers.push(card.value);
			}
		}

		return unusedNumbers;
	},
	/**
	 * Figure out the remaining valid array combinations
	 * @return {number} number of valid card combos left
	 */
	calculateCardCombos(){
		var unusedCards = this.getUnflippedCardNumbers(),
			allCombos = [],  //all possible combinations
			remainingValidCombos = [];

		if(unusedCards.length){
			allCombos = Util.combinations(unusedCards);

			remainingValidCombos = allCombos.filter(function(curCombo){
				return Util.sumArray(curCombo) === this.state.diceTotal;
			});

			this.setState({ validRemainingCardCombos: remainingValidCombos	});
		}

		return this.state.validRemainingCardCombos.length;
	},
	/**
	 * End the game
	 * @return {[type]}
	 */
	end(){

	},
	endTurn(){
		//get the cards that are flipped
		var comboCards = this.state.cards.filter(function(card){
			return card.flipped && card.isFlippable;
		});

		var combo = comboCards.map(function(card){
			return card.value;
		});

		//if the sum is valid
		if(Util.sumArray(combo) === this.state.diceTotal){
			comboCards.forEach(function(card){
				card.isFlippable = false;
			});

			this.checkIfGameOver();

			return true;
		}

		return false;
	},
	render() {
		/* jshint ignore:start */
		var diceStartMessage = !this.state.diceHaveBeenRolled ? <p>Please roll the dice to start the game</p> : '';

		var diceReRollMessage = this.state.diceNeedReRoll ? <p>Please roll the dice again</p> : '';

		var dice = this.state.dice.map(function(die){
			return <li className="dice-list-item"> <Dice value={die.value} /> </li>
		});

		var cards = this.state.cards.map(function(card, index){
			return <li className="card-list-item"> <Card value={index} /> </li>
		});

		var gameOverMessage = this.state.isGameOver ? <div>
	            <h2>GAME OVER.</h2>
	            <h4>Score <span>{this.state.score}</span></h4>
	        </div> : '';

		return (
			<div className='shut-the-box-game-wrap' role="main">
				<h3>Shut the box</h3>
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

		        <button onClick={this.rollDice}>Roll Dice</button>
		        <button onClick={this.endTurn}>End Turn</button>
			</div>
		);
		/* jshint ignore:end */
	}
});

React.render(<ShutTheBoxApp />, document.getElementById('content'));

module.exports = ShutTheBoxApp;