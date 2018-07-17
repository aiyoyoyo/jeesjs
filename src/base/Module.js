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
    // constructor: ===========================================================
	/**
	 * @class Module
	 * @param {String} _id
	 */
    function Module( _id ){
        if( _id == undefined ) throw "模块必须设置ID。";

        this._id = _id;
    };
    // private static properties: =============================================
    Module._id = null;

    var p = Module.prototype;
    // public static methods: =================================================
    p.getId = function(){ return this._id; };
    /**
	 * 进入模块
	 * @method enter
	 */
	p.enter = function(){ console.log( this._id, "enter" ); };
	/**
	 * 退出模块
	 * @method leave
	 */
	p.leave = function(){ console.log( this._id, "leave" ); };
	/**
	 * 执行模块更新，模块中断后，不在被调用，直到恢复通知。
	 * @method update
	 * @param Number _t 绘制时间，单位：毫秒
	 */
	p.update = function( _t ){ console.log( this._id, "update" ); };
	/**
	 * 模块被中断通知
	 * @method interrupt
	 */
	p.interrupt = function(){ console.log( this._id, "interrupt" ); };
	/**
	 * 模块恢复通知
	 * @method interrupt
	 */
	p.recovery = function(){ console.log( this._id, "recovery" ); };
	
	jees.Module = Module;
})();