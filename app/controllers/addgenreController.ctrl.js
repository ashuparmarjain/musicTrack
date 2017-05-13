
app.controller('addgenreController',function($scope,$http,GenreList){
		$scope.notAdded = true;
		$scope.submit = function(genre){
			GenreList.update(genre);
			$scope.notAdded = false;
		}
		$scope.reset = function(){
			$scope.notAdded = true;
		}
});
