'use strict';

import React from 'react';
import { Actions, Store, Flummox } from 'flummox';
import FluxComponent from 'flummox/component';
import Flux from './Flux';
import Card from './Card';
import Dice from './Dice';
import Util from './Util';

// CSS
require('normalize.css');
require('../styles/base.scss');
require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/theme.scss');

class ShutTheBox extends React.Component {
	componentDidMount(){
		this.gameActions = this.props.flux.getActions('game');
	}

	flipCard(card) {
		this.gameActions.flipCard(card);
	}

	rollDice(){
		this.gameActions.rollDice();
	}

	endTurn(){
		this.gameActions.endTurn();
	}

	render() {
		/* jshint ignore:start */
		let self = this;

		let diceStartMessage = !this.props.diceHaveBeenRolled ? <p className="message">Please roll the dice to start the game</p> : '';

		let diceReRollMessage = this.props.diceNeedReRoll ? <p className="message">Please roll the dice again</p> : '';

		let dice = this.props.dice.map(function(die, index){
			return <li className="dice-list-item" key={index}> <Dice value={die.value} /> </li>
		});

		let cards = this.props.cards.map(function(card, index){
			let flippedClass = card.flipped ? ' card-flipped ' : '';
			let flippableClass = !card.isFlippable ? ' card-is-not-flippable ' : '';

			return <li className={'card-list-item' + flippableClass + flippedClass } key={card.value}>
				<Card value={card.value} onClick={self.flipCard.bind(self, card)} />
			</li>
		});

		let gameOverMessage = this.props.isGameOver ? <div>
	            <h2>GAME OVER.</h2>
	            <h4>Score <span>{this.props.score}</span></h4>
	        </div> : '';

		return (
			<div className='shut-the-box-game-wrap' role="main">
				<h3>Shut the box</h3>
				<h5>Dice</h5>
				<ul className="unstyled-list dice-list">
		            {dice}
		        </ul>

				{diceStartMessage}
				{diceReRollMessage}

				<h5>Cards</h5>
				<ul className="unstyled-list cards-list">
					{cards}
				</ul>

				{gameOverMessage}

				<div className="shut-the-box-btns-wrap">
		        	<button className="btn btn-roll-dice" onClick={ this.rollDice.bind(this) }>Roll Dice</button>
		        	<button className="btn btn-end-turn" onClick={ this.endTurn.bind(this) }>End Turn</button>
		        </div>
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