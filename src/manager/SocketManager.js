/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/manager/SocketManager.js
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
	function SocketManager() { throw "jees.SM不允许做初始化操作。"; };
// public static properties:
// private methods: ====================================================
	SocketManager._connectors = new Array();
	
// public methods: =====================================================
	/**
	 * @public
	 * @static
	 * @method startup
	 * @param {jees.Connector} _c
	 */
	SocketManager.startup = function( _c ){
	}
	/**
	 * @public
	 * @static
	 * @method register
	 * @param {jees.Connector} _c
	 */
	SocketManager.register = function( _c ){
		if( !_c instanceof jees.Connector ){
			throw "连接对象必须为jees.Connector或者其子类。";
		}
		this._connectors.push( _c );
		
		_c.connect();
	}
	/**
	 * @public
	 * @static
	 * @method get
	 * @param {Integer} _idx
	 * @return {jees.Connector}
	 */
	SocketManager.get = function( _idx ){
		if( _idx != undefined )
			return _connectors[_idx];
		return this._connectors[0];
	}
	jees.SM = SocketManager;
})();