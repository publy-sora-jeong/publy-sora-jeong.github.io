var arrNewsHeight, maxNewsHeight;
var $headerWrap, $gnb, $gnb_li, $gnb_li_a, $gnb_ul, $gnb_ul_li_a, isDone;

var $sitemapBtn;
var $sitemap;
var isOpen;


var $btnShowPrev, $btnShowNext;

var $subHistoryNav;
var $subHistoryNavLen;

var $mGnbLi;
var $header;
var $mGnb;

var $body;

var $sNavHide;
var $sNavList;

//MAIN - SLICK INIT
var $sectionQuick_UL, $newsItemWrap;



$(document).ready(function () {

    initDom();


    mainSlickQuick();
    mainSlickNews();

    $('.btn-go-top').on('click', function () {
        $body.stop().animate({
            scrollTop: 0
        }, 1000);
    });

    var windowWidth = $(window).width();
    if (windowWidth > 1024) {

        $gnb_li.on("mouseenter", function () {
            $(this).addClass("on");
        });

        $gnb_li.on("mouseleave", function () {
            $(this).removeClass("on");
        });

        $gnb.on("mouseenter", openSub);
        $gnb.on("mouseleave", closeSub);
        $gnb.on("focusin", openSub);

        $('.btn-gnb-all').on('click', function () {
            //openSub();
        })

    }



    if (windowWidth <= 1024) {
        //GNB
        $mGnbLi.find('a').attr('href', 'javascript:void(0);');
        $mGnbLi.on('click', function () {

            $mGnbLi.children('ul').removeClass('on').css({
                'display': 'none'
            });
            $(this).children('ul').addClass('on').css({
                'display': 'block'
            });;
            // $(this).find('depth02').css({
            //     'display': 'block'
            // });

        })
    } else if (windowWidth > 768) {
        pageHistoryWidth();
    }
    if (windowWidth <= 768) {
        $subHistoryNav.css({
            width: '100%'
        });

        subnavOpen();
    }

    //
    $('.sub-nav-list > p > a, .sub-nav-hide > p > a ').on('click', function (e) {
        console.log('fasd');
        e.preventDefault();
    })


    //resize 
    $(window).on("resize", function () {

        $html = $('html, body');

        mainSlickQuick();
        mainSlickNews();

        var windowWidth = $(window).width();
        if (windowWidth > 1024) {

            $gnb_li.on("mouseenter", function () {
                $(this).addClass("on");
            });

            $gnb_li.on("mouseleave", function () {
                $(this).removeClass("on");
            });

            $gnb.on("mouseenter", openSub);
            $gnb.on("mouseleave", closeSub);
            $gnb.on("focusin", openSub);

            $('.btn-gnb-all').on('click', function () {
                //openSub();
            })

        }
        if (windowWidth > 768) {
            pageHistoryWidth();
        }
        if (windowWidth <= 768) {
            $subHistoryNav.css({
                width: '100%'
            });

            subnavOpen();
        }



    });


    $('.panel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 3000,
        fade: true,
        nextArrow: $('.btn-next'),
        prevArrow: $('.btn-prev'),
    });

    var totalCount = $('.panel .panel-item').length;
    $('.panel-pager .total').text('0' + totalCount);

    $('.panel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

        $('.panel-pager .current').text('0' + (nextSlide + 1));
        $('.panel-pager .total').text('0' + totalCount);
    });



    $('.rolling-list').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        nextArrow: $('.rolling-control .btn-next'),
        prevArrow: $('.rolling-control .btn-prev'),
        //slickPause: $('.rolling-control .btn-pause')
    });

    $('.rolling-control .btn-pause').on('click', function (e) {
        e.preventDefault();
        $('.rolling-list').slick('slickPause');
    })
    $('.rolling-control .btn-next, .rolling-control .btn-prev').on('click', function (e) {
        e.preventDefault();
        $('.rolling-list').slick('slickPlay');
    })






    $('.btn-gnb-all').on('click', function () {

        //test
        $mGnb.stop().animate({
            right: 0
        });
        $mGnbLi.eq(0).find('.depth02').addClass('on').css({
            'display': 'block'
        });

        // if (windowWidth <= 1024) {} else {
        //     openSub();
        // }

    })

    $('.btn-close-gnb').on('click', function () {
        $mGnb.stop().animate({
            right: -320
        });

        $mGnbLi.children('ul').removeClass('on').css({
            'display': 'none'
        });
        $mGnbLi.eq(0).find('.depth02').addClass('on');

    })



    $(".main-news .section-container li").each(function (i) {
        arrNewsHeight.push($(this).height());
        maxNewsHeight = Math.max(maxNewsHeight, arrNewsHeight[i]);
        $(this).height(maxNewsHeight + 50);
    });


    $sitemapBtn.on("click", function (e) {
        e.preventDefault();
        sitemapOpen();
    });

    $("html, body").on("click", ".btn-gnb-close", function () {
        sitemapClose();
    });

    isOpen = false;
    $(".gnb-sitemap > ul > li > a").on("click", function () {
        $(".gnb-sitemap > ul > li > a")
            .removeClass("on")
            .parent()
            .children("ul")
            .slideUp(100);
        isOpen = false;

        if (!isOpen) {
            $(this)
                .addClass("on")
                .parent()
                .children("ul")
                .slideDown(100, function () {
                    isOpen = true;
                });
        } else {
            $(this)
                .removeClass("on")
                .parent()
                .children("ul")
                .slideUp();
            isOpen = false;
        }
    });



    //SUBPAGE

    $(".sub-visual").addClass("on");
    pageHistoryWidth();

    //MULTI TAB 
    $('ul.history-tabs').each(function () {
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function (e) {
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.removeClass('active');

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('active');
            $content.addClass('active');

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });


});


