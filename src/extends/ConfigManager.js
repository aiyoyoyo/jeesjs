/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/ConfigManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.EX = this.jees.EX || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class ConfigManager
	 * @extends FileLoadManager
	 */
	function ConfigManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
	};
	var p = createjs.extend( ConfigManager, jees.FileLoadManager );
	
	jees.EX.ConfigManager = createjs.promote( ConfigManager, "FileLoadManager");
})();
