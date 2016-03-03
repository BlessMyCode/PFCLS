System.register(['aurelia-framework'], function (_export) {
	'use strict';

	var inject, coup;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}],
		execute: function () {
			coup = (function () {
				function coup() {
					_classCallCheck(this, coup);
				}

				_createClass(coup, [{
					key: 'activate',
					value: function activate(game) {
						console.log('coup constructor');
						this.game = game;
					}
				}]);

				return coup;
			})();

			_export('coup', coup);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY291cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7YUFNYSxJQUFJOzs7Ozs7Ozs4QkFOVCxNQUFNOzs7QUFNRCxPQUFJO2FBQUosSUFBSTsyQkFBSixJQUFJOzs7aUJBQUosSUFBSTs7WUFDUixrQkFBQyxJQUFJLEVBQUU7QUFDZCxhQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDaEMsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7TUFDakI7OztXQUpXLElBQUkiLCJmaWxlIjoiY29tcG9uZW50cy9jb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuLyogaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJzsgKi9cclxuXHJcblxyXG4vKiBAaW5qZWN0KFJvdXRlcikgKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBjb3VwIHtcclxuXHRhY3RpdmF0ZShnYW1lKSB7XHJcblx0XHRjb25zb2xlLmxvZygnY291cCBjb25zdHJ1Y3RvcicpO1xyXG5cdFx0dGhpcy5nYW1lID0gZ2FtZTtcclxuXHR9XHJcblx0XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
