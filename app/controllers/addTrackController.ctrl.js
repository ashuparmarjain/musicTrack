app.controller('addTrackController',function($scope,$http,GenreList,MusicTrack){
	$scope.notAdded = true;

	var genrequery = GenreList.query();
	genrequery.$promise.then(function(data){
		$scope.genres = data.results;
		var lastPage = Math.round((data.count)/(data.results.length));
		
		$scope.stopCall = false;	
		var counter = 2;
		$scope.loadMore = function(){
			counter++;
			
			if(counter >lastPage){
				$scope.stopCall = true;
			} else{
				var genrepageQuery = GenreList.query({page:counter});
				genrepageQuery.$promise.then(function(data){

					[].push.apply($scope.genres, data.results);
				});
			}
		}
	});
	$scope.genreList = [];
  	$scope.toggleSelection = function(genre) {
	    var id = $scope.genreList.indexOf(genre);
	    // Is currently selected
	    if (id > -1) {
	      $scope.genreList.splice(idx, 1);
	    }
	    // Is newly selected
	    else {
	      $scope.genreList.push(genre);	      
	    }
   	}

	$scope.submit = function(track){
		track.genres=$scope.genreList;
		MusicTrack.update({id:track.id},track);
		$scope.notAdded = false;
	}

	$scope.reset = function(){
		$scope.notAdded = true;
	}

});