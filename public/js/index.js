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

    $http.get('http://localhost:8000/categories')
        .then(function successCallback(response) {
            $scope.categories = response.data;
        })

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



    $http.get('http://localhost:8000/phones')
        .then(function successCallback(response) {
            $scope.phones = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });

    //PAGINATION
    $scope.limitRange = [4, 6, 8]
    $scope.currentPhonePage = 0;
    $scope.currentHeadphonePage = 0;
    $scope.currentTabletPage = 0;
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

    $scope.numberOfPhonePages = function () {
        return Math.ceil($scope.getPhones().length / $scope.pageSize);
    }
    $scope.numberOfTabletPages = function () {
        return Math.ceil($scope.getTablets().length / $scope.pageSize);
    }
    $scope.numberOfHeadphonePages = function () {
        return Math.ceil($scope.getHeadPhones().length / $scope.pageSize);
    }

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




})


app.directive('login', function () {
    return {
        templateUrl: '/html/Login.html',
        controller: function ($scope, $http) {
            $http.get('http://localhost:8000/signUp')
                .then(function successCallback(response) {
                    $scope.users = response.data;
                })
            $scope.captcha = code;
            $scope.logEmail = '';


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
            $scope.authorized = true;
            //Загрузка авторизованого юзера (якщо є)
            if (localStorage.userName == undefined) {
                localStorage.userName = "default";

            } else {
                if (localStorage.userName != "default") {
                    $scope.userLogIn = localStorage.userName;
                    $scope.login = true;
                    $scope.authorized = false;


                } else {
                    $scope.login = false;
                    $scope.authorized = true;
                }
            };
            $scope.authorize = function () {
                let loginObj = {
                    email: $scope.logEmail,
                    password: $scope.logPass
                }

                $http.post('http://localhost:8000/login', loginObj).then(function successCallback(response) {
                    if (response.data == "welcome") {
                        $scope.userLogIn = $scope.logEmail;
                        $('.shadow').slideUp(500);
                        $('#login-box').slideUp(500);
                        $scope.authorized = false;
                        $scope.login = true;
                        $scope.user = "";
                        localStorage.userName = $scope.userLogIn;
                        $scope.logEmail = '';
                        $scope.logPass = '';
                    } else {
                        $scope.user = response.data;
                    };
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });

            }
            //Розлогінитись
            $scope.logout = function () {
                let logoutObj = {
                    email: localStorage.userName
                };
                $http.post('http://localhost:8000/logout', logoutObj)
                    .then(function successCallback(response) {
                        console.log("Good by!")
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $scope.login = false;
                $scope.authorized = true;
                localStorage.userName = "default";
            };

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
        }

    }
})

app.directive('slider', function () {
    return {
        templateUrl: '/html/slider.html',
        link: function (scope, element, attrs) {
            $('.fa-angle-double-down').on('click', function () {
                $('body').animate({
                    scrollTop: $('.container-fluid').offset().top + 770 + 'vh'
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
        templateUrl: '/html/allGoods.html',
        controller: function ($scope, $http) {
            $scope.back = function () {
                $scope.mainPart = false;
                $scope.phoneDetails = false;
                $scope.tabletDetails = false;
                $scope.headphoneDetails = false;
                $(window).scroll(function () {
                    if ($('body').scrollTop() > $('#search').offset().top) {
                        $('.fa-arrow-up').css('display', 'block')
                    } else {
                        $('.fa-arrow-up').css('display', 'none')

                    }
                });
            }
        }
    }
})
app.directive('mainPart', function () {
    return {
        templateUrl: '/html/mainPart.html',
    }
})
app.directive('onePhone', function () {
    return {
        templateUrl: '/html/onePhone.html',
        controller: function ($scope, $http) {
            $scope.info = function (name) {
                $scope.mainPart = true;
                $scope.phoneDetails = true;
                $scope.tabletDetails = false;
                $scope.headphoneDetails = false;

                $http.get('http://localhost:8000/phones/' + name)
                    .then(function successCallback(response) {
                        $scope.onePhone = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/comments/' + name)
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
                        name: name
                    }
                    $http.post('http://localhost:8000/comments', obj)
                        .then(function successCallback(response) {
                            console.log("Success!");
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $http.get('http://localhost:8000/comments/' + name)
                        .then(function successCallback(response) {
                            $scope.comments = response.data;
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $scope.comment = '';
                }
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
        }
    }
})
app.directive('oneTablet', function () {
    return {
        templateUrl: '/html/oneTablet.html',
        controller: function ($scope, $http) {
            $scope.tabletInfo = function (name) {
                $scope.mainPart = true;
                $scope.phoneDetails = false;
                $scope.tabletDetails = true;
                $scope.headphoneDetails = false;

                $http.get('http://localhost:8000/tablets/' + name)
                    .then(function successCallback(response) {
                        $scope.oneTablet = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/comments/' + name)
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
                        name: name
                    }
                    $http.post('http://localhost:8000/comments', obj)
                        .then(function successCallback(response) {
                            console.log("Success!");
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $http.get('http://localhost:8000/comments/' + name)
                        .then(function successCallback(response) {
                            $scope.comments = response.data;
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $scope.comment = '';
                }
            }
            $scope.$watch("oneTablet", function (newValue, oldValue) {
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
        }
    }
})
app.directive('oneHeadphone', function () {
    return {
        templateUrl: '/html/oneHeadphone.html',
        controller: function ($scope, $http) {
            $scope.headphoneInfo = function (name) {
                $scope.mainPart = true;
                $scope.phoneDetails = false;
                $scope.tabletDetails = false;
                $scope.headphoneDetails = true;
                $http.get('http://localhost:8000/headphones/' + name)
                    .then(function successCallback(response) {
                        $scope.oneHeadphone = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/comments/' + name)
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
                        name: name
                    }
                    $http.post('http://localhost:8000/comments', obj)
                        .then(function successCallback(response) {
                            console.log("Success!");
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $http.get('http://localhost:8000/comments/' + name)
                        .then(function successCallback(response) {
                            $scope.comments = response.data;
                        }, function errorCallback(response) {
                            console.log("Error!!!" + response.err);
                        });
                    $scope.comment = '';
                }
            }
            $scope.$watch("oneHeadphone", function (newValue, oldValue) {
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
        }
    }
})
app.directive('authorized', function () {
    return {
        templateUrl: '/html/authorized.html'
    }
})
app.directive('allPhones', function () {
    return {
        templateUrl: '/html/phones.html',

    }
})
app.directive('allTablets', function () {
    return {
        templateUrl: '/html/tablets.html',

    }
})
app.directive('allHeadphones', function () {
    return {
        templateUrl: '/html/headphones.html'

    }
})

app.directive('adminka', function () {
    return {
        templateUrl: '/html/adminka.html',
        controller: function ($scope, $http) {
            $scope.show = function (source) {
                switch (source) {
                    case 'showTablet()':
                        $scope.allPhones = true;
                        $scope.allHeadphones = false;
                        $scope.allTablets = true;
                        break;
                    case "showPhone()":
                        $scope.allPhones = false;
                        $scope.allHeadphones = false;
                        $scope.allTablets = false;
                        break;
                    case 'showHeadphone()':
                        $scope.allPhones = true;
                        $scope.allHeadphones = true;
                        $scope.allTablets = false;

                }
            }
            $scope.adminPanel = true;
            $scope.proceedToAdmin = function () {
                $scope.adminPanel = false;
                $scope.allGoodsHide = true;
                $scope.authorized = true;
                $scope.sliderHide = true;
                $scope.adminCategoriesShow = true;
                $scope.adminTabletsShow = false;

            }
            $scope.home = function () {
                $scope.adminPanel = true;
                $scope.authorized = false;
                $scope.sliderHide = false;
                $scope.allGoodsHide = false;
                $scope.mainPart = false;
                $scope.phoneDetails = false;
                $scope.adminCategoriesShow = false;
                $scope.adminPhonesShow = false;
                $scope.adminTabletsShow = false;
                $scope.adminHeadphonesShow = false;
            }
            $scope.showPhones = function () {
                $scope.adminCategoriesShow = false;
                $scope.adminPhonesShow = true;
                $scope.adminTabletsShow = false;
                $scope.adminHeadphonesShow = false;
                $scope.editBlock = false;


            }
            $scope.showCategories = function () {
                $scope.adminCategoriesShow = true;
                $scope.adminPhonesShow = false;
                $scope.adminTabletsShow = false;
                $scope.adminHeadphonesShow = false;
                $scope.editBlock = false;


            }
            $scope.showTablets = function () {
                $scope.adminCategoriesShow = false;
                $scope.adminPhonesShow = false;
                $scope.adminTabletsShow = true;
                $scope.adminHeadphonesShow = false;
                $scope.editBlock = false;


            }
            $scope.showHeadphones = function () {
                $scope.adminCategoriesShow = false;
                $scope.adminPhonesShow = false;
                $scope.adminTabletsShow = false;
                $scope.adminHeadphonesShow = true;
                $scope.editBlock = false;

            }
        }
    }
})
app.directive('adminCategories', function () {
    return {
        templateUrl: '/html/adminCategories.html',
        controller: function ($scope, $http) {
            //    ADD NEW CATEGORY
            $scope.addNewCategory = function () {
                var category = {
                    name: $scope.newCategory,
                    source: $scope.newSource
                }

                $http.post('http://localhost:8000/categories', category)
                    .then(function successCallback(response) {
                        console.log("Success!");
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/categories')
                    .then(function successCallback(response) {
                        $scope.categories = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $scope.newCategory = '';
                $scope.newSource = '';
            }
            //    DELETE
            $scope.removeCategory = function (id) {

                $http.delete('http://localhost:8000/categories/' + id).then(function successCallback(response) {
                    console.log('success')
                }, function errorCallback(response) {
                    console.log('Error' + response.err)
                })

                $http.get('http://localhost:8000/categories')
                    .then(function successCallback(response) {
                        $scope.categories = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }

            //    EDIT CATEGORY
            $scope.editCategoryName = '';
            $scope.editSource = '';
            $scope.editIndex = "";
            $scope.editBlock = false;



            $scope.editCategory = function (index, name, source) {
                $scope.editIndex = index;
                $scope.editBlock = true;
                $scope.editCategoryName = name;
                $scope.editSource = source;
            };

            $scope.updateCategory = function () {
                var obj = {
                    name: $scope.editCategoryName,
                    source: $scope.editSource
                };
                $http.put('http://localhost:8000/categories/' + $scope.editIndex, obj).then(function successCallback(response) {
                    console.log('success');
                    $scope.editIndex = "";
                    $scope.editCategoryName = '';
                    $scope.editSource = '';
                    $scope.editBlock = false;
                }, function errorCallback(response) {
                    console.log('Error ' + response.err)
                })
                $http.get('http://localhost:8000/categories')
                    .then(function successCallback(response) {
                        $scope.categories = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });

            }
        }
    }
})
app.directive('adminPhones', function () {
    return {
        templateUrl: '/html/adminPhones.html',
        controller: function ($scope, $http) {
            //    ADD NEW PHONE
            $scope.addNewPhone = function () {
                var phone = {
                    name: $scope.newName,
                    model: $scope.newModel,
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
                $scope.newModel = '';
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
            $scope.editModel = '';
            $scope.editPrice = '';
            $scope.editDisplay = '';
            $scope.editCamera = '';
            $scope.editRam = '';
            $scope.editBlock = false;
            $scope.editIndex = "";


            $scope.editPhone = function (index, name, model, price, display, camera, ram) {
                $scope.editIndex = index;
                $scope.editBlock = true;
                $scope.editName = name;
                $scope.editModel = model;
                $scope.editPrice = price;
                $scope.editDisplay = display;
                $scope.editCamera = camera;
                $scope.editRam = ram;
            };

            $scope.updatePhone = function () {
                var obj = {
                    name: $scope.editName,
                    model: $scope.editModel,
                    price: $scope.editPrice,
                    display: $scope.editDisplay,
                    camera: $scope.editCamera,
                    ram: $scope.editRam
                };
                $http.put('http://localhost:8000/phones/' + $scope.editIndex, obj).then(function successCallback(response) {
                    console.log('success');
                    $scope.editIndex = "";
                    $scope.editName = '';
                    $scope.editModel = '';
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
        }
    }
})
app.directive('adminTablets', function () {
    return {
        templateUrl: '/html/adminTablets.html',
        controller: function ($scope, $http) {
            //    ADD NEW Tablet
            $scope.addNewTablet = function () {
                var tablet = {
                    name: $scope.newTabletName,
                    model: $scope.newTabletModel,
                    price: $scope.newTabletPrice,
                    display: $scope.newTabletDisplay,
                    ram: $scope.newTabletRam
                }

                $http.post('http://localhost:8000/tablets', tablet)
                    .then(function successCallback(response) {
                        console.log("Success!");
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/tablets')
                    .then(function successCallback(response) {
                        $scope.tablets = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $scope.newTabletName = '';
                $scope.newTabletModel = '';
                $scope.newTabletPrice = '';
                $scope.newTabletDisplay = '';
                $scope.newTabletRam = '';
            }
            //    DELETE
            $scope.removeTablet = function (id) {

                $http.delete('http://localhost:8000/tablets/' + id).then(function successCallback(response) {
                    console.log('success')
                }, function errorCallback(response) {
                    console.log('Error' + response.err)
                })

                $http.get('http://localhost:8000/tablets')
                    .then(function successCallback(response) {
                        $scope.tablets = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }

            //    EDIT TABLET
            $scope.editTabletName = '';
            $scope.editTabletModel = '';
            $scope.editTabletPrice = '';
            $scope.editTabletDisplay = '';
            $scope.editTabletRam = '';
            $scope.editBlock = false;
            $scope.editIndex = "";


            $scope.editTablet = function (index, name, model, price, display, ram) {
                $scope.editIndex = index;
                $scope.editBlock = true;
                $scope.editTabletName = name;
                $scope.editTabletModel = model;
                $scope.editTabletPrice = price;
                $scope.editTabletDisplay = display;
                $scope.editTabletRam = ram;
            };

            $scope.updateTablet = function () {
                var obj = {
                    name: $scope.editTabletName,
                    model: $scope.editTabletModel,
                    price: $scope.editTabletPrice,
                    display: $scope.editTabletDisplay,
                    ram: $scope.editTabletRam
                };
                $http.put('http://localhost:8000/tablets/' + $scope.editIndex, obj).then(function successCallback(response) {
                    console.log('success');
                    $scope.editIndex = "";
                    $scope.editTabletName = '';
                    $scope.editTabletModel = '';
                    $scope.editTabletPrice = '';
                    $scope.editTabletDisplay = '';
                    $scope.editTabletRam = '';
                    $scope.editBlock = false;
                }, function errorCallback(response) {
                    console.log('Error ' + response.err)
                })
                $http.get('http://localhost:8000/tablets')
                    .then(function successCallback(response) {
                        $scope.tablets = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });

            }
        }
    }
})
app.directive('adminHeadphones', function () {
    return {
        templateUrl: '/html/adminHeadphones.html',
        controller: function ($scope, $http) {
            //    ADD NEW HEADPHONE
            $scope.addNewHeadphone = function () {
                var headphone = {
                    name: $scope.newHeadphoneName,
                    model: $scope.newHeadphoneModel,
                    price: $scope.newHeadphonePrice,
                    connection: $scope.newHeadphoneConnection,
                    weight: $scope.newHeadphoneWeight
                }

                $http.post('http://localhost:8000/headphones', headphone)
                    .then(function successCallback(response) {
                        console.log("Success!");
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $http.get('http://localhost:8000/headphones')
                    .then(function successCallback(response) {
                        $scope.headphones = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
                $scope.newHeadphoneName = '';
                $scope.newHeadphoneModel = '';
                $scope.newHeadphonePrice = '';
                $scope.newHeadphoneConnection = '';
                $scope.newHeadphoneWeight = '';
            }
            //    DELETE
            $scope.removeHeadphone = function (id) {

                $http.delete('http://localhost:8000/headphones/' + id).then(function successCallback(response) {
                    console.log('success')
                }, function errorCallback(response) {
                    console.log('Error' + response.err)
                })

                $http.get('http://localhost:8000/headphones')
                    .then(function successCallback(response) {
                        $scope.headphones = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });
            }

            //    EDIT HEADPHONE
            $scope.newHeadphoneName = '';
            $scope.newHeadphoneModel = '';
            $scope.newHeadphonePrice = '';
            $scope.newHeadphoneConnection = '';
            $scope.newHeadphoneWeight = '';
            $scope.editBlock = false;
            $scope.editIndex = "";


            $scope.editHeadphone = function (index, name, model, price, connection, weight) {
                $scope.editIndex = index;
                $scope.editBlock = true;
                $scope.editHeadphoneName = name;
                $scope.editHeadphoneModel = model;
                $scope.editHeadphonePrice = price;
                $scope.editHeadphoneConnection = connection;
                $scope.editHeadphoneWeight = weight;
            };

            $scope.updateHeadphone = function () {
                var obj = {
                    name: $scope.editHeadphoneName,
                    model: $scope.editHeadphoneModel,
                    price: $scope.editHeadphonePrice,
                    connection: $scope.editHeadphoneConnection,
                    weight: $scope.editHeadphoneWeight
                };
                $http.put('http://localhost:8000/headphones/' + $scope.editIndex, obj).then(function successCallback(response) {
                    console.log('success');
                    $scope.editIndex = "";
                    $scope.editHeadphoneName;
                    $scope.editHeadphoneModel;
                    $scope.editHeadphonePrice;
                    $scope.editHeadphoneConnection;
                    $scope.editHeadphoneWeight;
                    $scope.editBlock = false;
                }, function errorCallback(response) {
                    console.log('Error ' + response.err)
                })
                $http.get('http://localhost:8000/headphones')
                    .then(function successCallback(response) {
                        $scope.headphones = response.data;
                    }, function errorCallback(response) {
                        console.log("Error!!!" + response.err);
                    });

            }
        }
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

app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
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
