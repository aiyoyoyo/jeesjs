
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
		/**
		 * @public
		 * @property textX
		 * @type {Integer}
		 * @defualt 0
		 */
		this.textX = 0;
		/**
		 * @public
		 * @property textY
		 * @type {Integer}
		 * @defualt 0
		 */
		this.textY = 0;
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
        
        jees.E.bind( this, "click", function( e ){ _this._handle_click( e, _this ); });
        
		this._reset_disable();
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
		this.state = true;
		var size = this.getSize();
		
		this._data = {
			images: [],
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
	   	
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
		
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
		this.gotoAndPlay( "normal" );
	}
	/**
	 * @private
	 * @method _reset_disable
	 */
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
		_w.gotoAndPlay( _w.checked ? "checkedHighlight" : "highlight" );
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
	 	_w.gotoAndPlay( _w.checked ? "checked" : "normal" );
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
		_w.gotoAndPlay( _w.checked ? "checked" : "normal" );
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
		
		txt.setPosition( pos.x + ( size.w / 2 ) - ( txt_size.w / 2 ) + this.textX , 
			pos.y + ( size.h / 2 - ( txt_size.h / 2 ) ) + this.textY );
	}
	jees.UI.CheckBox = createjs.promote( CheckBox, "Button" );
})();