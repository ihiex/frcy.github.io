(function (angular) {
	'use strict';

// 主模块
	angular.module('moviecat', [
		'ngRoute',
		/*'moviecat.in_theaters',
		'moviecat.coming_soon',
		'moviecat.top250',*/
		'moviecat.movie_detail',  //控制加载的顺序
		'moviecat.movie_list',
		'moviecat.directives.auto_active'
	])
		.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters'});		//默认为正在热映
	}])
		.controller('SearchController',['$scope','$route','$window','$routeParams',
			function ($scope,$route,$window,$routeParams) {
			var strUrl = $window.location.href;
			$scope.input = '';
			$scope.search = function () {
				//为了在详细信息页无法跳转问题,下面采用并串的方式来改变页面url的跳转
				//否则会在不同路由匹配时出问题
				var str = strUrl.slice(0, strUrl.indexOf('#') + 1);
				str += ('/search/?q=' + $scope.input);
				  $window.location.href = str;
				//路由的参数没有被匹配的，将自动被放在？后面做参数传递
				//  $route.updateParams({category:'search', q:$scope.input});
			}
		}]);

})(angular)
