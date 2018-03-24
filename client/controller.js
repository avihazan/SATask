angular.module('satask.ctrl', [])
    .controller('ctrl', ['$scope', 'APIServices', 'PersistenceService', 'StaticServices',
        function ($scope, APIServices, PersistenceService, StaticServices) {

        this.$onInit = function() {
            $scope.data = {};

            // Combo Options
            $scope.optionals = StaticServices.getComboOptions();

            // Cookie
            $scope.cookie = PersistenceService.getCookieData();

            // Check if coockie is set
            if(typeof $scope.cookie !== 'undefined'){
                $scope.logged = true;
                $scope.selectedUser = $scope.optionals[$scope.cookie-1];
            }

            $scope.getUsers();
        }


        $scope.userChanged = function(){
            PersistenceService.setCookieData($scope.selectedUser.id);
            $scope.logged = true;
            $scope.getUsers();
        }

        $scope.getUsers = function() {
            APIServices.getAllUsers()
                .then(function(users) {
                    $scope.data.users = users;
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        $scope.followUser = function(user) {
            //console.log(user);
            APIServices.addFollower({'dest':user.id, 'orig':PersistenceService.getCookieData()})
                .then(function() {
                    $scope.getUsers();
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        $scope.unFollowUser = function(user) {
            //console.log(user);
            APIServices.removeFollower({'dest':user.id, 'orig':PersistenceService.getCookieData()})
                .then(function() {
                    $scope.getUsers();
                })
                .catch(function(error) {
                    console.error(error);
                });
        };
    }]);
