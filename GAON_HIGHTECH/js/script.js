$(document).ready(function () {

  $('.btn-top').on('click', function () {

    $("html").animate({
      scrollTop: 0
    }, 500);

  })

  $('.lang-select').on('click', function () {
    $('.select-list').slideDown();
  });
  $('.lang-select').on('mouseleave', function () {
    $('.select-list').slideUp(200);
  });

  // $(".gnews .news-cnt").each(function () {
  //   $(this).dotdotdot({
  //     ellipsis: "\u2026",
  //     wrap: "word",
  //     watch: true,
  //     tolerance: 0
  //   });
  // });


  //MOBILE GNB
  $("#m-gnb").removeClass("on");
  $(".m-open").on('click', function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $('#m-gnb').stop().animate({
        left: -320
      });
    } else {
      $(this).addClass('open');
      $('#m-gnb').stop().animate({
        left: 0
      });
    }

  });


  // //모바일네비 > Slide up & down
  $("#m-gnb > ul > li  > a ").on("click", function (e) {
    e.preventDefault();

    $(this).parent().addClass('selected');
    $('#m-gnb > ul > li .m-sub-nav').stop().slideUp(400);
    $(this).parent().find('.m-sub-nav').stop().slideDown(400);
  });


  $('.sub-depth .current').on('click', function (e) {
    e.preventDefault();
    $(this).parent().find('ul').slideDown(200);
    $(this).parent().addClass('on');
  });
  $('.sub-depth').on('mouseleave', function () {
    $(this).find('ul').slideUp(200);
    $(this).removeClass('on');
  })

});

function tabs() {
  $('.tab-list li').click(function (e) {
    var thisIndex = $('.tab-list li').index(this);

    $('div.tab-cnt').removeClass('on');
    $('.tab-list li').removeClass('on');
    $('div.tab-cnt').eq(thisIndex).addClass('on');
    $('.tab-list li').eq(thisIndex).addClass('on');

    return false;
  });
}