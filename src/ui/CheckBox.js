
/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/CheckBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * 纯外框时，需要使用容器来保证透明区域可点击。建议素材中添加地板。
	 * @class CheckBox
	 * @extends jees.UI.ImageSpt
	 * @constructor
	 */
	function CheckBox() {
		this.Button_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Button"
    	 */
		this.property.skinResource = "CheckBox";
		/**
		 * @public
		 * @property checked
		 * @type {Boolean}
		 * @default false
		 */
		this.checked = false;
		/**
		 * @public
		 * @property group
		 * @type {String}
		 * @defualt ""
		 */
		this.group = "";
// private properties:
		this._object = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( CheckBox, jees.UI.Button );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this._init_background();
		this._init_text();
		
		var _this = this;
		if( this.types.indexOf( "push") != -1 ){
			jees.E.bind( this, "mousedown", function( e ){ _this._handle_mousedown( e, _this ); });
        	jees.E.bind( this, "pressup", function( e ){ _this._handle_pressup( e, _this ); });
		}
		
        if( this.types.indexOf( "highlight") != -1 ){
        	jees.E.bind( this, "mouseover", function( e ){ _this._handle_mouseover( e, _this ); });
        	jees.E.bind( this, "mouseout", function( e ){ _this._handle_mouseout( e, _this ); });
        }
        
        jees.E.bind( this, "click", function( e ){ _this._handle_click( e, _this ); });
        
//		this._reset_disable();
	    this._reset_position();
	}
	/**
	 * 设置状态
	 * @public
	 * @method setChecked
	 * @param {Boolean} _e
	 */
	p.setChecked = function( _e ){
		this.checked = _e;
	}
	/**
	 * 是否禁用
	 * @public
	 * @method isChecked
	 * @return {Boolean}
	 */
	p.isChecked = function(){
		return this.checked;
	}
// private method: ============================================================
	p._init_background = function(){
		this.state = true;
		
		var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		
		var data = {
			images: [this._skin.getCacheDataURL("rect"),
				this._skin.getCacheDataURL("highlight"),
				this._skin.getCacheDataURL("push"),
				this._skin.getCacheDataURL("disable"),
				this._skin.getCacheDataURL("checked"),
				this._skin.getCacheDataURL("checkedHighlight"),
				this._skin.getCacheDataURL("checkedPush"),
				this._skin.getCacheDataURL("checkedDisable")],
			frames: {width: size.w, height: size.h, count: 8 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        	highlight: [1, 1, "highlight"],
	        	push: [2, 2, "push"],
	        	disable: [3, 3, "disable"],
	        	checked: [4, 4, "checked"],
	        	checkedHighlight: [5, 5, "checkedHighlight"],
	        	checkedPush: [6, 6, "checkedPush"],
	        	checkedDisable: [7, 7, "checkedDisable"],
	        }
	    };
	    
	   	this.spriteSheet = new createjs.SpriteSheet( data );
	   	this.gotoAndPlay( "normal" );
	}
	p._init_text = function(){
		this._object.setText( this.text );
		this._object.setFontSize( this.fontSize );
		this._object.setFontStyle( this.fontStyle );
		this._object.setColor( this.color );
		this._object.setItalic( this.italic );
		this._object.setBold( this.bold );
		this._object.setPosition( this.x + this.getSize().w + this._object.getFontSize(), 
			this.y + ( this.getSize().h / 2 - ( this._object.getSize().h / 2 ) ) );
		// 描述为几态按钮(1-正常 2-高亮 3-按下 4-禁用)
		this.parent.addChild( this._object );
	}
	p._reset_disable = function(){
		if( this.disable ){
			this.gotoAndPlay( this.checked ? "checkedDisable" : "disable" );
		}else{
			this.gotoAndPlay( this.checked ? "checked" : "normal" );
		}
	}
	 /**
	  * 当按钮按下时，文本控件做字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mousedown = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checkedPush":"push" );
	 }
	 /**
	  * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_pressup = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	/**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseover
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseover = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checkedHighlight" : "highlight" );
	 }
	 /**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseout
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseout = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	 p._handle_click = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.setChecked( !this.checked );
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	jees.UI.CheckBox = createjs.promote( CheckBox, "Button" );
})();