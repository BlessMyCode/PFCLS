System.register(['aurelia-router', 'aurelia-framework'], function (_export) {
	'use strict';

	var Router, inject, Homepage;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_aureliaRouter) {
			Router = _aureliaRouter.Router;
		}, function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}],
		execute: function () {
			Homepage = (function () {
				function Homepage(router) {
					_classCallCheck(this, _Homepage);

					this.title = 'PFCLS';

					this.router = router;
				}

				_createClass(Homepage, [{
					key: 'startGame',
					value: function startGame() {
						console.log('startGame butt click');
						this.router.navigate('prepareGame');
					}
				}, {
					key: 'showHelp',
					value: function showHelp() {
						console.log('showHelp butt click');
						this.router.navigate('');
					}
				}]);

				var _Homepage = Homepage;
				Homepage = inject(Router)(Homepage) || Homepage;
				return Homepage;
			})();

			_export('Homepage', Homepage);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9tZXBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUthLFFBQVE7Ozs7Ozs7OzJCQUxiLE1BQU07OzhCQUNOLE1BQU07OztBQUlELFdBQVE7QUFDVCxhQURDLFFBQVEsQ0FDUixNQUFNLEVBQUM7OztVQUduQixLQUFLLEdBQUcsT0FBTzs7QUFGZCxTQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUNyQjs7aUJBSFcsUUFBUTs7WUFLWCxxQkFBRztBQUNYLGFBQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNwQyxVQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztNQUNwQzs7O1lBQ08sb0JBQUc7QUFDVixhQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkMsVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDekI7OztvQkFaVyxRQUFRO0FBQVIsWUFBUSxHQUZwQixNQUFNLENBQUMsTUFBTSxDQUFDLENBRUYsUUFBUSxLQUFSLFFBQVE7V0FBUixRQUFRIiwiZmlsZSI6ImNvbXBvbmVudHMvaG9tZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGluamVjdChSb3V0ZXIpXHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZXBhZ2Uge1xyXG5cdGNvbnN0cnVjdG9yKHJvdXRlcil7XHJcblx0XHR0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuXHR9XHJcblx0dGl0bGUgPSAnUEZDTFMnO1xyXG5cdHN0YXJ0R2FtZSgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdzdGFydEdhbWUgYnV0dCBjbGljaycpO1xyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoJ3ByZXBhcmVHYW1lJyk7XHJcblx0fVxyXG5cdHNob3dIZWxwKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ3Nob3dIZWxwIGJ1dHQgY2xpY2snKTtcclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKCcnKTtcclxuXHR9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
