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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2FBTWEsSUFBSTs7Ozs7Ozs7OEJBTlQsTUFBTTs7O0FBTUQsT0FBSTthQUFKLElBQUk7MkJBQUosSUFBSTs7O2lCQUFKLElBQUk7O1lBQ1Isa0JBQUMsSUFBSSxFQUFFO0FBQ2QsYUFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hDLFVBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO01BQ2pCOzs7V0FKVyxJQUFJIiwiZmlsZSI6ImNvbXBvbmVudHMvdGltZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG4vKiBpbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInOyAqL1xyXG5cclxuXHJcbi8qIEBpbmplY3QoUm91dGVyKSAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIGNvdXAge1xyXG5cdGFjdGl2YXRlKGdhbWUpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdjb3VwIGNvbnN0cnVjdG9yJyk7XHJcblx0XHR0aGlzLmdhbWUgPSBnYW1lO1xyXG5cdH1cclxuXHRcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
