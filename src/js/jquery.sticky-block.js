/*
 * stickyBlock: This is make any block floating on your page easily
 * By Max Ulyanov
 * Source: https://github.com/M-Ulyanov/stickyBlock
 * Example ttp://m-ulyanov.github.io/stickyblock/demo/
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if ( jQuery === undefined ) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if ( typeof window !== 'undefined' ) {
          jQuery = require('jquery');
        }
        else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  'use strict';

  var stickyBlocks = {};
  var countId = 0;

  var classes = {
    'fixed': 'sticky-block--fixed',
    'absolute': 'sticky-block--absolute',
    'hidden': 'sticky-block--hidden',
    'show': 'sticky-block--show'
  };

  var methods = {


    /**
     * Main method
     * @param options - Submitted by user options
     * @returns {*} - This object or false
     */
    init: function (options) {

      if ($(this).length === 0) {
        methods.error('Element: ' + $(this).selector + ' not found!');
        return false;
      }

      var self = $(this);
      var defaults = methods.createDefaults(self);
      var currentOptions = $.extend(true, {}, defaults, options);
      var defaultShow = self.is(':visible');

      // Add elements to DOM
      var currentWrapper = $('<div class="sticky-block--wrapper ' + currentOptions.wrapperClass + '"></div>');
      self.wrap(currentWrapper);
      self.attr('style', '-webkit-transform: translate3d(0,0,0);');

      if (defaultShow) {
        var currentClone = $('<div class="sticky-block--clone sticky-block--hidden"></div>');
        self.parent().after(currentClone);
      }

      if($(currentOptions.parent).length > 0) {
        $(currentOptions.parent).css('position', 'relative');
      }

      // If no end element
      if(currentOptions.end.element === null) {
        currentOptions.end.element = $('body');
        currentOptions.end.border = 'bottom';
      }

      // Create object params current block
      stickyBlocks[countId] = {
        'current': self,
        'clone': currentClone,
        'wrapper': self.parent(),
        'options': currentOptions,
        'data': null,
        'dataInit': false,
        'defaultShow': defaultShow,
        'status': null
      };

      stickyBlocks[countId].data = methods.setData(stickyBlocks[countId]);
      methods.updatePosition(stickyBlocks[countId]);

      // Add data
      if (!$(window).data('sticky-block-events')) {
        methods.setEvents();
        $(window).data('sticky-block-events', true);
      }

      if (!self.data('sticky-block-id')) {
        self.data('sticky-block-id', countId++);
      }

      return this;

    },


    /**
     *
     * @param self
     * @returns {{start: {element: *, border: string, offset: number}, end: {element: null, border: string, offset: number}, top: number, parent: null, cache: boolean, animate: boolean, wrapperClass: string, returnToInitialState: null}}
     */
    createDefaults: function (self) {

      return {
        'start': {
          'element': self,
          'border': 'top',
          'offset': 0
        },
        'end': {
          'element': null,
          'border': 'top',
          'offset': 0
        },
        'top': 0,
        'parent': null,
        'cache': false,
        'animate': false,
        'wrapperClass': '',
        returnToInitialState: null
      }

    },


    /*
     Call methods plugin during DOM events
     */
    setEvents: function () {

      $(window).on('scroll resize', function () {
        updateDataBlocks();
      });

      function updateDataBlocks() {
        for (var block in stickyBlocks) {
          if (stickyBlocks.hasOwnProperty(block)) {
            methods.updatePosition(stickyBlocks[block]);
            stickyBlocks[block].data = methods.updateData(stickyBlocks[block]);
          }
        }
      }

    },


    /**
     * Set and Update dynamic data plugin
     * @param block - Element of the array stickyBlocks with unique settings
     * @returns {*}  - Updated data
     */
    setData: function (block) {

      var current = block.current;
      var options = block.options;
      var data = block.data;

      // Starting from the second call
      if (block.dataInit) {
        $(block.clone).height(data.height);

        if (block.wrapper.is('.' + classes.fixed + ',' + '.' + classes.absolute)
          && current === options.start.element) {
          data.width = current.outerWidth();
          data.height = current.outerHeight(true);
          return data;
        }

      }

      block.dataInit = true;

      // Create current data
      var currentData = {
        'width': current.outerWidth(),
        'height': current.outerHeight(true),
        'startPosition': 0,
        'endPosition': 0,
        'offsetParent': 0,
      };

      // Set/Update Start and End position
      var points = ['start', 'end'];
      for (var i = 0; i < points.length; i++) {

        var point = points[i];
        if (options[point].border === 'top') {
          currentData[point + 'Position'] = options[point].element.offset().top;
        }
        else if (options[point].border === 'bottom') {
          currentData[point + 'Position'] = options[point].element.offset().top +
            options[point].element.outerHeight();
        }
        else {
          methods.error('Invalid value: ' + options[point].border +
            '! Field "border" requires value - "top" or "bottom"');
          return false;
        }
      }

      if($(options.parent).length > 0) {
        currentData.offsetParent = $(options.parent).offset().top;
      }

      return currentData;

    },


    /**
     * Calc and update of the position of DOM elements
     * @param block - Element of the array stickyBlocks with unique settings
     * @returns {methods} - This object
     */
    updatePosition: function (block) {
      var options = block.options;
      var data = block.data;
      var wrapper = $(block.wrapper);

      var scrollTop = window.pageYOffset;
      var limit = data.endPosition - data.height - options.end.offset + parseInt($(block.current).css('margin-bottom'));
      var showCurrentBlock = true;
      var showCloneBlock = true;

      // return the to initial state
      if(typeof options.returnToInitialState === 'function' && options.returnToInitialState()) {
        setInitialState();
        return this;
      }

      // Need more space
      if ((data.endPosition - data.startPosition - options.start.offset - options.end.offset) < data.height) {
        return this;
      }

      if (scrollTop >= limit - options.top) {
        wrapper.css({
          'top': limit - data.offsetParent
        })
          .addClass(classes.absolute).removeClass(classes.fixed);
        methods.callEvents(block, 'sticky-block-end');
      }
      else if (scrollTop >= data.startPosition + options.start.offset) {
        wrapper.css({
          'top': options.top
        })
        wrapper.addClass(classes.fixed).removeClass(classes.absolute);
        methods.callEvents(block, 'sticky-block-start');
      }
      else {
        setInitialState();
      }

      methods.toogleCloneBlock(block, showCloneBlock);
      methods.toogleCurrentBlock(block, showCurrentBlock);


      /**
       *
       */
      function setInitialState() {
        wrapper.removeClass(classes.fixed + ' ' + classes.absolute);
        showCloneBlock = false;
        showCurrentBlock = false;
        methods.callEvents(block, 'sticky-block-default');
      }

      return this;

    },


    /**
     * Call method setData and check value cache
     * @param block - Element of the array stickyBlocks with unique settings
     * @returns {*} - Current or updated data
     */
    updateData: function (block) {

      if (block.options.cache === true) return block.data;
      return this.setData(block);

    },


    /**
     * Call plugin events
     * @param block - Element of the array stickyBlocks with unique settings
     * @param event - Current event
     * @returns {methods} - This object
     */
    callEvents: function (block, event) {

      var current = $(block.current);
      if(block.status != event) {
        $(current).trigger(event);
        block.status = event;
      }

      return this;

    },


    /**
     *
     * @param block - Element of the array stickyBlocks with unique settings
     * @param show - Status current element
     */
    toogleCurrentBlock: function (block, show) {

      var current = $(block.current);
      if (!block.defaultShow && !current.is(':visible')) {
        current.css('display', 'block');
      }

      var wrapper = $(block.wrapper);
      var animate = false;

      if (show) {
        wrapper.addClass(classes.show).removeClass(classes.hidden);
        animate = true;
      }
      else if (show === false && block.defaultShow === false) {
        wrapper.addClass(classes.hidden).removeClass(classes.show);
      }

      methods.animate(block, animate);

    },


    /**
     *
     * @param block - Element of the array stickyBlocks with unique settings
     * @param show - Status current element
     */
    toogleCloneBlock: function (block, show) {

      var clone = $(block.clone);
      if (show) {
        clone.addClass(classes.show).removeClass(classes.hidden);
      }
      else {
        clone.addClass(classes.hidden).removeClass(classes.show);
      }

    },


    /**
     *
     * @param block - Element of the array stickyBlocks with unique settings
     * @param add
     * @returns {*} This object or block
     */
    animate: function (block, add) {

      var options = block.options;
      if (!options.animate) return this;

      var wrapper = $(block.wrapper);
      var effect = options.animate.split(' ')[0];
      if (add) {
        wrapper.addClass(effect + ' animated');
      }
      else {
        wrapper.removeClass(effect);
      }

      return this;

    },


    /**
     * Delete item from the plugin
     */
    destroy: function () {

      for (var block in stickyBlocks) {
        if (stickyBlocks.hasOwnProperty(block)) {
          if ($(this).data('sticky-block-id') === $(stickyBlocks[block].current).data('sticky-block-id')) {
            delete stickyBlocks[block];
          }
        }
      }

    },


    /**
     * Report error
     * @param message - Message to console.error
     */
    error: function (message) {

      console.error(message);

    }

  };


  /**
   * Detect mobile device
   * @type {{Android: Function, BlackBerry: Function, iOS: Function, Opera: Function, Windows: Function, any: Function}}
   */
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };



  // Create plugin style
  (function () {

    var stickyBlockStyle = '';
    stickyBlockStyle += '<style>';
    stickyBlockStyle += '.sticky-block--fixed {position: fixed;}';
    stickyBlockStyle += '.sticky-block--absolute {position: absolute;}';
    stickyBlockStyle += '.sticky-block--hidden {display: none;}';
    stickyBlockStyle += '.sticky-block--show {display: block;}';
    stickyBlockStyle += '</style>';

    $(stickyBlockStyle).appendTo(document.head);

  })();


  /**
   * Add new function to jQuery.fn
   * @param method - String name method or user settings
   * @returns {*}
   */
  $.fn.stickyBlock = function (method) {

    if (methods[method]) {
      return methods[method].apply(this, [].slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      methods.error('Method ' + method + ' not found!');
    }

  };
}));