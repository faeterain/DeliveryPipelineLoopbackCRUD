angular
    .module('app')
    .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            $scope.user = {
                email: 'foo@bar.com',
                password: 'foobar'
            };
            $scope.login = function() {
                AuthService.login($scope.user.email, $scope.user.password)
                    .then(function() {
                        $state.go('add-review');
                    });
            };
        }
    ])
    .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            AuthService.logout()
                .then(function() {
                    $state.go('all-reviews');
                });
        }
    ])
    .controller('SignUpController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            $scope.action = "Sign up";
            $scope.user = {};
            $scope.exist = false;
            $scope.register = function() {
                AuthService.exist($scope.user.email).then(function(res) {
                    if (res.count == 0) {
                        AuthService.register($scope.user.name, $scope.user.email, $scope.user.password)
                            .then(function() {
                                $state.transitionTo('sign-up-success');
                            });
                        $scope.exist = false;
                    } else {
                        $scope.exist = true;
                    }

                }, function(err) {});
            };
        }
    ]);