$(document).ready(function () { //start

    var $login_type = $('.login_type > li');
    var $loginbox = $('.loginbox');
    $login_type.on('click', function () {

        var thisindex = $(this).index();
        console.log(thisindex);

        $login_type.removeClass('on');
        $(this).addClass('on');

        $loginbox.removeClass('on');
        $loginbox.eq(thisindex).addClass('on');


    })


}); //end