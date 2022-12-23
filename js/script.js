(function () {
    // Lazy Load
    lazyload()

    // Modal
    const btnsShowModal = document.querySelectorAll('.btn-show-modal')
    btnsShowModal && Array.from(btnsShowModal).forEach(btnShowModal => {
        btnShowModal.addEventListener('click', () => {
            let targetModalId = btnShowModal.getAttribute('data-target')
            document.querySelector(targetModalId).classList.add('show')
            document.body.classList.add('overflow-hidden')
        })
    });

    const btnsCloseModal = document.querySelectorAll('.btn-close-modal')
    btnsCloseModal && Array.from(btnsCloseModal).forEach(btnCloseModal => {
        btnCloseModal.addEventListener('click', () => {
            btnCloseModal.closest('.modal').classList.remove('show')
            document.body.classList.remove('overflow-hidden')
        })
    });

    // Fixed header
    let scrollUp = "scroll-up";
    let scrollDown = "scroll-down";
    let body = document.body;
    let html = document.querySelector('html');
    let headerHeight = document.querySelector('.header').offsetHeight;
    let lastScroll = 0;

    let currentScroll = window.pageYOffset;
    if (currentScroll >= headerHeight) {
        body.classList.add(scrollUp);
    }

    window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset;
        if (currentScroll <= headerHeight) {
            body.classList.remove(scrollUp);
            return
        }

        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
            body.classList.remove(scrollUp);
            body.classList.add(scrollDown);
        } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
            body.classList.remove(scrollDown);
            body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
    });

    // Mobile menu
    let menuOpenBtn = document.getElementById('btn-mobile-menu-show')
    let menuCloseBtn = document.getElementById('btn-mobile-menu-close')
    let mobileMenu = document.querySelector('.mobile-menu')
    let mobileMenuContent = document.querySelector('.mobile-menu-content')

    menuOpenBtn && menuOpenBtn.addEventListener('click', () => {
        mobileMenu.classList.add('show')
        body.classList.add('overflow-hidden')
        html.style.overflow = "hidden";
    });

    menuCloseBtn && menuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('show')
        body.classList.remove('overflow-hidden')
        html.style.overflow = "auto";
    });

    mobileMenu && mobileMenu.addEventListener('click', (e) => {
        if (!mobileMenuContent.contains(e.target)) {
            mobileMenu.classList.remove('show')
            html.style.overflow = "auto";
            body.classList.remove('overflow-hidden')
        }
    })

    const mobileMenuItems = document.querySelectorAll('.header-menu.mobile>ul>li')
    mobileMenuItems && Array.from(mobileMenuItems).forEach(mobileMenuItem => {
        mobileMenuItem.addEventListener('click', () => {
            const mobileMenuDropdown = mobileMenuItem.querySelector('.header-menu-dropdown')
            const activeMobileMenuItem = document.querySelector('.header-menu.mobile>ul>li.active')
            const activeMobileMenuDropdown = activeMobileMenuItem && activeMobileMenuItem.querySelector('.header-menu-dropdown')

            if (mobileMenuItem.classList.contains('active')) {
                mobileMenuItem.classList.remove('active')
                slideUp(mobileMenuDropdown)
            } else {
                activeMobileMenuItem && activeMobileMenuItem.classList.remove('active')
                activeMobileMenuDropdown && slideUp(activeMobileMenuDropdown)
                mobileMenuItem.classList.add('active')
                slideDown(mobileMenuDropdown)
            }

        })
    });

    // Features
    const activeFeatureItem = document.querySelector('.feature-text-item.active')
    const activeFeatureItemBody = activeFeatureItem && activeFeatureItem.querySelector('.feature-text-item-body')
    const activeFeatureImage = activeFeatureItem && document.querySelector(activeFeatureItem.getAttribute('data-target'))
    activeFeatureItemBody && slideDown(activeFeatureItemBody)
    activeFeatureImage && slideDown(activeFeatureImage)

    const featureItems = document.querySelectorAll('.feature-text-item')
    featureItems && Array.from(featureItems).forEach(featureItem => {

        featureItem.addEventListener('click', () => {
            const featureItemBody = featureItem && featureItem.querySelector('.feature-text-item-body')

            const activeFeatureItem = document.querySelector('.feature-text-item.active')
            const activeFeatureItemBody = activeFeatureItem && activeFeatureItem.querySelector('.feature-text-item-body')

            const featureImage = document.querySelector(featureItem.getAttribute('data-target'))
            const activeFeatureImage = document.querySelector(activeFeatureItem.getAttribute('data-target'))

            if (!featureItem.classList.contains('active')) {
                activeFeatureItem.classList.remove('active')
                slideUp(activeFeatureImage)
                slideUp(activeFeatureItemBody)

                featureItem.classList.add('active')
                slideDown(featureItemBody)
                slideDown(featureImage)
            }

        })
    });

    // Interfaces Tabs
    const activeTabBtn = document.querySelector(".btn-tab.active")
    const activeTabItem = activeTabBtn && document.querySelector(activeTabBtn.getAttribute('data-target'))
    activeTabItem && activeTabItem.classList.add('active')

    const tabs = Array.from(document.querySelectorAll('.btn-tab'));
    tabs && tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            if (!tab.classList.contains("active")) {
                const activeTabBtn = document.querySelector(".btn-tab.active")
                const activeTabItem = document.querySelector(activeTabBtn.getAttribute('data-target'))
                const tabItem = document.querySelector(tab.getAttribute('data-target'))

                activeTabBtn && activeTabBtn.classList.remove('active')
                activeTabItem && activeTabItem.classList.remove('active')

                tab.classList.add("active")
                tabItem && tabItem.classList.add('active')

            }
        });
    });

    // Site languages
    const siteLangs = document.querySelector('.site-langs')
    const selectedLang = document.querySelector('.selected-lang')
    selectedLang && selectedLang.addEventListener('click', () => {
        siteLangs.classList.toggle('active')
    })

    // Document click
    document.addEventListener('click', (e) => {
        if (siteLangs && !siteLangs.contains(e.target)) {
            siteLangs.classList.remove('active');
        }
    });

    // Swiper JS - References
    const referencesSwiper = new Swiper(".referencesSwiper", {
        spaceBetween: 32,
        lazy: true,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 2000,
        },
        navigation: {
            nextEl: ".references-wrapper .swiper-btn-next",
            prevEl: ".references-wrapper .swiper-btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: "auto",
                spaceBetween: 24,
                navigation: false,
                preloadImages: false,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                lazy: {
                    enabled: true,
                    loadPrevNext: true,
                    loadPrevNextAmount: 3
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                    delay: 2000,
                },
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });

    // Swiper JS - Testimonials
    const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
        spaceBetween: 32,
        lazy: true,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 2000,
        },
        navigation: {
            nextEl: ".testimonials-wrapper .swiper-btn-next",
            prevEl: ".testimonials-wrapper .swiper-btn-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            0: {
                slidesPerView: "auto",
                spaceBetween: 24,
                navigation: false,
                preloadImages: false,
                lazy: {
                    enabled: true,
                    loadPrevNext: true,
                    loadPrevNextAmount: 3
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                    delay: 2000,
                },
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });

    const swiperBreakpoints = {
        0: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 6,
        }
    }

    // Swiper JS - Roadmap
    const roadmapSwiper = new Swiper(".roadmapSwiper", {
        spaceBetween: 12,
        resistanceRatio: 0,
        navigation: {
            nextEl: ".roadmap-wrapper .swiper-btn-next",
            prevEl: ".roadmap-wrapper .swiper-btn-prev",
        },
        breakpoints: swiperBreakpoints
    });

    const currenRoadmapItem = document.querySelector('.roadmapSwiper .swiper-slide.current')
    const currenRoadmapItemIndex = currenRoadmapItem && currenRoadmapItem.getAttribute('data-index')
    currenRoadmapItemIndex && roadmapSwiper.slideTo(currenRoadmapItemIndex - (swiperBreakpoints[roadmapSwiper.currentBreakpoint].slidesPerView - 2) / 2)

    // Features isotope
    // quick search regex
    let qsRegex;

    // init isotope
    const elem = document.querySelector('.isotope-grid');
    const iso = new Isotope(elem, {
        itemSelector: '.isotope-grid-item',
        layoutMode: 'fitRows',
        fitRows: {
            equalheight: true
        },
    });

    // filter functions
    let filterFns = {
        // search via text content
        search: function (elem) {
            return qsRegex ? elem.querySelector('.addons-item-body').textContent.match(qsRegex) : true
        }
    };

    // bind filter button click
    let filtersBtns = Array.from(document.querySelectorAll('.filters-button-group button'))
    filtersBtns && filtersBtns.forEach((filtersBtn) => {
        filtersBtn.addEventListener('click', () => {
            if (!filtersBtn.classList.contains('primary')) {
                document.querySelector('.filters-button-group button.primary').classList.remove('primary')
                filtersBtn.classList.add('primary')
                let filterValue = filtersBtn.getAttribute('data-filter')
                quicksearchInput.value = ""
                quicksearchInput.closest('.search').classList.remove('active')
                iso.arrange({ filter: filterValue })
            }
        });
    })

    // use value of search field to filter
    let quicksearchInput = document.querySelector('.quicksearch')
    let quicksearch = debounce(function () {
        qsRegex = new RegExp(quicksearchInput.value, 'gi')
        iso.arrange({ filter: filterFns.search })
    }, 200)
    quicksearchInput && quicksearchInput.addEventListener('keyup', () => {
        if (quicksearchInput.value) {
            quicksearchInput.closest('.search').classList.add('active')
        }
        else {
            quicksearchInput.closest('.search').classList.remove('active')
        }
        document.querySelector('.filters-button-group button.primary').classList.remove('primary')
        document.querySelector('.filters-button-group button[data-filter="*"]').classList.add('primary')
        quicksearch()
    })

    // Clear isotope search
    const btnClearFilter = document.querySelector('.clear-filter')
    btnClearFilter && btnClearFilter.addEventListener('click', () => {
        let activeFilterValue = document.querySelector('.filters-button-group button.primary').getAttribute('data-filter')
        quicksearchInput.value = ""
        quicksearchInput.closest('.search').classList.remove('active')
        iso.arrange({ filter: activeFilterValue })
    })

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        let timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            let args = arguments;
            let _this = this;
            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }

    // Function lazyload
    function lazyload() {

        if ("IntersectionObserver" in window) {
            let lazyImgObserver = new IntersectionObserver(
                (entries, lazyImgObserver) => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0.0) {
                            img = entry.target;
                            if (!img.hasAttribute('src')) {
                                img.setAttribute('src', img.dataset.src);
                                img.classList.remove('lazyload')
                            }
                        }
                    });
                }
            );

            let lazyImages = document.querySelectorAll('.lazyload');
            for (let img of lazyImages) {
                lazyImgObserver.observe(img);
            }

            // Lazy load video
            let lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (video) {
                    if (video.isIntersecting) {
                        for (let source in video.target.children) {
                            let videoSource = video.target.children[source];

                            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE" && !videoSource.hasAttribute('src')) {
                                videoSource.src = videoSource.dataset.src;
                            }
                        }

                        video.target.load();
                        video.target.classList.remove("lazyload");
                        lazyVideoObserver.unobserve(video.target);
                    }
                });
            });

            let lazyVideos = document.querySelectorAll("video");
            for (let lazyVideo of lazyVideos) {
                lazyVideoObserver.observe(lazyVideo);
            }
        }
    }

    // Function - Slide up
    function slideUp(target, duration = 200) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }

    // Function - Slide down
    function slideDown(target, duration = 200) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if (display === 'none') {
            display = 'block';
        }

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }

    // Function - Slide toggle
    function slideToggle(target, duration = 200) {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }

})()
