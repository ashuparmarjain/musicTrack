app.controller('genreListController',function($scope,$http,GenreList){

	var genrequery = GenreList.query();
	genrequery.$promise.then(function(data){
		$scope.genres = data.results;
		var counter = 2;
		$scope.loadMore = function(){
			counter++;
			var genrepageQuery = GenreList.query({page:counter});
			genrepageQuery.$promise.then(function(data){
				[].push.apply($scope.genres, data.results);
			});
		}
	});

	$scope.toEditGenre = false;
	$scope.toEdit = function(genre){
		this.toEditGenre = true;
		$scope.changeGenre = function(genre){
			GenreList.update({id:genre.id},genre).$promise.then(function(res){
				genre.name = res.name;
				console.log(res.name);
				alert('Genre successfully updated');
			},function(err){
				alert('Sorry we could not update the track, Please try again later');
				console.log(err);
			});
			this.toEditGenre = false;
		}
		$scope.closeEdit = function(genre){
			this.toEditGenre = false;
		}
	}

});