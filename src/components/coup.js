import {inject} from 'aurelia-framework';
/* import {Router} from 'aurelia-router'; */


/* @inject(Router) */

export class coup {
	activate(game) {
		console.log('coup constructor');
		this.game = game;
	}
	
}