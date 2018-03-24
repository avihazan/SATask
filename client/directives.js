angular.module('satask.directives', [])
.directive("followbtn", [function(){
    return {
        restrict: "AE",
        scope: {
            model: '=',
            follow: '&',
            unfollow: '&'
        },
        controller: function ($scope, $element, $attrs, PersistenceService, StaticServices) {
            this.$onInit = function() {
                $scope.followbtn = StaticServices.getButtonOptions();

                $scope.current = parseInt(PersistenceService.getCookieData());

                $scope.state = $scope.followbtn.normal;

                if($scope.model.follows != null && $scope.model.follows.includes($scope.current)){
                    $scope.state = $scope.followbtn.clicked;
                }
                if($scope.model.id == $scope.current){
                    $scope.state = $scope.followbtn.disabled;
                }

                $scope.action = function(){
                    switch ($scope.state) {
                        case $scope.followbtn.normal:
                            $scope.follow();
                            break;
                        case $scope.followbtn.clicked:
                            $scope.unfollow();
                            break;
                        case $scope.followbtn.hover:
                            break;
                        case $scope.followbtn.disabled:
                            break;
                        default:

                    }
                }
            }
        },
        link: function($scope, $element, $attrs) {
            if($scope.state == $scope.followbtn.clicked ) {
                $element.on('mouseenter', function () {
                    $element.find("span").text("Unfollow");
                    $element.find("a").addClass("btn-hover");
                })
                $element.on('mouseleave', function () {
                    $element.find("span").text("Following");
                    $element.find("a").removeClass("btn-hover");
                })
            }
        },
        template: '<a ng-class="state.class" ng-click="action()" class="btn btn-md btn-block btn-shared" >' +
                  '   <span>{{state.msg}}</span>' +
                  '</a>'
    };
}]);