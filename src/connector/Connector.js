/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/connector/Connector.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Connector
	 * @static
	 * @constructor
	 * @param {String} _host
	 * @param {Number|String} _port
	 * @param {String} _path
	 */
	function Connector( _host, _port, _path ) {
		this.host = _host;
		this.port = _port;
		this.path = _path;
		
		this.status = 0;
		
		this._connector = null;
	};
// public static properties:
	Connector.STATUS_DISCONNECT = 9;
	Connector.STATUS_SUCCESS = 10;
// private methods: ====================================================
	var p = Connector.prototype;
	p._handler_open = function( _e ){
		this.status = this.STATUS_SUCCESS;
		console.log( "open:", _e );
	}
	p._handler_close = function( _e ){
		this.status = this.STATUS_DISCONNECT;
		console.log( "close:", _e )
	}
	p._handler_error = function( _e ){
		console.log( "err:", _e )
	}
	p._handler_message = function( _e ){
		console.log( "msg:", _e );
		var msg = new jees.Message( _e.data );
		console.log( msg );
	}
	p._get_connect_url = function(){
		return ( this.host ? this.host : "" )
			+ ( this.port ? ":" + this.port : "" )
			+ ( this.path ? "/" + this.path : "" )
	}
// public methods: =====================================================
	p.connect = function(){
		if( this instanceof jees.WebSocketConnector ){
			var connect_url = "ws://" + this._get_connect_url();
			this._connector = new WebSocket( connect_url ); 
			this._connector.onopen = this._handler_open;
			this._connector.onclose = this._handler_close;
			this._connector.onerror = this._handler_error;
			this._connector.onmessage = this._handler_message;
		}
	}
	jees.Connector = Connector;
})();