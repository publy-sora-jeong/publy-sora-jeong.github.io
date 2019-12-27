$(function () {

    initDom();
    var $section02SlideBanner;
    //fullpage
    $("#fullpage").fullpage({
        menu: "#fullpage_nav",
        anchors: [
            "fsection01",
            "fsection02",
            "fsection03",
            "fsection04",
            "fsection05",
            "fsection06",
            "fsection07",
            "fsection--footer"
        ],

        responsiveWidth: 1100,
        lockAnchors: false,
        afterLoad: function (anchorLink, index) {
            setTimeout(function () {
                $(".section01").addClass("onSlide01");
            }, 500);
        },
        navigation: false,
        navigationPosition: "right",
        showActiveTooltip: false,
        slidesNavigation: false
    });


    var screenSize;


    screenSize = $(window).width();
    console.log(screenSize);
    $(window).resize(function () {


        if (screenSize <= 1100) {
            section02SlideBanner();
        } else {

        }


    })

    var idx = 0;
    if (screenSize >= 1100) {
        $(".slide-item").on("click", function () {
            $(".slide-item").removeClass("on");
            idx = $(this).index();
            $(this).addClass("on");
        });

    } else {


        section02SlideBanner();

    }




    $('.plan-top-tab li').on('click', function () {
        var index = $(this).index();

        $('.plan-top-tab li').removeClass('on');
        $(this).addClass('on');

        $('.plan-cont').removeClass('on').stop().animate({
            height: 175,
            opacity: 0
        }, 200);
        $('.plan-cont').eq(index).addClass('on').stop().animate({
            height: 175,
            opacity: 1
        }, 200);
    });


    $('.preview').hide();

    $('.btn-preview').on('click', function (e) {
        e.preventDefault();

        $('.preview').fadeIn(100);

        var getDataAttr = $(this).attr('data-preview');
        $('.preview img').hide();

        if (getDataAttr == 'preview01') {
            $('.preview img.preview01').show().css({
                'display': 'block'
            });
        } else if (getDataAttr == 'preview02') {
            $('.preview img.preview02').show().css({
                'display': 'block'
            });
        }

    });

    $('.btn-close').on('click', function () {
        $('.preview').fadeOut();
    });

    //레이어팝업 배경부분 클릭시 안보이게 
    $(window).on("click", function (evt) {
        var dimm = document.getElementById("preview");

        if (evt.target == dimm) {

            $("#preview").fadeOut(400);

        }
    });

    /*

    //CIRCLE ANIMATION
    var positionX = parseInt($(".cir-move-01").css("left"));
    var positionY = parseInt($(".cir-move-01").css("top"));
    setInterval(function () {
        var randomNumX = positionX + getRandomInt(50, -50);
        var randomNumY = positionY + getRandomInt(50, -50);

        $(".cir-move-01").css({
            left: randomNumX,
            top: randomNumY
        });
    }, 1500);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
     */
});

function initDom() {
    $section02SlideBanner = $('.slide-banner-wrap');
}

function section02SlideBanner() {
    $section02SlideBanner.not('.slick-initialized').slick({
        infinite: true,
        autoplay: false,
        autoplaySpeed: 1000,
        speed: 1000,
        responsive: [{
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 1100,
                settings: {
                    autoplay: true
                }
            }
        ]
    });

}