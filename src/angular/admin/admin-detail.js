
(function(){
    angular
        .module('app')
        .controller('AdminDetailController', ['$scope', '$stateParams', 'Core', AdminDetailController]);

    function AdminDetailController($scope, $stateParams, Core)
    {
        var vm = $scope;
    }
})();
