'use strict';

var React = require('react');
var GameActions = require('./GameActions');
var GameStore = require('./GameStore');
var Card = require('./Card');
var Dice = require('./Dice');
var Util = require('./Util');
import { Actions, Store, Flummox } from 'flummox';
import FluxComponent from 'flummox/component';

// CSS
require('normalize.css');
require('../styles/main.css');

class Flux extends Flummox {
	constructor() {
		super();

		this.createActions('game', GameActions);
		this.createStore('game', GameStore, this);
	}
}

class ShutTheBox extends React.Component {
	flipCard(card) {
		let gameActions = this.props.flux.getActions('game');
		gameActions.flipCard(card);
	}

	rollDice(){
		let gameActions = this.props.flux.getActions('game');
		gameActions.rollDice(true);
	}

	render() {
		/* jshint ignore:start */
		var self = this;

		var diceStartMessage = !this.props.diceHaveBeenRolled ? <p>Please roll the dice to start the game</p> : '';

		var diceReRollMessage = this.props.diceNeedReRoll ? <p>Please roll the dice again</p> : '';

		var dice = this.props.dice.map(function(die, index){
			return <li className="dice-list-item" key={index}> <Dice value={die.value} /> </li>
		});

		var cards = this.props.cards.map(function(card, index){
			return <li className="card-list-item" key={card.value}>
				<Card value={card.value} onClick={self.flipCard.bind(self, card)} />
			</li>
		});

		var gameOverMessage = this.props.isGameOver ? <div>
	            <h2>GAME OVER.</h2>
	            <h4>Score <span>{this.props.score}</span></h4>
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

		        <button onClick={this.rollDice.bind(this)}>Roll Dice</button>
		        <button onClick={this.endTurn}>End Turn</button>
			</div>
		);
		/* jshint ignore:end */
	}
}

class App extends React.Component {
	render() {
		return (
			<FluxComponent flux={this.props.flux} connectToStores={'game'}>
				<ShutTheBox />
			</FluxComponent>
		);
	}
}

const flux = new Flux();
React.render(<App flux={flux} />, document.getElementById('content'));