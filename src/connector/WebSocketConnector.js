/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/connector/WebSocketConnector.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class WebSocketConnector
	 * @static
	 * @constructor
	 * @param {String} _host
	 * @param {Number|String} _port
	 * @param {String} _path
	 */
	function WebSocketConnector( _host, _port, _path ) {
		this.Connector_constructor( _host, _port, _path );
	};
// private static properties:
// public static properties:
// private static methods: ====================================================
	var p = createjs.extend( WebSocketConnector, jees.Connector );
// public static methods: =====================================================
	jees.WebSocketConnector = createjs.promote( WebSocketConnector, "Connector");
})();