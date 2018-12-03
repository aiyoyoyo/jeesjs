
/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/Button.js
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
	 * TODO 自定义皮肤和素材的配合有点问题。
	 * @class Button
	 * @extends jees.UI.ImageSpt
	 * @constructor
	 */
	function Button() {
		this.ImageSpt_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Button"
    	 */
		this.property.skinResource = "Button";
		/**
		 * @public
		 * @property text
		 * @type {String}
		 * @default ""
		 */
		this.text = "";
		/**
		 * @public
		 * @property types
		 * @type {Integer}
		 * @default 4
		 */
		this.types = 4;
		/**
		 * 是否禁用控件
		 * @public
		 * @property disable
		 * @type {Boolean}
		 * @default false
		 */
		this.disable = false;
		/**
		 * @public
		 * @property italic
		 * @type {Boolean}
		 * @default false
		 */
		this.italic = false;
		/**
		 * @public
		 * @property bold
		 * @type {Boolean}
		 * @default false
		 */
		this.bold = false;
		/**
		 * 拆分的字体样式-字体样式
		 * @public
		 * @property fontStyle
		 * @type {String}
		 * @default "Arial"
		 */
		this.fontStyle = "Arial";
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
		 * @public
		 * @property spriteX
		 * @type {Integer}
		 * @default 0
		 */
		this.spriteX = 0;
		/**
		 * @public
		 * @property spriteY
		 * @type {Integer}
		 * @default 0
		 */
		this.spriteY = 0;
		/**
		 * @public
		 * @property region
		 * @type {String}
		 * @default ""
		 */
		this.region = "";
// private properties:
		this._text = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( Button, jees.UI.ImageSpt );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
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
		this._reset_disable();
	    this._reset_position();
	}
	/**
	 * 设置状态
	 * @public
	 * @method setDisabled
	 * @param {Boolean} _e
	 */
	p.setDisabled = function( _e ){
		this.disable = _e;
	}
	/**
	 * 是否禁用
	 * @public
	 * @method isDisabled
	 * @return {Boolean}
	 */
	p.isDisabled = function(){
		return this.disable;
	}
	/**
	 * @public
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function( _t ){
		this._text.setText( _t );
	}
	/**
	 * @public
	 * @method getText
	 * @return {String}
	 */
	p.getText = function(){
		return this._text.text;
	}
	/**
     * @method setPosition
     * @extends
     * @param {Integer} _x
     * @param {Integer} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
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
	}
	/**
	 * @private
	 * @method _init_custom
	 */
	p._init_custom = function(){
		var bitmap = jees.CJS.newBitmap( jees.Resource.get( this.property.resource ) );
		var b = bitmap.getBounds();
		var c = this.types.split(",").length;
		var size = this.getSize();
		var w = this.spriteX == 0 ? size.w : this.spriteX;
		var h = this.spriteY == 0 ? size.h : this.spriteY;
		var rw = this.spriteX == 0 ? b.width : this.spriteX;
		var rh = this.spriteY == 0 ? b.height : this.spriteY;
		
		var rg = null;
		if( this.region != "" ){
			var rs = this.region.split(",");
			rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, w, h );
		}
		
		for( var i = 0; i < c; i ++ ){
			var bg = bitmap.clone();
			var x = this.spriteX * i;
			var y = this.spriteY * i;
			bg.sourceRect = jees.CJS.newRect( x, y, w, h );
			bg.cache( 0, 0, w, h );
			
			if( this.region != "" ){
				var tc = jees.CJS.newContainer();
				rg.forEach( function( _r ){
					var o = bg.clone();
					o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
					o.x = _r.dx;
					o.y = _r.dy;
					o.scaleX = _r.sw;
					o.scaleY = _r.sh;
					
					o.cache( 0, 0, w, h );
					tc.addChild( o );
				} );
				tc.cache( 0, 0, w, h );
				this._data.images.push( tc.bitmapCache.getCacheDataURL() );
			}else{
				this._data.images.push( bg.bitmapCache.getCacheDataURL() );
			}
		}
	}
	/**
	 * @private
	 * @method _init_background
	 */
	p._init_background = function(){
		var size = this.getSize();
		
		this._data = {
			images: [],
			frames: {width: size.w, height: size.h, count: 4 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        	highlight: [1, 1, "highlight"],
	        	push: [2, 2, "push"],
	        	disable: [3, 3, "disable"],
	        	test: [0, 3, "test", 0.15],
	        }
	   	};
	   	
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
		
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
		this.gotoAndPlay( "test" );
	}
	/**
	 * @private
	 * @method _init_text
	 */
	p._init_text = function(){
		var parent = this.parent;
		var txt = this._text;
		
		parent.addChildAt( txt, parent.getChildIndex( this ) + 1 );
		
		txt.setText( this.text );
		txt.setFontSize( this.fontSize );
		txt.setFontStyle( this.fontStyle );
		txt.setColor( this.color );
		txt.setItalic( this.italic );
		txt.setBold( this.bold );
		txt.setPosition( this.x + ( this.getSize().w / 2 ) - ( txt.getSize().w / 2 ) , 
			this.y + ( this.getSize().h / 2 - ( txt.getSize().h / 2 ) ) );
	}
	/**
	 * @private
	 * @method _reset_disable
	 */
	p._reset_disable = function(){
		if( this.disable ){
			this.gotoAndPlay( "disable" );
		}else{
			this.gotoAndPlay( "normal" );
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
	 	var txt = _w._text;
	 	var pos = txt.getPosition();
	 	var offset = txt.getFontSize() / 10;
	 	
	 	txt.setPosition( pos.x - offset, pos.y - offset );
	 	_w.gotoAndPlay( "push" );
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
	 	var txt = _w._text;
	 	var pos = txt.getPosition();
	 	var offset = txt.getFontSize() / 10;
	 	txt.setPosition( pos.x + offset, pos.y + offset );
	 	_w.gotoAndPlay( "normal" );
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
	 	_w.gotoAndPlay( "highlight" );
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
		_w.gotoAndPlay( "normal" );
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		this.ImageSpt__reset_position();
		var pos = this.getPosition();
		var size = this.getSize();
		var txt = this._text;
		var txt_size = txt.getSize();
		
		txt.setPosition( pos.x + ( size.w / 2 ) - ( txt_size.w / 2 ) , 
			pos.y + ( size.h / 2 - ( txt_size.h / 2 ) ) );
	}

	jees.UI.Button = createjs.promote( Button, "ImageSpt" );
})();