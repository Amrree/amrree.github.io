(function ($) {
  "use strict";
  /*=================================
      JS Index End
    ==================================*/
    //Mobile Menu
    $("#default_menu").slicknav({
      allowParentLinks: true,
      prependTo: '#defaultmobile',
      label: 'Menu',
  });

  var sf = $('#default_menu').superfish({
      delay: 500, // one second delay on mouseout
      animation: { opacity: 'show', height: 'show' }, // fade-in and slide-down animation
      speed: 'fast', // faster animation speed
  });
  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.mobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".menu-toggle",
        bodyToggleClass: "body-visible",
        subMenuClass: "submenu-class",
        subMenuParent: "submenu-item-has-children",
        subMenuParentToggle: "active-class",
        meanExpandClass: "mean-expand-class",
        appendElement: '<span class="mean-expand-class"></span>',
        subMenuToggleClass: "menu-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".mobile-menu-wrapper").mobilemenu();


  /*---------- 04. Sticky fix ----------*/
  $(window).on("scroll", function () {
    var topPos = $(this).scrollTop();
    if (topPos > 500) {
      $('.sticky-wrapper').addClass('sticky');
    } else {
      $('.sticky-wrapper').removeClass('sticky')
    }
  })

  /*---------- 04. Sticky fix ----------*/
  $(window).on("scroll", function () {
    var topPos = $(this).scrollTop();
    if (topPos > 920) {
      $('.sticky-wrapper2').addClass('sticky');
    } else {
      $('.sticky-wrapper2').removeClass('sticky')
    }
  })
  function initializeToggles() {
    $(".canva-open").off('click').on("click", function (e) {
      e.preventDefault();
      $(".canva-wrapper").toggleClass("active");
      $("body").toggleClass("locked");

      // Close the canvas with a timeout for animation
      if (!$(".canva-wrapper").hasClass("active")) {
        setTimeout(function () {
          $(".canva-wrapper .overlay-canva.canva-open").css("opacity", 0); // Set opacity to 0 on close
        }, 400); // Match this duration to your CSS transition duration
      } else {
        $(".canva-wrapper .overlay-canva.canva-open").css("opacity", 0.8); // Set opacity to 0.8 on open
      }
    });
  }

  // Initialize on normal page load
  $(document).ready(function () {
    initializeToggles();
  });

  // Re-initialize in Elementor editor mode when widgets are rendered
  $(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/global', initializeToggles);
  });

  function popupSearchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).off("click").on("click", function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
      e.stopPropagation();
    });

    $($searchBox).off("click").on("click", function (e) {
      e.stopPropagation();
    });

    $($searchBox).find("form").off("click").on("click", function (e) {
      e.stopPropagation();
    });

    $($searchCls).off("click").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });

    $(document).off("click").on("click", function () {
      $($searchBox).removeClass($toggleCls);
    });
  }

  // Initialize on normal page load
  $(document).ready(function () {
    popupSearchBox(".popup-search-box", ".searchBoxToggler", ".searchClose", "show");
  });

  // Re-initialize in Elementor editor mode when widgets are rendered
  $(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/global', function () {
      popupSearchBox(".popup-search-box", ".searchBoxToggler", ".searchClose", "show");
    });
  });

  /*============================
      Bottom To Top
      =============================*/
  const toTop = document.querySelector(".to-top");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      toTop.classList.add("active");
    } else {
      toTop.classList.remove("active");
    }
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  /*============================
      Video play Magnific Popup
      ============================*/
  $(document).ready(function () {
    $('.video-button').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  });

  $(document).ready(function () {
    var swiper = new Swiper(".woo-product-shop-swiper", {
      spaceBetween: 10,
      slidesPerView: 6,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var swiper2 = new Swiper(".woo-product-shop-swiper2", {
      spaceBetween: 10,
      centeredSlides: true,
      pagination: {
        clickable: false,
      },
      thumbs: {
        swiper: swiper,
      },
    });
  });


  $(document).ready(function () {
    // Initialize Magnific Popup on elements with class 'image-popup-vertical-fit'
    $('.image-popup-vertical-fit').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',

      // Enable gallery mode
      gallery: {
        enabled: true
      },

      // Enable zoom effect
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        // Define the element that will trigger the zoom effect
        opener: function (openerElement) {
          // If the openerElement is an image, return it; otherwise, find an image within it
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  var swiper = new Swiper(".post-gallery-slider", {
    loop: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".post-gallery-slider .swiper-button-next",
      prevEl: ".post-gallery-slider .swiper-button-prev",
    },
  });

  $(window).on("load", function () {
    if ($(".theme-preloader-wrapper").length) {
      $(".theme-preloader-wrapper").fadeOut();
    }
  });

})(jQuery);

