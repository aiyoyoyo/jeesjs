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
// constructor: ===============================================================
	/**
	 * @class CreateJS
	 * @static
	 */
	function CreateJS() { throw "jees.CJS不允许做初始化操作。"; }
// protected static methods: ==================================================
	CreateJS.startup = function() {};

    // getter and setter
    CreateJS.get = function(){return createjs;};
    CreateJS.getTickerTime = function(){return this.getTicker().getMeasuredTickTime().toFixed(0);};
	CreateJS.getFPS = function(){return this.getTicker().getMeasuredFPS().toFixed(0);};
    CreateJS.getTouch = function(){ return createjs.Touch; };
    CreateJS.getTicker = function(){ return createjs.Ticker; };
    CreateJS.getSound = function(){ return createjs.Sound; };
    // new element
    CreateJS.newContainer = function(){
        var c = new createjs.Container();
        return c;
    };
    CreateJS.newShape = function( _w, _h, _c ){
        var s = new createjs.Shape();
        var g = s.graphics;
        if( _c ){
        	g.beginFill( _c );
        }
        if( _w && _h ){
        	g.drawRect( 0, 0, _w, _h );
        }
        if( _c || ( _w && _h ) )
        	g.endFill();
        return s;
    };
	CreateJS.newObject = function(){
		var o = new createjs.DisplayObject();
		return o;
	};
	CreateJS.newBox = function( _w, _h, _c ){
        var s = new createjs.Shape();
        s.graphics.beginStroke( _c ).drawRect( 0, 0, _w, _h );
        return s;
    };
    CreateJS.newBitmap = function( _r ){
    	var b = new createjs.Bitmap( _r );
    	return b;
    };
    CreateJS.newRect = function( _l, _r, _t, _b ){
    	var r = new createjs.Rectangle( _l, _r, _t, _b );
    	return r;
    }
    CreateJS.newText = function( _t, _f, _c ){
    	var t = new createjs.Text( _t, _f, _c );
    	return t;
    }
	jees.CJS = CreateJS;
})();