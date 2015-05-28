import { Actions } from 'flummox';

export default class GameActions extends Actions {
	rollDice(die){
		return die;
	}

	flipCard(card){
		return card;
	}
}