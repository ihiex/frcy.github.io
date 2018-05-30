(function (angular) {
	'use strict';


	angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])

		.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider) {

			$locationProvider.hashPrefix('');

			/*路由也是可以写上页码，page只是个占位符*/
			$routeProvider.when('/:category/:page?', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListController'
			});
			//在路由　：代表占位符，？代表可靠参数
		}])
		.controller('MovieListController', [
			'$scope',
			'$route',
			'$routeParams',
			'HttpService',
			function($scope, $route,$routeParams,HttpService) {
			$scope.page = parseInt($routeParams.page || 1);
			var start = ($scope.page - 1) * 5;
			var pageSize = 5;
			$scope.totalPage = 0;
			$scope.totalCount = 0;
			$scope.title =  "Loading......";
			$scope.movies = [];
			$scope.loading = true;
			HttpService.jsonp("http://api.douban.com/v2/movie/"+ $routeParams.category +"",
				{start:start,count:pageSize,q:$routeParams.q},
				function (data) {
					$scope.loading = false;
					$scope.title = data.title;
					$scope.movies = data.subjects;
					$scope.totalCount = data.total;
					$scope.totalPage = Math.ceil(data.total/pageSize);
					//异步请求时，强制同步数据到界面
					$scope.$apply();

			});
			//暴露一个行为
				$scope.go = function (page) {
					if(0 < page && page <= $scope.totalPage){
						$route.updateParams({page : page});
					}
				}
		}]);

})(angular)
