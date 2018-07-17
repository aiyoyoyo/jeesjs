/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/CreateJS.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class CreateJS
	 * @static
	 */
	function CreateJS() { throw "CreateJS cannot be instantiated."; }
	// private static properties: =============================================
    CreateJS._canvas = null;
    CreateJS._stage = null;
	// public static properties: ==============================================
	// protected static methods: ==============================================
	CreateJS.startup = function() {
	    this._canvas = document.getElementById( jees.SET.getCanvasId() );
        this._canvas.width = jees.SET.getWidth();
        this._canvas.height = jees.SET.getHeight();
        this._stage = new createjs.StageGL( this._canvas );

        this.setFPS( jees.SET.getFPS() );
	};
    CreateJS.shutdown = function() {};

    CreateJS.get = function(){
        return createjs;
    };

    CreateJS.setFPS = function( _f ){
        jees.SET.setFPS( _f );
        this.getTicker().framerate = _f;
    };
    CreateJS.getFPS = function( _b ){
        if( _b )
            return this.getTicker().getMeasuredFPS().toFixed(0);

        return jees.SET.getFPS();
    };

    CreateJS.getTickerTime = function(){
        return this.getTicker().getMeasuredTickTime().toFixed(0);
    };

    CreateJS.getStage = function(){ return this._stage; };
    CreateJS.getTouch = function(){ return createjs.Touch; };
    CreateJS.getTicker = function(){ return createjs.Ticker; };
    CreateJS.getSound = function(){ return createjs.Sound; };

    CreateJS.newLoader = function(){
        var q = new createjs.LoadQueue( false, "", "Anonymous" );
        return q;
    };
    CreateJS.newContainer = function( _r ){
        var c = new createjs.Container();
        if( _r ) this._stage.addChild( c );
        return c;
    };
    CreateJS.newShape = function( _w, _h, _c ){
        var s = new createjs.Shape();
        s.graphics.beginFill( _c ).drawRect( 0, 0, _w, _h );
        return s;
    };

    CreateJS.update = function(){
        this._stage.update();
    };

	jees.CJS = CreateJS;
})();