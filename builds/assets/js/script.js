/* global window, document, navigator */
'use strict';

;(function ($, window, document, undefined) {

    var lastTickTime = 0;

    window.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 5 - (currTime - lastTickTime)),
            id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);

        lastTickTime = currTime + timeToCall;
        return id;
    };

    window.JSMain = (function(){
        var app,
            config,
            save,
            errorLogs,
            $window,
            $body;

        config = {};
        save = {
            firstRun: true,
        };
        errorLogs = [];

        app = {
            env: {},

            setupVars: function setupVars() {

                if ( save.firstRun ) {
                    $window = $(window);
                    $body = $('body');

                    app.env = app.getDevice();
                    $body.addClass( app.getDeviceClass() );

                    save.firstRun = false;

                    app.updateViewport();
                }
            },

            init: function init(components) {
                app.setupVars(components);

                if (typeof components === 'string' && components !== '') {
                    if (app[components + 'Setup']) {
                        app[components + 'Setup']();
                    }
                    if (app[components + 'Init']) {
                        app[components + 'Init']();
                    }
                } else if (Object.prototype.toString.call(components) === '[object Array]') {
                    $.each(components, function (index, component) {
                        if (component !== '') {
                            if (app[component + 'Setup']) {
                                app[component + 'Setup']();
                            }
                            if (app[component + 'Init']) {
                                app[component + 'Init']();
                            }
                        }
                    });
                }
            },

            render: function render(components) {
                $(function() {
                    app.init(components);
                });
            },

            mainInit: function mainInit() {
                var toInit = [];

                app.render(toInit);

                $window.load(function(){
                    console.log('hey!');
                });

                $window.off('.window-resize').on('resize.window-resize',function(){
                    app.windowResizes();
                }).trigger('resize.window-resize');
            },

            // Put here all the window resize bingings
            windowResizes: function windowResizes() {
                app.updateViewport();
            },

            // Browser sniffing
            getDevice : function getDevice() {
                return {
                    isIE8: (navigator.appName.match(/Explorer/i) && navigator.appVersion.match(/MSIE 8/i)) ? true : false,
                    isIE9: (navigator.appName.match(/Explorer/i) && navigator.appVersion.match(/MSIE 9/i)) ? true : false,
                    isIE10: (navigator.appName.match(/Explorer/i) && navigator.appVersion.match(/MSIE 10/i)) ? true : false,
                    isIE11: (navigator.appName.match(/Netscape/i) && navigator.appVersion.match(/rv:11/i)) ? true : false,
                    isWindowsPhone: (navigator.appName.match(/Windows Phone/i)) ? true : false,
                    isIOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false,
                    isIOSiPad: navigator.userAgent.match(/iPad/i) ? true : false,
                    isAndroid: navigator.userAgent.match(/Android/i) ? true : false
                };
            },

            // Returns specific classes for current device
            getDeviceClass : function getDeviceClass() {
                var classes = '';

                if ( app.env.isIE8 ) {
                    classes = 'ie ie8 lt-ie9 lt-ie10 lt-ie11';
                } if ( app.env.isIE9 ) {
                    classes = 'ie ie9 lt-ie10 lt-ie11';
                } else if ( app.env.isIE10 ) {
                    classes = 'ie ie10 lt-ie11';
                } else if ( app.env.isIE11 ) {
                    classes = 'ie ie11';
                } else if ( app.env.isIOS ) {
                    classes = 'mobile ios';
                } else if ( app.env.isAndroid ) {
                    classes = 'mobile android';
                } else if ( app.env.isWindowsPhone ) {
                    classes = 'mobile windows-phone';
                }

                return classes;
            },

            updateViewport : function updateViewport() {
                save.windowWidth    = $window.width();
                save.windowHeight   = $window.height();
                save.isLandscape    = save.windowWidth>save.windowHeight;
                save.isPortrait     = !save.isLandscape;
            },

            // requestAnimationFrame caller
            _requestTick: function (callBack,params) {
                if (!save.ticking) {
                    save.ticking = true;
                    window.requestAnimationFrame(function () {
                        callBack(params);
                    });
                }
            },

            // privates()
            privates: function privates(obj) {
                var publics;
                switch(obj) {
                    case "save":
                        publics = save;
                        break;
                    case "config":
                        publics = config;
                        break;
                    case "error":
                        publics = errorLogs;
                        break;
                    default:
                        publics = app;
                    break;
                }
                return publics;
            },
        };

        return app;
    })();
})( jQuery, window, document );
