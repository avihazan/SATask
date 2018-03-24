angular.module('satask.factories', [])
.factory('APIServices', ['$http', function ($http) {

    var getAllUsers = function() {
      return $http({
          method: 'GET',
          url: '/api/list'
      })
      .then(function(resp) {
          return resp.data;
      });
    };

    var addFollower = function(data) {
        return $http({
            method: 'POST',
            url: '/api/follow',
            data: data
        });
    };

    var removeFollower = function(data) {
        return $http({
            method: 'POST',
            url: '/api/unfollow',
            data: data
        });
    };

  return {
      getAllUsers: getAllUsers,
      addFollower: addFollower,
      removeFollower:removeFollower
  };
}])
.factory('PersistenceService', ["$cookies", function($cookies) {
    var uid = "";

    var setCookieData = function(uid) {
        $cookies.put("user_id", uid);
    };

    var getCookieData = function() {
        uid = $cookies.get("user_id");
        return uid;
    };
    var clearCookieData = function() {
        uid = "";
        $cookies.remove("user_id");
    };

    return {
        setCookieData: setCookieData,
        getCookieData: getCookieData,
        clearCookieData: clearCookieData
    }
}])
.service('StaticServices', [ function() {

    var getComboOptions = function(){
        return [
            {name: "User01", id: 1},
            {name: "User02", id: 2},
            {name: "User03", id: 3}
        ]
    };

    var getButtonOptions = function(){
        return {
            normal: {class: 'btn-normal', msg:'Follow'},
            clicked: {class: 'btn-clicked', msg:'Following'},
            hover: {class: 'btn-hover', msg:'Unfollow'},
            disabled: {class: 'btn-disabled', msg:'Do not Follow yourself'}
        }
    }


    return {
        getComboOptions: getComboOptions,
        getButtonOptions: getButtonOptions
    }
}]);
