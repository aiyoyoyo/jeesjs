/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/UI/Widget.js
 * License: MIT license
 */

/**
 * 控件的基类，建议在构件控件时，优先构建非容器对象后，在将其加入容器对象中。
 * 容器对象不建议变换坐标或者嵌套容器对象。
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Widget
	 * @extends createjs.Container
	 * @constructor
	 */
	function Widget() {
		this.Container_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 * @type jees.UI.Property
		 */
		this.property = new jees.UI.Property();
		/**
		 * @public
		 * @property maskColor
		 * @type {String}
		 * @default "#000000"
		 */
		this.maskColor = "#000000";
		/**
		 * @public
		 * @property maskAlpha
		 * @type {Float}
		 * @default 0.5
		 */
		this.maskAlpha = 0.5;
// private properties:
	};
	var p = createjs.extend( Widget, createjs.Container );
// public methods: ============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		this._mask = jees.CJS.newShape( this.property.w, this.property.h, this.maskColor );
		if( this.property.visibleMask )
			this.addChildAt( this._mask, 0 );
		
		this._reset_scale();
		this._reset_position();
		this._reset_mask();
		
		this._init_childs();
		
		this.cursor = "pointer";
	};
	/**
	 * 绝对位置
	 * @public 
	 * @method getAbsPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAbsPosition = function(){
		var m = this.getConcatenatedMatrix();
		return { x: m.tx, y: m.ty };
	};
	/**
	 * @public
	 * @method setSize
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setSize = function( _w, _h ){
		this.property.setSize( _w, _h );
		
		this.property.setPosition();
		this._reset_mask();
	};
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t
	 * @returns {Integer,Integer} {w,h}
	 */
	p.getSize = function( _t ){
		return this.property.getSize( _t );
	};
	/**
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * @public
	 * @method getPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getPosition = function(){
		return this.property.getPosition();
	};
	/**
	 * @public
	 * @method setScale
	 * @param {Float} _x
	 * @param {Float} _y
	 */
	p.setScale = function( _x, _y ){
		this.property.setScale( _x, _y );
		this._reset_scale();
	};
	/**
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {Integer,Integer,} {x,y}
	 */
	p.getAlign = function () {
		return { x: this.property.alignX, y: this.property.alignY };
	};
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function ( _x, _y ) {
		this.property.setAlign( _x, _y );
		this._reset_position();
	};
	/**
	 * 设置是否可见
	 * @public
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function(_v){
		this.visible = _v;
	};
	/**
	 * 是否可见
	 * @public
	 * @method isVisible
	 * @return {Boolean}
	 */
	p.isVisible = function(){
		return this.visible;
	};
	/**
	 * 
	 */
	p.findChildByName = function( _n ){
		for( var c in this.children ){
			var wgt = this.children[c];
			if( this.children[c].name == _n ){
				return wgt;
			}
			if( wgt.findChildByName ){
				var child_wgt = wgt.findChildByName( _n );
				if( child_wgt ) return child_wgt;
			}
		}
		
		return null;
	}
// private methods: ===========================================================
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		
		this.x = pos.x;
		this.y = pos.y;
		
		this._reset_mask();
	};
	/**
	 * @private
	 * @method _reset_scale
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	};
	/**
	 * @private
	 * @method _reset_mask
	 */
	p._reset_mask = function(){
		if( this._mask && this.property.enableMask ){
			var size = this.getSize();
			var pos = this.getPosition();
			var align = this.getAlign();
			
			if( this.property.visibleMask ){
				this._mask.alpha = this.maskAlpha;
				this._mask.graphics.clear().beginFill( this.maskColor ).drawRect( 0, 0, size.w, size.h );
				this._mask.cache( 0, 0, size.w, size.h );
			}
			
		}
	};
	/**
	 * @private
	 * @method _init_childs
	 */
	p._init_childs = function(){
		if( this.children ){
			for( var i = 0; i < this.children.length; i ++ ){
				var c = this.children[i];
				if( c instanceof jees.UI.Widget
					|| c instanceof jees.UI.TextBox 
					|| c instanceof jees.UI.ImageBox 
					|| c instanceof jees.UI.ImageSpt
					|| c instanceof jees.UI.InputBox
				) {
					c.initialize();
				}
				
				if( this.property.enableMask ) {
					c.mask = this._mask;
				}
			}
		}
	};
	
	jees.UI.Widget = createjs.promote( Widget, "Container" );
})();