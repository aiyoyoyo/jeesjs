/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/ui/InputBox.js
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
	 * @class InputBox
	 * @extends jees.UI.ImageBox
	 * @constructor
	 */
    function InputBox(){
    	this.Button_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Panel"
    	 */
		this.property.skinResource = "InputBox";
		/**
		 * @public
		 * @property placeholder
		 * @type {String}
		 * @default "";
		 */
		this.placeholder = "";
		/**
		 * 不为空时用字符替换输入内容
		 * @public
		 * @property password
		 * @type {Boolean}
		 * @default false
		 */
		this.password = false;
		this.paddingX = 0;
		this.paddingY = 0;
		this.warp = false;
// private properties:
    	var o = document.body;
    	var ipt = document.createElement("INPUT");
    	o.appendChild( ipt );
    	/**
    	 * 输入框对象
    	 */
    	this._domElement = new createjs.DOMElement( ipt );
    	/**
    	 * 输入框的HTML元素
    	 */
    	this._input = this._domElement.htmlElement;
    };
  	var p = createjs.extend( InputBox, jees.UI.Button );
// public methods: ============================================================
    p.initialize = function(){
    	if( this.property.state ) return;
		this.Button_initialize();
		
		if( this.types.indexOf( "push") != -1 ){
			jees.E.unbind( this, "mousedown" );
        	jees.E.unbind( this, "pressup" );
		}
		
		this._init_input();
		
    	if( this.property.enableMask ){
    		this._input.hidden = true;
    		var _this = this;
    		jees.E.bind( this, "click", function( _e ){
    			_this._input.hidden = false;
	    		_this._input.focus();
	    	});
    		
    		this._input.style.setProperty( "hidden", "true" );
    		
      		this._input.onfocus = function( _e ){
	    		_this._input.hidden = false;
    			_this._text.setVisible( false );
	    	}
	    	this._input.onblur = function( _e ){
	    		_this._input.hidden = true;
	    		_this._text.setVisible( true );
	    		_this._reset_text();
	    	}
	    	this._input.onchange = function( _e ){
	    		_this._input.hidden = true;
	    	}
    	}
	};
	/**
	 * @public
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function( _t ){
		this._input.value = _t;
		this._reset_text();
	};
	/**
	 * @public
	 * @method getText
	 * @param {String} _t
	 */
	p.getText = function(){
		return this._input.value;
	}
// private method: ============================================================
	/**
	 * @private
	 * @method _init_text
	 */
	p._init_text = function(){
		if( !this.property.enableMask ) return;
		
		var parent = this.parent;
		var txt = this._text;
		
		parent.addChildAt( txt, parent.getChildIndex( this ) + 1 );
		txt.text = this.placeholder;
		txt.fontSize = this.fontSize;
		txt.fontStyle = this.fontStyle;
		txt.color = this.color;
		txt.italic = this.italic;
		txt.bold = this.bold;
		txt.mouseEnabled = false;
		txt.lineWidth = this.getSize().w - this.paddingX * 2;
		txt.warp = this.warp;
		
		txt.initialize();
	}
	p._init_input = function(){
		var parent = this.parent;
		var ipt = this._domElement;
		
		jees.APP.addChild( ipt );
		
		this._reset_input();
	}
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		this.ImageSpt__reset_position();
		if( !this.property.enableMask ) return;
		
		this._reset_input();
		
		var txt = this._text;
		if( txt != undefined ){
			var size = this.getSize();
			var align = this.getAlign();
			
			if( align.x == 0 ){
				txt.property.offsetX = this.paddingX;
			}else if( align.x == 1 ){
				txt.property.offsetX = this.paddingX - size.w / 2 ;
			}else if( align.x == 2 ){
				txt.property.offsetX = this.paddingX - size.w;
			}
			if( align.y == 0 ){
				txt.property.offsetY = this.paddingY;
			}else if( align.y == 1 ){
				txt.property.offsetY = this.paddingY - size.h / 2;
			}else if( align.y == 2 ){
				txt.property.offsetY = this.paddingY - size.h;
			}
			
			txt.x = this.x + txt.property.offsetX;
			txt.y = this.y + txt.property.offsetY;
		}
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
//		var size = this.getSize();
//		// 保证内部背景元素与容器一致
//		var sx = jees.DEV.width / jees.SET.getWidth();
//		var sy = jees.DEV.height / jees.SET.getHeight();
//		
//		var fix_w = size.w * sx;
//		var fix_h = size.h * sy;
//		
//		var style = this._input.style;
//		style.setProperty( "width", fix_w  + "px" );
//		style.setProperty( "height", fix_h + "px" );
//		
//		if( this._text ){
//			if( this._text.property.state ){
//				this._text.setLineWidth( size.w - this.paddingX * 2 );
//			}else{
//				this._text.lineWidth = size.w - this.paddingX * 2;
//			}
//  	}
	}
	/**
	 * @private
	 * @method _reset_input
	 */
	p._reset_input = function(){
		var size = this.getSize();
		// 保证内部背景元素与容器一致
		var sx = jees.DEV.width / jees.SET.getWidth();
		var sy = jees.DEV.height / jees.SET.getHeight();
		var pos = this.getAbsPosition();
		var fix_w = size.w * sx;
		var fix_h = size.h * sy;
		var fix_x = pos.x * sx;
		var fix_y = pos.y * sy;

		this._input.type = this.password ? "password" : "text";
		this._input.placeholder = this.placeholder;
		var style = this._input.style;
		style.setProperty( "color", this.color );
		style.setProperty( "width", fix_w  + "px" );
		style.setProperty( "height", fix_h + "px" );
		style.setProperty( "left", fix_x  + "px" );
		style.setProperty( "top", fix_y + "px" );
		style.setProperty( "padding", this.paddingX  + "px " + this.paddingY  + "px " + this.paddingX  + "px " + this.paddingY  + "px" );
		style.setProperty( "font-size", this.fontSize + "px" );
	}
	/**
	 * @private
	 * @method _reset_text
	 */
	p._reset_text = function(){
		if( this._text ){
			var content = this.password ? "********" : ( this._input.value != "" ? this._input.value : this.placeholder  );
			this._text.setText( content );
			this._text.x = this.x + this._text.property.offsetX;
			this._text.y = this.y + this._text.property.offsetY;
		}
	}
	jees.UI.InputBox = createjs.promote( InputBox, "Button" );
})();