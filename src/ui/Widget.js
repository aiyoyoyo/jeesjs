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
		 * 控件实际宽度
		 * @private
		 * @property w
    	 * @type {Integer}
    	 * @default 0
		 */
		this.w = 0;
		/**
		 * 控件实际高度
		 * @private
		 * @property h
    	 * @type {Integer}
    	 * @default 0
		 */
		this.h = 0;
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 */
		this.property = new jees.UI.Property();
// private properties:
		/**
		 * 各个控件中用来描绘控件背景的对象
		 * @private
		 * @property _object
    	 * @type {jees.Widget | createjs.DisplayObject}
    	 * @default null
		 */
		this._object = null;
		/**
		 * 控件使用得皮肤，为空不使用
		 * @private
		 * @property _skin
		 * @type {jees.Skin}
		 * @default null
		 */
		this._skin = null;
		/**
		 * 控件遮罩层, enableMask为真时有效
		 * @private
		 * @property _mask
		 * @type {createjs.Shape}
		 * @default null
		 */
		this._mask = null;
	};
	var p = createjs.extend( Widget, createjs.Container );
// public methods: ============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this._init_property();
		this._init_childs();
		jees.APP.addChild( this );
	};
	/**
	 * @public
	 * @method getSize
	 * @return {Integer,Integer} {w,h}
	 */
	p.getSize = function () {
		return { w: this.w, h: this.h };
	};
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size();
		
		// 保证内部背景元素与容器一致
		if( this._object && this._object instanceof jees.Widget ){
			this._object.setSize( this.w, this.h );
		}
	};
	/**
	 * 获取控件坐标
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return { x: this.x, y: this.y };
	}
	/**
	 * 设置控件坐标 如果align不为0，则设置无效
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
	 * 获取相对坐标
	 * @public
	 * @method getRelativePosition
	 * @return {x,y}
	 */
	p.getRelativePosition = function () {
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		
		var x = this.x;
		var y = this.y;

		if( this.align == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.align == 1 ){
			x = ( relative_pos.w - this.getSize().w ) / 2 + x;
		}
		return { x: x, y: y };
	}
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		this._reset_scale();
	}
// private methods: ===========================================================
	/**
	 * 缓存对象
	 * @private
	 * @method _cache
	 */
	p._cache = function(){
		this.cache( 0, 0, this.w, this.h );
		if( this._object )
			this._object.cache( 0, 0, this.w, this.h );
	}
	/**
	 * 初始化配置属性
	 * @private
	 * @method _init_property
	 */
	p._init_property = function(){
		this._reset_size();
		this._reset_position();
		this._reset_scale();
		this._reset_mask();
	}
	/**
	 * 初始化子控件
	 * @private
	 * @method _init_childs
	 */
	p._init_childs = function(){
		// 如果根控件存在初始化得内容，则插入第一个位置。
		if( this._object ){
			this.addChildAt( this._object, 0 );
		}
		if( this.children ){
			for( var i = 0; i < this.children.length; i ++ ){
				var c = this.children[i];
				if( c instanceof jees.UI.Widget ){
					c.initialize();
				}
			}
		}
	};
	/**
	 * @private
	 * @method _get_size
	 * @param {Integer|String} _val 纪录的值
	 * @param {Integer} _parent 父控件的值
	 * @param {Integer} _child 其他同组子控件的值之和(不包含自己)
	 */
	p._calculate_size = function( _val, _parent, _child ){
		var real_val = 0;
		if( _val && typeof( _val ) == "string" ){
			if( _val.toLowerCase() == "auto" ){
				real_val = _parent - _child;
			}else if( _val.indexOf( "%" ) != -1 ){
				real_val = parseInt( _val.substring( 0, _val.length - 1 ) ) * _parent / 100 ;
			}else{
				real_val = parseInt( _val.substring( 0, _val.length - 1 ) );
			}
		}else real_val = _val;
		return real_val;
	}
	/**
	 * 重置宽高
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var parent_size = this.parent ? this.parent.getSize() : { w:jees.SET.getWidth(), h:jees.SET.getHeight() };
		
		var childs_size = { w:0, h:0 };
		var size = this.property.getSize();
		if( this.property.layoutGroup && this.parent ){
			var _this = this;
			if( ( typeof( size.w ) == "string" && size.w.toLowerCase() == "auto" )
				|| ( typeof( size.h ) == "string" && size.h.toLowerCase() == "auto" ) ){
					this.parent.children.forEach( function( _c ){
						if( _c != _this && _c.property.layoutGroup == _this.property.layoutGroup ){
							if( _c.w == 0 || _c.h == 0 ) _c._reset_size();
							childs_size.w += _c.w;
							childs_size.h += _c.h;
						}
					} );
				}
		}
		this.w = this._calculate_size( size.w, parent_size.w, childs_size.w );
		this.h = this._calculate_size( size.h, parent_size.h, childs_size.h );
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.property.getPosition();
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		var x = pos.x;
		var y = pos.y;

		if( this.property.align == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.property.align == 1 ){
			x = ( relative_pos.w - this.getSize().w ) / 2 + x;
		}
		
		this.x = x;
		this.y = y;
	}
	/**
	 * 重置蒙版
	 * @private
	 * @method _reset_mask
	 */
	p._reset_mask = function(){
		if( this.property.enableMask ){
			this._mask = jees.CJS.newShape( this.w, this.h );
		}
		
		if( this.parent && this.parent.property.enableMask && this._object ) {
			// _object 必须是Shape等有mask属性的控件
			this._object.mask = this.parent._mask;
		}
	}
	/**
	 * 重置缩放
	 * @private
	 * @method _reset_scale
	 */
	p._reset_scale = function(){
		var scale = this.property.getScale();
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	}

	jees.UI.Widget = createjs.promote( Widget, "Container" );
})();