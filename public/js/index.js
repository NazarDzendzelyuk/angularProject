//LOGIN

var a, b, c, d, e, code;

function captcha() {
    a = Math.ceil(Math.random() * 9) + '';
    b = Math.ceil(Math.random() * 9) + '';
    c = Math.ceil(Math.random() * 9) + '';
    d = Math.ceil(Math.random() * 9) + '';
    e = Math.ceil(Math.random() * 9) + '';
    code = a + b + c + d + e;
    $('#captcha').val(code);

}
captcha();
$('#regButton').on('click', function () {
    $('.shadow').slideDown(500);
    $('#signup-box').slideDown(500);
})
$('#logButton').on('click', function () {
    $('.shadow').slideDown(500);
    $('#login-box').slideDown(500);
});
$('.shadow').on('click', function () {
    $('.shadow').fadeOut(500);
    $('#login-box').fadeOut(500);
    $('#signup-box').fadeOut(500);
    $('#errorEmail').text('');
    $('#errorPass').text('');
    $('#errorCaptcha').text('');
});
//LOGIN


//BUTTON TO TOP
$('.fa-arrow-up').on('click', function () {
    $('body').animate({
        scrollTop: $('.container-fluid').offset().top + 2 + 'px'
    }, 1000);

});
//$(window).scroll(function () {
//    if ($('body').scrollTop() > $('#search').offset().top) {
//        $('.fa-arrow-up').css('display', 'block')
//    } else {
//        $('.fa-arrow-up').css('display', 'none')
//
//    }
//});

$('.fa-angle-double-down').on('click', function () {
    $('body').animate({
        scrollTop: $('.container-fluid').offset().top
    }, 1000)
})
//SLIDER
var cbpBGSlideshow = (function () {

    var $slideshow = $('#cbp-bislideshow'),
        $items = $slideshow.children('li'),
        itemsCount = $items.length,
        $controls = $('#cbp-bicontrols'),
        navigation = {
            $navPrev: $controls.find('span.cbp-biprev'),
            $navNext: $controls.find('span.cbp-binext'),
            $navPlayPause: $controls.find('span.cbp-bipause')
        },
        // current item´s index
        current = 0,
        // timeout
        slideshowtime,
        // true if the slideshow is active
        isSlideshowActive = true,
        // it takes 3.5 seconds to change the background image
        interval = 3500;

    function init(config) {

        // preload the images
        $slideshow.imagesLoaded(function () {

            if (Modernizr.backgroundsize) {
                $items.each(function () {
                    var $item = $(this);
                    $item.css('background-image', 'url(' + $item.find('img').attr('src') + ')');
                });
            } else {
                $slideshow.find('img').show();
                // for older browsers add fallback here (image size and centering)
            }
            // show first item
            $items.eq(current).css('opacity', 1);
            // initialize/bind the events
            initEvents();
            // start the slideshow
            startSlideshow();

        });

    }

    function initEvents() {

        navigation.$navPlayPause.on('click', function () {

            var $control = $(this);
            if ($control.hasClass('cbp-biplay')) {
                $control.removeClass('cbp-biplay').addClass('cbp-bipause');
                startSlideshow();
            } else {
                $control.removeClass('cbp-bipause').addClass('cbp-biplay');
                stopSlideshow();
            }

        });

        navigation.$navPrev.on('click', function () {
            navigate('prev');
            if (isSlideshowActive) {
                startSlideshow();
            }
        });
        navigation.$navNext.on('click', function () {
            navigate('next');
            if (isSlideshowActive) {
                startSlideshow();
            }
        });

    }

    function navigate(direction) {

        // current item
        var $oldItem = $items.eq(current);

        if (direction === 'next') {
            current = current < itemsCount - 1 ? ++current : 0;
        } else if (direction === 'prev') {
            current = current > 0 ? --current : itemsCount - 1;
        }

        // new item
        var $newItem = $items.eq(current);
        // show / hide items
        $oldItem.css('opacity', 0);
        $newItem.css('opacity', 1);

    }

    function startSlideshow() {

        isSlideshowActive = true;
        clearTimeout(slideshowtime);
        slideshowtime = setTimeout(function () {
            navigate('next');
            startSlideshow();
        }, interval);

    }

    function stopSlideshow() {
        isSlideshowActive = false;
        clearTimeout(slideshowtime);
    }

    return {
        init: init
    };

})();
//SLIDER ENDs
//NEXT/PREVIOUS PAGE


//GOODS

var app = angular.module('myApp', ['ngRoute']);

var date;
var localDate = setInterval(function () {
    date = new Date();
    date = date.toLocaleTimeString();
}, 1000);
var user = {
    username: '',
    email: ''
}

