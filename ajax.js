// code for movie search function.
$(function () {
    $('#search-form').submit(function (epontus) {
        epontus.preventDefault();
        var searchTerm = $('#search-input').val();
        getRequest(searchTerm);

    });

    function getRequest(input) {
        var url = 'http://www.omdbapi.com/?';
        var rules = {
            apiKey: '163b4468',
            s: input,
            r: 'json'

        };
        
        $.ajax({ 
            url: url,
            type: 'GET',
            data: rules,
            dataType: 'json'

    })
    .done(function (done) { 
        console.log(done);
        showResults(done.Search);
    })
    .fail(function (fail) { 
        console.log(fail);    

 
});
}
function showResults(data) { 
    $.each(data, function(i,value) { 
        $('#search-results').append(`<p>${value.Title}</p>`);
});
}
});
//code for wikipedia search function.
angular.module('WikiSearch',['ngResource'])
.controller('WikiCtrl', function($scope, $resource){ 
	$scope.$watch('query', function(newValue, oldValue){
		if (newValue !== undefined){
			$scope.wiki = $resource('https://en.wikipedia.org/w/api.php' ,
				{action: 'opensearch', format: 'json', search: newValue, callback: 'JSON_CALLBACK'},
				{get: {method: 'JSONP', isArray: true, 
				transformResponse: function(data, header){
					dataSet = [];
					for(var i = 0; i <= data[1].length -1; i++){
						var d = {};
						d.name = data[1][i];
						d.snip = data[2][i];
						d.link = data[3][i];
						dataSet.push(d);
					}
					return dataSet;
				}}});
			$scope.wikiData = $scope.wiki.get()
			console.log($scope.wikiData)
		}
	})
}) 
