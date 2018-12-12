
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
		 * @property group
		 * @type {String}
		 * @defualt ""
		 */
		this.group = "";
		/**
		 * @public
		 * @override
		 * @property types
		 * @type {String}
		 * @default "normal, highlight, push, disable, checked, checkedHighlight, checkedPush, checkedDisable"
		 */
		this.types = "normal, highlight, push, disable, checked, checkedHighlight, checkedPush, checkedDisable";
// private properties:
		/**
		 * @private
		 * @property _text
		 * @type {jees.UI.TextBox}
		 */
		this._text = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( CheckBox, jees.UI.Button );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.Button_initialize();
		
		var _this = this;
        jees.E.bind( this, "click", function( e ){ _this._handle_click( e, _this ); });
        
	    this._reset_checked();
	}
	/**
	 * 设置状态
	 * @public
	 * @method setChecked
	 * @param {Boolean} _e
	 */
	p.setChecked = function( _e ){
		this.checked = _e;
		this._reset_checked();
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
	/**
	 * @private
	 * @method _init_skin
	 */
	p._init_skin = function(){
		var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		
		this._data.images.push( this._skin.getCacheDataURL("rect") );
		this._data.images.push( this._skin.getCacheDataURL("highlight") );
		this._data.images.push( this._skin.getCacheDataURL("push") );
		this._data.images.push( this._skin.getCacheDataURL("disable") );
		this._data.images.push( this._skin.getCacheDataURL("checked") );
		this._data.images.push( this._skin.getCacheDataURL("checkedHighlight") );
		this._data.images.push( this._skin.getCacheDataURL("checkedPush") );
		this._data.images.push( this._skin.getCacheDataURL("checkedDisable") );
		
		this._data.animations.normal = [0, 0, "normal"];
		this._data.animations.highlight = [1, 1, "highlight"];
		this._data.animations.push = [2, 2, "push"];
		this._data.animations.disable = [3, 3, "disable"];
		this._data.animations.checked = [4, 4, "checked"];
		this._data.animations.checkedHighlight = [5, 5, "checkedHighlight"];
		this._data.animations.checkedPush = [6, 6, "checkedPush"];
		this._data.animations.checkedDisable = [7, 7, "checkedDisable"];
		
		this._data.frames.count = 8;
	}
	/**
	 * @private
	 * @method _handle_click
	 * @param {createjs.Event} _e
	 * @param {jees.Widget} _w
	 */
	p._handle_click = function( _e, _w ){
		if( _w.isDisabled() ) return;
		_w.setChecked( !_w.checked );
	}
	/**
	 * @private
	 * @method _reset_checked
	 */
	p._reset_checked = function(){
		if( this.isDisabled() ) return;
		if( this.types.toLowerCase().indexOf( "checked" ) != -1 ){			
			this.gotoAndPlay( this.checked ? "checked" : "normal" );
		}else this.gotoAndPlay( "normal" );
	}
	jees.UI.CheckBox = createjs.promote( CheckBox, "Button" );
})();