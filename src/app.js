export class App {
	
	activate() {
		console.log('App activate');
		this.test = 0;
	}
	configureRouter(config, router) {
		config.title = 'Aurelia';
		config.map([
		  { route: ['', 'home'], name: 'homepage',      moduleId: './components/homepage',      nav: true, title: 'PFCLS' },
		  { route: 'prepareGame',         name: 'nbturn_choice',        moduleId: './components/nbturn_choice',        nav: true, title: 'PFCLS - Good luck' },
		  { route: 'game',         name: 'game',        moduleId: './components/game',        nav: true, title: 'PFCLS - Good luck' },
		  { route: 'help',  name: 'help', moduleId: './components/help', nav: true, title: 'PFCLS - Help' }
		]);

		this.router = router;
	}
}
