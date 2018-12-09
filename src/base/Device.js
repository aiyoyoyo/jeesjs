/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Template.js
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
	function Device() { throw "Device cannot be instantiated."; };

// private static properties: 
// public static properties:
	Device.width = 0;
	Device.height = 0;
// private static methods: ====================================================

// public static methods: =====================================================
	Device.startup = function(){
		var useragent = navigator.userAgent;
		var platform = navigator.platform;
		
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		// 一定程度上解决适配问题
		if( jees.SET.getDisplay() == "stretch" ){
			var sx = jees.DEV.width / jees.SET.getWidth();
			var sy = jees.DEV.height / jees.SET.getHeight();
	    	var c = jees.APP.getCanvas();
	    	c.style.width = jees.SET.getWidth() * sx +"px";
	        c.style.height = jees.SET.getHeight() * sy +"px";
		}
	}
	
	Device.isPortrait = function(){
		var o = window.orientation;
		return o == 0;
	}
	jees.DEV = Device;
})();