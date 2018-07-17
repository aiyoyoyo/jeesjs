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
	// constructor: ===========================================================
	/**
	 * @class Template
	 * @static
	 */
	function Event() { throw "Event cannot be instantiated."; };

	// private static properties: =============================================
	// public static properties: ==============================================
	/**
	 * QueueManager Events
	 */
	Event.QM = {
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
    // private static methods: ================================================
	// public static methods: =================================================

	jees.E = Event;
})();