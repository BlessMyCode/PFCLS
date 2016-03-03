System.register([], function (_export) {
	'use strict';

	var App;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			App = (function () {
				function App() {
					_classCallCheck(this, App);
				}

				_createClass(App, [{
					key: 'activate',
					value: function activate() {
						console.log('App activate');
						this.test = 0;
					}
				}, {
					key: 'configureRouter',
					value: function configureRouter(config, router) {
						config.title = 'Aurelia';
						config.map([{ route: ['', 'home'], name: 'homepage', moduleId: './components/homepage', nav: true, title: 'PFCLS' }, { route: 'prepareGame', name: 'nbturn_choice', moduleId: './components/nbturn_choice', nav: true, title: 'PFCLS - Good luck' }, { route: 'game', name: 'game', moduleId: './components/game', nav: true, title: 'PFCLS - Good luck' }, { route: 'help', name: 'help', moduleId: './components/help', nav: true, title: 'PFCLS - Help' }]);

						this.router = router;
					}
				}, {
					key: 'goToHome',
					value: function goToHome() {
						this.router.navigate('home');
					}
				}]);

				return App;
			})();

			_export('App', App);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FBYSxHQUFHOzs7Ozs7Ozs7QUFBSCxNQUFHO2FBQUgsR0FBRzsyQkFBSCxHQUFHOzs7aUJBQUgsR0FBRzs7WUFFUCxvQkFBRztBQUNWLGFBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUIsVUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7TUFDZDs7O1lBQ2MseUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUMvQixZQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUN6QixZQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBTyxRQUFRLEVBQUUsdUJBQXVCLEVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQ2pILEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBVSxJQUFJLEVBQUUsZUFBZSxFQUFTLFFBQVEsRUFBRSw0QkFBNEIsRUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxFQUNwSixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQVUsSUFBSSxFQUFFLE1BQU0sRUFBUyxRQUFRLEVBQUUsbUJBQW1CLEVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsRUFDM0gsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFHLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUNsRyxDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7TUFDckI7OztZQUVPLG9CQUFFO0FBQ04sVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDaEM7OztXQXBCVyxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHAge1xuXHRcblx0YWN0aXZhdGUoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0FwcCBhY3RpdmF0ZScpO1xuXHRcdHRoaXMudGVzdCA9IDA7XG5cdH1cblx0Y29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XG5cdFx0Y29uZmlnLnRpdGxlID0gJ0F1cmVsaWEnO1xuXHRcdGNvbmZpZy5tYXAoW1xuXHRcdCAgeyByb3V0ZTogWycnLCAnaG9tZSddLCBuYW1lOiAnaG9tZXBhZ2UnLCAgICAgIG1vZHVsZUlkOiAnLi9jb21wb25lbnRzL2hvbWVwYWdlJywgICAgICBuYXY6IHRydWUsIHRpdGxlOiAnUEZDTFMnIH0sXG5cdFx0ICB7IHJvdXRlOiAncHJlcGFyZUdhbWUnLCAgICAgICAgIG5hbWU6ICduYnR1cm5fY2hvaWNlJywgICAgICAgIG1vZHVsZUlkOiAnLi9jb21wb25lbnRzL25idHVybl9jaG9pY2UnLCAgICAgICAgbmF2OiB0cnVlLCB0aXRsZTogJ1BGQ0xTIC0gR29vZCBsdWNrJyB9LFxuXHRcdCAgeyByb3V0ZTogJ2dhbWUnLCAgICAgICAgIG5hbWU6ICdnYW1lJywgICAgICAgIG1vZHVsZUlkOiAnLi9jb21wb25lbnRzL2dhbWUnLCAgICAgICAgbmF2OiB0cnVlLCB0aXRsZTogJ1BGQ0xTIC0gR29vZCBsdWNrJyB9LFxuXHRcdCAgeyByb3V0ZTogJ2hlbHAnLCAgbmFtZTogJ2hlbHAnLCBtb2R1bGVJZDogJy4vY29tcG9uZW50cy9oZWxwJywgbmF2OiB0cnVlLCB0aXRsZTogJ1BGQ0xTIC0gSGVscCcgfVxuXHRcdF0pO1xuXG5cdFx0dGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cdH1cblx0XG5cdGdvVG9Ib21lKCl7XG5cdCAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZScpO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
