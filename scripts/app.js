




angular
    .module('webapp', ['ngMaterial', 'ngMessages', 'ngResource'])
    .controller('DemoCtrl', function($scope, $http, $resource) {

        // use $http or $resource
        // https://api.punkapi.com/v2/beers

        $http({
            method: 'GET',
            url: "https://api.punkapi.com/v2/beers"
        }).then(function theDeets(response){
            var data = response;
            var labelName = response.data[0].name
            // console.log(response.data.length);

            for(var i = 0; i < response.data.length; i++) {
                $('#beerLabels').append("<div>" + response.data[i].name + "</div>"); 
                }
            // if any errors, pop this out
            }, function theErrs(response){
                return response;
            });   
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
