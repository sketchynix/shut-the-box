import { Actions } from 'flummox';

export default class GameActions extends Actions {
	rollDice(die){
		return die || true;
	}

	flipCard(card){
		return card;
	}
}