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

    // Swiper JS - References
    const caseStudySwiper = new Swiper(".caseStudySwiper", {
        spaceBetween: 32,
        lazy: true,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 2000,
        },
        navigation: {
            nextEl: ".case-study-wrapper .swiper-btn-next",
            prevEl: ".case-study-wrapper .swiper-btn-prev",
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
            991: {
                slidesPerView: 2,
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

    // Features - price countdown
    if (document.querySelector(".price-countdown")) {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let endDate = "Jan, 2023 15:17:00",
            countDown = new Date(endDate).getTime(),
            x = setInterval(function () {
                let now = new Date().getTime(),
                    distance = countDown - now;

                if (distance > 0) {
                    document.getElementById("days").innerText = Math.floor(distance / day)
                    document.getElementById("hours").innerText = Math.floor((distance % day) / hour)
                    document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute)
                    document.getElementById("seconds").innerText = Math.floor((distance % minute) / second)
                }
                else {
                    document.getElementById("days").innerText = "0";
                    document.getElementById("hours").innerText = "0";
                    document.getElementById("minutes").innerText = "0";
                    document.getElementById("seconds").innerText = "0";
                    clearInterval(x);
                }
            }, 0);
    }

    // FAQ - accordion
    let activeAccordionBody = document.querySelector(".faq-item.active .faq-item-body")
    activeAccordionBody && slideDown(activeAccordionBody)

    let accordionItems = Array.from(document.querySelectorAll('.faq-item'));
    accordionItems && accordionItems.forEach((accordionItem) => {
        accordionItem.querySelector(".faq-item-header").addEventListener('click', () => {
            let activeAccordionItem = document.querySelector(".faq-item.active");
            let accordionBody = accordionItem.querySelector(".faq-item-body");
            let activeAccordionBody = activeAccordionItem && activeAccordionItem.querySelector(".faq-item-body");

            if (accordionItem.classList.contains("active")) {
                accordionItem.classList.remove("active")
                slideUp(accordionBody)
            } else {
                if (activeAccordionItem) {
                    activeAccordionItem.classList.remove("active")
                    slideUp(activeAccordionBody)
                }
                accordionItem.classList.add("active")
                slideDown(accordionBody)
            }
        })
    })

    // Pricing feature list
    const activeFeatureListHeader = document.querySelector('.pricing-feature-list-item-header.active')
    activeFeatureListHeader && slideDown(activeFeatureListHeader.nextElementSibling)
    let featureListHeaders = Array.from(document.querySelectorAll('.pricing-feature-list-item-header'));
    featureListHeaders && featureListHeaders.forEach((featureListHeader) => {
        featureListHeader.addEventListener('click', () => {
            let featureListBody = featureListHeader.nextElementSibling
            featureListHeader.classList.toggle('active')
            slideToggle(featureListBody)
        })
    })

    // Features isotope
    // quick search regex
    let qsRegex;

    // init isotope
    const elem = document.querySelector('.isotope-grid');
    const iso = elem && new Isotope(elem, {
        itemSelector: '.isotope-grid-item',
        layoutMode: 'fitRows',
        fitRows: {
            equalheight: true
        },
        filter: function (elem) {
            let searchResult = qsRegex ? elem.querySelector('.addons-item-body').textContent.match(qsRegex) : true
            let buttonResult = buttonFilter ? elem.matches(buttonFilter) : true;
            return searchResult && buttonResult
        }
    });

    // store filter for each group
    var buttonFilters = {};
    var buttonFilter;

    // filter functions
    let filterFns = {
        // search via text content
        search: function (elem) {
            let searchResult = qsRegex ? elem.querySelector('.addons-item-body').textContent.match(qsRegex) : true
            let buttonResult = buttonFilter ? elem.matches(buttonFilter) : true;
            return searchResult && buttonResult
        }
    };

    // bind filter button click
    let filtersBtns = Array.from(document.querySelectorAll('.filters-button-group button'))
    filtersBtns && filtersBtns.forEach((filtersBtn) => {
        filtersBtn.addEventListener('click', () => {
            if (!filtersBtn.classList.contains('primary')) {
                document.querySelector('.filters-button-group button.primary').classList.remove('primary')
                filtersBtn.classList.add('primary')
                let filterGroup = filtersBtn.closest('.filters-button-group').getAttribute('data-filter-group')
                buttonFilters[filterGroup] = filtersBtn.getAttribute('data-filter')
                buttonFilter = concatValues(buttonFilters);
                iso.arrange()
            }
        });
    })

    // use value of search field to filter
    let quicksearchInput = document.querySelector('.quicksearch')
    let quicksearch = debounce(function () {
        qsRegex = new RegExp(quicksearchInput.value, 'gi')
        iso.arrange()
    }, 200)
    quicksearchInput && quicksearchInput.addEventListener('keyup', () => {
        if (quicksearchInput.value) {
            quicksearchInput.closest('.search').classList.add('active')
        }
        else {
            quicksearchInput.closest('.search').classList.remove('active')
        }
        quicksearch()
    })

    // Clear isotope search
    const btnClearFilter = document.querySelector('.clear-filter')
    btnClearFilter && btnClearFilter.addEventListener('click', () => {
        quicksearchInput.value = ""
        quicksearchInput.closest('.search').classList.remove('active')
        qsRegex = null
        iso.arrange()
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

    // flatten object by concatting values
    function concatValues(obj) {
        var value = '';
        for (var prop in obj) {
            value += obj[prop];
        }
        return value;
    }

    // Image comparison slider
    const sliderWrapper = document.querySelector(".how-it-works-wrapper");
    const slider = document.querySelector("#image-comparison-slider");
    const sliderImgWrapper = document.querySelector("#image-comparison-slider .img-wrapper");
    const sliderHandle = document.querySelector("#image-comparison-slider .handle");

    const sliderItemBefore = document.querySelector(".how-it-works-box.before");
    const sliderItemAfter = document.querySelector(".how-it-works-box.after");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slider.classList.add('move-animation');
                return;
            }
            // slider.classList.remove('move-animation');
        });
    });

    sliderWrapper.addEventListener('animationend', () => {
        sliderWrapper.addEventListener("mousemove", sliderMouseMove);
        sliderWrapper.addEventListener("mouseleave", sliderMouseLeave);
    });

    observer.observe(sliderWrapper);
    function sliderMouseMove(e) {
        if (window.matchMedia('(min-width: 992px)').matches) {
            const sliderLeftX = slider.offsetLeft;
            const sliderWidth = slider.clientWidth;

            let mouseX = e.clientX - sliderLeftX;

            if (mouseX < 0)
                mouseX = 0;
            else if (mouseX > sliderWidth)
                mouseX = sliderWidth;

            // mouse sliderin merkezinden nece px hereket edib
            let diff = Math.abs(sliderWidth / 2 - mouseX)

            // hansi nisbetde boyumesini isteyirik
            let scaleRatio = 1 + diff / sliderWidth / 2

            // hansi nisbetde translate edirik
            let translateRatio = sliderWidth * scaleRatio - sliderWidth

            // slideri teyin etdiyimiz nisbetde boyuduruk
            slider.style.transform = `scale(${(scaleRatio).toFixed(2)})`;

            // mouse-un mərkəzdən solda və ya sağda olduğunu tapıb ona uyğun slideri translate edirik
            if (sliderWidth / 2 - mouseX < 0) {
                slider.style.transform += `translateX(${(translateRatio).toFixed(2)}px)`;
                sliderItemAfter.style.transform = `scale(${(1 - diff / sliderWidth / 2).toFixed(2)})`;
                sliderItemAfter.style.opacity = `${(1 - mouseX / sliderWidth).toFixed(2)}`
                sliderItemBefore.style.opacity = "1";
            }
            else {
                slider.style.transform += `translateX(${(translateRatio * -1).toFixed(2)}px)`;
                sliderItemBefore.style.transform = `scale(${(1 - diff / sliderWidth / 2).toFixed(2)})`;
                sliderItemBefore.style.opacity = `${(mouseX / sliderWidth).toFixed(2)}`
                sliderItemAfter.style.opacity = "1";
            }

            let rec = slider.getBoundingClientRect()
            let dynamicMouseX = e.clientX - rec.left;

            if (dynamicMouseX < 0)
                dynamicMouseX = 0;
            else if (dynamicMouseX > rec.width)
                dynamicMouseX = rec.width;

            sliderImgWrapper.style.width = `${((1 - dynamicMouseX / rec.width) * 100).toFixed(2)}%`;
            sliderHandle.style.left = `calc(${((dynamicMouseX / rec.width) * 100).toFixed(2)}%`;
        }
    }

    function sliderMouseLeave(e) {
        sliderItemAfter.style.transform = "scale(1)";
        sliderItemAfter.style.opacity = "1";
        sliderItemBefore.style.transform = "scale(1)";
        sliderItemBefore.style.opacity = "1";
        slider.style.transform = "scale(1) translate(0)";
        sliderImgWrapper.style.width = "50%";
        sliderHandle.style.left = "50%"
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
