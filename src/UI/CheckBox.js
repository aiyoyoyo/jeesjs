/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/CheckBox.js
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
	 * 按钮如果绑定在父控件上，createjs会把父控件的事件同时绑定在按钮上。
	 * @class CheckBox
	 * @extends jeesjs.Button
	 * @param (Number} _typ 按钮类型Button.TYPE_NORMAL | Button.TYPE_CHECK
	 * @param {String} _r 资源图为单张1行4列或8列，按钮顺序为正常、焦点、按下、禁用
	 * @param {String|TextBox} _t TODO: 使用文本对象或者默认文本对象
	 * @param {Widget} _p
	 * @constructor
	 */
	function CheckBox( _typ, _r, _t, _p ) {
		this.Button_constructor( _typ, _r, _t, _p );
// public properties:
	};
// public static properties
	var p = createjs.extend(CheckBox, jeesjs.Button);
// public method
	jeesjs.CheckBox = createjs.promote(CheckBox, "Button");
})();