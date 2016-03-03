System.register(['aurelia-framework', 'aurelia-router'], function (_export) {
	'use strict';

	var inject, Router, nbturn_choice;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaRouter) {
			Router = _aureliaRouter.Router;
		}],
		execute: function () {
			nbturn_choice = (function () {
				function nbturn_choice(router) {
					_classCallCheck(this, _nbturn_choice);

					console.log('nbturn_choice constructor');
					this.nbTurns = [1, 3, 5, 7, 9];
					this.router = router;
				}

				_createClass(nbturn_choice, [{
					key: 'setNbTurn',
					value: function setNbTurn(nbTurn) {
						console.log('On lance une partie de ' + this.nbTurns[nbTurn] + ' manches');
						this.router.navigateToRoute('game', { nbManche: this.nbTurns[nbTurn] });
					}
				}]);

				var _nbturn_choice = nbturn_choice;
				nbturn_choice = inject(Router)(nbturn_choice) || nbturn_choice;
				return nbturn_choice;
			})();

			_export('nbturn_choice', nbturn_choice);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbmJ0dXJuX2Nob2ljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBTWEsYUFBYTs7Ozs7Ozs7OEJBTmxCLE1BQU07OzJCQUNOLE1BQU07OztBQUtELGdCQUFhO0FBQ2QsYUFEQyxhQUFhLENBQ2IsTUFBTSxFQUFFOzs7QUFDbkIsWUFBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3pDLFNBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDakMsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDckI7O2lCQUxXLGFBQWE7O1lBTWYsbUJBQUMsTUFBTSxFQUFDO0FBQ2pCLGFBQU8sQ0FBQyxHQUFHLDZCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFXLENBQUM7QUFDdEUsVUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ3hFOzs7eUJBVFcsYUFBYTtBQUFiLGlCQUFhLEdBRnpCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FFRixhQUFhLEtBQWIsYUFBYTtXQUFiLGFBQWEiLCJmaWxlIjoiY29tcG9uZW50cy9uYnR1cm5fY2hvaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuXHJcblxyXG5AaW5qZWN0KFJvdXRlcilcclxuXHJcbmV4cG9ydCBjbGFzcyBuYnR1cm5fY2hvaWNlIHtcclxuXHRjb25zdHJ1Y3Rvcihyb3V0ZXIpIHtcclxuXHRcdGNvbnNvbGUubG9nKCduYnR1cm5fY2hvaWNlIGNvbnN0cnVjdG9yJyk7XHJcblx0XHR0aGlzLm5iVHVybnMgPSBbIDEsIDMsIDUsIDcsIDkgXTtcclxuXHRcdHRoaXMucm91dGVyID0gcm91dGVyO1xyXG5cdH1cclxuXHRzZXROYlR1cm4gKG5iVHVybil7XHJcblx0XHRjb25zb2xlLmxvZyhgT24gbGFuY2UgdW5lIHBhcnRpZSBkZSAke3RoaXMubmJUdXJuc1tuYlR1cm5dfSBtYW5jaGVzYCk7XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZVRvUm91dGUoJ2dhbWUnLCB7IG5iTWFuY2hlOiB0aGlzLm5iVHVybnNbbmJUdXJuXSB9KTtcclxuXHR9XHJcblx0XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
