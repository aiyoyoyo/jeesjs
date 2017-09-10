/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Module/Module.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
// constructor:
	/**
	 * @class Module
	 */
    function Module(){
    	// 这些属性由jeesjs.MM分配
    	this.id = -1; 
    	this.level = 0; // 层级
    	this.index = 0; // 索引
    };
    
    var p = Module.prototype;
// public methods:    
    /**
	 * 进入模块
	 * @method enter
	 */
	p.enter = function(){};
	/**
	 * 退出模块
	 * @method leave
	 */
	p.leave = function(){};
	/**
	 * 执行模块更新，模块中断后，不在被调用，直到恢复通知。
	 * @method update
	 * @param Number _t 绘制时间，单位：毫秒
	 */
	p.update = function( _t ){};
	/**
	 * 模块被中断通知
	 * @method interrupt
	 */
	p.interrupt = function(){};
	/**
	 * 模块恢复通知
	 * @method interrupt
	 */
	p.recovery = function(){};
	
	jeesjs.Module = Module;
})();