/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Event.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Event
	 * @static
	 */
	function Event() { throw "Event cannot be instantiated."; };

// public static properties: 
	/**
	 * ResourceManager Events
	 */
	Event.RM = {
	    FL: "fileload",
	    C: "complete",
	};

	/**
	 * UI Widget Events
	 * @link https://www.createjs.com/docs/easeljs/classes/Event.html
	 * @link https://www.createjs.com/docs/easeljs/classes/DisplayObject.html
	 */
	Event.Widget = {
        C: "click",
        DC: "dblclick",
        MD: "mousedown",
        MO: "mounseout",
        MIn: "mouseover",
	};
// public static methods: =====================================================
	/**
	 * @static
	 * @method bind
	 * @param {jees.Widget|createjs.DisplayObject} _o
	 * @param {String} _e
	 * @param {Function} _f
	 * @return {Event}
	 */
	Event.bind = function( _o, _e, _f ){
		return _o.addEventListener( _e, _f );
	}
	/**
	 * @static
	 * @method unbind
	 * @param {jees.Widget|createjs.DisplayObject} _o
	 * @param {String} _e
	 * @param {Event} _h
	 */
	Event.unbind = function( _o, _e, _h ){
		_o.removeEventListener( _e, _h );
		_h = null;
	}
	/**
	 * @static
	 * @method tick
	 * @param {Function} _f
	 * @return {Function}
	 */
	Event.tick = function( _f ){
        return jees.E.bind( createjs.Ticker, "tick", _f );
	}
	/**
	 * @static
	 * @method untick
	 * @param {Function} _h
	 */
	Event.untick = function( _h ){
		jees.E.unbind( createjs.Ticker, "tick", _h );
	}
	
	jees.E = Event;
})();