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
	$scope.morepostSearched = false;
	$scope.fetchdata = function() {	
		$scope.search = true;

	    clearTimeout(delayTimer);
	    delayTimer = setTimeout(function() {
			var searchQuery = MusicTrack.query({title:$scope.userInput.fetchTag});
				searchQuery.$promise.then(function(data){
					var s_counter = 1;
					$scope.tracks = data.results;
					if(data.next!= null){
							$scope.morepostSearched = true;
							$scope.moreSearchResult= function(){
								s_counter++;
								var searchpageQuery = MusicTrack.query({page:s_counter, title:$scope.userInput.fetchTag});
								searchpageQuery.$promise.then(function(data){
									[].push.apply($scope.tracks , data.results);
									if(data.next == null){
										$scope.morepostSearched = false;	
									}
								});	
							}							
					}else{
						$scope.morepostSearched = false;

					}
		  		}, function(err){
		  			console.log(err);
		  			alert('Sorry we could not update the track, Please try again later');

		  		});	
	    }, 100); 

	    $scope.endSearch = function(){
	   		query.$promise.then(function(data){
				$scope.tracks = data.results;
				$scope.userInput.fetchTag = null;
				$scope.search = false;
		  	});
	    }
	}




	$scope.genreList = [];
  	$scope.toggleSelection = function(genre) {
	    var id = $scope.genreList.indexOf(genre);
	    // Is currently selected
	    if (id > -1) {
	      $scope.genreList.splice(id, 1);
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
			MusicTrack.update({id:track.id},track).$promise.then(function(res){
				track.genres = res.genres;
				track.rating = res.rating;
				track.title = res.title;
				alert('Track Updated');
			},function(err){
				console.log(err);
				alert('Sorry we could not update the track, Please try again later');
			});
			this.toEdittrack = false;
		}
		$scope.closeTrack = function(track){
			this.toEdittrack = false;
		}
			//Load Genre as scroll when editing the track
		var genrequery = GenreList.query();
		genrequery.$promise.then(function(data){
			$scope.genres = data.results;
			var lastPage = Math.round((data.count)/(data.results.length));
			
			$scope.stopCall = false;
			var counter = 1;
			$scope.loadMore = function(){
				if(this.toEdittrack){
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
				
			}
		});
	}


 

});
