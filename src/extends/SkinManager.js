/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/SkinManager.js
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
	 * @class SkinManager
	 * @extends FileLoadManager
	 */
	function SkinManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
// private properties:
		/**
		 * 皮肤配置文件
		 * @type {String}
		 * @default "default"
		 */
		this._config = null;
		/**
		 * 默认用的图片组
		 * @type {String}
		 * @default "default"
		 */
		this._skin = "default";
	};
	var p = createjs.extend( SkinManager, jees.FileLoadManager );
// public methods: ============================================================
	/**
	 * 启动器
	 * @public
	 * @method startup
	 */
	p.startup = function(){
		this._config = jees.SET.getConfig().Skin;
		this._skin = jees.SET.getSkin();
	}
	/**
	 * @public
	 * @method getSkin
	 * @returns {jees.Skin, JSONData } { resource, property}
	 */
	p.getSkin = function( _t, _g ){
		return {
			resource : this.get( _g != undefined ? _g : this._skin ),
			property: this._config[_t]
		};
	}
	
	jees.EX.SkinManager = createjs.promote( SkinManager, "FileLoadManager");
})();
