/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/InputBox.js
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
	 *
	 * @class InputBox
	 * @extends jees.Button
	 * @constructor
	 */
	function InputBox() {
		this.Widget_constructor();

        this._input = document.createElement( "input" );
        document.body.appendChild( this._input );

        this._object = new createjs.DOMElement( this._input );

        this.setSize( 100, 20 );

        this.init();
	};

	var p = createjs.extend( InputBox, jees.Widget );
    // public method: =========================================================
    /**
     * 设置控件类型为密码
     * @method setSize
     * @param {Boolean} _p
     * @param {String} _c 密码字符
     */
    p.setPassword = function( _p, _c ){
        this._input.type = "password";
    };
    /**
     * 获取控件输入的文本
     * @method getText
     * @return {String}
     */
    p.getText = function(){
        return this._input.value;
    };
    /**
     * 设置控件文本
     * @method setText
     * @param {String} _s
     */
    p.setText = function( _s ){
        this._input.value = _s;
    };
    /**
     * 设置宽高
     * @method setSize
     * @extends
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.Widget_setSize( _w, _h );

        this._object.width = _w;
        this._object.height = _h;

        this._input.style.width = _w + "px";
        this._input.style.height = _h + "px";
    };
    /**
     * 设置坐标
     * @method setSize
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
    p.setPosition = function( _x, _y ){
        this.Widget_setPosition( _x, _y );
        this._object.x = _x;
        this._object.y = _y;
    };
    // 其他属性都需要额外继承
    // setAlpha
    // setEnabled
    // setAlpha
    // setVisible

    /**
     * 自定义绑定事件
     * @method onEvent
     * @param {String} _e 事件比如："click"等。具体参考CreateJs官网各控件对应事件类型。
     * @param {Function( createjs.Event, jeesjs.Widget )} _f( _e, _w ) _e为对应的事件信息，_w为触发事件的控件Widget
     */
    p.onEvent = function (_e, _f) {
        if (typeof _f != "function") throw "参数[" + _f + "]不是有效的方法类型";

        this._bind_event( _e, this._input, _f );
    }
    /**
     * 解绑控件弹起事件
     * @method unEvent
     * @param {String} _e
     */
    p.unEvent = function (_e) {
        this._unbind_event( _e, this._input );
    };

	jees.InputBox = createjs.promote(InputBox, "Widget");
})();