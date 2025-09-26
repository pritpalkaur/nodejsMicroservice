// Define the app
angular.module('myApp', [])
.controller('MainController', function($scope, $http) {
  $scope.connectionStatus = '';
  $scope.employees = [];

  // Test database connection
  $scope.checkConnection = function() {
    $http.get('http://localhost:3000/test-connection-oracle')
      .then(function(response) {
        $scope.connectionStatus = response.data;
      }, function(error) {
        $scope.connectionStatus = 'Error: ' + error.data;
      });
  };

  // Load employees data
  $scope.loadEmployees = function() {
    $http.get('http://localhost:3000/employees')
      .then(function(response) {
        $scope.employees = response.data;
        console.log('Employees:', $scope.employees);
      }, function(error) {
        alert('Error fetching employees');
      });
  };
});
