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
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
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
 * ========================================================== */

!(function ($) {
    'use strict'; // jshint ;_;

    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $(function () {
        $.support.transition = (function () {
            var transitionEnd = (function () {
                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        WebkitTransition: 'webkitTransitionEnd',
                        MozTransition: 'transitionend',
                        OTransition: 'oTransitionEnd otransitionend',
                        transition: 'transitionend',
                    },
                    name;

                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }
            })();

            return (
                transitionEnd && {
                    end: transitionEnd,
                }
            );
        })();
    });
})(window.jQuery);
