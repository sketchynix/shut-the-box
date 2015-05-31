import React from 'react';
import { Actions, Store, Flummox } from 'flummox';
import GameActions from './GameActions';
import GameStore from './GameStore';

export default class Flux extends Flummox {
	constructor() {
		super();

		this.createActions('game', GameActions);
		this.createStore('game', GameStore, this);
	}
}
