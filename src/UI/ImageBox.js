/*
 * Author: Aiyoyoyo 
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/UI/ImageBox.js
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
	 * 支持基本的图片格式。
	 * @class ImageBox
	 * @extends jeesjs.Widget
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @constructor
	 */
	function ImageBox( _r ) {
		this.Widget_constructor();
// private properties:
		/**
		 * 图片源
		 * @property _source
		 * @type {object}
		 */
		this._source = null;
		/**
		 * 图片源路径
		 * @property _sourcePath
		 * @type {object}
		 */
		this._sourcePath = null;
		/**
		 * 图片是否加载完毕
		 * @property _state
		 * @type {Boolean}
		 * @default false;
		 */
		this._state = false;
		/**
		 * 区域对象
		 * @property _rect
		 * @type {createjs.Rectangle}
		 */
		this._rect = null;
		/**
		 * 图片资源宽度
		 * @property _sourceWidth
		 * @type {Number}
		 */
		this._sourceWidth = 0;
		/**
		 * 图片资源高度
		 * @property _sourceHeight
		 * @type {Number}
		 */
		this._sourceHeight = 0;
		/**
		 * 横向缩放比
		 * @property _scaleX
		 * @type {Float}
		 */
		this._scaleX = 1.0;
		/**
		 * 纵向缩放比
		 * @property _scaleX
		 * @type {Float}
		 */
		this._scaleY = 1.0;
		/**
		 * 图片对象
		 * @property _source
		 * @type {createjs.Bitmap}
		 */
		this._object = null;

		this._onload( _r );
	};
// public static properties

	var p = createjs.extend(ImageBox, jeesjs.Widget);
// public method
	/**
     * 设置坐标
     * @method setPosition
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( _x , _y );
		this._reset_position();
	};
	/**
	 * 设置图片宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
	 */
	p.setSize = function( _w, _h ){
		this.Widget_setSize( _w, _h );
		this._reset_size();
	}
	/**
	 * 绘制图片的局部
	 * @method setRect
	 * @param {Number} _x
	 * @param {Number} _y
	 * @param {Number} _w
	 * @param {Number} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		if( this._rect == null ) this._rect = new createjs.Rectangle( _x, _y, _w, _h );
		else this._rect.setValues( _x, _y, _w, _h );
		this._reset_rect();
	}
	/**
	 * 等比缩放某个组件
	 * @method setScale
	 * @param {Number} _sx
	 * @param {Number} _sy
	 */
	p.setScale = function( _sx, _sy ) {
		if( _sx ) this._scaleX = _sx;
		if( _sy ) this._scaleY = _sy;
		this._reset_scale();
	}
	/**
	 * 设置平铺，TODO: 未完成
	 * @method setTile
	 * @param {Number} _w 
	 * @param {Number} _h 
	 */
	p.setTile = function( _w, _h ){
		if( !this._state ) return;
		this._object.tileW = _w;
	}
// private method
	/**
	 * @method _onload
	 * @param {Object|String} _r 
	 * @private
	 */
	p._onload = function( _r ){
		if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
			this._sourcePath = _r;
			this._onload_finish( this );
        }else{
			this._sourcePath = _r;
			var _this = this;
			jeesjs.QM.addSource( _r , _r );
			jeesjs.QM.load( function(){
				_this._onload_finish( _this ) 
			} );
		}

		
	}
	/**
	 * @method _onload_finish
	 * @param {Event} _e
	 * @private
	 */
	p._onload_finish = function( _o ){
		_o._source = typeof _o._sourcePath === "object" ? _o._sourcePath : jeesjs.QM.getSource( _o._sourcePath );
		_o._object = new createjs.Bitmap( _o._source );
		_o._reset();
	}
	/**
	 * @method _reset_source_size
	 * @param {Number} _w 
	 * @param {Number} _h 
	 * @private
	 */
	p._reset_source_size = function( _w, _h ){
		if( _w ) this._sourceWidth = _w;
		if( _h ) this._sourceHeight = _h;

		if( this._w == 0 || this._h == 0 ){
			this._w = this._sourceWidth
			this._h = this._sourceHeight;
		}
	}
	/** 
	 * @method _reset_size
	 * @private
	 */
	p._reset_size = function(){
		if( !this._state ) return;
		if( this._w != this._sourceWidth )
			this._scaleX = this._w / this._sourceWidth;
		if( this._h != this._sourceHeight )
			this._scaleY = this._h / this._sourceHeight;
		if( this._scaleX != 1.0 || this._scaleY != 1.0 )
			this._reset_scale();
	}
	/**
	 * @method _reset_position
	 * @private
	 */
	p._reset_position = function(){
		if( !this._state ) return;
		this._object.x = this._x;
		this._object.y = this._y;
	}
	/**
	 * @method _reset_rect
	 * @private
	 */
	p._reset_rect = function(){
		if( !this._state ) return;
		this._object.sourceRect = this._rect;
	}
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		if( !this._state ) return;
		this._object.scaleX = this._scaleX;
		this._object.scaleY = this._scaleY;
	}
	/**
	 * 重建坐标和大小
	 * @method _reset
	 * @private
	 */
    p._reset = function(){
		if( this._state ) return;
		this.init();
		this._state = true;
		var b = this._object.getBounds();
		this._reset_source_size( b.width, b.height );
		this._reset_rect();
		this._reset_size();
		this._reset_position();
    };
    
	jeesjs.ImageBox = createjs.promote(ImageBox, "Widget");
})();