import React from 'react';
import Util from './Util';
import CardModel from './models/CardModel';
import { Store } from 'flummox';

export default class GameStore extends Store {
	constructor(flux) {
		super();

		let gameActionIds = flux.getActionIds('game');
		this.register(gameActionIds.rollDice, this.handleRollDice);
		this.register(gameActionIds.flipCard, this.handleFlipCard);
		this.register(gameActionIds.endTurn, this.handleEndTurn);

		this.state = {
			dice: [
				{value: 1},
				{value: 1}
			],
			cards: [],
			diceHaveBeenRolled: false,
			diceNeedReRoll: false,
			diceTotal: 0,
			totalCards: 9,
			isGameOver: false,
			validRemainingCardCombos: []
		};

		this.addCards();

		alert('Please roll the dice to start the game');
	}

	addCards() {
		for(var i = 1; i <= this.state.totalCards; i++){
			this.state.cards.push( new CardModel(i) );
		}
	}
	/**
	 * Roll the dice, update the diceTotal
	 * and check if the game is over after
	 * @return {void}
	 */
	handleRollDice() {
		var total = 0;

		this.state.dice.forEach(function(die){
			die.value = Util.randomInRange(1, 6);

			total += die.value;
		});

		this.setState({
			diceTotal: total,
			diceHaveBeenRolled: true,
			diceNeedReRoll: false
		});

		this.checkIfGameOver(total);
	}

	/**
	 * Flip over a given card
	 * A card can only be flipped if it has not been flipped in a previous turn
	 * @param  {object} card [CardModel object]
	 * @return {void}
	 */
	handleFlipCard(card){
		if(this.state.diceHaveBeenRolled){
			if(!card.flipped){
				card.flipped = true;
			} else if(card.isFlippable){
				card.flipped = false;
			}

			this.setState({ cards: this.state.cards });
		}
	}

	/**
	 * Returns all cards that are currently flipped
	 * @return {array}
	 */
	getFlippedCards(){
		return this.state.cards.filter(function(card){
			return card.flipped && card.isFlippable;
		});
	}

	handleEndTurn(){
		if(this.state.diceHaveBeenRolled && !this.state.diceNeedReRoll){
			//get the cards that are flipped
			var comboCards = this.getFlippedCards();

			var combo = comboCards.map(function(card){
				return card.value;
			});

			//if the sum is valid
			if(Util.sumArray(combo) === this.state.diceTotal){

				comboCards.forEach(function(card){
					card.isFlippable = false;
				});

				if(!this.checkIfGameOver(this.state.diceTotal)){
					this.setState({ diceNeedReRoll: true });

					alert('Good math! Valid combination. Please roll again for your next turn!');
				}
				return true;
			} else {
				alert('Invalid combination. Please ensure the sum of the cards and dice match.');
			}
		}

		return false;
	}

	checkIfGameOver(diceTotal){
		if(!this.calculateCardCombos(diceTotal)){
			this.end();

			return true;
		}

		return false;
	}

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
	}

	/**
	 * Figure out the remaining valid array combinations
	 * @param {number} the total of the dice to check against
	 * @return {number} number of valid card combos left
	 */
	calculateCardCombos(diceTotal){
		var unusedCards = this.getUnflippedCardNumbers(),
			allCombos = [],  //all possible combinations
			remainingValidCombos = [];

		if(unusedCards.length){
			allCombos = Util.combinations(unusedCards);

			remainingValidCombos = allCombos.filter(function(curCombo){
				return Util.sumArray(curCombo) === diceTotal;
			}.bind(this));

			this.setState({ validRemainingCardCombos: remainingValidCombos });
		}

		return remainingValidCombos.length;
	}

	/**
	 * End the game
	 * @return {[type]}
	 */
	end(){
		let score = Util.sumArray( this.getUnflippedCardNumbers() );

		this.setState({
			isGameOver: true,
			score: score
		});

		alert('Game over! Your score ' + score);
	}
}