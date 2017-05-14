app.factory("MusicTrack", function ($resource) {
    return $resource(
        "http://104.197.128.152:8000/v1/tracks/:id",
        {page: "@page",id:'@id'},
        {
            "update": {method: "POST"},
            'query': { method: 'GET',isArray: false,  }
 
        }
    );
});

app.factory("GenreList", function ($resource) {
    return $resource(
        "http://104.197.128.152:8000/v1/genres/:id",
        {page: "@page",id:'@id'},
        {
            "update": {method: "POST"},
            'query': { method: 'GET',isArray: false,  }
 
        }
    );
});