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

    // Features
    const activeFeatureItem = document.querySelector('.feature-text-item.active')
    const activeFeatureItemBody = activeFeatureItem && activeFeatureItem.querySelector('.feature-text-item-body')
    const activeFeatureImage = activeFeatureItem && document.querySelector(activeFeatureItem.getAttribute('data-target'))
    slideDown(activeFeatureItemBody)
    slideDown(activeFeatureImage)

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
    let referencesSwiper = new Swiper(".referencesSwiper", {
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
                spaceBetween: 16,
                slidesPerView: "auto",
                pagination: false,
                navigation: false,
                preloadImages: false,
                lazy: {
                    enabled: true,
                    loadPrevNext: true,
                    loadPrevNextAmount: 2
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                    delay: 2000,
                },
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // Swiper JS - Testimonials
    let testimonialsSwiper = new Swiper(".testimonialsSwiper", {
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
                spaceBetween: 16,
                slidesPerView: "auto",
                pagination: false,
                navigation: false,
                preloadImages: false,
                lazy: {
                    enabled: true,
                    loadPrevNext: true,
                    loadPrevNextAmount: 2
                },
                autoplay: {
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                    delay: 2000,
                },
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });

    // Swiper JS - Roadmap
    let roadmapSwiper = new Swiper(".roadmapSwiper", {
        spaceBetween: 12,
        resistanceRatio: 0,
        initialSlide: 2,
        navigation: {
            nextEl: ".roadmap-wrapper .swiper-btn-next",
            prevEl: ".roadmap-wrapper .swiper-btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: "auto",
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 6,
            }
        }
    });

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
