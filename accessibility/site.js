$(function () {
  //BOARD TAB
  var tab = $(".tab_list");
  tab.css("height", tab.find(">ul>li>ul:visible").height() + 40);

  function onSelectTab() {
    var t = $(this);
    var myClass = t.parent("li").attr("class");
    t.parents(".tab_list:first").attr("class", "tab_list " + myClass);
    tab.css("height", t.next("ul").height() + 40);
  }
  tab
    .find(">ul>li>a")
    .click(onSelectTab)
    .focus(onSelectTab);

  //board tab 2
  var tab2 = $(".tab_list2");
  var tab_list = $(".tab_list2 > ul > li >a");
  tab2.css("height", tab2.find(">ul>li>ul:visible").height() + 40);

  tab2.find(">ul>li>a").focus(function (e) {
    tab2.find(">ul>li").removeClass("active");
    $(this)
      .parent()
      .addClass("active");
    tab2.css("height", tab2.find(">ul>li>ul:visible").height() + 40);
  });

  var langBtn = $(".btn_lang");
  langBtn.bind("mouseenter focusin", function () {
    $(this).addClass("active");
  });
  langBtn.bind("mouseleave focusout", function () {
    $(this).removeClass("active");
  });

  /////---GNB ---/////
  ///declare
  var isDone; //CHECK status of GNB OPENED or CLOSED init - false
  var $gnbUL;
  var $gnbULsub; //count  'li'  of GNB's 2nd menu

  //initialize
  init();

  $gnb.on("mouseenter", openSub);
  $gnb.on("mouseleave", closeSub);
  $gnb.on("focusin", openSub);
  $("*")
    .not($gnb.find("a"))
    .focus(closeSub);

  //GNB2

  $(".depth02").hide();
  $("#gnb2 > ul > li > a ").bind("mouseenter focusin", openSub2);
  $("#gnb2").mouseleave(closeSub2);
  $("#gnb2 > ul > li:last-child > .depth02 ul li:last-child a").focusout(
    closeSub2
  );

  //파일첨부
  $(".customfileinput").customFileinput({
    buttontext: "Browse",
    customboxwidth: 234
  });

  //input placeholder / label animation
  $("input").focus(function () {
    $(this)
      .parents(".place-ani")
      .addClass("focused");
  });

  $("input").blur(function () {
    var inputValue = $(this).val();
    if (inputValue == "") {
      $(this).removeClass("filled");
      $(this)
        .parents(".place-ani")
        .removeClass("focused");
    } else {
      $(this).addClass("filled");
    }


  });



  //레이어 
  // 접근성 관련 포커스 강제 이동
  function accessibilityFocus() {

    $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function (e) {
      var next = $(e.target).attr('data-focus-next'),
        prev = $(e.target).attr('data-focus-prev'),
        target = next || prev || false;

      if (!target || e.keyCode != 9) {
        return;
      }

      if ((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) {
        setTimeout(function () {
          $('[data-focus="' + target + '"]').focus();
        }, 1);
      }

    });

  }

  function tooltip() {
    var openBtn = '[data-tooltip]',
      closeBtn = '.tooltip-close';

    function getTarget(t) {
      return $(t).attr('data-tooltip');
    }

    function open(t) {
      var showTarget = $('[data-tooltip-con="' + t + '"]');
      showTarget.show().focus();
      showTarget.find('.tooltip-close').data('activeTarget', t);
    }

    function close(t) {
      var activeTarget = $('[data-tooltip-con="' + t + '"]');
      activeTarget.hide();
      $('[data-tooltip="' + t + '"]').focus();
    }

    $(document)
      .on('click', openBtn, function (e) {
        e.preventDefault();
        open(getTarget(e.target));
      })
      .on('click', closeBtn, function (e) {
        e.preventDefault();
        close($(this).data('activeTarget'));
      })

  }


  $(document).ready(function () {

    tooltip();
    accessibilityFocus();

  });



  //SNAV 
  $('.snav .snav-main > ul >  li > a ').focus(function () {
    $('.snav .snav-main > ul li').removeClass('active');
    $(this).parent().addClass();

  });


  //ENDS


});

