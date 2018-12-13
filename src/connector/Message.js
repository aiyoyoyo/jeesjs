/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/connector/Message.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Message
	 * @static
	 * @constructor
	 */
	function Message( _json ){
		/**
		 * 消息ID
		 * @public
		 * @property id
		 * @type {Integer}
		 * @default 0
		 */
		this.id = 0;
		/**
		 * 客户端用户ID
		 * @public
		 * @property userId
		 * @type {Integer}
		 * @default 0
		 */
		this.userId = 0;
		/**
		 * @public
		 * @property intData
		 * @type {Array<Integer>}
		 */
		this.intData = new Array();
		/**
		 * @public
		 * @property strData
		 * @type {Array<String>}
		 */
		this.strData = new Array();
		/**
		 * @public
		 * @property booData
		 * @type {Array<Boolean>}
		 */
		this.booData = new Array();
		/**
		 * @public
		 * @property floData
		 * @type {Array<Float>}
		 */
		this.floData = new Array();
		/**
		 * @public
		 * @property dblData
		 * @type {Array<Double>}
		 */
		this.dblData = new Array();
		/**
		 * @public
		 * @property lonData
		 * @type {Array<Long>}
		 */
		this.lonData = new Array();
		/**
		 * 这里Byte类型的二进制数据不一定能处理，做保留字段
		 * @public
		 * @property bytData
		 * @type {Array<Byte>}
		 */
		this.bytData = new Array();
		/**
		 * 消息类型
		 * @link https://github.com/aiyoyoyo/jeesupport/blob/master/jees-jsts/src.core/com/jees/jsts/server/message/Message.java
		 * @public
		 * @property type
		 * @type {Integer}
		 * @default 1
		 */
		this.type = 1;
		
		if( typeof _json == "string" ){
			var o = eval( '(' + _json + ')' );
			
			for( var i in this ){
				if( o.hasOwnProperty( i ) ){
					this[i] = o[i];
				}
			}
		}
	};
// public static properties:
// private methods: ====================================================
	var p = Message.prototype;
// public methods: =====================================================
	/**
	 * @public
	 * @method addInteger
	 * @param {Integer} _val
	 */
	p.addInteger = function( _val ){
		this.intData.push( _val );
	};
	/**
	 * @public
	 * @method addString
	 * @param {String} _val
	 */
	p.addString = function( _val ) {
		this.strData.push( _val );
	};
	/**
	 * @public
	 * @method floData
	 * @param {Float} _val
	 */
	p.addFloat = function( _val ) {
		this.floData.push( _val );
	};
	/**
	 * @public
	 * @method booData
	 * @param {Boolean} _val
	 */
	p.addBoolean = function( _val ) {
		this.booData.push( _val );
	};
	/**
	 * @public
	 * @method addDouble
	 * @param {Double} _val
	 */
	p.addDouble = function( _val ) {
		this.dblData.push( _val );
	};
	/**
	 * @public
	 * @method lonData
	 * @param {Long} _val
	 */
	p.addLong = function( _val ) {
		this.lonData.push( _val );
	};
	/**
	 * @public
	 * @method addBytes
	 * @param {Byte[]} _val
	 */
	p.addBytes = function( _val ) {
		this.bytData.push( _val );
	};
	/**
	 * @public
	 * @method getInteger
	 * @param {Integer} _idx
	 * @return {Integer}
	 */
	p.getInteger = function( _idx ) {
		if ( _idx >= this.intData.length ) return 0;
		return this.intData[ _idx ];
	};
	/**
	 * @public
	 * @method getString
	 * @param {Integer} _idx
	 * @return {String}
	 */
	p.getString = function( _idx ) {
		if ( _idx >= this.strData.length ) return null;
		return this.strData[ _idx ];
	};
	/**
	 * @public
	 * @method getFloat
	 * @param {Integer} _idx
	 * @return {Float}
	 */
	p.getFloat = function( _idx ) {
		if ( _idx >= this.floData.length ) return 0;
		return this.floData[ _idx ];
	};
	/**
	 * @public
	 * @method getBoolean
	 * @param {Integer} _idx
	 * @return {Boolean}
	 */
	p.getBoolean = function( _idx ) {
		if ( _idx >= this.booData.length ) return null;
		return this.booData[ _idx ];
	};
	/**
	 * @public
	 * @method getDouble
	 * @param {Integer} _idx
	 * @return {Double}
	 */
	p.getDouble = function( _idx ) {
		if ( _idx >= this.booData.length ) return 0;
		return this.dblData[ _idx ];
	};
	/**
	 * @public
	 * @method getLong
	 * @param {Integer} _idx
	 * @return {Long}
	 */
	p.getLong = function( _idx ) {
		if ( _idx >= this.lonData.length ) return 0;
		return this.lonData[ _idx ];
	};
	/**
	 * @public
	 * @method getBytes
	 * @param {Integer} _idx
	 * @return {Byte[]}
	 */
	p.getBytes = function( _idx ) {
		if ( _idx >= this.bytData.length ) return null;
		return this.bytData[ _idx ];
	};
	
	jees.Message = Message;
})();