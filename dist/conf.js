System.register([], function (_export) {
	'use strict';

	var conf;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			conf = (function () {
				function conf() {
					_classCallCheck(this, conf);

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
								lezard: 'Empoisonne'
							}
						}
					};
				}

				_createClass(conf, [{
					key: 'getWinner',
					value: function getWinner(fig_joueur1, fig_joueur2) {
						var responseObj = {};

						if (fig_joueur1 === fig_joueur2) {
							return 0;
						} else if (fig_joueur2 === '') {
							return 1;
						} else if (fig_joueur1 === '') {
							return 2;
						} else if (this.conf[fig_joueur1].win[fig_joueur2] && this.conf[fig_joueur2].loose[fig_joueur1]) {
							return 1;
						} else if (this.conf[fig_joueur2].win[fig_joueur1] && this.conf[fig_joueur1].loose[fig_joueur2]) {
							return 2;
						}
					}
				}]);

				return conf;
			})();

			_export('conf', conf);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBQWEsSUFBSTs7Ozs7Ozs7O0FBQUosT0FBSTtBQUNMLGFBREMsSUFBSSxHQUNGOzJCQURGLElBQUk7O0FBRWYsWUFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hDLFNBQUksQ0FBQyxJQUFJLEdBQUc7QUFDWCxjQUFRLEVBQUU7QUFDVCxVQUFHLEVBQUU7QUFDSixlQUFPLEVBQUUsZ0JBQWdCO0FBQ3pCLGNBQU0sRUFBRSxlQUFlO1FBQ3ZCO0FBQ0QsWUFBSyxFQUFFO0FBQ04sZUFBTyxFQUFFLFVBQVU7QUFDbkIsYUFBSyxFQUFFLGtCQUFrQjtRQUN6QjtPQUNEO0FBQ0QsZUFBUyxFQUFFO0FBQ1YsVUFBRyxFQUFFO0FBQ0osY0FBTSxFQUFFLFVBQVU7QUFDbEIsYUFBSyxFQUFFLG1CQUFtQjtRQUMxQjtBQUNELFlBQUssRUFBRTtBQUNOLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQU0sRUFBRSxPQUFPO1FBQ2Y7T0FDRDtBQUNELGVBQVMsRUFBRTtBQUNWLFVBQUcsRUFBRTtBQUNKLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLGNBQU0sRUFBRSxpQkFBaUI7UUFDekI7QUFDRCxZQUFLLEVBQUU7QUFDTixjQUFNLEVBQUUsZ0JBQWdCO0FBQ3hCLGFBQUssRUFBRSxPQUFPO1FBQ2Q7T0FDRDtBQUNELGNBQVEsRUFBRTtBQUNULFVBQUcsRUFBRTtBQUNKLGVBQU8sRUFBRSxPQUFPO0FBQ2hCLGFBQUssRUFBRSxZQUFZO1FBQ25CO0FBQ0QsWUFBSyxFQUFFO0FBQ04sZUFBTyxFQUFFLGlCQUFpQjtBQUMxQixjQUFNLEVBQUUsZUFBZTtRQUN2QjtPQUNEO0FBQ0QsYUFBTyxFQUFFO0FBQ1IsVUFBRyxFQUFFO0FBQ0osZUFBTyxFQUFFLE9BQU87QUFDaEIsY0FBTSxFQUFFLGtCQUFrQjtRQUMxQjtBQUNELFlBQUssRUFBRTtBQUNOLGVBQU8sRUFBRSxtQkFBbUI7QUFDNUIsY0FBTSxFQUFFLFlBQVk7UUFDcEI7T0FDRDtNQUNELENBQUM7S0FDRjs7aUJBdkRXLElBQUk7O1lBeURQLG1CQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUM7QUFDbEMsVUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUVyQixVQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUU7QUFFaEMsY0FBTyxDQUFDLENBQUM7T0FDVCxNQUFLLElBQUcsV0FBVyxLQUFLLEVBQUUsRUFBRTtBQUU1QixjQUFPLENBQUMsQ0FBQztPQUNULE1BQUssSUFBRyxXQUFXLEtBQUssRUFBRSxFQUFFO0FBRTVCLGNBQU8sQ0FBQyxDQUFDO09BQ1QsTUFBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBRS9GLGNBQU8sQ0FBQyxDQUFDO09BQ1QsTUFBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFDO0FBRTlGLGNBQU8sQ0FBQyxDQUFDO09BQ1Q7TUFDRDs7O1dBNUVXLElBQUkiLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBjb25mIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdjb25mIGNvbnN0cnVjdG9yJyk7XHJcblx0XHR0aGlzLmNvbmYgPSB7XHJcblx0XHRcdCdwaWVycmUnOiB7XHJcblx0XHRcdFx0d2luOiB7XHJcblx0XHRcdFx0XHRjaXNlYXV4OiAnJkVhY3V0ZTttb3Vzc2UnLCBcclxuXHRcdFx0XHRcdGxlemFyZDogJyZFYWN1dGU7Y3Jhc2UnXHJcblx0XHRcdFx0fSwgXHJcblx0XHRcdFx0bG9vc2U6IHtcclxuXHRcdFx0XHRcdGZldWlsbGU6ICdSZWNvdXZyZScsIFxyXG5cdFx0XHRcdFx0c3BvY2s6ICdQdWx2JmVhY3V0ZTtyaXNlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0J2ZldWlsbGUnOiB7XHJcblx0XHRcdFx0d2luOiB7XHJcblx0XHRcdFx0XHRwaWVycmU6ICdSZWNvdXZyZScsIFxyXG5cdFx0XHRcdFx0c3BvY2s6ICdEaXNjciZlYWN1dGU7ZGl0ZSdcclxuXHRcdFx0XHR9LCBcclxuXHRcdFx0XHRsb29zZToge1xyXG5cdFx0XHRcdFx0Y2lzZWF1eDogJ0NvdXBlJywgXHJcblx0XHRcdFx0XHRsZXphcmQ6ICdNYW5nZSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdCdjaXNlYXV4Jzoge1xyXG5cdFx0XHRcdHdpbjoge1xyXG5cdFx0XHRcdFx0ZmV1aWxsZTogJ0NvdXBlJywgXHJcblx0XHRcdFx0XHRsZXphcmQ6ICdEJmVhY3V0ZTtjYXBpdGUnXHJcblx0XHRcdFx0fSwgXHJcblx0XHRcdFx0bG9vc2U6IHtcclxuXHRcdFx0XHRcdHBpZXJyZTogJyZFYWN1dGU7bW91c3NlJywgXHJcblx0XHRcdFx0XHRzcG9jazogJ0Nhc3NlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0J2xlemFyZCc6IHtcclxuXHRcdFx0XHR3aW46IHtcclxuXHRcdFx0XHRcdGZldWlsbGU6ICdNYW5nZScsIFxyXG5cdFx0XHRcdFx0c3BvY2s6ICdFbXBvaXNvbm5lJ1xyXG5cdFx0XHRcdH0sIFxyXG5cdFx0XHRcdGxvb3NlOiB7XHJcblx0XHRcdFx0XHRjaXNlYXV4OiAnRCZlYWN1dGU7Y2FwaXRlJywgXHJcblx0XHRcdFx0XHRwaWVycmU6ICcmRWFjdXRlO2NyYXNlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0J3Nwb2NrJzoge1xyXG5cdFx0XHRcdHdpbjoge1xyXG5cdFx0XHRcdFx0Y2lzZWF1eDogJ0Nhc3NlJywgXHJcblx0XHRcdFx0XHRwaWVycmU6ICdQdWx2JmVhY3V0ZTtyaXNlJ1xyXG5cdFx0XHRcdH0sIFxyXG5cdFx0XHRcdGxvb3NlOiB7XHJcblx0XHRcdFx0XHRmZXVpbGxlOiAnRGlzY3ImZWFjdXRlO2RpdGUnLCBcclxuXHRcdFx0XHRcdGxlemFyZDogJ0VtcG9pc29ubmUnLCBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG5cdFxyXG5cdGdldFdpbm5lcihmaWdfam91ZXVyMSwgZmlnX2pvdWV1cjIpe1xyXG5cdFx0bGV0IHJlc3BvbnNlT2JqID0ge307XHJcblx0XHRcclxuXHRcdGlmKCBmaWdfam91ZXVyMSA9PT0gZmlnX2pvdWV1cjIgKXtcclxuXHRcdFx0LyogRWd1YWxpdGUgKi9cclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9ZWxzZSBpZihmaWdfam91ZXVyMiA9PT0gJycpIHtcclxuXHRcdFx0LyogTGUgam91ZXVyIDEgZ2FnbmUgcGFyIGZvcmZhaXQgKGxlIGpvdWV1ciAyIG4nYXMgcGFzIGV1IGxlIHRlbXBzIGRlIGpvdWVyICovXHJcblx0XHRcdHJldHVybiAxO1xyXG5cdFx0fWVsc2UgaWYoZmlnX2pvdWV1cjEgPT09ICcnKSB7XHJcblx0XHRcdC8qIExlIGpvdWV1ciAyIGdhZ25lIHBhciBmb3JmYWl0IChsZSBqb3VldXIgMiBuJ2FzIHBhcyBldSBsZSB0ZW1wcyBkZSBqb3VlciAqL1xyXG5cdFx0XHRyZXR1cm4gMjtcclxuXHRcdH1lbHNlIGlmKCB0aGlzLmNvbmZbZmlnX2pvdWV1cjFdLndpbltmaWdfam91ZXVyMl0gJiYgdGhpcy5jb25mW2ZpZ19qb3VldXIyXS5sb29zZVtmaWdfam91ZXVyMV0gKXtcclxuXHRcdFx0LyogTGUgSm91ZXVyIDEgR2FnbmUgKi9cclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9ZWxzZSBpZiggdGhpcy5jb25mW2ZpZ19qb3VldXIyXS53aW5bZmlnX2pvdWV1cjFdICYmIHRoaXMuY29uZltmaWdfam91ZXVyMV0ubG9vc2VbZmlnX2pvdWV1cjJdKXtcclxuXHRcdFx0LyogTGUgSm91ZXVyIDIgR2FnbmUgKi9cclxuXHRcdFx0cmV0dXJuIDI7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
