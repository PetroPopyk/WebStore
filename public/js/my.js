//animation & scrolling
$(document).ready(function () {
    $('.main__text').fadeIn(2500, function () {});

    function fade1() {
        if ($('body').scrollTop() >= $('.content').offset().top) {
            $('.prod').animate({
                marginTop: '25px'
            }, 500)
        }
    };
    $(window).scroll(function () {
        fade1();
    });
    $('#img1').click(function () {
        $('#img1').css({
            width: "600px"
            , height: "600px"
            , top: '50%'
            , left: '50%'
            , marginLeft: '-300px'
            , marginTop: '-300px'
        })
    })
});
//chat on/off animation
$('.chatOn').bind('click', function () {
    $('.chatOn').css({
        transition: '0s'
        , visibility: 'hidden'
    }), $('.chat').css({
        visibility: 'visible'
    }), $('#hideChat').css({
        visibility: 'visible'
    })
});
$('#hideChat').bind('click', function () {
    $('.chatOn').css({
        transition: '0s'
        , visibility: 'visible'
    }), $('.chat').css({
        visibility: 'hidden'
        , transition: '0s'
    }), $(this).css({
        transition: '0s'
    }), $('.chat').css({
        visibility: 'hidden'
        , transition: '0s'
    }), $('#hideChat').css({
        visibility: 'hidden'
    })
})
//scrolling function
function scrollToSection(btn, section) {
    $('header a:eq(' + btn + ')').click(function () {
        $('body,html').animate({
            scrollTop: $('.content' + section + '').offset().top
        }, 500);
    })
}
scrollToSection(1, '');
scrollToSection(0, 1);
scrollToSection(2, 2);
//jquery slider
var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;
var slideInterval = 3000;
var navBtnId = 0;
var translateWidth = 0;
$(document).ready(function () {
    var switchInterval = setInterval(nextSlide, slideInterval);
    $('#viewport').hover(function () {
        clearInterval(switchInterval);
    }, function () {
        switchInterval = setInterval(nextSlide, slideInterval);
    });
    $('#next-btn').bind('click', function () {
        nextSlide();
    });
    $('#prev-btn').bind('click', function () {
        prevSlide();
    });
    $('.slide-nav-btn').bind('click', function () {
        navBtnId = $(this).index();
        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)'
            });
            slideNow = navBtnId + 1;
        }
    });
});

function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    }
    else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)'
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)'
        });
        slideNow = slideCount;
    }
    else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)'
        });
        slideNow--;
    }
}
//registration clock animation
$('#reg').bind('click', function () {
    $('.main__text').animate({
        left: '-2000px'
    }, 1000);
    $('.registr').animate({
        top: "50%"
    }, 1000)
    txt5.value = "";
    txt6.value = "";
    txt7.value = "";
});

function flashtext(ele, col) {
    var tmpColCheck = document.getElementById(ele).style.color;
    if (tmpColCheck === 'aliceblue') {
        document.getElementById(ele).style.color = col;
    }
    else {
        document.getElementById(ele).style.color = 'aliceblue';
    }
}
setInterval(function () {
    flashtext('chatAsk', 'black');
}, 1000);
//angular part
var app = angular.module('myApp', []);
app.controller('myCtrl1', function ($scope, $http) {
    //get all products from database
    $http.get('http://localhost:8000/items').then(function successCallback(response) {
        $scope.myWelcome = response.data;
    }, function errorCallback(response) {
        console.log("Error!!!" + response.err);
    });
    //get all users from database
    $http.get('http://localhost:8000/users').then(function successCallback(response) {
        $scope.myWelcome2 = response.data;
    }, function errorCallback(response) {
        console.log("Error!!!" + response.err);
    });
    //angular login function+animation
    btn1.onclick = function () {
        var name1 = document.getElementById("txt1").value;
        var pass1 = document.getElementById("txt2").value;
        for (let i = 0; i < $scope.myWelcome2.length; i++) {
            if (name1 == $scope.myName && pass1 == $scope.myPass) {
                $('#txt1').val('');
                $('#txt2').val('');
                $('body,html').animate({
                    scrollTop: $('.content').offset().top
                }, 500);
                $('#txt1').css({
                    border: 'none'
                    , borderBottom: '2px solid aliceblue'
                });
                $('#txt1').attr("placeholder", "");
                $('#txt2').css({
                    border: 'none'
                    , borderBottom: '2px solid aliceblue'
                });
                $('#txt2').attr("placeholder", "");
                $('#welc').text("Welcome, " + $scope.myName + '!');
                $('#welc').fadeIn(2000, function () {});
                $('#welc').fadeOut(2000, function () {});
                $('#content-slider').css({
                    visibility: 'visible'
                });
                $('.content2').css({
                    visibility: 'visible'
                });
                $('.chatOn').css({
                    visibility: 'visible'
                });
                $('.header').animate({
                    marginLeft: '0'
                }, 1000);
            }
            else if (name1 != $scope.myName && pass1 == $scope.myPass) {
                $('#txt1').val('');
                $('#txt1').attr("placeholder", "WRONG LOGIN!");
                $('#txt1').css({
                    border: '1px solid red'
                })
            }
            else if (name1 == $scope.myName && pass1 != $scope.myPass) {
                $('#txt2').val('');
                $('#txt2').attr("placeholder", "WRONG PASSWORD!");
                $('#txt2').css({
                    border: '1px solid red'
                })
            }
        }
    }
    //sms-verification function
    $scope.code = '';
    $scope.send3 = function () {
        $scope.code = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
        var obj3 = {
            code: $scope.code
            , number: $scope.phone
        };
        $http.post('http://localhost:8000/testtwilio', obj3).then(function successCallback(response) {}, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }
    $scope.send2 = function () {
        var obj2 = {
            name: $scope.names
            , pass: $scope.passs
        , };
        if ($scope.newCode == $scope.code) {
            $http.post('http://localhost:8000/userss', obj2).then(function successCallback(response) {
                console.log("Success!");
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
            $('.main__text').animate({
                left: '50%'
            }, 1000);
            $('.main__text').css({
                zIndex: '10000'
            })
            $('.registr').animate({
                top: "-2000px"
            }, 1000)
            $('#txt7').css({
                border: 'none'
                , borderBottom: '2px solid aliceblue'
            });
            $('#txt7').attr("placeholder", "");
        }
        else {
            alert('Something gone wrong..');
        }
    }
    //adding new product to database
    $scope.send = function () {
        var obj = {
            name: prompt('Enter name..')
            , price: prompt('Enter price..')
        };
        $http.post('http://localhost:8000/items', obj).then(function successCallback(response) {
            console.log("Success!");
            $scope.name = '';
            $scope.price = '';
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
        $http.get('http://localhost:8000/items').then(function successCallback(response) {
            $scope.myWelcome = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }
    //deleting product from database
    $scope.delete = function (index) {
        $http.delete('http://localhost:8000/items/' + index).then(function successCallback(response) {
            console.log("Success!");
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
        $http.get('http://localhost:8000/items').then(function successCallback(response) {
            $scope.myWelcome = response.data;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }
});