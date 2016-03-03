System.register(['aurelia-framework', 'aurelia-router', './../conf'], function (_export) {
	'use strict';

	var inject, Router, conf, game;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaRouter) {
			Router = _aureliaRouter.Router;
		}, function (_conf) {
			conf = _conf.conf;
		}],
		execute: function () {
			game = (function () {
				function game(router, conf) {
					_classCallCheck(this, _game);

					console.log('game constructor');
					this.disableState = 'disabled';
					this.disableState_startBtn = '';
					this.nbTurn = 3;
					this.toursRestant = this.nbTurn;
					this.timeGame = 3;
					this.tempsRestant = this.timeGame;
					this.scoreBoard = { joueur1: [], joueur2: [], score: { joueur1: 0, joueur2: 0, nul: 0 }, winner: [] };
					this.currentPlayer = 'joueur1';
					this.router = router;
					this.gameVM = this;
					this.conf = conf;
					this.showResult_cls = 'hidden';
					this.defaultClsButt = "btn btn-primary btn-lg symbole ";
				}

				_createClass(game, [{
					key: 'activate',
					value: function activate(params) {
						console.log('game - activate');
						this.toursRestant = params.nbManche;
						console.log(params);
					}
				}, {
					key: 'afficheBilanPartie',
					value: function afficheBilanPartie() {}
				}, {
					key: 'startTimer',
					value: function startTimer() {
						var _this = this;

						this.toogleStartButt(false);
						this.toogleGameButt(true);
						var vitesseTimer = 0.01;
						this.tempsRestant = this.timeGame;
						this.refInterval = setInterval(function () {
							if (_this.tempsRestant <= 0) {
								_this.currentPlayerTimeOut();
							} else {
								_this.tempsRestant = (_this.tempsRestant - vitesseTimer).toFixed(2);
							}
						}, vitesseTimer * 1000);
					}
				}, {
					key: 'resetTimer',
					value: function resetTimer() {
						this.toogleGameButt(false);
						clearInterval(this.refInterval);
						this.tempsRestant = this.timeGame;
						this.toogleStartButt(true);
					}
				}, {
					key: 'goToHome',
					value: function goToHome() {
						alert('Une erreur est survenue. Veuillez nous en excuser svp.');
						this.router.navigate('home');
					}
				}, {
					key: 'setPlayerChoice',
					value: function setPlayerChoice(choice) {
						alert('Game not started - return to Home');
					}
				}, {
					key: 'currentPlayerTimeOut',
					value: function currentPlayerTimeOut() {}
				}, {
					key: 'startButtClick',
					value: function startButtClick() {
						if (this.toursRestant > 0) {
							if (this.showResult_cls !== 'hidden') {
								this.showResult_cls = 'hidden';
							}
							if (this.refTimeoutShowResult) {
								clearInterval(this.refTimeoutShowResult);
							}
							if (this.currentPlayer === 'joueur1') this.startTurn();
							this.startTimer();
						} else {
							this.afficheBilanPartie();
						}
					}
				}, {
					key: 'startTurn',
					value: function startTurn() {
						var _this2 = this;

						if (this.toursRestant > 0) {
							var player1_startTurn = new Promise(function (resolve, reject) {
								console.log('promise1 - :' + _this2.toursRestant);
								_this2.setPlayerChoice = function (choice) {
									_this2.resetTimer();
									_this2.scoreBoard[_this2.currentPlayer].push(choice);
									resolve();
								};
								_this2.currentPlayerTimeOut = function () {
									_this2.resetTimer();
									_this2.scoreBoard[_this2.currentPlayer].push('');
									reject();
								};
							});
							console.log('joueur 1 PLAY');
							player1_startTurn.then(function () {
								console.log('joueur 2 PLAY');
								var player2_startTurn = new Promise(function (resolve, reject) {
									console.log('promise2 - :' + _this2.toursRestant);
									_this2.currentPlayer = 'joueur2';
									_this2.setPlayerChoice = function (choice) {
										_this2.resetTimer();
										_this2.scoreBoard[_this2.currentPlayer].push(choice);
										resolve();
									};
									_this2.currentPlayerTimeOut = function () {
										_this2.resetTimer();
										_this2.scoreBoard[_this2.currentPlayer].push('');
										reject();
									};
								});
								player2_startTurn.then(function () {
									_this2.updateScore();
								});
							}, function () {
								_this2.goToHome();
							});
						} else {
							this.setPlayerChoice = function () {
								console.log(_this2.scoreBoard);
							};
						}
					}
				}, {
					key: 'toogleGameButt',
					value: function toogleGameButt(activate) {
						activate ? this.disableState = '' : this.disableState = 'disabled';
					}
				}, {
					key: 'toogleStartButt',
					value: function toogleStartButt(activate) {
						activate ? this.disableState_startBtn = '' : this.disableState_startBtn = 'disabled';
					}
				}, {
					key: 'updateScore',
					value: function updateScore() {
						var _this3 = this;

						console.log('updateScore');
						this.currentPlayer = 'joueur1';
						this.toursRestant--;
						this.lastChoice_j1 = this.scoreBoard.joueur1[this.scoreBoard.joueur1.length - 1];
						this.lastChoice_j2 = this.scoreBoard.joueur2[this.scoreBoard.joueur2.length - 1];

						console.log(this.lastChoice_j1);
						console.log(this.lastChoice_j2);

						var winner = this.conf.getWinner(this.lastChoice_j1, this.lastChoice_j2);
						console.log(winner);
						var winnerTxt = "";
						if (winner === 1) {
							winnerTxt = "Le joueur 1 gagne";
							this.scoreBoard.score.joueur1++;
						} else if (winner === 2) {
							this.scoreBoard.score.joueur2++;
							winnerTxt = "Le joueur 2 gagne";
						} else if (winner === 0) {
							this.scoreBoard.score.nul++;
							winnerTxt = "Egualit&eacute;";
						}
						this.winnerTxt = winnerTxt;

						this.lastChoice_j1 = this.defaultClsButt + this.lastChoice_j1;
						this.lastChoice_j2 = this.defaultClsButt + this.lastChoice_j2;
						this.showResult_cls = 'showResult';
						this.refTimeoutShowResult = setTimeout(function () {
							_this3.startButtClick();
						}, 20000);
					}
				}]);

				var _game = game;
				game = inject(Router, conf)(game) || game;
				return game;
			})();

			_export('game', game);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZ2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MkJBT2EsSUFBSTs7Ozs7Ozs7OEJBUFQsTUFBTTs7MkJBQ04sTUFBTTs7Z0JBQ04sSUFBSTs7O0FBS0MsT0FBSTtBQUNMLGFBREMsSUFBSSxDQUNKLE1BQU0sRUFBRSxJQUFJLEVBQUU7OztBQUN6QixZQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7QUFDL0IsU0FBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNoQyxTQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoQixTQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDaEMsU0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbEIsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2xDLFNBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDbkcsU0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFDL0IsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsU0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsU0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7QUFDL0IsU0FBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztLQUN4RDs7aUJBaEJXLElBQUk7O1lBa0JSLGtCQUFDLE1BQU0sRUFBQztBQUNmLGFBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQixVQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDcEMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNwQjs7O1lBRWlCLDhCQUFFLEVBRW5COzs7WUFFUyxzQkFBRTs7O0FBQ1gsVUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixVQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLFVBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQUN4QixVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDbEMsVUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUUsWUFBTTtBQUNyQyxXQUFJLE1BQUssWUFBWSxJQUFJLENBQUMsRUFBRTtBQUMzQixjQUFLLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsTUFBSTtBQUNKLGNBQUssWUFBWSxHQUFHLENBQUMsTUFBSyxZQUFZLEdBQUcsWUFBWSxDQUFBLENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFO09BQ0QsRUFBRSxZQUFZLEdBQUMsSUFBSSxDQUFDLENBQUM7TUFDdEI7OztZQUVTLHNCQUFFO0FBQ1gsVUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQixtQkFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoQyxVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDbEMsVUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUMzQjs7O1lBRU8sb0JBQUU7QUFDVCxXQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztBQUNoRSxVQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUM3Qjs7O1lBRWMseUJBQUMsTUFBTSxFQUFDO0FBQ3RCLFdBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO01BQzNDOzs7WUFDbUIsZ0NBQUUsRUFFckI7OztZQUVhLDBCQUFHO0FBQ2IsVUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRTtBQUNwQixXQUFLLElBQUksQ0FBQyxjQUFjLEtBQUssUUFBUSxFQUFFO0FBQ25DLFlBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQ2xDO0FBQ0QsV0FBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7QUFDM0IscUJBQWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QztBQUNELFdBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyQixXQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7T0FDckIsTUFBSTtBQUNELFdBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO09BQzdCO01BQ1A7OztZQUVRLHFCQUFFOzs7QUFDVixVQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO0FBQzFCLFdBQUksaUJBQWlCLEdBQUcsSUFBSSxPQUFPLENBQUUsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBRXpELGVBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFDLE9BQUssWUFBWSxDQUFDLENBQUM7QUFDOUMsZUFBSyxlQUFlLEdBQUcsVUFBQyxNQUFNLEVBQUs7QUFDbEMsZ0JBQUssVUFBVSxFQUFFLENBQUM7QUFDbEIsZ0JBQUssVUFBVSxDQUFDLE9BQUssYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELGdCQUFPLEVBQUUsQ0FBQztTQUNWLENBQUM7QUFDRixlQUFLLG9CQUFvQixHQUFHLFlBQU07QUFDakMsZ0JBQUssVUFBVSxFQUFFLENBQUM7QUFDbEIsZ0JBQUssVUFBVSxDQUFDLE9BQUssYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLGVBQU0sRUFBRSxDQUFDO1NBQ1QsQ0FBQztRQUNGLENBQUMsQ0FBQztBQUNILGNBQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0Isd0JBQWlCLENBQUMsSUFBSSxDQUNyQixZQUFNO0FBRUwsZUFBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM3QixZQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFFLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN6RCxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUMsT0FBSyxZQUFZLENBQUMsQ0FBQztBQUM5QyxnQkFBSyxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBQy9CLGdCQUFLLGVBQWUsR0FBRyxVQUFDLE1BQU0sRUFBSztBQUNsQyxpQkFBSyxVQUFVLEVBQUUsQ0FBQztBQUNsQixpQkFBSyxVQUFVLENBQUMsT0FBSyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakQsaUJBQU8sRUFBRSxDQUFDO1VBQ1YsQ0FBQTtBQUNELGdCQUFLLG9CQUFvQixHQUFHLFlBQU07QUFDakMsaUJBQUssVUFBVSxFQUFFLENBQUM7QUFDbEIsaUJBQUssVUFBVSxDQUFDLE9BQUssYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLGdCQUFNLEVBQUUsQ0FBQztVQUNULENBQUM7U0FDRixDQUFDLENBQUM7QUFDSCx5QkFBaUIsQ0FBQyxJQUFJLENBQ3JCLFlBQU07QUFDTCxnQkFBSyxXQUFXLEVBQUUsQ0FBQztTQUNuQixDQUNELENBQUM7UUFDRixFQUNELFlBQU07QUFDTCxlQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLENBQ0QsQ0FBQztPQUNGLE1BQUk7QUFDSixXQUFJLENBQUMsZUFBZSxHQUFHLFlBQU07QUFBQyxlQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssVUFBVSxDQUFDLENBQUE7UUFBQyxDQUFDO09BQzVEO01BSUQ7OztZQUVhLHdCQUFDLFFBQVEsRUFBQztBQUN2QixjQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7TUFDbkU7OztZQUNjLHlCQUFDLFFBQVEsRUFBQztBQUN4QixjQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVSxDQUFDO01BQ3JGOzs7WUFFVSx1QkFBRTs7O0FBQ1osYUFBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQixVQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUMvQixVQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakYsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRWpGLGFBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLGFBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUVoQyxVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQztBQUMzRSxhQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLFVBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixVQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDakIsZ0JBQVMsR0FBRyxtQkFBbUIsQ0FBQztBQUNoQyxXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNoQyxNQUFLLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN2QixXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQyxnQkFBUyxHQUFHLG1CQUFtQixDQUFDO09BQ2hDLE1BQUssSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3ZCLFdBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzVCLGdCQUFTLEdBQUcsaUJBQWlCLENBQUM7T0FDOUI7QUFDRCxVQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFFM0IsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDNUQsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDNUQsVUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7QUFDbkMsVUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQVUsQ0FBRSxZQUFNO0FBQzdDLGNBQUssY0FBYyxFQUFFLENBQUM7T0FDdEIsRUFBRSxLQUFLLENBQUUsQ0FBQztNQUVYOzs7Z0JBektXLElBQUk7QUFBSixRQUFJLEdBRmhCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBRVIsSUFBSSxLQUFKLElBQUk7V0FBSixJQUFJIiwiZmlsZSI6ImNvbXBvbmVudHMvZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7Y29uZn0gZnJvbSAnLi8uLi9jb25mJztcclxuXHJcblxyXG5AaW5qZWN0KFJvdXRlciwgY29uZilcclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1lIHtcclxuXHRjb25zdHJ1Y3Rvcihyb3V0ZXIsIGNvbmYpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdnYW1lIGNvbnN0cnVjdG9yJyk7XHJcblx0XHR0aGlzLmRpc2FibGVTdGF0ZSA9ICdkaXNhYmxlZCc7XHJcblx0XHR0aGlzLmRpc2FibGVTdGF0ZV9zdGFydEJ0biA9ICcnO1xyXG5cdFx0dGhpcy5uYlR1cm4gPSAzO1xyXG5cdFx0dGhpcy50b3Vyc1Jlc3RhbnQgPSB0aGlzLm5iVHVybjtcclxuXHRcdHRoaXMudGltZUdhbWUgPSAzO1xyXG5cdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSB0aGlzLnRpbWVHYW1lO1xyXG5cdFx0dGhpcy5zY29yZUJvYXJkID0geyBqb3VldXIxOiBbXSwgam91ZXVyMjogW10sIHNjb3JlOiB7am91ZXVyMTogMCwgam91ZXVyMjogMCwgbnVsOiAwfSwgd2lubmVyOiBbXX07XHJcblx0XHR0aGlzLmN1cnJlbnRQbGF5ZXIgPSAnam91ZXVyMSc7XHJcblx0XHR0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuXHRcdHRoaXMuZ2FtZVZNID0gdGhpcztcclxuXHRcdHRoaXMuY29uZiA9IGNvbmY7XHJcblx0XHR0aGlzLnNob3dSZXN1bHRfY2xzID0gJ2hpZGRlbic7XHJcblx0XHR0aGlzLmRlZmF1bHRDbHNCdXR0ID0gXCJidG4gYnRuLXByaW1hcnkgYnRuLWxnIHN5bWJvbGUgXCI7XHJcblx0fVxyXG5cdFxyXG5cdGFjdGl2YXRlKHBhcmFtcyl7XHJcblx0XHRjb25zb2xlLmxvZygnZ2FtZSAtIGFjdGl2YXRlJyk7XHJcblx0XHR0aGlzLnRvdXJzUmVzdGFudCA9IHBhcmFtcy5uYk1hbmNoZTtcclxuXHRcdGNvbnNvbGUubG9nKHBhcmFtcyk7IFxyXG5cdH1cclxuXHRcclxuXHRhZmZpY2hlQmlsYW5QYXJ0aWUoKXtcclxuXHQgICAgXHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0VGltZXIoKXtcclxuXHRcdHRoaXMudG9vZ2xlU3RhcnRCdXR0KGZhbHNlKTtcclxuXHRcdHRoaXMudG9vZ2xlR2FtZUJ1dHQodHJ1ZSk7XHJcblx0XHR2YXIgdml0ZXNzZVRpbWVyID0gMC4wMTtcclxuXHRcdHRoaXMudGVtcHNSZXN0YW50ID0gdGhpcy50aW1lR2FtZTtcclxuXHRcdHRoaXMucmVmSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCggKCkgPT4ge1xyXG5cdFx0XHRpZiggdGhpcy50ZW1wc1Jlc3RhbnQgPD0gMCApe1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFBsYXllclRpbWVPdXQoKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSAodGhpcy50ZW1wc1Jlc3RhbnQgLSB2aXRlc3NlVGltZXIpLnRvRml4ZWQoMik7XHJcblx0XHRcdH1cclxuXHRcdH0sIHZpdGVzc2VUaW1lcioxMDAwKTtcclxuXHR9XHJcblx0XHJcblx0cmVzZXRUaW1lcigpe1xyXG5cdFx0dGhpcy50b29nbGVHYW1lQnV0dChmYWxzZSk7XHJcblx0XHRjbGVhckludGVydmFsKHRoaXMucmVmSW50ZXJ2YWwpO1xyXG5cdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSB0aGlzLnRpbWVHYW1lO1xyXG5cdFx0dGhpcy50b29nbGVTdGFydEJ1dHQodHJ1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdGdvVG9Ib21lKCl7XHJcblx0XHRhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUuIFZldWlsbGV6IG5vdXMgZW4gZXhjdXNlciBzdnAuJyk7XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZScpO1xyXG5cdH1cclxuXHRcclxuXHRzZXRQbGF5ZXJDaG9pY2UoY2hvaWNlKXtcclxuXHRcdGFsZXJ0KCdHYW1lIG5vdCBzdGFydGVkIC0gcmV0dXJuIHRvIEhvbWUnKTtcdC8vXHRUbyBvdmVycmlkZVxyXG5cdH1cclxuXHRjdXJyZW50UGxheWVyVGltZU91dCgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0QnV0dENsaWNrKCkge1xyXG5cdCAgICBpZiggdGhpcy50b3Vyc1Jlc3RhbnQgPiAwICl7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5zaG93UmVzdWx0X2NscyAhPT0gJ2hpZGRlbicgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdF9jbHMgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggdGhpcy5yZWZUaW1lb3V0U2hvd1Jlc3VsdCApe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZlRpbWVvdXRTaG93UmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSAnam91ZXVyMScgKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFR1cm4oKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaWNoZUJpbGFuUGFydGllKCk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHQvL1x0UEhBU0UgREUgSkVVXHJcblx0c3RhcnRUdXJuKCl7XHJcblx0XHRpZiggdGhpcy50b3Vyc1Jlc3RhbnQgPiAwICl7XHJcblx0XHRcdHZhciBwbGF5ZXIxX3N0YXJ0VHVybiA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdFx0Ly9cdGluaXRpYWxpc2F0aW9uIGR1IHRvdXIgZHUgcHJlbWllciBqb3VldXJcclxuXHRcdFx0XHRjb25zb2xlLmxvZygncHJvbWlzZTEgLSA6Jyt0aGlzLnRvdXJzUmVzdGFudCk7XHJcblx0XHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoY2hvaWNlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc2V0VGltZXIoKTtcclxuXHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goY2hvaWNlKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFBsYXllclRpbWVPdXQgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc2V0VGltZXIoKTtcclxuXHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goJycpO1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdqb3VldXIgMSBQTEFZJyk7XHJcblx0XHRcdHBsYXllcjFfc3RhcnRUdXJuLnRoZW4oXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0Ly9cdGpvdWV1ciAyIGpvdWVcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdqb3VldXIgMiBQTEFZJyk7XHJcblx0XHRcdFx0XHR2YXIgcGxheWVyMl9zdGFydFR1cm4gPSBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygncHJvbWlzZTIgLSA6Jyt0aGlzLnRvdXJzUmVzdGFudCk7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBsYXllciA9ICdqb3VldXIyJztcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoY2hvaWNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXNldFRpbWVyKCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zY29yZUJvYXJkW3RoaXMuY3VycmVudFBsYXllcl0ucHVzaChjaG9pY2UpO1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQbGF5ZXJUaW1lT3V0ID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzZXRUaW1lcigpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goJycpO1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRwbGF5ZXIyX3N0YXJ0VHVybi50aGVuKCBcclxuXHRcdFx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU2NvcmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZ29Ub0hvbWUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoKSA9PiB7Y29uc29sZS5sb2codGhpcy5zY29yZUJvYXJkKX07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vLy8vLy8vLy8vL1x0U1RBUlQgVFVSTiBGVU5DVElPTlNcdC8vLy8vLy8vLy8vLy8vXHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0dG9vZ2xlR2FtZUJ1dHQoYWN0aXZhdGUpe1xyXG5cdFx0YWN0aXZhdGUgPyB0aGlzLmRpc2FibGVTdGF0ZSA9ICcnIDogdGhpcy5kaXNhYmxlU3RhdGUgPSAnZGlzYWJsZWQnO1xyXG5cdH1cclxuXHR0b29nbGVTdGFydEJ1dHQoYWN0aXZhdGUpe1xyXG5cdFx0YWN0aXZhdGUgPyB0aGlzLmRpc2FibGVTdGF0ZV9zdGFydEJ0biA9ICcnIDogdGhpcy5kaXNhYmxlU3RhdGVfc3RhcnRCdG4gPSAnZGlzYWJsZWQnO1xyXG5cdH1cclxuXHRcclxuXHR1cGRhdGVTY29yZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coJ3VwZGF0ZVNjb3JlJyk7XHJcblx0XHR0aGlzLmN1cnJlbnRQbGF5ZXIgPSAnam91ZXVyMSc7XHJcblx0XHR0aGlzLnRvdXJzUmVzdGFudC0tO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oxID0gdGhpcy5zY29yZUJvYXJkLmpvdWV1cjFbdGhpcy5zY29yZUJvYXJkLmpvdWV1cjEubGVuZ3RoIC0gMV07XHJcblx0XHR0aGlzLmxhc3RDaG9pY2VfajIgPSB0aGlzLnNjb3JlQm9hcmQuam91ZXVyMlt0aGlzLnNjb3JlQm9hcmQuam91ZXVyMi5sZW5ndGggLSAxXTtcclxuXHRcdFxyXG5cdFx0Y29uc29sZS5sb2codGhpcy5sYXN0Q2hvaWNlX2oxKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMubGFzdENob2ljZV9qMik7XHJcblx0XHRcclxuXHRcdHZhciB3aW5uZXIgPSB0aGlzLmNvbmYuZ2V0V2lubmVyKCB0aGlzLmxhc3RDaG9pY2VfajEsIHRoaXMubGFzdENob2ljZV9qMiApO1xyXG5cdFx0Y29uc29sZS5sb2cod2lubmVyKTtcclxuXHRcdHZhciB3aW5uZXJUeHQgPSBcIlwiO1xyXG5cdFx0aWYoIHdpbm5lciA9PT0gMSApe1xyXG5cdFx0XHR3aW5uZXJUeHQgPSBcIkxlIGpvdWV1ciAxIGdhZ25lXCI7XHJcblx0XHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZS5qb3VldXIxKys7XHJcblx0XHR9ZWxzZSBpZiggd2lubmVyID09PSAyICl7XHJcblx0XHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZS5qb3VldXIyKys7XHJcblx0XHRcdHdpbm5lclR4dCA9IFwiTGUgam91ZXVyIDIgZ2FnbmVcIjtcclxuXHRcdH1lbHNlIGlmKCB3aW5uZXIgPT09IDAgKXtcclxuXHRcdFx0dGhpcy5zY29yZUJvYXJkLnNjb3JlLm51bCsrO1xyXG5cdFx0XHR3aW5uZXJUeHQgPSBcIkVndWFsaXQmZWFjdXRlO1wiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy53aW5uZXJUeHQgPSB3aW5uZXJUeHQ7XHJcblx0XHRcclxuXHRcdHRoaXMubGFzdENob2ljZV9qMSA9IHRoaXMuZGVmYXVsdENsc0J1dHQrdGhpcy5sYXN0Q2hvaWNlX2oxO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oyID0gdGhpcy5kZWZhdWx0Q2xzQnV0dCt0aGlzLmxhc3RDaG9pY2VfajI7XHJcblx0XHR0aGlzLnNob3dSZXN1bHRfY2xzID0gJ3Nob3dSZXN1bHQnO1xyXG5cdFx0dGhpcy5yZWZUaW1lb3V0U2hvd1Jlc3VsdCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0dGhpcy5zdGFydEJ1dHRDbGljaygpO1xyXG5cdFx0fSwgMjAwMDAgKTtcclxuXHRcdFxyXG5cdH1cclxuXHQvKiBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuXHRcdGNvbmZpZy5tYXAoW1xyXG5cdFx0ICB7IHJvdXRlOiBbJycsICdqMVBsYXknXSwgbmFtZTogJ3dlbGNvbWUnLCAgICAgICBtb2R1bGVJZDogJ3dlbGNvbWUnLCAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnV2VsY29tZScgfSxcclxuXHRcdCAgeyByb3V0ZTogJ2oyUGxheScsICAgICAgICAgbmFtZTogJ3VzZXJzJywgICAgICAgICBtb2R1bGVJZDogJ3VzZXJzJywgICAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnR2l0aHViIFVzZXJzJyB9LFxyXG5cdFx0ICB7IHJvdXRlOiAnY2hpbGQtcm91dGVyJywgIG5hbWU6ICdjaGlsZC1yb3V0ZXInLCAgbW9kdWxlSWQ6ICdjaGlsZC1yb3V0ZXInLCAgbmF2OiB0cnVlLCB0aXRsZTogJ0NoaWxkIFJvdXRlcicgfVxyXG5cdFx0XSk7XHJcblxyXG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcblx0fSAqL1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
