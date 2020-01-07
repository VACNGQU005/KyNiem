jQuery(document).ready(function() {
    var jQueryslider = jQuery('.slideshow .slider'),
        maxItems = jQuery('.item', jQueryslider).length,
        dragging = false,
        tracking,
        rightTracking;

    jQuerysliderRight = jQuery('.slideshow').clone().addClass('slideshow-right').appendTo(jQuery('.split-slideshow'));

    rightItems = jQuery('.item', jQuerysliderRight).toArray();
    reverseItems = rightItems.reverse();
    jQuery('.slider', jQuerysliderRight).html('');
    for (i = 0; i < maxItems; i++) {
        jQuery(reverseItems[i]).appendTo(jQuery('.slider', jQuerysliderRight));
    }

    jQueryslider.addClass('slideshow-left');
    jQuery('.slideshow-left').slick({
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        infinite: true,
        dots: true,
        speed: 1000,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {

        if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
            jQuery('.slideshow-right .slider').slick('slickGoTo', -1);
            jQuery('.slideshow-text').slick('slickGoTo', maxItems);
        } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
            jQuery('.slideshow-right .slider').slick('slickGoTo', maxItems);
            jQuery('.slideshow-text').slick('slickGoTo', -1);
        } else {
            jQuery('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
            jQuery('.slideshow-text').slick('slickGoTo', nextSlide);
        }
    }).on("mousewheel", function(event) {
        event.preventDefault();
        if (event.deltaX > 0 || event.deltaY < 0) {
            jQuery(this).slick('slickNext');
        } else if (event.deltaX < 0 || event.deltaY > 0) {
            jQuery(this).slick('slickPrev');
        };
    }).on('mousedown touchstart', function() {
        dragging = true;
        tracking = jQuery('.slick-track', jQueryslider).css('transform');
        tracking = parseInt(tracking.split(',')[5]);
        rightTracking = jQuery('.slideshow-right .slick-track').css('transform');
        rightTracking = parseInt(rightTracking.split(',')[5]);
    }).on('mousemove touchmove', function() {
        if (dragging) {
            newTracking = jQuery('.slideshow-left .slick-track').css('transform');
            newTracking = parseInt(newTracking.split(',')[5]);
            diffTracking = newTracking - tracking;
            jQuery('.slideshow-right .slick-track').css({ 'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')' });
        }
    }).on('mouseleave touchend mouseup', function() {
        dragging = false;
    });

    jQuery('.slideshow-right .slider').slick({
        swipe: false,
        vertical: true,
        arrows: false,
        infinite: true,
        speed: 950,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        initialSlide: maxItems - 1
    });
    jQuery('.slideshow-text').slick({
        swipe: false,
        vertical: true,
        arrows: false,
        infinite: true,
        speed: 900,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
    });
});