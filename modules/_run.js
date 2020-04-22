/***
 * 
 * @runJs
 * This is a good practice, In order to use a big library for
 * a simple or faster project instead of using _underscore.js/ lodash.js
 * we can use this runJs
 * 
 * @type simple_library
 * @why you don't need to use it, make your own
 * @author Md Tahazzot
 * @date april 15, 2020
 * @version 2.1.0
 * 
 */

let

    root = window || this || globalThis;


/**
 * 
 * @creating_runJS
 */
(function (global, factory) {

    /**
     * 
     * @check
     * if the factory is a function the run it
     */
    if (typeof factory === 'function' && typeof global.__run === 'undefined')
        global.__run = factory(global);

}(root, function (global) {

    /**
     * 
     * @initialize
     * we need some components to speed up our progress
     * something like version, isFunction, isString etc
     */

    let version = '2.0.0';

    let elms = [];

    let arr = [];

    let obj = {};

    let isFunction = function (arg) {
        return typeof arg === 'function';
    }

    let isString = function (arg) {
        return typeof arg === 'string';
    }

    let isBoolean = function (arg) {
        return typeof arg === 'boolean';
    }

    let nodeListToArray = function (arg) {
        if (!arg instanceof NodeList)
            throw new Error('Arguments must should be a NodeList!');

        arr = [];
        [].forEach.call(arg, function (elm) {
            arr.push(elm);
        });

        return arr;
    }

    let getNodeList = function (selector) {

        if (selector === document) {
            return document;
        } else if (selector === window) {
            return window;
        }

        if (selector instanceof NodeList) {
            elms = nodeListToArray(selector);
        }

        if (isString(selector)) {
            try {
                elmAll = document.querySelectorAll(selector);
            } catch (e) {
                throw new Error('Failed to select the ElementList! Please provide a valid selector.');
            }
            elms = nodeListToArray(elmAll);
        }

        if (typeof selector === 'undefined' || !selector instanceof NodeList)
            elms = [];

        if (typeof selector !== 'undefined' && typeof selector === 'object' && !selector instanceof NodeList)
            throw new Error('Failed to select the ElementList! Please provide a valid selector.');
        if (typeof selector === 'number')

            throw new Error('Number is not a type of selector!');

        return elms;
    }

    /***
     * 
     * @library
     * the main functional object for this library to use it
     * below...
     */
    let
        __run = function (selector) {
            return new __run.init(selector);
        }

    /**
     * 
     * @extend
     * this will help to make a wrap of some code
     * when we will implement the event/ dom ...
     */
    let
        init = __run.init = function (selector) {
            elms = getNodeList(selector);
            return this;
        };

    __run.fn = init.prototype = __run.prototype;
    __run.extend = function (arg) {
        if (!arg instanceof Object)
            return false;
        for (key in arg) {
            __run.fn[key] = arg[key];
        }
    }

    /***
     * 
     * @DOM
     * DOM manupulation.
     */
    let
        DOM = {
            addClass: function (string) {
                if (!isString(string))
                    throw new Error('Arguments should be a string!');

                [].forEach.call(elms, function (elm) {
                    let
                        getClassName = elm.className,
                        access = getClassName.indexOf(string) >= 0;
                    //attach if the class name is not exist...
                    //prevent attaching the same class
                    if (!access) {
                        let
                            newClass = elm.className.replace(/ +(?= )/g, '');
                        elm.className += ' ' + string;
                    }
                });

                return this;
            },

            removeClass: function (string) {
                if (!isString(string))
                    return false;

                [].forEach.call(elms, function (elm) {
                    elm.className = createNewClass(elm.className, string);

                    function createNewClass(elmClassList, className) {
                        if (elmClassList.indexOf(className) < 0)
                            return elmClassList.replace(/ +(?= )/g, '');
                        let
                            tmp = elmClassList.split(" "),
                            create = '';
                        [].forEach.call(tmp, function (single) {
                            if (single !== className)
                                create += " " + single
                        });
                        create = create.replace(/ +(?= )/g, '').trim();
                        return create;
                    }
                });

                return this;
            },

            toggleClass: function (string) {
                let
                    isTrue = false;

                if (!isString(string))
                    return false;

                [].forEach.call(elms, function (elm) {
                    if (elm.className.indexOf(string) >= 0)
                        isTrue = true;
                });

                if (isTrue) {
                    __run.fn.removeClass(string)
                } else {
                    __run.fn.addClass(string)
                }

                return this;
            },

            hasClass: function (string) {
                let
                    isTrue = false;

                if (!isString(string))
                    return false;

                [].forEach.call(elms, function (elm) {
                    if (elm.className.indexOf(string) >= 0)
                        isTrue = true;
                });

                return isTrue;
            },

            html: function (htmlContent) {
                if (htmlContent !== undefined) {
                    [].forEach.call(elms, function (elm) {
                        elm.innerHTML = htmlContent;
                    })

                    return this;
                }

                if (isElement(elms[0]))
                    return elms[0].innerHTML
            },

            text: function (textContent) {
                if (textContent !== undefined) {
                    [].forEach.call(elms, function (elm) {
                        elm.innerText = textContent;
                    })

                    return this;
                }
                if (isElement(elms[0]))
                    return elms[0].innerText
            },

            attr: function (attrName, attrValue) {
                if (attrName !== undefined && attrValue !== undefined) {
                    if (!isString(attrName))
                        throw new Error('attribute name should be a string sprimitve value');

                    if (isBoolean(attrValue) || isString(attrValue)) {
                        [].forEach.call(elms, function (elm) {
                            elm.setAttribute(attrName, attrValue);
                        });
                        return this;
                    }
                }
                if (isElement(elms[0]) && attrName !== undefined)
                    return elms[0].getAttribute(attrName)

                return this;
            },

            elm: function () {
                return elms;
            }
        }

    __run.extend(DOM);


    /***
     * 
     * @EVNETS
     */
    let
        EventName = "blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu",

        /**
         * @event
         * Object for all event handler for this project
         */
        Event = {
            on: function (event, elms, func) {
                if (typeof elms === 'undefined')
                    throw new Error('An elements should be assign in here.');

                elms = getNodeList(elms);
                switch (elms) {
                    case global || window:
                        processEvent(event, window, func);
                        break;

                    case document:
                        processEvent(event, document, func);
                        break;

                    default:
                        [].forEach.call(elms, function (elm) {
                            processEvent(event, elm, func)
                        });
                }

                function processEvent(event, elm, func) {
                    if (elm.addEventListener)
                        elm.addEventListener(event, func)
                }
            },
        };

    //default listener without on()
    [].forEach.call(EventName.split(" "), function (event) {
        Event[event] = function (func) {
            switch (elms) {
                case global || window:
                    processEvent(event, window, func);
                    break;

                case document:
                    processEvent(event, document, func);
                    break;

                default:
                    [].forEach.call(elms, function (elm) {
                        processEvent(event, elm, func)
                    });
            }

            function processEvent(event, elm, func) {
                if (elm.addEventListener)
                    elm.addEventListener(event, func)
            }
        }
    });

    //append it to the runJs
    __run.extend(Event);


    /***
     * 
     * @important rules
     */
    __run.extend({
        select() {
            return elms;
        }
    })

    /***
     * 
     * @return __RUN
     */
    return __run;

}));