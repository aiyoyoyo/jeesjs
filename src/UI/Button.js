/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/Button.js
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
	 * @class Button
	 * @extends jeesjs.Widget
	 * @param (Number} _typ 按钮类型Button.TYPE_NORMAL | Button.TYPE_CHECK
	 * @param {String} _r 资源图为单张1行4列或8列，按钮顺序为正常、焦点、按下、禁用
	 * @param {String|TextBox} _t TODO: 使用文本对象或者默认文本对象
	 * @param {Widget} _p
	 * @constructor
	 */
	function Button( _typ, _r, _t, _p ) {
		this.Widget_constructor( _p );

// public properties:

// private properties:
				/**
		 * 按钮显示的文本
		 * @property _t
		 * @type {TextBox}
		 */
		this._t = null;
		/**
		 * 选中状态
		 * @property _c
		 * @type {Boolean}
		 * @default false
		 */
		this._c = false;
		
		var r = jeesjs.QM.getSource( _r );
		
		var bg = new createjs.Bitmap( r );
		var b = bg.getBounds();
		var btn_w = b.width;
		var btn_h = b.height / _typ;
		var btn_c = Button.TYPE_CHECK === _typ;
		this._btn_data = {
			"images" : [ r ],
			"frames" : { width : btn_w, height : btn_h, count : _typ },
			"animations" : { out : 0, over : 1, down : 2, disable : 3, 
				checked_out : btn_c ? 4 : 0, checked_over : btn_c ? 5 : 1, checked_down : btn_c ? 6 : 2, checked_disable : btn_c ? 7 : 3 
			}
		};
		/**
		 * 精灵数据定义表，包含按钮的4态或8态数据
		 * @property _spt_sheet
		 * @type {createjs.SpriteSheet}
		 */
		this._btn_sheet = new createjs.SpriteSheet( this._btn_data );
		
		/**
		 * 按钮绘制精灵
		 * @property _sprite
		 * @type {createjs.Sprite}
		 */
		this._btn_sprite = new createjs.Sprite( this._btn_sheet );
		/**
		 * 精灵辅助配置
		 * @property _image
		 * @type {createjs.ButtonHelper}
		 */
		this._btn_helper = new createjs.ButtonHelper( this._btn_sprite );
		
//		_t ? _t : new jeesjs.TextBox( "测试文本", p );
		
        this._init_finish();
	};
// public static properties
	Button.TYPE_NORMAL		= 4;
	Button.TYPE_CHECK		= 8;
	
	var p = createjs.extend(Button, jeesjs.Widget);
// public method
	 /**
     * 返回根容器
     * @method getRoot
     * @extends
     * @type {createjs.DisplayObject}
     * @return 
     */
    p.getWidget = function(){
    	return this._btn_sprite;
    };
	/**
	 * 设置状态
	 * @method setPosition
	 * @param {Number}
	 *            _x
	 * @param {Number}
	 *            _y
	 */
	p.setEnabled = function( _e ){
		this.Widget_setEnabled( _e );
		this._btn_helper.setEnabled( this.getEnabled() );
		this._btn_helper.target.gotoAndPlay( this.getEnabled() ? "out" : "disable" );
	}
	p.getChecked = function(){
		return this._c;
	}
	/**
	 * 设置是否选中
	 */
	p.setChecked = function( _c ){
		this._c = _c;
		if( this.getChecked() ){
			this._btn_helper.target.gotoAndPlay( this.getEnabled() ? "checked_out" : "checked_disable" );
			this._btn_helper.overLabel = "checked_over";
			this._btn_helper.outLabel  = "checked_out";
			this._btn_helper.downLabel  = "checked_down";
		}else{
			this._btn_helper.target.gotoAndPlay( this.getEnabled() ? "out" : "disable" );
			this._btn_helper.overLabel = "over";
			this._btn_helper.outLabel  = "out";
			this._btn_helper.downLabel  = "down";
		}
	}
	/**
	 * 设置显示的文本
	 */
	p.setText = function( _t ){
		this._t = _t;
	}
// private method
	
	jeesjs.Button = createjs.promote(Button, "Widget");
})();