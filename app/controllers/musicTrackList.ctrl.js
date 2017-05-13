app.controller('musicTrackList',function($scope,$http,MusicTrack,GenreList){	
	
	//Get track list

	var query = MusicTrack.query();
	query.$promise.then(function(data){
		$scope.tracks = data.results;

		//Pagination Functionality
	 	$scope.totalItems=data.count;
	 	$scope.pageLable = function($page){
	 	    return 'Page ' + $page;
		}

		$scope.pageChanged = function() {
				var pageQuery = MusicTrack.query({page:$scope.currentPage});
				pageQuery.$promise.then(function(data){
					$scope.tracks = data.results;
		  		});
		  	}

	});

	//Search Track Functionality
	var delayTimer;
	$scope.search = false;
	$scope.fetchdata = function() {	
		$scope.search = true;

	    clearTimeout(delayTimer);
	    delayTimer = setTimeout(function() {
			var searchQuery = MusicTrack.query({title:$scope.userInput.fetchTag});
				searchQuery.$promise.then(function(data){
					$scope.tracks = data.results;
		  		});	
	    }, 100); 

	    $scope.endSearch = function(){
	   		query.$promise.then(function(data){
				$scope.tracks = data.results;
				$scope.userInput.fetchTag = null;
		  	});
	    }
	}

	//Load Genre as scroll when editing the track
	var genrequery = GenreList.query();
	genrequery.$promise.then(function(data){
		$scope.genres = data.results;
		var counter = 1;
		$scope.loadMore = function(){
			counter++;
			var genrepageQuery = GenreList.query({page:counter});
			genrepageQuery.$promise.then(function(data){
				[].push.apply($scope.genres, data.results);
			});
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



	$scope.toEdittrack = false;
	$scope.toEdit = function(track){
		this.toEdittrack = true;
		$scope.changeTrack = function(track){
			track.genres = $scope.genreList;
			MusicTrack.update({id:track.id},track);
			this.toEdittrack = false;
		}
		$scope.closeTrack = function(track){
			this.toEdittrack = false;
		}
	}


 

});
