var posArray;
var section_len;
var $section;

$(function () {
	initDom();
	includeHTML();

	$cursor = $(".cursor");
	$links = $("a");

	$(window).on("mousemove", mouseAni);

	function mouseAni(e) {
		$cursor.css(
			{
				top: e.pageY - 5 + "px",
				left: e.pageX - 10 + "px",
			},
			100
		);
	}

	function mouseHover() {}
	// headerfix();
	// $(window).on("scroll", function () {
	//   headerfix();
	// });

	// setTimeout(() => {
	//   $(".typo .change").text("change");
	// }, 1000);
	var time = 0;
	var numbering = "#0";
	setInterval(() => {
		time++;
		$(".numbering").text("#I AM");
		$(".typo .change").text("CHALLENGER");
		$(".subtit").html("I am trying to overcome fear of trying new things. ");

		if (time == 2) {
			$(".numbering").text("#I AM");
			$(".typo .change").text("ADJUSTED");
			$(".subtit").html(" I'm trying to be an assertive well-adjusted person.");
		}
		if (time == 3) {
			$(".numbering").text("#I HAVE ");
			$(".typo .change").text("ACTING POWER");
			$(".subtit").html("I put money where my mouths are.");
			time = 0;
		}
	}, 2000);

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
	$(".button-group").each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function () {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});

	if ($("html, body").hasClass("sub")) {
		var p_lastPostion = $(".sub.next-project").offset().top - 520;
	}

	$(window).on("scroll", function () {
		var scroll = $(this).scrollTop();
		if (scroll > 100 && scroll < p_lastPostion) {
			$(".fix-layer-control").stop().animate({
				bottom: 0,
			});
		} else {
			$(".fix-layer-control").stop().animate({
				bottom: -100,
			});
		}

		activeBtn(scroll);
	});

	$("#navigation > ul > li").on("mouseenter", function () {
		$(this).addClass("on");
	});

	//COLOR CODE
	var colorCodeArr = [];
	var colorLen = $(".info-color li").length;

	for (var j = 0; j < colorLen; j++) {
		colorCodeArr.push("#" + $(".info-color li").eq(j).attr("class"));
		$(".info-color li").eq(j).find(".palette").css({
			background: colorCodeArr[j],
		});
		$(".info-color li")
			.eq(j)
			.find(".color-code")
			.css({
				color: colorCodeArr[j],
			})
			.text(colorCodeArr[j]);
	}

	// $('html, body').on('click', function () {
	//   $('.fix-layer-control').fadeIn();
	// });
});

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

// function headerfix() {
//   if ($(window).scrollTop() > 10) {
//     $("#menu").addClass("fixed");
//   } else {
//     $("#menu").removeClass("fixed");
//   }
// }

//include header menu
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
			};
			xhttp.open("GET", file, true);
			xhttp.send();
			/* Exit the function: */
			return;
		}
	}
}
