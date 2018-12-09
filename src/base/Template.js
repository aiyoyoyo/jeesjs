/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Template.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class Template
	 * @static
	 */
	function Template() { throw "Template cannot be instantiated."; };

	// private static properties: =============================================
	/**
     * 私有变量
     * @property _private
     * @static
     * @private
     * @protected
     * @type {Number}
     */
    Template._private = 0
	// public static properties: ==============================================
    /**
     * 公有变量
     * @property public
     * @static
     * @type {Number}
     * @public
     */
    Template.public = 0;
    Template.publicOther = 0;
    // private static methods: ================================================
    /**
     * 私有方法
     * @method _private_method
     * @param {Object} _p
     * @static
     * @private
     * @protected
     */
    Template._private_method = function( _p ){};
	// public static methods: =================================================
    /**
     * 私有方法
     * @method public
     * @param {Object} _p
     * @static
     * @public
     */
	Template.public = function() {};
    Template.publicFunction = function() {};
	jees.T = Template;
})();