$("#page-nav a ").on("click", function (e) {

  e.preventDefault();
  console.log('clicked');
  $('html body').append(
    $('<div class="bg">')
  );

  var href = $(this).attr("href");
  var sectionHref = href.replace('.html', '');
  console.log(sectionHref);

  window.history.pushState(null, null, href);

  $("#page-nav a ").removeClass("active");
  $(this).addClass("active");

  $.ajax({
    url: href,
    success: function (data) {
      $('.bg').animate({
        left: 0
      }, 1000)
      $("section").stop().delay(1000).fadeOut(500, function () {
        $('.bg').animate({
          left: '100%'
        }, 500, function () {
          $(this).remove();
        });
        var newPage = $(data).filter("section").html();

        $("section").html(newPage);
        $('section').removeAttr('class');
        $('section').addClass('page' + ' ' + 'page-' + sectionHref);

        $("section").stop().delay(500).fadeIn(600);

      })
    }
  });

})

// var path = document.querySelector('.path3');
// var length = path.getTotalLength();
// console.log(length)

$('#gnb').on('click', function () {
  $(this).toggleClass('gnb-open');
  $('.bg2').animate({
    left: 0
  }, 1000, function () {
    //after bg2 animation
    $(this).addClass('gnb-open');
  });

  if (!$(this).hasClass('gnb-open')) {
    $('.bg2').animate({
      left: '100%'
    }, 1000, function () {
      //after bg2 animation
      $(this).removeClass('gnb-open');
    });
  }
})