app.controller('myCtrl', function ($scope, $filter, $http, $window) {
    $scope.captcha = code;
    $scope.messages = [{
        username: 'Anonim',
        date: date,
        message: ''
    }]
    $scope.changeName = function () {
        $scope.messages.splice(0, 1, {
            username: $scope.name
        })
        $('.name').val('');
    };

    $scope.sendMessage = function () {
        if ($scope.name == '') {
            $scope.name = 'Anonim'
        }
        $scope.messages.push({
            username: $scope.name,
            date: date,
            message: $scope.message
        })
        $scope.message = ''
    };

    $scope.sortByPrice = '-price';

    $scope.reload = function () {
        captcha();
        $scope.captcha = code;
    }
    $scope.getErrorEmail = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return 'Cant be empty'
            } else if (error.email) {
                return 'Invalid email'
            }
        }
    }

    //    MYSQL
    $http.get('http://localhost:8000/cat')
        .then(function successCallback(response) {
            $scope.categories = response.data;
        })

    $http.get('http://localhost:8000/phones')
        .then(function successCallback(response) {
            $scope.phones = response.data;
        })
    $scope.addNewPhone = function () {
        var phone = {
            name: $scope.newName,
            price: $scope.newPrice,
            display: $scope.newDisplay,
            camera: $scope.newCamera,
            ram: $scope.newRam
        }

        $http.post('http://localhost:8000/phones', phone)
            .then(function successCallback(response) {
                console.log("Success!");
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        $http.get('http://localhost:8000/phones')
            .then(function successCallback(response) {
                $scope.phones = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });

    }
    $http.get('http://localhost:8000/tablets')
        .then(function successCallback(response) {
            $scope.tablets = response.data;
        })
    $http.get('http://localhost:8000/headphones')
        .then(function successCallback(response) {
            $scope.headphones = response.data;
        })

    $http.get('http://localhost:8000/signUp')
        .then(function successCallback(response) {
            $scope.users = response.data;
        })

    $scope.signUp = function () {
        var obj = {
            email: $scope.email,
            password: $scope.password
        }
        $http.post('http://localhost:8000/signUp', obj)
            .then(function successCallback(response) {
                console.log("Success!");
                $scope.logEmail = $scope.email;
                $scope.logPass = $scope.password;
                $('#signup-box').fadeOut(500);
                $('.shadow').slideDown(500);
                $('#login-box').slideDown(500);

            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        $http.get('http://localhost:8000/signUp')
            .then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    }
    $scope.authorize = function () {
        $window.location.href = '/html/authorized.html';
    }

    $scope.logout = function () {
        $window.location.href = '/index.html'
    }

    //    LOGIN THROUGH SOCIAL NETWORK

    $scope.gmail = user;
    $scope.onGoogleReg = function () {
        var params = {
            'clientid': '517036373601-ict05ij4944bnioagovv4frt7j602uf6.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': function (result) {
                if (result['status']['signed_in']) {
                    document.location = "../html/tablets.html";
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function (resp) {
                        $scope.$apply(function () {
                            $scope.gmail.username = resp.displayName;
                            $scope.gmail.email = resp.emails[0].value;
                        })
                    });
                }
            },
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        }
        gapi.auth.signIn(params);
    }
    $scope.onGoogleLogin = function () {
        var params = {
            'clientid': '517036373601-ict05ij4944bnioagovv4frt7j602uf6.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': function (result) {
                if (result['status']['signed_in']) {
                    document.location = "../html/tablets.html"
                }
            },
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        }
        gapi.auth.signIn(params);
    }
    //    FACEBOOK LOGIN
    $scope.onFbReg = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                document.location = "../html/tablets.html"
            } else {
                console.log('error')
            }
        }, {
            scope: 'email, user_likes',
            return_scopes: true
        })
    }
    $scope.onFbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                document.location = "../html/tablets.html"
            } else {
                console.log('error')
            }
        }, {
            scope: 'email, user_likes',
            return_scopes: true
        })
    }
    //PAGINATION
    $scope.limitRange = [4, 6, 8]
    $scope.currentPage = 0;
    $scope.search = '';
    $scope.pageSize = 4;
    $scope.getPhones = function () {
        return $filter('filter')($scope.phones, $scope.search)
        var arr = [];
        if ($scope.search == '') {
            arr = $scope.phones;
        } else {
            for (var ea in $scope.phones) {
                if ($scope.phones[ea].indexOf($scope.search) > -1) {
                    arr.push($scope.phones[ea]);
                }
            }
        }
        return arr;
    }
    $scope.getTablets = function () {
        return $filter('filter')($scope.tablets, $scope.search)
        var arr = [];
        if ($scope.search == '') {
            arr = $scope.tablets;
        } else {
            for (var ea in $scope.tablets) {
                if ($scope.tablets[ea].indexOf($scope.search) > -1) {
                    arr.push($scope.tablets[ea]);
                }
            }
        }
        return arr;
    }
    $scope.getHeadPhones = function () {
        return $filter('filter')($scope.headphones, $scope.search)
        var arr = [];
        if ($scope.search == '') {
            arr = $scope.headphones;
        } else {
            for (var ea in $scope.headphones) {
                if ($scope.headphones[ea].indexOf($scope.search) > -1) {
                    arr.push($scope.headphones[ea]);
                }
            }
        }
        return arr;
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getPhones().length / $scope.pageSize);
    }

    $scope.admin = function () {
        $window.location.href = '/adminka.html'
    }
})

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../html/phones.html'
    }).when('/tablets', {
        templateUrl: '../html/tablets.html'
    }).when('/headphones', {
        templateUrl: '../html/headphones.html'
    })

})

app.config(function ($routeProvider) {
    $routeProvider.when('/adminCategories', {
        templateUrl: '../html/adminCategories.html',
    }).when('/adminPhones', {
        templateUrl: '../html/adminPhones.html',
    }).when('/adminTablets', {
        templateUrl: '../html/adminTablets.html',
    }).when('/adminHeadphones', {
        templateUrl: '../html/adminHeadphones.html',
    })

})

app.directive('scrollOnClick', function () {
    return {
        link: function (scope, $elm, attrs) {
            $elm.on('click', function () {
                var $target = $(attrs.href);
                $("body").animate({
                    scrollTop: $target.offset().top + 100 + 'px'
                }, 300);
            });
        }
    }
});
