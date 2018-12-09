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
	Setting.config = null;
    Setting.timestamp = 0;
	Setting.fps = 30;
	Setting.canvas = null;
	Setting.width = 0;
	Setting.height = 0;
	Setting.sound = false;
	Setting.debug = false;
	Setting.mouseover = false;
	Setting.display = "default";
	Setting.skin = "default";
	/**
	 * 该配置用于表示viewport缩放了多少
	 */
	Setting.viewportScale = 1;
	
	Setting.connector = {
		enable: false,
		host: null,
		port: null,
		path: null,
	}
// public static getter/setter method: ========================================
	// getter and setter
	Setting.getCanvas = function(){ return this.canvas; }
	Setting.getWidth = function(){ return this.width; }
    Setting.getHeight = function(){ return this.height; }
    Setting.getFPS = function(){return this.fps;}
    Setting.setFPS = function( _f ){this.fps = _f;}
    Setting.getTimestamp = function(){ return this.timestamp; }
    Setting.setTimestamp = function( _t ){ this.timestamp = _t; }
    Setting.getConfig = function(){ return this.config; }
    Setting.getSkin = function(){ return this.skin.toLowerCase(); }
    Setting.getDisplay = function(){ return this.display.toLowerCase(); }
    Setting.getViewportScale = function(){ return this.viewportScale; }
    
    Setting.enableSound = function(){ return this.sound; }
    Setting.enableDebug = function(){ return this.debug; }
    Setting.enableMouseOver = function(){ return this.mouseover; }
	Setting.enableConnector = function(){ return this.connector.enable; }
// public static method: ======================================================
	/**
	 * @public
     * @static
	 * @method startup
	 * @param {String} _s
     */
	Setting.startup = function( _s ) {
		this.config = _s;
		var cfg = this.config.Setting;
		
		for ( var i in cfg ) {
            if ( this.hasOwnProperty( i ) ) {
            	this[i] = cfg[i];
            }	
       	}
		
		if( cfg.width == "auto" ){
			this.width = document.documentElement.clientWidth || document.body.clientWidth;
		}
		if( cfg.height == "auto" ){
			this.height = document.documentElement.clientHeight || document.body.clientHeight;
		}
		
		for ( var i in cfg.Connector ) {
            if ( this.connector.hasOwnProperty( i ) ) {
            	this.connector[i] = cfg.Connector[i];
            }	
       	}
	}
	
	jees.SET = Setting;
})();