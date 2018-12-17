/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/connector/Request.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Request
	 * @static
	 * @constructor
	 */
	function Request() {
	};
// public static properties:
// private methods: ====================================================
	var p = Request.prototype;
	
// public methods: =====================================================
	/**
	 * @public
	 * @method send
	 * @param {Object} _msg
	 * @param {Object} _idx
	 */
	p.send = function( _msg, _idx ){
		var c = jees.SM.get( _idx );
		c.send( JSON.stringify( _msg ) );
	}
	jees.Request = Request;
})();