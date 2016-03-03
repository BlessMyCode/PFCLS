import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';


@inject(Router)

export class nbturn_choice {
	constructor(router) {
		console.log('nbturn_choice constructor');
		this.nbTurns = [ 1, 3, 5, 7, 9 ];
		this.router = router;
	}
	setNbTurn (nbTurn){
		console.log(`On lance une partie de ${this.nbTurns[nbTurn]} manches`);
		this.router.navigateToRoute('game', { nbManche: this.nbTurns[nbTurn] });
	}
	
}