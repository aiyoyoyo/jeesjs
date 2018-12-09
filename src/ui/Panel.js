/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/ui/Panel.js
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
	 * @class Panel
	 * @extends jees.UI.Widget
	 * @constructor
	 */
    function Panel(){
    	this.Widget_constructor();
// public properties:
		/**
    	 * 使用的皮肤
		 * @public
		 * @property skinResource
    	 * @type {String}
    	 * @default null
    	 */
    	this.property.skinResource = "default";
    	/**
    	 * 使用得皮肤类型
    	 * @public
    	 * @property skinType
    	 * @type {String}
    	 * @default null
    	 */
    	this.property.skinType = "Panel";
// private properties:
		/**
		 * 控件使用得皮肤，为空不使用
		 * @private
		 * @property _skin
		 * @type {jees.Skin}
		 * @default null
		 */
		this._skin = null;
		/**
		 * @private
		 * @property _object
		 * @extend
		 * @type {jees.UI.ImageBox}
		 * @default null
		 */
		this._background = null;
    };
  	var p = createjs.extend( Panel, jees.UI.Widget );
// public methods: ============================================================
    p.initialize = function(){
    	if( this.property.state ) return;
    	
    	this.Widget_initialize();
    	
		this._reset_background();
		
//		this._cache();
	};
	p.setSkinType = function( _t ){
		this.property.skinType = _t;
		this._reset_background();
	};
// private method: ============================================================
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		this.Widget__reset_size();
		// 重设背景大小
		this._reset_background();
	};
	/**
	 * @private
	 * @method _reset_background
	 */
	p._reset_background = function(){
		if( !this._background ){
			if( this.property.enableSkin || ( !this.property.enableSkin && this.property.resource ) ){
				this._background = new jees.UI.ImageBox();
				this.addChildAt( this._background, this.visibeMask ? 1 : 0 );
				this._background.initialize();
			}
		}
		
		if( this.property.enableSkin ){
			this._reset_skin();
		}else{
			if( this.property.resource )
				this._reset_custom();
		}
	};
	/**
	 * @private
	 * @method _reset_custom_grid
	 */
	p._reset_custom_grid = function(){
		var size = this.getSize();
		
		var res = jees.Resource.get( this.property.resource );
		var rw = res.width;
		var rh = res.height;
		var rs = this.property.region.split(",");
		var rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, size.w, size.h );
		
		var tc = jees.CJS.newContainer();
		var bg = jees.CJS.newBitmap( res );
		var _this = this;
		rg.forEach( function( _r ){
			var o = bg.clone();
			o.sourceRect = jees.CJS.newRect( _r.x, _r.y, _r.w, _r.h );
			o.x = _r.dx;
			o.y = _r.dy;
			o.scaleX = _r.sw;
			o.scaleY = _r.sh;
			o.cache( 0, 0, _r.w , _r.h );
			tc.addChild( o );
		} );
		
		tc.cache( 0, 0, size.w, size.h );
		
		var b = tc.getBounds();
		this.property.resource = tc.getCacheDataURL();
		this._background.setSize( size.w, size.h );
		this._reset_background_resource();
	};
	/**
	 * @private
	 * @method _reset_custom
	 */
	p._reset_custom = function(){
		var size = this.getSize();
		this._reset_background_resource();
		
		switch( this.property.style ){
			case 1: // 拉伸
				var res = jees.Resource.get( this.property.resource );
				var sx = size.w / res.width;
				var sy = size.h / res.height;
				this._background.setScale( sx, sy );
				break;
			case 2: // 平铺
				if( this.mask == null ){
					this.mask = jees.CJS.newShape();
				}
				this.addChildAt( this.mask, 0 );
				this.mask.graphics.beginBitmapFill( this._background.image ).drawRect( 0, 0, size.w, size.h );
				this.mask.cache( 0, 0, size.w, size.h );
				break;
			case 3: //9宫格
				this._reset_custom_grid();
				break;
			case 0:
			default:
				this._background.alignX = 1;
				this._background.alignY = 1;
				this._background.setPosition( 0, 0 );
				break;
		}
	};
	/**
	 * @private
	 * @method _reset_skin
	 */
	p._reset_skin = function(){
		var size = this.getSize();
		if( !this._skin ){
			this._skin = new jees.UI.Skin( this.property.skinType, size.w, size.h, this.property.skinResource );
		}
		if( this._skin.getSkinType() != this.property.skinType || this._skin.getSkinResource() != this.property.skinResource ){
			this._skin = new jees.UI.Skin( this.property.skinType, size.w, size.h, this.property.skinResource );
		}
		
		this.property.resource = this._skin.getCacheDataURL("rect");
		
		this._reset_background_resource();
	};
	/**
	 * @private
	 * @method _reset_background_resource
	 */
	p._reset_background_resource = function(){
		if( this._background.getResource() != this.property.resource ){
			this._background.setResource( this.property.resource );
		}
	};

	jees.UI.Panel = createjs.promote( Panel, "Widget" );
})();