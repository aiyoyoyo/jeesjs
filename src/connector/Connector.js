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
	Connector.STATUS_DISCONNECT = 1006;
	Connector.STATUS_SUCCESS = 200;
// private methods: ====================================================
	var p = Connector.prototype;
	p._handler_open = function( _e ){
		this.status = Connector.STATUS_SUCCESS;
		jees.Response.status( this.status );
	};
	p._handler_close = function( _e ){
		this.status = _e.code;
		jees.Response.status( this.status );
	};
	p._handler_error = function( _e ){
		if( _e.target && _e.target.readyState == 3 ){
			this.status = Connector.STATUS_DISCONNECT;
		}
		jees.Response.status( this.status );
	};
	p._handler_message = function( _e ){
		var msg = new jees.Message( _e.data );
		jees.Response.notify( msg );
	};
	p._get_connect_url = function(){
		return ( this.host ? this.host : "" )
			+ ( this.port ? ":" + this.port : "" )
			+ ( this.path ? "/" + this.path : "" )
	};
// public methods: =====================================================
	/**
	 * @public
	 * @method connect
	 */
	p.connect = function(){
		if( this instanceof jees.WebSocketConnector ){
			var _this = this;
			var connect_url = "ws://" + this._get_connect_url();
			this._connector = new WebSocket( connect_url ); 
			this._connector.onopen = function( _e ){_this._handler_open( _e );};
			this._connector.onclose = function( _e ){_this._handler_close( _e );};
			this._connector.onerror = function( _e ){_this._handler_error( _e );};
			this._connector.onmessage = function( _e ){_this._handler_message( _e );};
		}
	};
	/**
	 * @public
	 * @method send
	 * @param {String} _m
	 */
	p.send = function( _m ){
		if( this.isConnecting() )
			this._connector.send( _m );
		else throw "已经和服务器断开连接。";
	};
	/**
	 * @public
	 * @method isConnectin
	 * @return {Boolean}
	 */
	p.isConnecting = function(){
		return this.status == Connector.STATUS_SUCCESS;
	};
	jees.Connector = Connector;
})();