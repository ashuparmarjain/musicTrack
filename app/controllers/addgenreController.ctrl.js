
app.controller('addgenreController',function($scope,$http,GenreList){
		$scope.notAdded = true;
		$scope.submit = function(genre){
			GenreList.update(genre).$promise.then(function(res){
			},function(err){
				console.log(err);
				alert('Sorry we could not add the track, Please try again later');
			});
			$scope.notAdded = false;
		}
		$scope.reset = function(){
			$scope.notAdded = true;
		}
});
