(function (angular) {
	'use strict';


	angular.module('moviecat.movie_detail', ['ngRoute','moviecat.services.http'])

		.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider) {

			$locationProvider.hashPrefix('');

			/*路由也是可以写上页码，page只是个占位符*/
			$routeProvider.when('/detail/:id', {
				templateUrl: 'movie_detail/view.html',
				controller: 'MovieDetailController'
			});
			//在路由　：代表占位符，？代表可靠参数
		}])
		.controller('MovieDetailController', [
			'$scope',
			'$route',
			'$routeParams',
			'HttpService',
			function($scope, $route,$routeParams,HttpService) {
			$scope.movies = {};
			$scope.loading = true;
			$scope.title = "Loading.....";
			HttpService.jsonp("http://api.douban.com/v2/movie/subject/"+$routeParams.id+"",
				{id:$routeParams.id},
				function (data) {
					$scope.movies = data;
					$scope.title = data.title;
					$scope.loading = false;
					//异步请求时，强制同步数据到界面
					$scope.$apply();

			});
		}]);

})(angular)
