function backToTop(el) {

    var $scrollTrigger = 200, // px
    backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > $scrollTrigger) {
            el.addClass('show');
        } else {
            el.removeClass('show');
        }
    };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    el.on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

}

// backToTop($('trigger'));
