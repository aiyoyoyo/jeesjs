/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Setting.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Template
	 * @static
	 */
	function Setting() { throw "jees.SET 不允许做初始化操作。"; }
// private static properties:
	Setting.CONFIG_FILE = "../assets/configs/jees.default.config";
	Setting.SKIN_FILE = "../assets/images/skin_default.png";
	Setting._config = null;
    Setting._timestamp = 0;
	Setting._fps = 30;
	Setting._canvas = null;
	Setting._width = 0;
	Setting._height = 0;
	Setting._sound = false;
	Setting._debug = false;
	Setting._mouseover = false;
	
	Setting.connector = {
		enable: false,
		host: null,
		port: null,
		path: null,
	}
// public static getter/setter method: ========================================
	// getter and setter
	Setting.getCanvas = function(){ return this._canvas; }
	Setting.getWidth = function(){ return this._width; }
    Setting.getHeight = function(){ return this._height; }
    Setting.getFPS = function(){return this._fps;}
    Setting.setFPS = function( _f ){this._fps = _f;}
    Setting.getTimestamp = function(){ return this._timestamp; }
    Setting.setTimestamp = function( _t ){ this._timestamp = _t; }
    Setting.getConfig = function(){ return this._config; }
    Setting.getSkin = function(){ return this._skin; }
    Setting.enableSound = function(){ return this._sound; }
    Setting.enableDebug = function(){ return this._debug; }
    Setting.enableMouseOver = function(){ return this._mouseover; }
	
	Setting.enableConnector = function(){ return this.connector.enable; }
// public static method: ======================================================
	/**
	 * @public
     * @static
	 * @method startup
     * @return
     */
	Setting.startup = function() {
		var cfg = this._config.Setting;
		
		this._canvas = cfg.canvas;
		this._fps = cfg.fps;
		
		this._width = cfg.width != 0 ? cfg.width : ( document.documentElement.clientWidth || document.body.clientWidth );
		this._height = cfg.height != 0 ? cfg.height : ( document.documentElement.clientHeight || document.body.clientHeight );
		
		this._sound = cfg.sound;
		this._mouseover = cfg.mouseover;
		
		this._skin = cfg.skin;
		
		for ( var i in this._config.Connector ) {
            if ( this.connector.hasOwnProperty( i ) ) {
            	this.connector[i] = this._config.Connector[i];
            }	
       	}
	}
	
	jees.SET = Setting;
})();