function initDom() {

    //MAIN NEWS
    arrNewsHeight = [];
    maxNewsHeight = 0;

    //GNB
    $headerWrap = $(".header-wrap");
    $gnb = $("#gnb > ul");
    $gnb_li = $gnb.children("li");
    $gnb_li_a = $gnb_li.children("a");
    $gnb_ul = $gnb.find("ul");
    $gnb_ul_li_a = $gnb_ul.find("a");
    isDone = true;

    $tag_section = $(".section");

    countFirst = $(".about-figure strong").eq(0);
    countSecond = $(".about-figure strong").eq(1);
    countThird = $(".about-figure strong").eq(2);

    $sitemapBtn = $(".gnb-all a ");
    $sitemap = $(".gnb-sitemap");

    $btnPlay = $(".btn-play");

    $subHistoryNav = $(".sub-nav-list li");
    $subHistoryNavLen = $(".sub-nav-list li").length;

    $btnShowPrev = $('.btn-prev');
    $btnShowNext = $('.btn-next');

    $header = $("header");
    $body = $body;
    $mGnb = $('#m-gnb');
    $mGnbLi = $('#m-gnb .depth01 li');

    $sNavHide = $('.sub-nav-hide');
    $sNavList = $('.sub-nav-list');

    $sectionQuick_UL = $(".section-quick ul");
    $newsItemWrap = $(".news-item-wrap");

}

