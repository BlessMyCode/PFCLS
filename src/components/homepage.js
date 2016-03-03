import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)

export class Homepage {
	constructor(router){
		this.router = router;
	}
	title = 'PFCLS';
	startGame() {
		console.log('startGame butt click');
		this.router.navigate('prepareGame');
	}
	showHelp() {
		console.log('showHelp butt click');
		this.router.navigate('');
	}
}