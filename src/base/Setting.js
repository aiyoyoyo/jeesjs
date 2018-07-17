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
	// constructor: ===========================================================
	/**
	 * @class Template
	 * @static
	 */
	function Setting() { throw "Setting cannot be instantiated."; }
	// private static properties: =============================================
	Setting._init = false;
    Setting._timestamp = 0;

	Setting._options = {
	    canvasId : "canvas",
        width : 0,
        height : 0,
        fps : 30,
        sound : false,
        console : false,
        debug : false,
	};
	// public static properties: ==============================================
	// protected static methods: ==============================================
	/**
	 * @method startup
     * @static
     * @param
     * @return
     */
	Setting.startup = function( _o ) {
        if( this._init ) return;
        this._init = true;

	    if ( typeof _o === "object" ) {
            for ( var i in _o ) {
                if ( _o.hasOwnProperty( i ) ) {
                    this._options[i] = _o[i];
                }
            }
        }
        // TODO 此处可能会改为由设备类型来决定屏幕宽高
        if( this._options.width == 0 )
            this._options.width = document.documentElement.clientWidth || document.body.clientWidth;
        if( this._options.height == 0 )
            this._options.height = document.documentElement.clientHeight || document.body.clientHeight;
	};
    Setting.shutdown = function() {};

    Setting.getCanvasId = function() { return this._options.canvasId };
    Setting.getWidth = function(){ return this._options.width; };
    Setting.getHeight = function(){ return this._options.height; };
    Setting.getFPS = function(){ return this._options.fps; };
    Setting.setFPS = function( _f ){ this._options.fps = _f; };

    Setting.isSound = function(){ return this._options.sound; };
    Setting.isConsole = function(){ return this._options.console; };
    Setting.isDebug = function(){ return this._options.debug; };

    Setting.getTimestamp = function(){ return this._timestamp; };
    Setting.setTimestamp = function( _t ){ this._timestamp = _t; };

	jees.SET = Setting;
})();