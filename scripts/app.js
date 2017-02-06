var beerArray = [];
var searchUrl = "https://api.punkapi.com/v2/beers/";
var newSearchUrl ="";

// --------------searching by beer name------------

$('#searchBtnName').on('click', function(){
    console.log('hello');
    $('.searchedBeer').empty();
    var userInput = $('#inputName').val().toLowerCase().trim();
    console.log(userInput);
    var beerId = (beerArray.indexOf(userInput) + 1);
    console.log(beerId);

    for(var i = 0; i < beerArray.length; i++) {
        if(beerArray[i].name === userInput) {
            console.log('found! ' + i);
            
        $('.searchedBeer').append(
            '<div>Name: ' + beerArray[i].name + '</div>' + 
            '<div>Alcohol By Volume: ' + beerArray[i].abv + '%</div>' +
            '<div>Summary: ' + beerArray[i].description + '</div>'
            )
        }
    }


});

// ---------------------searching bu ABV---------------------

$('#searchBtnAbv').on('click', function(){
    $('.searchedBeer').empty();
    var userInput = Number($('#inputAbv').val().trim());   
    var beerIdArray = [];
    for (var i = 0; i < beerArray.length; i++) {
        var abvs = beerArray[i].abv;
        if (abvs == userInput){
           beerIdArray.push(i); 
        }
    }
    for(var j = 0; j < beerIdArray.length; j++) {
        var n = beerIdArray[j];
        $('.searchedBeer').append(
            '<div>Name: ' + beerArray[n].name + '</div>' + 
            '<div>Alcohol By Volume: ' + beerArray[n].abv + '%</div>' +
            '<div>Summary: ' + beerArray[n].description + '</div>'
            )
    }
});

// ----------------making ajax call to the API via Angular-----------

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
                    console.log(beerArray[i].abv)
                }
            });  
    }).config(function($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });

