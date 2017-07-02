var app = angular.module("app", [])
app.controller("myCtrl", function($scope, $http){

$scope.getAllRecords=function(){
      $http({
            method: 'get',
            url: '/all'
        }).then(function(response) {
          console.log(response);
          $scope.videoData=response.data;
        });
}
    
})
