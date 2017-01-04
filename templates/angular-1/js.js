module.exports = options => `
(function(){
    angular
        .module('app')
        .controller('${options.controller}', ['$scope', '$stateParams', 'Core', ${options.controller}]);

    function ${options.controller}($scope, $stateParams, Core)
    {
        var vm = $scope;
    }
})();
`