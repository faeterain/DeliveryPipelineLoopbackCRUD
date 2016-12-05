// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('AllReviewsController', ['$scope', 'Review', function($scope,
        Review) {
        $scope.reviews = Review.find({
            filter: {
                include: [
                    'CoffeeShop',
                    'reviewer'
                ]
            }
        });
    }])
    .controller('AllReviewersController', ['$scope', 'Reviewer', function($scope,
        Reviewer) {
        $scope.reviewers = Reviewer.find({});

    }])
    .controller('DeleteReviewController', ['$scope', 'Review', '$state',
        '$stateParams',
        function($scope, Review, $state, $stateParams) {
            Review
                .deleteById({
                    id: $stateParams.id
                })
                .$promise
                .then(function() {
                    $state.go('my-reviews');
                });
        }
    ])
    .controller('EditMemberController', ['$scope', '$q', 'Reviewer', 'Review', 'Twilio',
        '$stateParams', '$state',
        function($scope, $q, Reviewer, Review, Twilio,
            $stateParams, $state) {
            $scope.action = 'Edit';
            $scope.coffeeShops = [];
            $scope.selectedShop;
            $scope.review = {};
            $scope.isDisabled = true;
            $q
                .all([
                    Reviewer.findById({
                        id: $stateParams.id
                    }).$promise
                ])
                .then(function(data) {
                    var member = $scope.user = data[0];
                });

            $scope.register = function() {
                var data = { 'name': $scope.user.name, 'email': $scope.user.email };
                $scope.user.$save()
                    .then(function(review) {
                        Twilio.sendMessage(data).$promise.then(
                            function(res) {
                                console.log(res.rs);
                            },
                            function(err) {
                                console.log(err);
                            });
                        $state.go('all-members');
                    });
            };
        }
    ])

.controller('DeleteMemberController', ['$scope', 'Reviewer', '$state',
        '$stateParams',
        function($scope, Reviewer, $state, $stateParams) {
            Reviewer
                .deleteById({
                    id: $stateParams.id
                })
                .$promise
                .then(function() {
                    $state.go('all-members');
                });
        }
    ])
    .controller('MyReviewsController', ['$scope', 'Review', '$rootScope',
        function($scope, Review, $rootScope) {
            $scope.reviews = Review.find({
                filter: {
                    where: {
                        publisherId: $rootScope.currentUser.id
                    },
                    include: [
                        'coffeeShop',
                        'reviewer'
                    ]
                }
            });
        }
    ]);