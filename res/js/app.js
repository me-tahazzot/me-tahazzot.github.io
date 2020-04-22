/***
 * 
 * @app
 * @author Md Tahazzot
 * @date april 18, 2020
 * 
 * @dependences without any dependency, pure javascript code for
 * this to make more simple not simpler...
 * 
 * @file JS
 * The main file for this website UI/UX effect or
 * events..
 * :: DO NOT CHANGE ANYTHING :: 
 * 
 */

!(function (global, factory) {

    /***
     * 
     * @check the factory if function then call it else not
     */
    if (typeof factory === 'function')
        factory(global)

}(this || window || gloablThis, function (global) {


    /**
     * 
     * @initialize
     */
    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }


    function msieversion() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
        {
            alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        } else // If another browser, return 0
        {
            alert('otherbrowser');
        }
        return false;
    }


    /**
     * @making custom elements
     */
    let

        createNewElement = function () {
            // Or use an anonymous class if you don't want a named constructor in current scope.
            this.appView();
            this.backgroundView();
        }


    //create a inheritance
    let
        createElm_fn = createNewElement.prototype;

    /**
     * 
     * @create_elm
     * @elm app-view
     */
    createElm_fn.appView = function () {
        class app extends HTMLElement {

            constructor() {
                //call the father first :)
                super();
                this.process();
            }

            process() {
                let

                    style = document.createElement('style'),
                    app = __run('app-view').select(),
                    access = true;


                //check if the app-view is already exist...
                if (app.length > 1)
                    access = false

                if (!access) {
                    document.head.textContent = '';
                    document.body.style.backgroundColor = 'red';
                    throw new Error('Duplicate app-view found!');
                }

                //assign value...
                this.className = 'app-view';
                this.id = 'app';
                this.setAttribute('data-type', 'application base root');
                style.textContent =
                    "\n app-view{ display: block; } \n";

                //append app-view default style
                document.head.appendChild(style)
            }
        }

        //declare as a elm :)
        customElements.define('app-view', app);
    }

    createElm_fn.backgroundView = function () {
        class backgroundView extends HTMLElement {
            constructor() {
                super();
                this.process();
            }

            process() {
                this.style.display = 'block';
            }
        }

        //now register this elm...
        customElements.define('background-view', backgroundView)
    }


    let

        UI = function () {
            this.landingBG();
            this.Typing();
            this.navbar();
            this.flyPng();
            this.sliderReview();
            this.counterUp();
            this.navbarToggler();
        }

    UI.prototype.landingBG = function () {
        let

            target = __run('.landing-background').select()

        if (detectMob()) {
            target[0].querySelector('img').src = 'data:image/svg+xml;base64,' + data['mobile-landsvg']
            return false
        }

        target[0].querySelector('img').src = 'data:image/svg+xml;base64,' + data['desktop-landsvg']
        return false
    }


    UI.prototype.Typing = function () {
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            this.el.innerHTML = '<span class="display-typewrite">' + this.txt + '</span>';
            var that = this;
            var delta = 200 - Math.random() * 100;
            if (this.isDeleting) {
                delta /= 2;
            }
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .display-typewrite { border-right: 0.08em solid #007bff}";
            document.body.appendChild(css);
        };
    }

    UI.prototype.navbar = function () {
        let

            offset = false;

        __run(window).scroll(function () {
            offset = this.pageYOffset;


            if (offset > 65) {
                __run('.navigation-top').addClass('fixed');
            } else {
                __run('.navigation-top').removeClass('fixed');
            }


        });

        offset = window.pageYOffset;

        if (offset > 65) {
            __run('.navigation-top').addClass('fixed');
        } else {
            __run('.navigation-top').removeClass('fixed');
        }

    }

    UI.prototype.flyPng = function () {
        __run(window).scroll(function () {
            let
                flyFive = __run('.fly-five'),
                offset = flyFive.select()[0].offsetTop;

            if (global.pageYOffset + window.innerHeight >= offset) {
                flyFive.addClass('flying')
            } else {
                flyFive.removeClass('flying')
            }
        });
    }

    UI.prototype.sliderReview = function () {
        var swiper = new Swiper('.swiper-container', {
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },

                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }
            }
        });
    }

    UI.prototype.counterUp = function () {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }

    UI.prototype.navbarToggler = function () {
        __run('.navbar-toggler').click(function (e) {
            e.stopPropagation();
            __run('.navbar-list').toggleClass('active');
            __run('.navigation-top').toggleClass('active');
        });

        __run(document).click(function () {
            __run('.navbar-list').removeClass('active');
            __run('.navigation-top').removeClass('active');
        });

        __run('.navbar-list').click(function (e) {
            e.stopPropagation();
        });

        __run('.navigation-top').click(function (e) {
            e.stopPropagation();
        })
    }

    /**
     * 
     * @initialize 
     * call all the constructor/ Objects
     * then make a call.. ;)
     */
    let
        app = function () {
            new createNewElement()
            new UI();
        }


    //init the application... :)
    new app();

}));