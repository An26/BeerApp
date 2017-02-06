var beerArray = [];
var searchUrl = "https://api.punkapi.com/v2/beers/";
var newSearchUrl ="";

$('#searchBtnName').on('click', function(){
    var userInput = $('#inputName').val().toLowerCase().trim();
    var beerId = beerArray.indexOf(userInput) + 1;
    $('.searchedBeer').append(
        '<div>Name: ' + beerArray[beerId].name + '</div>' + 
        '<div>Alcohol By Volume: ' + beerArray[beerId].abv + '%</div>' +
        '<div>Summary: ' + beerArray[beerId].description + '</div>'
        )
});

$('#searchBtnAbv').on('click', function(){
    var userInput = Number($('#inputAbv').val().trim());
    console.log(userInput);   
    var beerIdArray = [];

    console.log("length " + beerArray.length);
    console.log(typeof beerArray[0].abv);
    console.log(typeof userInput);

    for (var i = 0; i < beerArray.length; i++) {
        var abvs = beerArray[i].abv;
        if (abvs == userInput){
           beerIdArray.push(i); 
          
        }
    }

    console.log("array: " + beerIdArray);

    for(var j = 0; j < beerIdArray.length; j++) {
        console.log("hello?");
        var n = beerIdArray[j];
        $('.searchedBeer').append(
            '<div>Name: ' + beerArray[n].name + '</div>' + 
            '<div>Alcohol By Volume: ' + beerArray[n].abv + '%</div>' +
            '<div>Summary: ' + beerArray[n].description + '</div>'
            )
    }
});

angular
    .module('webapp', ['ngMaterial', 'ngMessages', 'ngResource'])
    .controller('DemoCtrl', function($scope, $http, $resource) {

        // use $http or $resource
        // https://api.punkapi.com/v2/beers
                
        $http({
            method: 'GET',
            url: searchUrl
        }).then(function theDeets(response){
            // var data = response;
            var labelName = response.data[0].name;
            console.log(response);

            for(var i = 0; i < response.data.length; i++) {
                var beerName = response.data[i].name.toLowerCase().trim();
                var beerAbv = response.data[i].abv;
                var beerDescription = response.data[i].description;
                beerArray.push(
                    {
                        name: beerName,
                        abv: beerAbv,
                        description: beerDescription
                    });
                $('#beerLabels').append("<div class='singleBeer'>" + response.data[i].name + "</div>"); 
            }
            
            console.log(beerArray);
            // if any errors, pop this out
            }, function theErrs(response){
                return response;
            });   
    })
    // .config(function($mdThemingProvider) {
    //     $mdThemingProvider.theme('docs-dark', 'default')
    //         .primaryPalette('yellow')
    //         .dark();
    // });
