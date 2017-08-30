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
		//这部分用于临时数据
		var r = jeesjs.QM.getSource( _r ); 	//图片源
		var bg = new createjs.Bitmap( r );	//图片对象
		var b = bg.getBounds();				//获取图片信息
		/**
		 * 按钮宽度
		 * @property w
		 * @type {Number}
		 */
		this.w = b.width;				//拆分按钮的宽度=图片宽度
		/**
		 * 按钮高度
		 * @property h
		 * @type {Number}
		 */
		this.h = b.height / _typ;		//拆分按钮的高度=图片高度/4|8 态
// private properties:
		/**
		 * 按钮显示的文本
		 * @property _btn_text
		 * @type {TextBox}
		 */
		this._btn_text = null;
		/**
		 * 选中状态
		 * @property _c
		 * @type {Boolean}
		 * @default false
		 */
		this._c = false;
		/**
		 * 基本容器
		 * @property _container
		 * @type {createjs.Container}
		 * @extends
		 */
		this._container = new createjs.Container();
		
		var btn_c = Button.TYPE_CHECK === _typ;	//是否使用8态
		/**
		 * 构建按钮图片的数据对象
		 * 数据定义参考createjs.SpriteSheet
		 * @property _btn_data
		 * @type {Object}
		 */
		this._btn_data = {
			"images" : [ r ],
			"frames" : { width : this.w, height : this.h, count : _typ },
			"animations" : { out : 0, over : 1, down : 2, disable : 3, 
				checked_out : btn_c ? 4 : 0, checked_over : btn_c ? 5 : 1, checked_down : btn_c ? 6 : 2, checked_disable : btn_c ? 7 : 3 
			}
		};
		/**
		 * 精灵数据定义表，包含按钮的4态或8态数据
		 * @property _btn_sheet
		 * @type {createjs.SpriteSheet}
		 */
		this._btn_sheet = new createjs.SpriteSheet( this._btn_data );	
		/**
		 * 按钮绘制精灵
		 * @property _btn_sprite
		 * @type {createjs.Sprite}
		 */
		this._btn_sprite = new createjs.Sprite( this._btn_sheet );
		/**
		 * 精灵辅助配置
		 * @property _btn_helper
		 * @type {createjs.ButtonHelper}
		 */
		this._btn_helper = new createjs.ButtonHelper( this._btn_sprite );

		if( typeof _t === "string" ){
			this._btn_text = new jeesjs.TextBox( _t );
		}else if ( typeof _t === "object" ){
			this._btn_text = _t;
		}
		this._btn_text.setAlign( jeesjs.TextBox.ALIGN_CENTER );
		this._btn_text.setBaseline( jeesjs.TextBox.BASELINE_MIDDLE );
		this._btn_text.setPosition( this.w / 2, this.h / 2 );
		
		this._container.addChild( this._btn_sprite );
		this._container.addChild( this._btn_text.getWidget() );
		
        this._init_finish();
        
		this.onEvent( "mousedown", this._handle_mousedown );
		this.onEvent( "pressup", this._handle_pressup );
	};
// public static properties
	Button.TYPE_NORMAL		= 4;
	Button.TYPE_CHECK		= 8;
	
	var p = createjs.extend(Button, jeesjs.Widget);
// public method
	/**
     * 自定义绑定事件
     * @method onEvent
     * @param {String} _e 事件比如："click"等。
     * @param {Function( createjs.Event, jeesjs.Widget )} _f( _e, _w ) _e为对应的事件信息，_w为触发事件的控件Widget
     * @extends
     */
    p.onEvent = function( _e, _f ){
    	if( typeof _f != "function" ) throw "参数_f不是有效的方法类型";
    	this._bind_event( _e, this._btn_sprite, _f );
    }
    /**
     * 解绑控件弹起事件
     * @extends
     * @method unEvent
     * @extends
     */
    p.unEvent = function( _e ){
    	this._unbind_event( _e, this._btn_sprite );
    };
    /**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( _x, _y );
    	this.getWidget().x = this.x;
    	this.getWidget().y = this.y;
	};
	/**
	 * 设置状态
	 * @method setPosition
	 * @param {Boolean} _e
	 * @extends
	 */
	p.setEnabled = function( _e ){
		this.Widget_setEnabled( _e );
		this._btn_helper.setEnabled( this.isEnabled() );
		this._btn_helper.target.gotoAndPlay( this.isEnabled() ? "out" : "disable" );
	}
	/**
	 * 是否选中
	 * @method isChecked
	 * @return {Boolean}
	 */
	p.isChecked = function(){
		return this._c;
	}
	/**
	 * 设置是否选中
	 * @method setChecked
	 * @param {Boolean} _c
	 */
	p.setChecked = function( _c ){
		this._c = _c;
		if( this.isChecked() ){
			this._btn_helper.target.gotoAndPlay( this.isEnabled() ? "checked_out" : "checked_disable" );
			this._btn_helper.overLabel = "checked_over";
			this._btn_helper.outLabel  = "checked_out";
			this._btn_helper.downLabel  = "checked_down";
		}else{
			this._btn_helper.target.gotoAndPlay( this.isEnabled() ? "out" : "disable" );
			this._btn_helper.overLabel = "over";
			this._btn_helper.outLabel  = "out";
			this._btn_helper.downLabel  = "down";
		}
	}
	/**
	 * 显示的文本
	 * @method getText
	 * @return {String}
	 */	
	p.getText = function(){
		return this._btn_text.getText();
	}
	/**
	 * 设置显示的文本
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function( _t ){
		this._btn_text.setText( _t );
	}
// private method
	/**
	 * 当按钮按下时，文本控件做字体/10大小的偏移
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jeesjs.Widget} _w
	 * @private
	 */
	p._handle_mousedown = function( _e, _w ){
		if( !_w.isEnabled() ) return;
		var pos = _w._btn_text.getPosition();
		var offset = _w._btn_text.getFontSize() / 10;
		_w._btn_text.setPosition( pos.x - offset, pos.y - offset );
	}
	/**
	 * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jeesjs.Widget} _w
	 * @private
	 */
	p._handle_pressup = function( _e, _w ){
		if( !_w.isEnabled() ) return;
		var pos = _w._btn_text.getPosition();
		var offset = _w._btn_text.getFontSize() / 10;
		_w._btn_text.setPosition( pos.x + offset, pos.y + offset );
	}
	
	jeesjs.Button = createjs.promote(Button, "Widget");
})();