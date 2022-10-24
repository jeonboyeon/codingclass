/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable array-callback-return */
/* eslint-disable no-sparse-arrays */
/* eslint-disable prefer-regex-literals */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable no-prototype-builtins */
/* eslint-disable yoda */
/* eslint-disable no-void */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable space-before-function-paren */
/* eslint-disable space-in-parens */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable comma-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable wrap-iife */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable no-unused-expressions */
/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */

!(function ($) {
    'use strict'; // jshint ;_;

    /* TAB CLASS DEFINITION
     * ==================== */

    var Tab = function (element) {
        this.element = $(element);
    };

    Tab.prototype = {
        constructor: Tab,

        show: function () {
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous,
                $target,
                e;

            if (!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
            }

            if ($this.parent('li').hasClass('active')) return;

            previous = $ul.find('.active:last a')[0];

            e = $.Event('show', {
                relatedTarget: previous,
            });

            $this.trigger(e);

            if (e.isDefaultPrevented()) return;

            $target = $(selector);

            this.activate($this.parent('li'), $ul);
            this.activate($target, $target.parent(), function () {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous,
                });
            });
        },

        activate: function (element, container, callback) {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade');

            function next() {
                $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');

                element.addClass('active');

                if (transition) {
                    element[0].offsetWidth; // reflow for transition
                    element.addClass('in');
                } else {
                    element.removeClass('fade');
                }

                if (element.parent('.dropdown-menu')) {
                    element.closest('li.dropdown').addClass('active');
                }

                callback && callback();
            }

            transition ? $active.one($.support.transition.end, next) : next();

            $active.removeClass('in');
        },
    };

    /* TAB PLUGIN DEFINITION
     * ===================== */

    var old = $.fn.tab;

    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab');
            if (!data) $this.data('tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        });
    };

    $.fn.tab.Constructor = Tab;

    /* TAB NO CONFLICT
     * =============== */

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    };

    /* TAB DATA-API
     * ============ */

    $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
})(window.jQuery);
