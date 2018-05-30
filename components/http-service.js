(function (angular) {
	angular.module('moviecat.services.http',[])
		.service('HttpService',['$window',function ($window) {
			this.jsonp = function (url,params,fn) {
				//0.处理回调函数挂载问题（不能覆盖）
				var cbName = 'jsonp_' + +new Date();

				$window[cbName] = function (data) {
					fn(data);
					$window.document.body.removeChild(script);
				};
				//1.组合最终请求的utl地址
				var querystring = '';
				for(var key in params){
//            querystring += '${key}=${params[key]}&';  //ES6的格式有兼容问题
					querystring += ''+key +'='+params[key]+'&';
				}
				querystring += 'callback='+cbName+'';
				url = url + "?" + querystring;

				//2.创建一个script标签，并将src设置为url地址
				// var script = $document.createElement("script");
				var script = $window.document.createElement("script");
				script.src = url;

				//3.appendChild(执行)
				$window.document.body.appendChild(script);
			}
		}]);
})(angular);
