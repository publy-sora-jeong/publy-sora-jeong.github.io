var posArray;
var section_len;
var $section;

$(function () {
  initDom();
  includeHTML();


  headerfix();
  $(window).on('scroll', function () {
    headerfix();
  })

  //ISOTOPE
  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    getSortData: {
      name: ".name",
      category: "[data-category]",
    },
    masonry: {
      columnWidth: 0,
    },
  });

  $(".filter-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({
      filter: filterValue,
    });
  });

  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });



  $(window).on("scroll", function () {
    var scroll = $(this).scrollTop();
    activeBtn(scroll);
  });

  $("#navigation > ul > li").on("mouseenter", function () {
    $(this).addClass("on");
  });



  //COLOR CODE
  var colorCodeArr = [];
  var colorLen = $('.info-color li').length;


  for (var j = 0; j < colorLen; j++) {
    colorCodeArr.push('#' + $('.info-color li').eq(j).attr('class'));
    $('.info-color li').eq(j).find('.palette').css({
      'background': colorCodeArr[j]
    });
    $('.info-color li').eq(j).find('.color-code').css({
      'color': colorCodeArr[j]
    }).text(colorCodeArr[j]);

  }

  $('html, body').on('click', function () {
    $('.fix-layer-control').fadeIn();
  });


  $(".page-prev, .page-next").on("click", function (e) {
    e.preventDefault();

    var eventBtn = $(this).attr("class");
    var curDocNumber = window.location.pathname.match(/\d+/g)[0];
    var tmpDocNumber = curDocNumber;
    var docList = new Array();
    var projectTitle;

    $.ajax({
      type: "GET",
      dataType: "JSON",
      url: "db.json",
      success: function (data) {
        if (data != null) {
          var curDocPos = $.inArray(Number(curDocNumber), data.list);
          projectTitle = data.project;
          console.log(projectTitle);

          if (eventBtn == "page-prev") {
            if (!(curDocPos - 1 < 0)) {
              movePath(data.list[(curDocPos - 1)]);
              console.log(date.project[curDocPos - 1]);
            }
          } else {
            if (!(curDocPos + 1 >= data.list.length)) {
              movePath(data.list[(curDocPos + 1)]);
              console.log(date.project[curDocPos + 1]);
            }
          }
        }
      }
    });


    ///RECENT 
    /*
    		$.ajax({
				type: "GET",
				url: "portfolio2.html",
				success: function(data)
				{

					var count = 0;
					$.each($(data).find('.item'),function(i,dat) {
						$(".folio_item").append(this);
						if ( count >= 5 )
						{
							return false;
						}
						else {
							count++;
						}
					});
				}
			}); */
  });

});


function movePath(num) {
  location.href = "sub_" + num + ".html";
}






function initDom() {
  $section = $("section");
}

function savePosition() {
  posArray = [];
  section_len = $section.length;
  for (var i = 0; i < section_len; i++) {
    posArray.push($section.eq(i).offset().top);
  }
  posArray.push($section.last().offset().top + $section.last().height());
  console.log(posArray);
}

function activeBtn(scroll) {
  var base = -300;
  for (var i = 0; i < section_len; i++) {
    if (scroll >= posArray[i] + base && scroll < posArray[i + 1] + base) {
      $section.removeClass("active");
      $section.eq(i).addClass("active");

      $("#navigation li").removeClass("active");
      $("#navigation li").eq(i).addClass("active");
    }
  }
}

function headerfix() {
  if ($(window).scrollTop() > 10) {
    $('#menu').addClass('fixed');
  } else {
    $('#menu').removeClass('fixed');
  }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}