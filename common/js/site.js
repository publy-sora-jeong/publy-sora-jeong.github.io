var posArray;
var section_len;
var $section;

$(function () {
	initDom();
	//includeHTML();
	msieversion();
	function msieversion() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if (msie > 0) {
			$("[data-aos^=fade][data-aos^=fade]").css({
				opacity: 1,
				transform: "none",
			});
			console.log("IE10");
		} else {
			AOS.init({
				startEvent: "DOMContentLoaded",
				once: false,
				duration: 800,
				//offset: 200,
				delay: 150,
				anchorPlacement: "top-bottom",
			});
		}
	}

	$(".sub-top").css({
		"background-image": "url('detail_top.png')",
	});

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

function copyClipboard() {
	var copyText = document.getElementById("value_copy");
	var buttonText = document.getElementById("btn-copy");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	buttonText.innerHTML = "COMPLETE";
}
