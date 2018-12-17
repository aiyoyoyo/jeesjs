/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/base/Module.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Module
	 * @abstract
	 * @param {String} _id
	 */
    function Module( _id ){
		if( !_id ) throw "模块必须设置ID。";
// public properties:
		/**
		 * 模块ID
		 */
        this.id = _id;
    };

    var p = Module.prototype;
// public static methods: =====================================================
	/**
	 * @public
	 * @method getId
	 * @returns {String}
	 */
    p.getId = function(){ return this.id; };
    /**
	 * 进入模块
	 * @public
	 * @abstract
	 * @method enter
	 */
	p.enter = function(){};
	/**
	 * 退出模块
	 * @public
	 * @abstract
	 * @method leave
	 */
	p.leave = function(){};
	/**
	 * 执行模块更新，模块中断后，不在被调用，直到恢复通知。
	 * @public
	 * @abstract
	 * @method update
	 * @param Number _t 绘制时间，单位：毫秒
	 */
	p.update = function( _t ){};
	/**
	 * 模块被中断通知
	 * @public
	 * @abstract
	 * @method interrupt
	 */
	p.interrupt = function(){};
	/**
	 * 模块恢复通知
	 * @public
	 * @abstract
	 * @method interrupt
	 */
	p.recovery = function(){};
	/**
	 * 模块消息通知
	 * @public
	 * @abstract
	 * @method notify
	 * @param {jees.Meesage}
	 */
	p.notify = function( _m ){}
	
	jees.Module = Module;
})();