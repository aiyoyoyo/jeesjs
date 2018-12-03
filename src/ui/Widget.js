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
		 */
		this.property = new jees.UI.Property();
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
		
		this._reset_size();
		this._reset_position();
		this._reset_scale();
		this._reset_mask();
		this._init_childs();
		
//		this._cache();
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
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setSize = function( _w, _h ){
		this.property.setSize( _w, _h );
		this._reset_size();
	}
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t
	 * @returns {Integer,Integer} {w,h}
	 */
	p.getSize = function( _t ){
		return this.property.getSize( _t );
	}
	/**
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	}
	/**
	 * @public
	 * @method getPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getPosition = function(){
		return this.property.getPosition();
	}
	/**
	 * @public
	 * @method setScale
	 * @param {Float} _x
	 * @param {Float} _y
	 */
	p.setScale = function( _x, _y ){
		this.property.setScale( _x, _y );
		this._reset_scale();
	}
	/**
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	}
	/**
	 * @public
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function( _x, _y ){
		this.property.setAlign( _x, _y );
		this._reset_position();
	}
	/**
	 * @public
	 * @method getAlign
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAlign = function(){
		return this.property.getAlign();
	}
// private methods: ===========================================================
	/**
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		var b = this.getBounds();
		this.cache( b.x, b.y, b.width, b.height );
//		this.cache( pos.x, pos.y, size.w, size.h );
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		this.setBounds( 0, 0, size.w, size.h );
		
		if( this.property.enableMask ){
			this._reset_mask();
		}
	}
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		
		this.x = pos.x;
		this.y = pos.y;
	}
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
		if( this.property.enableMask ){
			var size = this.property.getSize();
			var pos = this.getPosition();
			
			if( this.mask == null ){
				this.mask = jees.CJS.newShape( size.w, size.h, "#000000" );
				if( this.property.visibleMask )
					this.addChildAt( this.mask, 0 );
			}
			
			if( this.mask && this.property.visibleMask ){
				this.mask.alpha = 0.5;
				this.mask.cache( pos.x, pos.y, size.w, size.h );
				this.mask.graphics.drawRect( pos.x, pos.y, size.w, size.h );
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
					c.mask = this.mask;
				}
			}
		}
	};
	
	jees.UI.Widget = createjs.promote( Widget, "Container" );
})();