function init() {
  $gnb = $("#gnb > ul");
  $gnb_li = $gnb.children("li");
  $gnb_li_a = $gnb_li.children("a");
  $gnb_ul = $gnb.find("ul");
  $gnb_ul_li_a = $gnb_ul.find("a");
  isDone = true;
}

function openSub() {
  var isBgGnb = $(".bgGnb").length;
  if (!isBgGnb) {
    $gnb.append(
      $('<div class="bgGnb">').css({
        width: "2000px",
        height: getSubMaxHeight(),
        backgroundColor: "#fff",
        position: "absolute",
        left: "50%",
        top: 100,
        display: "none",
        marginLeft: -1000,
        borderBottom: "2px solid #ffce39"
        //borderTop: "1px solid #333",
      })
    );

    $gnb_ul.height(getSubMaxHeight);
  }

  if (isDone) {
    isDone = false;
    $gnb_ul.stop().slideDown(500);
    $(".bgGnb")
      .stop()
      .slideDown(500);
  }
}

function closeSub() {
  $gnb_ul.slideUp(300);
  $(".bgGnb").slideUp(300, function () {
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

function openSub2() {
  $("#gnb2 > ul > li").removeClass("open");
  $(this)
    .parent()
    .addClass("open");
  if ($("#gnb2 > ul > li").hasClass("open")) {
    $(this)
      .siblings(".depth02")
      .stop()
      .slideDown(400);
  }
}

function closeSub2() {
  $(".depth02")
    .stop()
    .slideUp(400, function () {
      $(this)
        .parent()
        .removeClass("open");
    });
}



/*

function accessibility(){
    $('#localnav .main > li > a').focus(function(){
        var color = $(this).parent().index();
        $('#localnav .main > li').removeClass('active');
        $(this).parent().addClass('active'); 
        $('#localnav').removeClass();
        $(this).parents('#localnav').addClass('color'+(color+1)).addClass('gnb_open');
    });
    $('#localnav .main > li:first-child > a').on('keydown',function(e){
        if(e.which == 9 && e.shiftKey){
            $(this).parent().removeClass('active');
            $('#localnav').removeClass('gnb_open').removeClass('color1');
        }
    }); 
    //마지막 li에서 사라지기
    $('#localnav .main > li:last-child .brand li:last-child').on('keydown',function(e){
        if(e.which == 9){
            $('#localnav .main > li').removeClass('active');
            $('#localnav').removeClass('gnb_open').removeClass('color5');
            if(e.shiftKey){
                $(this).prev().focus();
                $('#localnav .main > li').addClass('active');
                $('#localnav').addClass('gnb_open').addClass('color5');
            }
        }
    });
    //depth 메뉴 tab누르면 메뉴 내려오기
    $('.navigation .depth .list li a').focus(function(){
        $('.navigation .depth').removeClass('open');
        $(this).parents('.navigation .depth').addClass('open');
    });
    $('#localnav .main > li > a').on('keydown',function(e){
        if(e.which == 9 && e.shiftKey){
            $(this).parent().prev().find('a').focus();
        }
    }); 
    //depth1에서 main li에 focus 주기
    $('.navigation .depth1 li:first-child a').on('keydown',function(e){
        if(e.which == 9 && e.shiftKey){
            $('#localnav .main > li:last-child .brand li:last-child').focus();
            $('#localnav .main > li').addClass('active');
            $('#localnav').addClass('gnb_open').addClass('color5');
            $('.navigation .depth1').removeClass('open');
        }
    });
    //마지막 depth 마지막 li에서 사라지기
    $('.navigation .depth:last-child a:last-child').on('keydown',function(e){
        if(e.which == 9){
            $(this).parents('.depth').removeClass('open');
        }
    });
    srchTab();*/