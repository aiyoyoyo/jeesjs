
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
		 * @type {String}
		 * @default "normal, highlight, push, disable"
		 */
		this.types = "normal, highlight, push, disable";
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
		 * @property checked
		 * @type {Boolean}
		 * @default false
		 */
		this.checked = false;
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
	};
	/**
	 * 设置状态
	 * @public
	 * @method setDisabled
	 * @param {Boolean} _e
	 */
	p.setDisabled = function( _e ){
		this.disable = _e;
		this._reset_disable();
	};
	/**
	 * 是否禁用
	 * @public
	 * @method isDisabled
	 * @return {Boolean}
	 */
	p.isDisabled = function(){
		return this.disable;
	};
	/**
	 * @public
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function( _t ){
		this._text.setText( _t );
	};
	/**
	 * @public
	 * @method getText
	 * @return {String}
	 */
	p.getText = function(){
		return this._text.text;
	};
	/**
	 * @public
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function( _v ){
		this.visible = _v;
		this._text.setVisible( this.visible );
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
		
		this._data.animations.normal = [0, 0, "normal"];
		this._data.animations.highlight = [1, 1, "highlight"];
		this._data.animations.push = [2, 2, "push"];
		this._data.animations.disable = [3, 3, "disable"];
		
		this._data.frames.count = 4;
	};
	/**
	 * @private
	 * @method _init_custom
	 */
	p._init_custom = function(){
		var bitmap = jees.CJS.newBitmap( jees.Resource.get( this.property.resource ) );
		var b = bitmap.getBounds();
		var types = this.types.split(",");
		var c = types.length;
		var size = this.getSize();
		var w = this.spriteX == 0 ? size.w : this.spriteX;
		var h = this.spriteY == 0 ? size.h : this.spriteY;
		var rw = this.spriteX == 0 ? b.width : this.spriteX;
		var rh = this.spriteY == 0 ? b.height : this.spriteY;
		
		this.cols = b.width / rw;
		this.rows = b.height / rh;
		
		var rg = null;
		if( this.property.region ){
			var rs = this.property.region.split(",");
			rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, w, h );
		}
		
		for( var i = 0; i < c; i ++ ){
			var bg = bitmap.clone();
			var x = this.spriteX * i;
			var y = this.spriteY * i;
			bg.sourceRect = jees.CJS.newRect( x, y, rw, rh );
			bg.cache( 0, 0, rw, rh );
			if( rg ){
				var tc = jees.CJS.newContainer();
				
				rg.forEach( function( _r ){
					var o = bg.clone();
					o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
					o.x = _r.dx;
					o.y = _r.dy;
					o.scaleX = _r.sw;
					o.scaleY = _r.sh;
					tc.addChild( o );
				} );
				tc.cache( 0, 0, size.w, size.h );
				this._data.images.push( tc.getCacheDataURL() );
			}else{
				this._data.images.push( bg.getCacheDataURL() );
			}
			if( types[i].toLowerCase().trim() == "normal") this._data.animations.normal = [i, i, "normal"];
			if( types[i].toLowerCase().trim() == "highlight") this._data.animations.highlight = [i, i, "highlight"];
			if( types[i].toLowerCase().trim() == "push") this._data.animations.push = [i, i, "push"];
			if( types[i].toLowerCase().trim() == "disable") this._data.animations.disable = [i, i, "disable"];
			if( types[i].toLowerCase().trim() == "checked") this._data.animations.checked = [i, i, "checked"];
			if( types[i].toLowerCase().trim() == "checkedHighlight") this._data.animations.checkedHighlight = [i, i, "checkedHighlight"];
			if( types[i].toLowerCase().trim() == "checkedPush") this._data.animations.checkedPush = [i, i, "checkedPush"];
			if( types[i].toLowerCase().trim() == "checkedDisable") this._data.animations.checkedDisable = [i, i, "checkedDisable"];
		}
		this._data.frames.count = c;
		
		if(rg){
			this._data.frames.width = w;
			this._data.frames.height = h;
		}else{
			this._data.frames.width = rw;
			this._data.frames.height = rh;
		}
	};
	/**
	 * @private
	 * @method _init_background
	 */
	p._init_background = function(){
		var size = this.getSize();
		
		this._data = {
			images: [],
			frames: {width: size.w, height: size.h, count: 1 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        }
	   	};
	   	
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
		this.gotoAndPlay( "normal" );
	};
	/**
	 * @private
	 * @method _init_text
	 */
	p._init_text = function(){
		var parent = this.parent;
		var txt = this._text;
		
		parent.addChildAt( txt, parent.getChildIndex( this ) + 1 );
		txt.text = this.text;
		txt.fontSize = this.fontSize;
		txt.fontStyle = this.fontStyle;
		txt.color = this.color;
		txt.italic = this.italic;
		txt.bold = this.bold;
		txt.mouseEnabled = false;
		
		txt.regX = txt.getSize().w / 2;
		txt.regY = txt.getSize().h / 2;
		
		txt.initialize();
	};
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
	};
	/**
	 * 当按钮按下时，文本控件做字体/10大小的偏移
	 * @private
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jees.Widget} _w
	 */
	p._handle_mousedown = function( _e, _w ){
		if( _w.isDisabled() ) return;
	 	_w.gotoAndPlay( _w.checked ? "checkedPush":"push" );
	 	
	 	var size = this._text.getSize();
		this._text.property.offsetY += size.h / 4;		
		this._text.setPosition();
	};
	/**
	 * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	 * @private
	 * @method _handle_mousedown
	 * @param {createjs.Event} _e
	 * @param {jees.Widget} _w
	 */
	p._handle_pressup = function( _e, _w ){
		if( _w.isDisabled() ) return;
	 	_w.gotoAndPlay( _w.checked ? "checked" : "normal" );
	 	
	 	var size = this._text.getSize();
		this._text.property.offsetY -= size.h / 4;		
		this._text.setPosition();
	};
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
	};
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
	};
	/** 
	 * @method _reset_size
	 * @private
	 */
	p._reset_size = function(){
		if( !this.property.region ){
			var pro_size = this.property.getResourceSize();
			var pro_w = pro_size.w / this.cols;
			var pro_h = pro_size.h / this.rows;
			var size = this.getSize();
			
			if( pro_w != -1 && size.w != pro_w ){
				this.property.scaleX = size.w / pro_w;
			}
			if( pro_h != -1 && size.h != pro_h ){
				this.property.scaleY = size.h / pro_h;
			}
			this._reset_scale();
		}
	};
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		this.ImageSpt__reset_position();
		var txt = this._text;
		if( !txt ) return;
		
		var txt_size = txt.getSize();
		var size = this.getSize();
		var align = this.getAlign();
		
		txt.property.alignX = align.x;
		txt.property.alignY = align.y;
		if( align.x == 0 ){
			txt.property.offsetX = this.property.offsetX + ( size.w - txt_size.w ) / 2;
			txt.property.offsetX += this.textX;
		}else if( align.x == 1 ){
			txt.property.offsetX = this.property.offsetX;
			txt.property.offsetX += this.textX;
		}else if( align.x == 2 ){
			txt.property.offsetX = this.property.offsetX + ( size.w - txt_size.w ) / 2;
			txt.property.offsetX -= this.textX;
		}
		if( align.y == 0 ){
			txt.property.offsetY = this.property.offsetY + ( size.h - txt_size.h ) / 2;
			txt.property.offsetY += this.textY;	
		}else if( align.y == 1 ){
			txt.property.offsetY = this.property.offsetY;
			txt.property.offsetY += this.textY;	
		}else if( align.y == 2 ){
			txt.property.offsetY = this.property.offsetY + ( size.h - txt_size.h ) / 2;
			txt.property.offsetY -= this.textY;	
		}	
		txt.setAlign();
		txt.setPosition();
	};
	jees.UI.Button = createjs.promote( Button, "ImageSpt" );
})();