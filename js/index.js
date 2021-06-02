//
//
// Index JS
//
//


(function ($) {
    'use strict';
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

    function pageFunctions() {


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

        // Wait until first image has loaded
        $('.page__content').find('img:first').imagesLoaded( function() {

            // Portfolio grid layout
            $('.portfolio-wrap').imagesLoaded( function() {
                $('.portfolio-wrap').masonry({
                    itemSelector: '.portfolio-item',
                    transitionDuration: 0
                });
            });

            // Show the content
            $('body').removeClass('loading');

            // Hide the menu - mobile only
            $('body').removeClass('menu--open');
        });


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

        // Switch active link states
        var navTarget = $('body').attr('data-page-url');
        $('.active-link').removeClass('active-link');
        $('a[href="' + navTarget + '"]').addClass('active-link');

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

        // Destroy all existing waypoints
        Waypoint.destroyAll();

        // Set up count for galleries to give them unique IDs
        var galleryCount = 0;

        // If there's a gallery
        $('.gallery').each( function() {

            // Get gallery element
            var $this = $(this);

            // Add ID via count
            galleryCount++;
            var thisId = 'gallery-' + galleryCount;
            $this.attr('id', thisId);

            // Gallery columns
            var galleryCols = $this.attr('data-columns');

            // Set up gallery container
            $this.append('<div class="gallery__wrap"></div>');

            // Add images to container
            $this.children('picture').each( function() {
                $(this).appendTo('#' + thisId + ' .gallery__wrap');
            });

            // Wrap images
            $this.find('.gallery__wrap picture img').each( function() {
                var imageSrc = $(this).attr('src');
                $(this).wrapAll('<div class="gallery__item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
            });

            // Wait for images to load
            $this.imagesLoaded( function() {

                // If it's a single column gallery
                if ( galleryCols === '1' ) {

                    // Add carousel class to gallery
                    $this.addClass('gallery--carousel');

                    // Add owl styles to gallery wrap
                    $this.children('.gallery__wrap').addClass('owl-carousel');

                    // Use carousel
                    $this.children('.gallery__wrap').owlCarousel({
                        items: 1,
                        loop: true,
                        mouseDrag: false,
                        touchDrag: true,
                        pullDrag: false,
                        dots: true,
                        autoplay: false,
                        autoplayTimeout: 6000,
                        autoHeight: true,
                        animateOut: 'fadeOut'
                    });

                    // When scrolling over the bottom
                    var waypoint1 = new Waypoint({
                        element: document.getElementById(thisId),
                        handler: function(direction) {

                            if ( direction === 'down') {

                                // console.log('pause');

                                // Pause this carousel
                                $this.children('.gallery__wrap').trigger('stop.owl.autoplay');
                            }

                            if ( direction === 'up') {

                                // console.log('play');

                                // Play this carousel
                                $this.children('.gallery__wrap').trigger('play.owl.autoplay');
                            }
                        },
                        offset: '-100%'
                    });

                    // When scrolling over the top
                    var waypoint2 = new Waypoint({
                        element: document.getElementById(thisId),
                        handler: function(direction) {

                            if ( direction === 'down') {

                                // console.log('play');

                                // Play this carousel
                                $this.children('.gallery__wrap').trigger('play.owl.autoplay');
                            }

                            if ( direction === 'up') {

                                // console.log('pause');

                                // Pause this carousel
                                $this.children('.gallery__wrap').trigger('stop.owl.autoplay');
                            }
                        },
                        offset: '100%'
                    });

                }

                else {

                    $this.addClass('gallery--grid');

                    // Use masonry layout
                    $this.children('.gallery__wrap').masonry({
                        itemSelector: '.gallery__item',
                        transitionDuration: 0
                    });

                    // Init fluidbox
                    $this.find('.gallery__item__link').fluidbox({
                        loader: true
                    });

                }

                // Show gallery once initialized
                $this.addClass('gallery--on');
            });

        });



        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

        $('.single picture, .single p > img ').each( function() {
            var thisP = $(this).parent('p');
            $(this).insertAfter(thisP);
            $(this).wrapAll('<div class="image-wrap"></div>');
            thisP.remove();
        });



        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

        // For each iframe
        $('.single iframe').each( function() {

            // If it's YouTube or Vimeo
            if ( $(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0 ) {

                var width = $(this).attr('width');
                var height = $(this).attr('height');
                var ratio = (height/width)*100;

                // Wrap in video container
                $(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');

            }

        });



        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

        $('.single table').each(function () {
            $(this).wrapAll('<div class="table-wrap"></div>');
        });

    }

    // Run functions on load
    pageFunctions();


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

    $(document).on('click', '.js-menu-toggle', function (){

        // If already open
        if ( $('body').hasClass('menu--open') ) {
            $('body').removeClass('menu--open');
        }

        // If not open
        else {
            $('body').addClass('menu--open');
        }
    });

    $(document).on('click', '.menu__list__item__link', function (){

        // If menu is open when you click a link on mobile
        if ( $('.menu').hasClass('menu--open') ) {
            $('.menu').removeClass('menu--open');
        }
    });

}(jQuery));
