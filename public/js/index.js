//LOGIN

//BUTTON TO TOP
$('.fa-arrow-up').on('click', function () {
    $('body').animate({
        scrollTop: $('.container-fluid').offset().top + 2 + 'px'
    }, 1000);

});
$(window).scroll(function () {
    if ($('body').scrollTop() > $('#search').offset().top) {
        $('.fa-arrow-up').css('display', 'block')
    } else {
        $('.fa-arrow-up').css('display', 'none')

    }
});



//NEXT/PREVIOUS PAGE


//GOODS
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

var cbpBGSlideshow;
var app = angular.module('myApp', ['ngRoute']);

app.controller('myCtrl', function ($scope, $filter, $http, $window) {
    $scope.captcha = code;
    $scope.logEmail = '';
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
    $scope.sortByDate = '-time';

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

    $http.get('http://localhost:8000/tablets')
        .then(function successCallback(response) {
            $scope.tablets = response.data;
        })
    $http.get('http://localhost:8000/headphones')
        .then(function successCallback(response) {
            $scope.headphones = response.data;
        })
    $http.get('http://localhost:8000/comments')
        .then(function successCallback(response) {
            $scope.comments = response.data;
        })

    $http.get('http://localhost:8000/signUp')
        .then(function successCallback(response) {
            $scope.users = response.data;
        })

    $http.get('http://localhost:8000/cat')
        .then(function successCallback(response) {
            $scope.categories = response.data;
        })

    $http.get('http://localhost:8000/phones')
        .then(function successCallback(response) {
            $scope.phones = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    $scope.signUp = function () {
        var obj = {
            email: $scope.email,
            password: $scope.password,
            status: 0
        }
        $http.get('http://localhost:8000/signUp')
            .then(function successCallback(response) {
                $scope.users = response.data;
                for (var i = 0; i < $scope.users.length; i++) {
                    if ($scope.email == $scope.users[i].email) {
                        $('#exist').text('Exist')
                        captcha();
                        $scope.captcha = code;
                        break;
                    } else {
                        if (i == $scope.users.length - 1) {
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
                            break;
                        }

                    }
                }
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });

    }

    $http.get('http://localhost:8000/signUp')
        .then(function successCallback(response) {
            $scope.users = response.data;
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].status == 0) {
                    $scope.authorized = true;
                } else if ($scope.users[i].status == 1) {
                    $scope.authorized = true;
                    $scope.authorized = false;
                    $scope.login = true;

                }
            }

        })
    $scope.authorized = true;
    $scope.authorize = function (putEmail) {
        $('#user').text('gfds')
        var obj = {
            status: 1
        }
        $http.put('http://localhost:8000/signUp/' + putEmail, obj).then(function successCallback(response) {
            console.log('success');
        }, function errorCallback(response) {
            console.log('Error ' + response.err)
        })
        $http.get('http://localhost:8000/signUp')
            .then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        $http.get('http://localhost:8000/signUp').then(function successCallback(response) {
            $scope.users = response.data;
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.logEmail == $scope.users[i].email && $scope.logPass == $scope.users[i].password) {
                    $scope.login = true;
                    $scope.authorized = false;
                    $scope.users.status = 1;
                    $('.shadow').slideUp(500);
                    $('#login-box').fadeOut(500);
                    break;
                } else {
                    if (i == $scope.users.length - 1) {
                        $('#err').text('Incorrect login or pass')
                        break;
                    }
                }
            }
        })
    }
    $scope.logout = function (saveEmail) {
        var obj = {
            status: 0
        }
        $http.put('http://localhost:8000/signUp/' + saveEmail, obj).then(function successCallback(response) {
            console.log('success');
        }, function errorCallback(response) {
            console.log('Error ' + response.err)
        })
        $http.get('http://localhost:8000/signUp')
            .then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
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

    $scope.tablets = function () {
        
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

    $scope.numberOfPhonePages = function () {
        return Math.ceil($scope.getPhones().length / $scope.pageSize);
    }
    $scope.numberOfTabletPages = function () {
        return Math.ceil($scope.getTablets().length / $scope.pageSize);
    }
    $scope.numberOfHeadphonePages = function () {
        return Math.ceil($scope.getHeadPhones().length / $scope.pageSize);
    }


    $scope.admin = function () {
        $window.location.href = '/adminka.html'
    }



    $scope.info = function (index) {
        $scope.mainPart = true;
        $scope.product = true;
        $http.get('http://localhost:8000/phones/' + index)
            .then(function successCallback(response) {
                $scope.onePhone = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        $http.get('http://localhost:8000/comments/' + index)
            .then(function successCallback(response) {
                $scope.comments = response.data;
                $scope.getComments = function () {
                    return ($scope.comments)
                }
                $scope.numberOfCommentsPages = function () {
                    return Math.ceil($scope.getComments().length / $scope.pageSize);
                }
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
        $(window).scroll(function () {
            if ($('body').scrollTop() > $('#search').offset().top) {
                $('.fa-arrow-up').css('display', 'none')
            } else {
                $('.fa-arrow-up').css('display', 'none')

            }
        });
        $scope.sendComment = function () {
            var time = new Date();
            time = time.toLocaleDateString();
            var obj = {
                email: 'Anonim',
                comment: $scope.comment,
                time: time,
                number: index
            }
            $http.post('http://localhost:8000/comments', obj)
                .then(function successCallback(response) {
                    console.log("Success!");
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            $http.get('http://localhost:8000/comments/' + index)
                .then(function successCallback(response) {
                    $scope.comments = response.data;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            $scope.comment = '';
        }
    }

    $scope.back = function () {
        $scope.mainPart = false;
        $scope.product = false;
        $(window).scroll(function () {
            if ($('body').scrollTop() > $('#search').offset().top) {
                $('.fa-arrow-up').css('display', 'block')
            } else {
                $('.fa-arrow-up').css('display', 'none')

            }
        });
    }


    $scope.$watch("onePhone", function (newValue, oldValue) {
        $('.gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                }
            });
        });
    });

})

app.directive('login', function () {
    return {
        templateUrl: '/html/Login.html',
        link: function (scope, element, attrs) {

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


        }

    }
})

app.directive('slider', function () {
    return {
        templateUrl: '/html/slider.html',
        link: function (scope, element, attrs) {
            $('.fa-angle-double-down').on('click', function () {
                $('body').animate({
                    scrollTop: $('.container-fluid').offset().top
                }, 1000)
            })
            //SLIDER
            cbpBGSlideshow = (function () {

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
            $(function () {
                cbpBGSlideshow.init();
            });
        }
    }
})
app.directive('allGoods', function () {
    return {
        templateUrl: '/html/allGoods.html'
    }
})
app.directive('mainPart', function () {
    return {
        templateUrl: '/html/mainPart.html'
    }
})
app.directive('product', function () {
    return {
        templateUrl: '/html/Product.html',
        link: function (scope, element, attrs) {

        }
    }
})
app.directive('authorized', function () {
    return {
        templateUrl: '/html/authorized.html'
    }
})
var date;
var localDate = setInterval(function () {
    date = new Date();
    date = date.toLocaleTimeString();
}, 1000);
var user = {
    username: '',
    email: ''
}
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../html/phones.html'
    }).when('/tablets', {
        templateUrl: '../html/tablets.html'
    }).when('/headphones', {
        templateUrl: '../html/headphones.html'
    }).otherwise({
        redirectTo: '/'
    })

})
app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
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
//ADMIN CONTROLLER
app.controller('adminCtrl', function ($scope, $http) {
    $http.get('http://localhost:8000/cat')
        .then(function successCallback(response) {
            $scope.categories = response.data;
        })

    $http.get('http://localhost:8000/phones')
        .then(function successCallback(response) {
            $scope.phones = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    //    ADD NEW PHONE
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
        $scope.newName = '';
        $scope.newPrice = '';
        $scope.newDisplay = '';
        $scope.newCamera = '';
        $scope.newRam = '';
    }
    //    DELETE
    $scope.removePhone = function (id) {

        $http.delete('http://localhost:8000/phones/' + id).then(function successCallback(response) {
            console.log('success')
        }, function errorCallback(response) {
            console.log('Error' + response.err)
        })

        $http.get('http://localhost:8000/phones')
            .then(function successCallback(response) {
                $scope.phones = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
    }

    //    EDIT PHONE
    $scope.editName = '';
    $scope.editPrice = '';
    $scope.editDisplay = '';
    $scope.editCamera = '';
    $scope.editRam = '';
    $scope.editBlock = false;
    $scope.editIndex = "";


    $scope.editPhone = function (index, name, price, display, camera, ram) {
        $scope.editIndex = index;
        $scope.editBlock = true;
        $scope.editName = name;
        $scope.editPrice = price;
        $scope.editDisplay = display;
        $scope.editCamera = camera;
        $scope.editRam = ram;
    };

    $scope.updatePhone = function () {
        var obj = {
            name: $scope.editName,
            price: $scope.editPrice,
            display: $scope.editDisplay,
            camera: $scope.editCamera,
            ram: $scope.editRam
        };
        $http.put('http://localhost:8000/phones/' + $scope.editIndex, obj).then(function successCallback(response) {
            console.log('success');
            $scope.editIndex = "";
            $scope.editName = '';
            $scope.editPrice = '';
            $scope.editDisplay = '';
            $scope.editCamera = '';
            $scope.editRam = '';
            $scope.editBlock = false;
        }, function errorCallback(response) {
            console.log('Error ' + response.err)
        })
        $http.get('http://localhost:8000/phones')
            .then(function successCallback(response) {
                $scope.phones = response.data;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });

    }


})
