// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .factory('AuthService', ['Reviewer', '$q', '$rootScope', '$state', function(
        User, $q, $rootScope, $state) {
        function login(email, password) {
            console.log('Login Process...');
            return User
                .login({ email: email, password: password })
                .$promise
                .then(function(response) {
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email: email
                    };
                });
        }

        function logout() {
            return User
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                });
        }

        function register(name, email, password) {
            console.log("Register Process");
            return User
                .create({
                    name: name,
                    email: email,
                    password: password
                })
                .$promise;
        }

        function refresh(accessTokenId) {
            return User
                .getCurrent(function(userResource) {
                    $rootScope.currentUser = {
                        id: userResource.id,
                        tokenId: accessTokenId,
                        email: userResource.email
                    };
                });
        }

        function checkEmail(email) {
            return User.count({ where: { "email": email } }).$promise;
        }
        return {
            login: login,
            logout: logout,
            register: register,
            refresh: refresh,
            exist: checkEmail
        };
    }]);