function mainSlickQuick() {
    $sectionQuick_UL.not('.slick-initialized').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 1000,
        centerMode: true,
        responsive: [{
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    centerMode: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

function mainSlickNews() {
    $newsItemWrap.not('.slick-initialized').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 1000,
        responsive: [{
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}



function activeBtn(scroll) {
    var base = -300;
    for (var i = 0; i < section_len; i++) {
        if (scroll >= posArr[i] + base && scroll < posArr[i + 1] + base) {
            //$navi_li.removeClass('on');
            //$navi_li.eq(i).addClass('on');

            $tag_section.removeClass("on");
            $tag_section.eq(i).addClass("on");
        }
    }
}

function openSub() {
    var isBgGnb = $(".bgGnb").length;
    if (!isBgGnb) {
        $gnb.append(
            $('<div class="bgGnb">').css({
                width: "2000px",
                height: getSubMaxHeight() + 1,
                backgroundColor: "#fff",
                position: "absolute",
                left: "50%",
                top: 55,
                display: "none",
                marginLeft: -1000,
                borderBottom: "1px solid #ddd",
                borderTop: "1px solid #333"
            })
        );

        $gnb_ul.height(getSubMaxHeight);

    }

    if (isDone) {
        isDone = false;
        $gnb_ul.stop().slideDown(0);
        $(".bgGnb")
            .stop()
            .slideDown(0);
    }
}

function closeSub() {
    $gnb_ul.slideUp(100);
    $(".bgGnb").slideUp(100, function () {
        $(this).remove();
        isDone = true;
    });
}

function getSubMaxHeight() {
    var ht_max = 0;
    var ht_arr = [];

    $gnb_li.each(function (i) {
        ht_arr.push(
            $(this)
            .children("ul")
            .height()
        );
        ht_max = Math.max(ht_max, ht_arr[i]);
    });

    return ht_max;
}

function savePosition() {
    posArr = [];
    section_len = $tag_section.length;

    for (var i = 0; i < section_len; i++) {
        posArr.push($tag_section.eq(i).offset().top);
    }

    posArr.push($tag_section.last().offset().top + $tag_section.last().height());
}

function sitemapOpen() {
    $sitemap.addClass("on");

    $body.css("overflow", "hidden");

    $header.append(
        $('<div class="sitemapBg">')
        .css({
            position: "fixed",
            top: 0,
            right: "-100%",
            background: "rgba(34,34,34,0.9)",
            width: "100%",
            height: "100%",
            zIndex: 5000
        })
        .stop()
        .delay(100)
        .animate({
                right: 0
            },
            500,
            function () {
                $sitemap.find("a").css({
                    opacity: 1
                });
                $(".btn-gnb-close").addClass("on");
            }
        )
        .append(
            $(
                '<a href="#" class="btn-gnb-close"><em class="line1"></em><em class="line2"></em>'
            )
        )
    );
}

function sitemapClose() {
    //$(".btn-gnb-close").on("click", function () {
    $sitemap.find("a").css({
        opacity: 0
    });
    $(".sitemapBg")
        .stop()
        .animate({
                right: "-100%"
            },
            1000,
            function () {
                $(this).remove();
                $(".gnb-sitemap").removeClass("on");
                $(".gnb-sitemap-depth2").slideUp(0, function () {
                    isOpen = false;
                    $(".gnb-sitemap > ul > li > a").removeClass("on");
                });
            }
        );

    $(".btn-gnb-close")
        .find("em")
        .css({
            transform: "rotate(0deg)"
        })
        .stop()
        .fadeOut(500, function () {
            $(this).remove();
        });
    //$sitemap.removeClass("on");
    $body.css("overflow", "auto");
}

function pageHistoryWidth() {
    var historyWidth = $(".sub-nav-list").width();

    $subHistoryNav.css({
        width: historyWidth / $subHistoryNavLen
    });
}

function subnavOpen() {


    $sNavList.on('mouseenter', function () {


        $sNavList.stop().css({
            height: 'auto',
            overflow: 'auto'
        });
    });

    $sNavHide.on('mouseenter', function () {

        $sNavHide.stop().css({
            height: 'auto',
            overflow: 'auto'
        });
    });
    $sNavList.on('mouseleave', function () {
        $sNavList.stop().css({
            height: 55,
            overflow: 'hidden'
        });
    })

    $sNavHide.on('mouseleave', function () {
        $(this).stop().css({
            height: 55,
            overflow: 'hidden'
        });
    })

}

function tabs() {
    var oldIndex = 0;

    $('.tab-top li').click(function () {
        var thisIndex = $('.tab-top li').index(this);

        $('div.tab-cont').removeClass('selected');
        $('.tab-top li').removeClass('selected');

        $('div.tab-cont').eq(thisIndex).addClass('selected');
        $('.tab-top li').eq(thisIndex).addClass('selected');

        return false;
    });

};


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function includeHTML2() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html2");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html2");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};