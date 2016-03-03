export class conf {
	constructor() {
		console.log('conf constructor');
		this.conf = {
			'pierre': {
				win: {
					ciseaux: '&Eacute;mousse', 
					lezard: '&Eacute;crase'
				}, 
				loose: {
					feuille: 'Recouvre', 
					spock: 'Pulv&eacute;rise'
				}
			},
			'feuille': {
				win: {
					pierre: 'Recouvre', 
					spock: 'Discr&eacute;dite'
				}, 
				loose: {
					ciseaux: 'Coupe', 
					lezard: 'Mange'
				}
			},
			'ciseaux': {
				win: {
					feuille: 'Coupe', 
					lezard: 'D&eacute;capite'
				}, 
				loose: {
					pierre: '&Eacute;mousse', 
					spock: 'Casse'
				}
			},
			'lezard': {
				win: {
					feuille: 'Mange', 
					spock: 'Empoisonne'
				}, 
				loose: {
					ciseaux: 'D&eacute;capite', 
					pierre: '&Eacute;crase'
				}
			},
			'spock': {
				win: {
					ciseaux: 'Casse', 
					pierre: 'Pulv&eacute;rise'
				}, 
				loose: {
					feuille: 'Discr&eacute;dite', 
					lezard: 'Empoisonne', 
				}
			}
		};
	}
	
	getWinner(fig_joueur1, fig_joueur2){
		let responseObj = {};
		
		if( fig_joueur1 === fig_joueur2 ){
			/* Egualite */
			return 0;
		}else if(fig_joueur2 === '') {
			/* Le joueur 1 gagne par forfait (le joueur 2 n'as pas eu le temps de jouer */
			return 1;
		}else if(fig_joueur1 === '') {
			/* Le joueur 2 gagne par forfait (le joueur 2 n'as pas eu le temps de jouer */
			return 2;
		}else if( this.conf[fig_joueur1].win[fig_joueur2] && this.conf[fig_joueur2].loose[fig_joueur1] ){
			/* Le Joueur 1 Gagne */
			return 1;
		}else if( this.conf[fig_joueur2].win[fig_joueur1] && this.conf[fig_joueur1].loose[fig_joueur2]){
			/* Le Joueur 2 Gagne */
			return 2;
		}
	}
	
}