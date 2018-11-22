/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/Button.js
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
	 * 按钮如果绑定在父控件上，createjs会把父控件的事件同时绑定在按钮上。
	 * @class Button
	 * @extends jees.Widget
	 * @constructor
	 */
	function Button() {
		this.Widget_constructor();

    // public properties: =====================================================
//		//这部分用于临时数据
//		var r = jees.QM.get( _r ); 			        //图片源
//		var bg = new createjs.Bitmap( r );			//图片对象
//		var b = bg.getBounds();						//获取图片信息
//		var t = _typ ? _typ : Button.TYPE_NORMAL;	//按钮类型
//		var c = Button.TYPE_CHECK === t;			//是否使用8态
//		/**
//		 * 按钮宽度
//		 * @property _width
//		 * @type {Number}
//		 */
//		this._width = b.width;				//拆分按钮的宽度=图片宽度
//		/**
//		 * 按钮高度
//		 * @property _height
//		 * @type {Number}
//		 */
//		this._height = b.height / t;		//拆分按钮的高度=图片高度/4|8 态
//  // private properties: ====================================================
//		/**
//		 * 按钮显示的文本
//		 * @property _btn_text
//		 * @type {TextBox}
//		 */
//		this._btn_text = null;
//		/**
//		 * 选中状态
//		 * @property _checked
//		 * @type {Boolean}
//		 * @default false
//		 */
//		this._checked = false;
//		/**
//		 * 基本容器
//		 * @property _container
//		 * @type {createjs.Container}
//		 * @extends
//		 */
//		this._container = new createjs.Container();
//		/**
//		 * 构建按钮图片的数据对象
//		 * 数据定义参考createjs.SpriteSheet
//		 * @property _btn_data
//		 * @type {Object}
//		 */
//		this._btn_data = {
//			"images" : [ r ],
//			"frames" : { width : this._width, height : this._height, count : _typ },
//			"animations" : { out : 0, over : 1, down : 2, disable : 3, 
//				checked_out : c ? 4 : 0, checked_over : c ? 5 : 1, checked_down : c ? 6 : 2, checked_disable : c ? 7 : 3 
//			}
//		};
//		/**
//		 * 精灵数据定义表，包含按钮的4态或8态数据
//		 * @property _btn_sheet
//		 * @type {createjs.SpriteSheet}
//		 */
//		this._btn_sheet = new createjs.SpriteSheet( this._btn_data );	
//		/**
//		 * 按钮绘制精灵
//		 * @property _object
//		 * @type {createjs.Sprite}
//		 */
//		this._object = new createjs.Sprite( this._btn_sheet );
//		/**
//		 * 精灵辅助配置
//		 * @property _btn_helper
//		 * @type {createjs.ButtonHelper}
//		 */
//		
//		this._btn_helper = new createjs.ButtonHelper( this._object );
//		this._btn_helper.enabled = true;
//		
//		//去掉了参数保护
//		this._btn_text = new jees.TextBox();
//		this._btn_text.setText( _t );
//		this._btn_text.setAlign( jees.TextBox.ALIGN_CENTER );
//		this._btn_text.setBaseline( jees.TextBox.BASELINE_MIDDLE );
//		this._btn_text.setPosition( this._width / 2, this._height / 2 );
//		this._btn_text.setColor( "#FFFFFF" );
//
//      var _this = this;
//      this.onEvent( "mousedown", function( e ){ _this._handle_mousedown( e, _this ); });
//      this.onEvent( "mouseup", function( e ){ _this._handle_pressup( e, _this ); });
//
//      this.init();
//		this._container.addChild( this._btn_text.getWidget() );
	};
    // public static properties: ==============================================
	Button.TYPE_NORMAL		= 4;
	Button.TYPE_CHECK		= 8;
	
	var p = createjs.extend(Button, jees.UI.Widget);
    // public method: =========================================================
    /**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( this._parent ? this._parent._x + _x : _x, this._parent ? this._parent._y + _y : _y );
		this._object.x = this._x;
		this._object.y = this._y;
		this._btn_text.setPosition( this._x + this._width / 2, this._y + this._height / 2 );
	};
	/**
	 * 设置状态
	 * @method setPosition
	 * @param {Boolean} _e
	 * @extends
	 */
	p.setEnabled = function( _e ){
		if( this.isEnabled() != _e )
			this._btn_text.setColor( jees.UT.OppositeColor( this._btn_text.getColor() ) );
		
		this.Widget_setEnabled( _e );
		this._btn_helper._setEnabled( this.isEnabled() );
		this._btn_helper.target.gotoAndPlay( this.isEnabled() ? "out" : "disable" );
		this._btn_text.setPosition( this._x + this._width / 2, this._y + this._height / 2 );
	}
	/**
	 * 设置是否选中
	 * @method setChecked
	 * @param {Boolean} _c
	 */
	p.setChecked = function( _c ){
		this.Widget_setChecked( _c );
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
    // private method: ========================================================
	/**
	 * 当按钮按下时，文本控件做字体/10大小的偏移
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jees.Widget} _w
	 * @private
	 */
	p._handle_mousedown = function( _e, _w ){
		if( !this.isEnabled() ) return;
		var pos = _w._btn_text.getPosition();
		var offset = _w._btn_text.getFontSize() / 10;
		var obj = _w._btn_text.getWidget();
		obj.x = pos.x - offset;
		obj.y = pos.y - offset;
	}
	/**
	 * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jees.Widget} _w
	 * @private
	 */
	p._handle_pressup = function( _e, _w ){
		if( !_w.isEnabled() ) return;
		var pos = _w._btn_text.getPosition();
		var offset = _w._btn_text.getFontSize() / 10;
		var obj = _w._btn_text.getWidget();
		obj.x = pos.x + offset;
		obj.y = pos.y + offset;
	}
	
	jees.UI.Button = createjs.promote(Button, "Widget");
})();