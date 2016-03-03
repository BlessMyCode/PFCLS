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
					this.toursRestant = 3;
					this.timeGame = 10;
					this.tempsRestant = 10;
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
						this.router.navigate('homepage');
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
//# sourceMappingURL=data:application/json;base64,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QUU7QUFDdkIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEMsZ0JBQVMsR0FBRyxtQkFBbUIsQ0FBQztPQUNoQyxNQUFLLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN2QixXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM1QixnQkFBUyxHQUFHLGlCQUFpQixDQUFDO09BQzlCO0FBQ0QsVUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTNCLFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzVELFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzVELFVBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQ25DLFVBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUUsWUFBTTtBQUM3QyxjQUFLLGNBQWMsRUFBRSxDQUFDO09BQ3RCLEVBQUUsS0FBSyxDQUFFLENBQUM7TUFFWDs7O2dCQXpLVyxJQUFJO0FBQUosUUFBSSxHQUZoQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUVSLElBQUksS0FBSixJQUFJO1dBQUosSUFBSSIsImZpbGUiOiJjb21wb25lbnRzL2dhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge2NvbmZ9IGZyb20gJy4vLi4vY29uZic7XHJcblxyXG5cclxuQGluamVjdChSb3V0ZXIsIGNvbmYpXHJcblxyXG5leHBvcnQgY2xhc3MgZ2FtZSB7XHJcblx0Y29uc3RydWN0b3Iocm91dGVyLCBjb25mKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZ2FtZSBjb25zdHJ1Y3RvcicpO1xyXG5cdFx0dGhpcy5kaXNhYmxlU3RhdGUgPSAnZGlzYWJsZWQnO1xyXG5cdFx0dGhpcy5kaXNhYmxlU3RhdGVfc3RhcnRCdG4gPSAnJztcclxuXHRcdHRoaXMubmJUdXJuID0gMztcclxuXHRcdHRoaXMudG91cnNSZXN0YW50ID0gMztcclxuXHRcdHRoaXMudGltZUdhbWUgPSAxMDtcclxuXHRcdHRoaXMudGVtcHNSZXN0YW50ID0gMTA7XHJcblx0XHR0aGlzLnNjb3JlQm9hcmQgPSB7IGpvdWV1cjE6IFtdLCBqb3VldXIyOiBbXSwgc2NvcmU6IHtqb3VldXIxOiAwLCBqb3VldXIyOiAwLCBudWw6IDB9LCB3aW5uZXI6IFtdfTtcclxuXHRcdHRoaXMuY3VycmVudFBsYXllciA9ICdqb3VldXIxJztcclxuXHRcdHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cdFx0dGhpcy5nYW1lVk0gPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25mID0gY29uZjtcclxuXHRcdHRoaXMuc2hvd1Jlc3VsdF9jbHMgPSAnaGlkZGVuJztcclxuXHRcdHRoaXMuZGVmYXVsdENsc0J1dHQgPSBcImJ0biBidG4tcHJpbWFyeSBidG4tbGcgc3ltYm9sZSBcIjtcclxuXHR9XHJcblx0XHJcblx0YWN0aXZhdGUocGFyYW1zKXtcclxuXHRcdGNvbnNvbGUubG9nKCdnYW1lIC0gYWN0aXZhdGUnKTtcclxuXHRcdHRoaXMudG91cnNSZXN0YW50ID0gcGFyYW1zLm5iTWFuY2hlO1xyXG5cdFx0Y29uc29sZS5sb2cocGFyYW1zKTsgXHJcblx0fVxyXG5cdFxyXG5cdGFmZmljaGVCaWxhblBhcnRpZSgpe1xyXG5cdCAgICBcclxuXHR9XHJcblx0XHJcblx0c3RhcnRUaW1lcigpe1xyXG5cdFx0dGhpcy50b29nbGVTdGFydEJ1dHQoZmFsc2UpO1xyXG5cdFx0dGhpcy50b29nbGVHYW1lQnV0dCh0cnVlKTtcclxuXHRcdHZhciB2aXRlc3NlVGltZXIgPSAwLjAxO1xyXG5cdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSB0aGlzLnRpbWVHYW1lO1xyXG5cdFx0dGhpcy5yZWZJbnRlcnZhbCA9IHNldEludGVydmFsKCAoKSA9PiB7XHJcblx0XHRcdGlmKCB0aGlzLnRlbXBzUmVzdGFudCA8PSAwICl7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50UGxheWVyVGltZU91dCgpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aGlzLnRlbXBzUmVzdGFudCA9ICh0aGlzLnRlbXBzUmVzdGFudCAtIHZpdGVzc2VUaW1lcikudG9GaXhlZCgyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdml0ZXNzZVRpbWVyKjEwMDApO1xyXG5cdH1cclxuXHRcclxuXHRyZXNldFRpbWVyKCl7XHJcblx0XHR0aGlzLnRvb2dsZUdhbWVCdXR0KGZhbHNlKTtcclxuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5yZWZJbnRlcnZhbCk7XHJcblx0XHR0aGlzLnRlbXBzUmVzdGFudCA9IHRoaXMudGltZUdhbWU7XHJcblx0XHR0aGlzLnRvb2dsZVN0YXJ0QnV0dCh0cnVlKTtcclxuXHR9XHJcblx0XHJcblx0Z29Ub0hvbWUoKXtcclxuXHRcdGFsZXJ0KCdVbmUgZXJyZXVyIGVzdCBzdXJ2ZW51ZS4gVmV1aWxsZXogbm91cyBlbiBleGN1c2VyIHN2cC4nKTtcclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKCdob21lcGFnZScpO1xyXG5cdH1cclxuXHRcclxuXHRzZXRQbGF5ZXJDaG9pY2UoY2hvaWNlKXtcclxuXHRcdGFsZXJ0KCdHYW1lIG5vdCBzdGFydGVkIC0gcmV0dXJuIHRvIEhvbWUnKTtcdC8vXHRUbyBvdmVycmlkZVxyXG5cdH1cclxuXHRjdXJyZW50UGxheWVyVGltZU91dCgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0QnV0dENsaWNrKCkge1xyXG5cdCAgICBpZiggdGhpcy50b3Vyc1Jlc3RhbnQgPiAwICl7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5zaG93UmVzdWx0X2NscyAhPT0gJ2hpZGRlbicgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdF9jbHMgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggdGhpcy5yZWZUaW1lb3V0U2hvd1Jlc3VsdCApe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZlRpbWVvdXRTaG93UmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggdGhpcy5jdXJyZW50UGxheWVyID09PSAnam91ZXVyMScgKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFR1cm4oKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYWZmaWNoZUJpbGFuUGFydGllKCk7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHQvL1x0UEhBU0UgREUgSkVVXHJcblx0c3RhcnRUdXJuKCl7XHJcblx0XHRpZiggdGhpcy50b3Vyc1Jlc3RhbnQgPiAwICl7XHJcblx0XHRcdHZhciBwbGF5ZXIxX3N0YXJ0VHVybiA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdFx0Ly9cdGluaXRpYWxpc2F0aW9uIGR1IHRvdXIgZHUgcHJlbWllciBqb3VldXJcclxuXHRcdFx0XHRjb25zb2xlLmxvZygncHJvbWlzZTEgLSA6Jyt0aGlzLnRvdXJzUmVzdGFudCk7XHJcblx0XHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoY2hvaWNlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc2V0VGltZXIoKTtcclxuXHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goY2hvaWNlKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFBsYXllclRpbWVPdXQgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc2V0VGltZXIoKTtcclxuXHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goJycpO1xyXG5cdFx0XHRcdFx0cmVqZWN0KCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdqb3VldXIgMSBQTEFZJyk7XHJcblx0XHRcdHBsYXllcjFfc3RhcnRUdXJuLnRoZW4oXHJcblx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0Ly9cdGpvdWV1ciAyIGpvdWVcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdqb3VldXIgMiBQTEFZJyk7XHJcblx0XHRcdFx0XHR2YXIgcGxheWVyMl9zdGFydFR1cm4gPSBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygncHJvbWlzZTIgLSA6Jyt0aGlzLnRvdXJzUmVzdGFudCk7XHJcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBsYXllciA9ICdqb3VldXIyJztcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoY2hvaWNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXNldFRpbWVyKCk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zY29yZUJvYXJkW3RoaXMuY3VycmVudFBsYXllcl0ucHVzaChjaG9pY2UpO1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQbGF5ZXJUaW1lT3V0ID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzZXRUaW1lcigpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goJycpO1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRwbGF5ZXIyX3N0YXJ0VHVybi50aGVuKCBcclxuXHRcdFx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU2NvcmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZ29Ub0hvbWUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5zZXRQbGF5ZXJDaG9pY2UgPSAoKSA9PiB7Y29uc29sZS5sb2codGhpcy5zY29yZUJvYXJkKX07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vLy8vLy8vLy8vL1x0U1RBUlQgVFVSTiBGVU5DVElPTlNcdC8vLy8vLy8vLy8vLy8vXHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0dG9vZ2xlR2FtZUJ1dHQoYWN0aXZhdGUpe1xyXG5cdFx0YWN0aXZhdGUgPyB0aGlzLmRpc2FibGVTdGF0ZSA9ICcnIDogdGhpcy5kaXNhYmxlU3RhdGUgPSAnZGlzYWJsZWQnO1xyXG5cdH1cclxuXHR0b29nbGVTdGFydEJ1dHQoYWN0aXZhdGUpe1xyXG5cdFx0YWN0aXZhdGUgPyB0aGlzLmRpc2FibGVTdGF0ZV9zdGFydEJ0biA9ICcnIDogdGhpcy5kaXNhYmxlU3RhdGVfc3RhcnRCdG4gPSAnZGlzYWJsZWQnO1xyXG5cdH1cclxuXHRcclxuXHR1cGRhdGVTY29yZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coJ3VwZGF0ZVNjb3JlJyk7XHJcblx0XHR0aGlzLmN1cnJlbnRQbGF5ZXIgPSAnam91ZXVyMSc7XHJcblx0XHR0aGlzLnRvdXJzUmVzdGFudC0tO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oxID0gdGhpcy5zY29yZUJvYXJkLmpvdWV1cjFbdGhpcy5zY29yZUJvYXJkLmpvdWV1cjEubGVuZ3RoIC0gMV07XHJcblx0XHR0aGlzLmxhc3RDaG9pY2VfajIgPSB0aGlzLnNjb3JlQm9hcmQuam91ZXVyMlt0aGlzLnNjb3JlQm9hcmQuam91ZXVyMi5sZW5ndGggLSAxXTtcclxuXHRcdFxyXG5cdFx0Y29uc29sZS5sb2codGhpcy5sYXN0Q2hvaWNlX2oxKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMubGFzdENob2ljZV9qMik7XHJcblx0XHRcclxuXHRcdHZhciB3aW5uZXIgPSB0aGlzLmNvbmYuZ2V0V2lubmVyKCB0aGlzLmxhc3RDaG9pY2VfajEsIHRoaXMubGFzdENob2ljZV9qMiApO1xyXG5cdFx0Y29uc29sZS5sb2cod2lubmVyKTtcclxuXHRcdHZhciB3aW5uZXJUeHQgPSBcIlwiO1xyXG5cdFx0aWYoIHdpbm5lciA9PT0gMSApe1xyXG5cdFx0XHR3aW5uZXJUeHQgPSBcIkxlIGpvdWV1ciAxIGdhZ25lXCI7XHJcblx0XHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZS5qb3VldXIxKys7XHJcblx0XHR9ZWxzZSBpZiggd2lubmVyID09PSAyICl7XHJcblx0XHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZS5qb3VldXIyKys7XHJcblx0XHRcdHdpbm5lclR4dCA9IFwiTGUgam91ZXVyIDIgZ2FnbmVcIjtcclxuXHRcdH1lbHNlIGlmKCB3aW5uZXIgPT09IDAgKXtcclxuXHRcdFx0dGhpcy5zY29yZUJvYXJkLnNjb3JlLm51bCsrO1xyXG5cdFx0XHR3aW5uZXJUeHQgPSBcIkVndWFsaXQmZWFjdXRlO1wiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy53aW5uZXJUeHQgPSB3aW5uZXJUeHQ7XHJcblx0XHRcclxuXHRcdHRoaXMubGFzdENob2ljZV9qMSA9IHRoaXMuZGVmYXVsdENsc0J1dHQrdGhpcy5sYXN0Q2hvaWNlX2oxO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oyID0gdGhpcy5kZWZhdWx0Q2xzQnV0dCt0aGlzLmxhc3RDaG9pY2VfajI7XHJcblx0XHR0aGlzLnNob3dSZXN1bHRfY2xzID0gJ3Nob3dSZXN1bHQnO1xyXG5cdFx0dGhpcy5yZWZUaW1lb3V0U2hvd1Jlc3VsdCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0dGhpcy5zdGFydEJ1dHRDbGljaygpO1xyXG5cdFx0fSwgMjAwMDAgKTtcclxuXHRcdFxyXG5cdH1cclxuXHQvKiBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuXHRcdGNvbmZpZy5tYXAoW1xyXG5cdFx0ICB7IHJvdXRlOiBbJycsICdqMVBsYXknXSwgbmFtZTogJ3dlbGNvbWUnLCAgICAgICBtb2R1bGVJZDogJ3dlbGNvbWUnLCAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnV2VsY29tZScgfSxcclxuXHRcdCAgeyByb3V0ZTogJ2oyUGxheScsICAgICAgICAgbmFtZTogJ3VzZXJzJywgICAgICAgICBtb2R1bGVJZDogJ3VzZXJzJywgICAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnR2l0aHViIFVzZXJzJyB9LFxyXG5cdFx0ICB7IHJvdXRlOiAnY2hpbGQtcm91dGVyJywgIG5hbWU6ICdjaGlsZC1yb3V0ZXInLCAgbW9kdWxlSWQ6ICdjaGlsZC1yb3V0ZXInLCAgbmF2OiB0cnVlLCB0aXRsZTogJ0NoaWxkIFJvdXRlcicgfVxyXG5cdFx0XSk7XHJcblxyXG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcblx0fSAqL1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
