(function (angular) {

	angular.module('moviecat.directives.auto_active',[])
		.directive('autoActive',['$location',function ($location) {
			return {
				//当这个指令作用于某个元素过后触发一次
				link:function (scope, element,attributes) {
					var url = $location.url();
					//将$location绑定在scope下
					scope.$location = $location;
					scope.$watch('$location.url()',function (now,old) {
						var aLink = element.children().attr('href').substr(1);
						if(now.startsWith(aLink)){
							//干掉兄弟节点
							element.parent().children().removeClass(attributes.autoActive);
							// element.attr('class','active');
							element.addClass(attributes.autoActive);

						}
					});

				}
			}
		}]);
})(angular)
