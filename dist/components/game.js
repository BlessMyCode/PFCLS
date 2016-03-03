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
						if (this.showResult_cls !== 'hidden') {
							this.showResult_cls = 'hidden';
						}
						if (this.refTimeoutShowResult) {
							clearInterval(this.refTimeoutShowResult);
						}
						if (this.currentPlayer === 'joueur1') this.startTurn();
						this.startTimer();
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
							winnerTxt = "Egualit&eacut;";
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
//# sourceMappingURL=data:application/json;base64,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LENBQUMsRUFBRTtBQUN2QixXQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM1QixnQkFBUyxHQUFHLGdCQUFnQixDQUFDO09BQzdCO0FBQ0QsVUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTNCLFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzVELFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQzVELFVBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQ25DLFVBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUUsWUFBTTtBQUM3QyxjQUFLLGNBQWMsRUFBRSxDQUFDO09BQ3RCLEVBQUUsS0FBSyxDQUFFLENBQUM7TUFFWDs7O2dCQWpLVyxJQUFJO0FBQUosUUFBSSxHQUZoQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUVSLElBQUksS0FBSixJQUFJO1dBQUosSUFBSSIsImZpbGUiOiJjb21wb25lbnRzL2dhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge2NvbmZ9IGZyb20gJy4vLi4vY29uZic7XHJcblxyXG5cclxuQGluamVjdChSb3V0ZXIsIGNvbmYpXHJcblxyXG5leHBvcnQgY2xhc3MgZ2FtZSB7XHJcblx0Y29uc3RydWN0b3Iocm91dGVyLCBjb25mKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZ2FtZSBjb25zdHJ1Y3RvcicpO1xyXG5cdFx0dGhpcy5kaXNhYmxlU3RhdGUgPSAnZGlzYWJsZWQnO1xyXG5cdFx0dGhpcy5kaXNhYmxlU3RhdGVfc3RhcnRCdG4gPSAnJztcclxuXHRcdHRoaXMubmJUdXJuID0gMztcclxuXHRcdHRoaXMudG91cnNSZXN0YW50ID0gMztcclxuXHRcdHRoaXMudGltZUdhbWUgPSAxMDtcclxuXHRcdHRoaXMudGVtcHNSZXN0YW50ID0gMTA7XHJcblx0XHR0aGlzLnNjb3JlQm9hcmQgPSB7IGpvdWV1cjE6IFtdLCBqb3VldXIyOiBbXSwgc2NvcmU6IHtqb3VldXIxOiAwLCBqb3VldXIyOiAwLCBudWw6IDB9LCB3aW5uZXI6IFtdfTtcclxuXHRcdHRoaXMuY3VycmVudFBsYXllciA9ICdqb3VldXIxJztcclxuXHRcdHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cdFx0dGhpcy5nYW1lVk0gPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25mID0gY29uZjtcclxuXHRcdHRoaXMuc2hvd1Jlc3VsdF9jbHMgPSAnaGlkZGVuJztcclxuXHRcdHRoaXMuZGVmYXVsdENsc0J1dHQgPSBcImJ0biBidG4tcHJpbWFyeSBidG4tbGcgc3ltYm9sZSBcIjtcclxuXHR9XHJcblx0XHJcblx0YWN0aXZhdGUocGFyYW1zKXtcclxuXHRcdGNvbnNvbGUubG9nKCdnYW1lIC0gYWN0aXZhdGUnKTtcclxuXHRcdHRoaXMudG91cnNSZXN0YW50ID0gcGFyYW1zLm5iTWFuY2hlO1xyXG5cdFx0Y29uc29sZS5sb2cocGFyYW1zKTsgXHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0VGltZXIoKXtcclxuXHRcdHRoaXMudG9vZ2xlU3RhcnRCdXR0KGZhbHNlKTtcclxuXHRcdHRoaXMudG9vZ2xlR2FtZUJ1dHQodHJ1ZSk7XHJcblx0XHR2YXIgdml0ZXNzZVRpbWVyID0gMC4wMTtcclxuXHRcdHRoaXMudGVtcHNSZXN0YW50ID0gdGhpcy50aW1lR2FtZTtcclxuXHRcdHRoaXMucmVmSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCggKCkgPT4ge1xyXG5cdFx0XHRpZiggdGhpcy50ZW1wc1Jlc3RhbnQgPD0gMCApe1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFBsYXllclRpbWVPdXQoKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSAodGhpcy50ZW1wc1Jlc3RhbnQgLSB2aXRlc3NlVGltZXIpLnRvRml4ZWQoMik7XHJcblx0XHRcdH1cclxuXHRcdH0sIHZpdGVzc2VUaW1lcioxMDAwKTtcclxuXHR9XHJcblx0XHJcblx0cmVzZXRUaW1lcigpe1xyXG5cdFx0dGhpcy50b29nbGVHYW1lQnV0dChmYWxzZSk7XHJcblx0XHRjbGVhckludGVydmFsKHRoaXMucmVmSW50ZXJ2YWwpO1xyXG5cdFx0dGhpcy50ZW1wc1Jlc3RhbnQgPSB0aGlzLnRpbWVHYW1lO1xyXG5cdFx0dGhpcy50b29nbGVTdGFydEJ1dHQodHJ1ZSk7XHJcblx0fVxyXG5cdFxyXG5cdGdvVG9Ib21lKCl7XHJcblx0XHRhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUuIFZldWlsbGV6IG5vdXMgZW4gZXhjdXNlciBzdnAuJyk7XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZXBhZ2UnKTtcclxuXHR9XHJcblx0XHJcblx0c2V0UGxheWVyQ2hvaWNlKGNob2ljZSl7XHJcblx0XHRhbGVydCgnR2FtZSBub3Qgc3RhcnRlZCAtIHJldHVybiB0byBIb21lJyk7XHQvL1x0VG8gb3ZlcnJpZGVcclxuXHR9XHJcblx0Y3VycmVudFBsYXllclRpbWVPdXQoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRzdGFydEJ1dHRDbGljaygpIHtcclxuXHRcdGlmICggdGhpcy5zaG93UmVzdWx0X2NscyAhPT0gJ2hpZGRlbicgKXtcclxuXHRcdFx0dGhpcy5zaG93UmVzdWx0X2NscyA9ICdoaWRkZW4nO1xyXG5cdFx0fVxyXG5cdFx0aWYoIHRoaXMucmVmVGltZW91dFNob3dSZXN1bHQgKXtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnJlZlRpbWVvdXRTaG93UmVzdWx0KTtcclxuXHRcdH1cclxuXHRcdGlmKCB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09ICdqb3VldXIxJyApXHJcblx0XHRcdHRoaXMuc3RhcnRUdXJuKCk7XHJcblx0XHR0aGlzLnN0YXJ0VGltZXIoKTtcclxuXHR9XHJcblx0Ly9cdFBIQVNFIERFIEpFVVxyXG5cdHN0YXJ0VHVybigpe1xyXG5cdFx0aWYoIHRoaXMudG91cnNSZXN0YW50ID4gMCApe1xyXG5cdFx0XHR2YXIgcGxheWVyMV9zdGFydFR1cm4gPSBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdC8vXHRpbml0aWFsaXNhdGlvbiBkdSB0b3VyIGR1IHByZW1pZXIgam91ZXVyXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3Byb21pc2UxIC0gOicrdGhpcy50b3Vyc1Jlc3RhbnQpO1xyXG5cdFx0XHRcdHRoaXMuc2V0UGxheWVyQ2hvaWNlID0gKGNob2ljZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5yZXNldFRpbWVyKCk7XHJcblx0XHRcdFx0XHR0aGlzLnNjb3JlQm9hcmRbdGhpcy5jdXJyZW50UGxheWVyXS5wdXNoKGNob2ljZSk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRQbGF5ZXJUaW1lT3V0ID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5yZXNldFRpbWVyKCk7XHJcblx0XHRcdFx0XHR0aGlzLnNjb3JlQm9hcmRbdGhpcy5jdXJyZW50UGxheWVyXS5wdXNoKCcnKTtcclxuXHRcdFx0XHRcdHJlamVjdCgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjb25zb2xlLmxvZygnam91ZXVyIDEgUExBWScpO1xyXG5cdFx0XHRwbGF5ZXIxX3N0YXJ0VHVybi50aGVuKFxyXG5cdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdC8vXHRqb3VldXIgMiBqb3VlXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnam91ZXVyIDIgUExBWScpO1xyXG5cdFx0XHRcdFx0dmFyIHBsYXllcjJfc3RhcnRUdXJuID0gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3Byb21pc2UyIC0gOicrdGhpcy50b3Vyc1Jlc3RhbnQpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQbGF5ZXIgPSAnam91ZXVyMic7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0UGxheWVyQ2hvaWNlID0gKGNob2ljZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzZXRUaW1lcigpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmVCb2FyZFt0aGlzLmN1cnJlbnRQbGF5ZXJdLnB1c2goY2hvaWNlKTtcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UGxheWVyVGltZU91dCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc2V0VGltZXIoKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNjb3JlQm9hcmRbdGhpcy5jdXJyZW50UGxheWVyXS5wdXNoKCcnKTtcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cGxheWVyMl9zdGFydFR1cm4udGhlbiggXHJcblx0XHRcdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVNjb3JlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmdvVG9Ib21lKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuc2V0UGxheWVyQ2hvaWNlID0gKCkgPT4ge2NvbnNvbGUubG9nKHRoaXMuc2NvcmVCb2FyZCl9O1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvLy8vLy8vLy8vLy9cdFNUQVJUIFRVUk4gRlVOQ1RJT05TXHQvLy8vLy8vLy8vLy8vL1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHRvb2dsZUdhbWVCdXR0KGFjdGl2YXRlKXtcclxuXHRcdGFjdGl2YXRlID8gdGhpcy5kaXNhYmxlU3RhdGUgPSAnJyA6IHRoaXMuZGlzYWJsZVN0YXRlID0gJ2Rpc2FibGVkJztcclxuXHR9XHJcblx0dG9vZ2xlU3RhcnRCdXR0KGFjdGl2YXRlKXtcclxuXHRcdGFjdGl2YXRlID8gdGhpcy5kaXNhYmxlU3RhdGVfc3RhcnRCdG4gPSAnJyA6IHRoaXMuZGlzYWJsZVN0YXRlX3N0YXJ0QnRuID0gJ2Rpc2FibGVkJztcclxuXHR9XHJcblx0XHJcblx0dXBkYXRlU2NvcmUoKXtcclxuXHRcdGNvbnNvbGUubG9nKCd1cGRhdGVTY29yZScpO1xyXG5cdFx0dGhpcy5jdXJyZW50UGxheWVyID0gJ2pvdWV1cjEnO1xyXG5cdFx0dGhpcy50b3Vyc1Jlc3RhbnQtLTtcclxuXHRcdHRoaXMubGFzdENob2ljZV9qMSA9IHRoaXMuc2NvcmVCb2FyZC5qb3VldXIxW3RoaXMuc2NvcmVCb2FyZC5qb3VldXIxLmxlbmd0aCAtIDFdO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oyID0gdGhpcy5zY29yZUJvYXJkLmpvdWV1cjJbdGhpcy5zY29yZUJvYXJkLmpvdWV1cjIubGVuZ3RoIC0gMV07XHJcblx0XHRcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMubGFzdENob2ljZV9qMSk7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLmxhc3RDaG9pY2VfajIpO1xyXG5cdFx0XHJcblx0XHR2YXIgd2lubmVyID0gdGhpcy5jb25mLmdldFdpbm5lciggdGhpcy5sYXN0Q2hvaWNlX2oxLCB0aGlzLmxhc3RDaG9pY2VfajIgKTtcclxuXHRcdGNvbnNvbGUubG9nKHdpbm5lcik7XHJcblx0XHR2YXIgd2lubmVyVHh0ID0gXCJcIjtcclxuXHRcdGlmKCB3aW5uZXIgPT09IDEgKXtcclxuXHRcdFx0d2lubmVyVHh0ID0gXCJMZSBqb3VldXIgMSBnYWduZVwiO1xyXG5cdFx0XHR0aGlzLnNjb3JlQm9hcmQuc2NvcmUuam91ZXVyMSsrO1xyXG5cdFx0fWVsc2UgaWYoIHdpbm5lciA9PT0gMiApe1xyXG5cdFx0XHR0aGlzLnNjb3JlQm9hcmQuc2NvcmUuam91ZXVyMisrO1xyXG5cdFx0XHR3aW5uZXJUeHQgPSBcIkxlIGpvdWV1ciAyIGdhZ25lXCI7XHJcblx0XHR9ZWxzZSBpZiggd2lubmVyID09PSAwICl7XHJcblx0XHRcdHRoaXMuc2NvcmVCb2FyZC5zY29yZS5udWwrKztcclxuXHRcdFx0d2lubmVyVHh0ID0gXCJFZ3VhbGl0JmVhY3V0O1wiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy53aW5uZXJUeHQgPSB3aW5uZXJUeHQ7XHJcblx0XHRcclxuXHRcdHRoaXMubGFzdENob2ljZV9qMSA9IHRoaXMuZGVmYXVsdENsc0J1dHQrdGhpcy5sYXN0Q2hvaWNlX2oxO1xyXG5cdFx0dGhpcy5sYXN0Q2hvaWNlX2oyID0gdGhpcy5kZWZhdWx0Q2xzQnV0dCt0aGlzLmxhc3RDaG9pY2VfajI7XHJcblx0XHR0aGlzLnNob3dSZXN1bHRfY2xzID0gJ3Nob3dSZXN1bHQnO1xyXG5cdFx0dGhpcy5yZWZUaW1lb3V0U2hvd1Jlc3VsdCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0dGhpcy5zdGFydEJ1dHRDbGljaygpO1xyXG5cdFx0fSwgMjAwMDAgKTtcclxuXHRcdFxyXG5cdH1cclxuXHQvKiBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuXHRcdGNvbmZpZy5tYXAoW1xyXG5cdFx0ICB7IHJvdXRlOiBbJycsICdqMVBsYXknXSwgbmFtZTogJ3dlbGNvbWUnLCAgICAgICBtb2R1bGVJZDogJ3dlbGNvbWUnLCAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnV2VsY29tZScgfSxcclxuXHRcdCAgeyByb3V0ZTogJ2oyUGxheScsICAgICAgICAgbmFtZTogJ3VzZXJzJywgICAgICAgICBtb2R1bGVJZDogJ3VzZXJzJywgICAgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnR2l0aHViIFVzZXJzJyB9LFxyXG5cdFx0ICB7IHJvdXRlOiAnY2hpbGQtcm91dGVyJywgIG5hbWU6ICdjaGlsZC1yb3V0ZXInLCAgbW9kdWxlSWQ6ICdjaGlsZC1yb3V0ZXInLCAgbmF2OiB0cnVlLCB0aXRsZTogJ0NoaWxkIFJvdXRlcicgfVxyXG5cdFx0XSk7XHJcblxyXG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcblx0fSAqL1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
