var React = require('react');
var Util = require('./Util');
import { Store } from 'flummox';

class CardModel {
	constructor(value){
		this.flipped = false;
		this.isFlippable = true;
		this.value = value;
	}
}

export default class GameStore extends Store {
	constructor(flux) {
		super();

		let gameActionIds = flux.getActionIds('game');
		this.register(gameActionIds.rollDice, this.handleRollDice);
		this.register(gameActionIds.flipCard, this.handleFlipCard);

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
	}

	addCards() {
		for(var i = 1; i <= this.state.totalCards; i++){
			this.state.cards.push(new CardModel(i));
		}
	}

	handleRollDice(die) {
		var total = 0;
		this.state.dice.forEach(function(die){
			die.value = Util.randomInRange(1, 6);

			total += die.value;
		});

		this.setState({ diceTotal: total });

		this.checkIfGameOver();
	}

	handleFlipCard(card){
		if(!card.flipped){
			card.flipped = true;
		} else if(card.isFlippable){
			card.flipped = false;
		}

		this.setState({ cards: this.state.cards });
	}

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
	}

	checkIfGameOver(){
		if(!this.calculateCardCombos()){
			this.end();
		}
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
			}.bind(this));

			this.setState({ validRemainingCardCombos: remainingValidCombos	});
		}

		return this.state.validRemainingCardCombos.length;
	}

	/**
	 * End the game
	 * @return {[type]}
	 */
	end(){

	}
}