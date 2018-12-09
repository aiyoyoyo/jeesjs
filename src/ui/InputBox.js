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
    	this.ImageBox_constructor();
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
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
		/**
		 * @public
		 * @property color
		 * @type {String}
		 * @default "#FFFFFF"
		 */
		this.color = "#FFFFFF";
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
		/**
		 * 皮肤对象
		 */
		this._skin = null;
		
    	var o = document.body;
    	var ipt = document.createElement("INPUT");
    	o.appendChild( ipt );
    	/**
    	 * 输入框对象
    	 */
    	this._object = new createjs.DOMElement( ipt );
    	/**
    	 * 输入框的HTML元素
    	 */
    	this._input = this._object.htmlElement;
    	/**
    	 * 遮罩对象
    	 */
  		this._mask = null;
    };
  	var p = createjs.extend( InputBox, jees.UI.ImageBox );
// public methods: ============================================================
    p.initialize = function(){
    	if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
    	this._init_background();
    	
		this.parent.addChildAt( this._object, this.parent.getChildIndex( this ) + 1 );
		// 遮罩调整
    	if( this.property.enableMask ){
    		this._mask = new jees.UI.TextBox();
    		this._init_text();
    	}
		
		this._reset_size();
	    this._reset_position();
		this._reset_input();
		
	    var _this = this;
	    
    	if( this.property.enableMask ){
    		this._input.hidden = true;
    		jees.E.bind( this, "click", function( _e ){
    			_this._input.hidden = false;
	    		_this._input.focus();
	    	});
    		
    		this._input.style.setProperty( "hidden", "true" );
    		
      		this._input.onfocus = function( _e ){
	    		_this._input.hidden = false;
    			_this._mask.setVisible( false );
	    	}
	    	this._input.onblur = function( _e ){
	    		_this._input.hidden = true;
	    		_this._mask.setVisible( true );
	    		_this._reset_text();
	    	}
	    	this._input.onchange = function( _e ){
	    		_this._input.hidden = true;
	    	}
    	}
	};
	/**
	 * 
	 */
	p.setSize = function( _w, _h ){
		
	}
// private method: ============================================================
	/**
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		var b = this.getBounds();
		this.cache( 0, 0, b.width, b.height );
	}
	/**
	 * @private
	 * @method _init_skin
	 */
	p._init_skin = function(){
		var size = this.getSize();
		if( !this._skin ){
			this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
			this.property.resource = this._skin.getCacheDataURL("rect");
			
			this.image.src = this.property.resource;
		}
	}
	/**
	 * @private
	 * @method _init_custom_grid
	 */
	p._init_custom_grid = function(){
		var size = this.getSize();
		var img = jees.Resource.get( this.property.resource );
		var rw = img.width;
		var rh = img.height;
		var rs = this.property.region.split(",");
		var rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, size.w, size.h );
		
		var tc = jees.CJS.newContainer();
		var bg = jees.CJS.newBitmap( img );
		rg.forEach( function( _r ){
			var o = bg.clone();
			o.sourceRect = jees.CJS.newRect( _r.x, _r.y, _r.w, _r.h );
			o.x = _r.dx;
			o.y = _r.dy;
			o.scaleX = _r.sw;
			o.scaleY = _r.sh;
			tc.addChild( o );
		} );
		tc.cache( 0, 0, size.w, size.h );
		this.image.src = tc.bitmapCache.getCacheDataURL();
	}
	/**
	 * @private
	 * @method _init_custom
	 */
	p._init_custom = function(){
		if( this.property.region != "" ){
			this._init_custom_grid();
		}else{
			this.image.src = jees.Resource.get( this.property.resource );
		}
	}
	/**
	 * @private
	 * @method _init_background
	 */
	p._init_background = function(){
		this.image = document.createElement("img");
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
	}
	/**
	 * @private
	 * @method _init_text
	 */
	p._init_text = function(){
		this.parent.addChildAt( this._mask, this.parent.getChildIndex( this ) + 1 );
		
		this._mask.warp = this.warp;
		this._mask.fontSize = this.fontSize;
		this._mask.color = this.color;
		
//		this._mask.setFontStyle( this.fontStyle );
//		this._mask.setItalic( this.italic );
//		this._mask.setBold( this.bold );
	}
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var abs_pos = this.getAbsPosition();
		var pos = this.getPosition();
		this.x = pos.x;
		this.y = pos.y;
		
		var sc = jees.SET.getViewportScale();
		var sx = jees.DEV.width / jees.SET.getWidth();
		var sy = jees.DEV.height / jees.SET.getHeight();
		
		var fix_x = pos.x * sx;
		var fix_y = pos.y * sy;
		// TODO DOM实际坐标根据缩放会存在偏差，需要重新计算
		var style = this._input.style;
//		style.setProperty( "left", fix_x  + "px" );
//		style.setProperty( "top", fix_y + "px" );
		style.setProperty( "padding", this.paddingY + "px " + this.paddingX + "px " + this.paddingY + "px " + this.paddingX + "px " );
		this._object.x = fix_x;
		this._object.y = fix_y;
		
		if( this._mask ){
			var x = pos.x + this.paddingX;
			var y = pos.y + this.paddingY;
			
			if( !this._mask.property.state ){
				this._mask.x = x;
				this._mask.y = y;
			}else{
				this._mask.setPosition( x, y );
			}
		}
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var size = this.getSize();
		// 保证内部背景元素与容器一致
		var sx = jees.DEV.width / jees.SET.getWidth();
		var sy = jees.DEV.height / jees.SET.getHeight();
		
		var fix_w = size.w * sx;
		var fix_h = size.h * sy;
		
		var style = this._input.style;
		style.setProperty( "width", fix_w  + "px" );
		style.setProperty( "height", fix_h + "px" );
		
		if( this._mask ){
			if( this._mask.property.state ){
				this._mask.setLineWidth( size.w - this.paddingX * 2 );
			}else{
				this._mask.lineWidth = size.w - this.paddingX * 2;
			}
    	}
	}
	/**
	 * @private
	 * @method _reset_input
	 */
	p._reset_input = function(){
		var style = this._input.style;
		
		this._input.type = this.password ? "password" : "text";
		this._input.placeholder = this.placeholder;
		style.setProperty( "color", this.color );
		
		this._reset_text();
	}
	/**
	 * @private
	 * @method _reset_text
	 */
	p._reset_text = function(){
		if( this._mask ){
			if( this._mask.property.state ){
				this._mask.setText( this._input.value != "" ? this._input.value : this.placeholder );
			}else{
				this._mask.text = this._input.value != "" ? this._input.value : this.placeholder;
			}
		}
	}
	jees.UI.InputBox = createjs.promote( InputBox, "ImageBox" );
})();