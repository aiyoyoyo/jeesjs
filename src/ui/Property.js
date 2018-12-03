/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/UI/Property.js
 * License: MIT license
 */

/**
 * 控件的属性
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * createjs.DisplayObject之外的自定义属性，主要用于解析自定义配置项
	 * @example 
	 * var prop = new jees.UI.Property();
	 * @class Property
	 * @constructor
	 */
	function Property() {
// public properties: 
		/**
		 * 控件配置横坐标
		 * @public
		 * @property y
    	 * @type {Integer}
    	 * @default 0
		 */
		this.x = 0;
		/**
		 * 控件配置纵坐标
		 * @public
		 * @property y
    	 * @type {Integer}
    	 * @default 0
		 */
		this.y = 0;
		/**
		 * 控件实际宽度
		 * @public
		 * @property w
    	 * @type {Integer}
    	 * @default 0
		 */
		this.w = 0;
		/**
		 * 控件实际高度
		 * @public
		 * @property h
    	 * @type {Integer}
    	 * @default 0
		 */
		this.h = 0;
		/**
		 * 控件配置宽度， 可用 100 | "100%" | "auto"
		 * @public
		 * @property width
    	 * @type {Integer|String}
    	 * @default 0
		 */
		this.width = 0;
		/**
		 * 控件配置高度， 可用 100 | "100%" | "auto"
		 * @public
		 * @property height
    	 * @type {Integer|String}
    	 * @default 0
		 */
		this.height = 0;
		/**
		 * 控件配置横向缩放
		 * @public
		 * @property scaleX
    	 * @type {Float}
    	 * @default 1
		 */
		this.scaleX = 1;
		/**
		 * 控件配置纵向缩放
		 * @public
		 * @property scaleY
    	 * @type {Float}
    	 * @default 1
		 */
		this.scaleY = 1;
		/**
    	 * 水平对齐方式 0-Left|1-Center|2-Right
    	 * x属性将会根据方向做偏移 Left从左向右偏移, Center从中心向右, Right从右向左偏移
		 * @public
    	 * @property alignX
    	 * @type {Integer}
    	 * @default 0
    	 */
		this.alignX = 0;
		/**
    	 * 垂直对齐方式 0-Top|1-Middle|2-Bottom
    	 * y属性将会根据方向做偏移 Top从上往下, Middle从中心向下, Bottom从下向上偏移
		 * @public
    	 * @property alignY
    	 * @type {Integer}
    	 * @default 0
    	 */
		this.alignY = 0;
		/**
		 * 内容填充方式 0 - 不改变资源内容, 1 - 拉伸, 2 - 平铺
		 * @public
		 * @property style
		 * @type {Integer}
		 * @default 0
		 */
		this.style = 0;
		/**
		 * 是否启用容器遮罩
		 * @public
		 * @property enableMask
    	 * @type {Boolean}
    	 * @default false
		 */
		this.enableMask = false;
		/**
		 * @public
		 * @property visibleMask
		 * @type {Boolean}
		 * @default false
		 */
		this.visibleMask = false;
		/**
		 * 是否启用容器布局,必须配置中width|height属性为字符类型AUTO关键字，则会根据同组的layoutGroup进行计算
		 * 
		 * @example
		 * val=100px: w0      | w1       | w2
		 * w:       auto=0px  | 30px     | 70%
		 * w:       30px      | auto=50px| 20px 
		 * @public
		 * @property layoutGroup
		 * @type {String}
		 * @default null
		 */
		this.layoutX = null;
		/**
		 * 是否启用容器布局,必须配置中width|height属性为字符类型AUTO关键字，则会根据同组的layoutGroup进行计算
		 * 
		 * @example
		 * val=100px: w0      | w1       | w2
		 * w:       auto=0px  | 30px     | 70%
		 * w:       30px      | auto=50px| 20px 
		 * @public
		 * @property layoutGroup
		 * @type {String}
		 * @default null
		 */
		this.layoutY = null;
		/**
		 * @public
		 * @property enableSkin
		 * @type {Boolean}
		 * @default true
		 */
		this.enableSkin = true;
		/**
    	 * 使用的皮肤
		 * @public
		 * @property skinResource
    	 * @type {String}
    	 * @default null
    	 */
    	this.skinResource = null;
    	/**
    	 * 使用得皮肤类型
    	 * @public
    	 * @property skinType
    	 * @type {String}
    	 * @default null
    	 */
    	this.skinType = null;
		/**
    	 * 实际使用的资源路径
		 * @public
		 * @property resource
    	 * @type {String|createjs.Bitmap}
    	 * @default null
    	 */
    	this.resource = null;
    	/**
		 * 使用的图片资源分割区域
		 * @public
		 * @property
		 * @type {String}
		 * @default null
		 */
		this.region = null;
		/**
		 * 图片资源的使用区域
		 * @public
		 * @property rect
		 * @type {String}
		 * @default null
		 */
		this.rect = null;
		/**
		 * 是否有子节点配置
		 * @public
		 * @property _childs
    	 * @type {Array}
    	 * @default null
		 */
		this.childs = null;
		/**
		 * 防止重复初始化
		 * @public
		 * @property state
		 * @type {Boolean}
		 * @default false
		 */
		this.state = false;
// private properties:
		/**
		 * 控件备份
		 * @private
		 * @property _widget
		 * @type {jees.UI.Widget}
		 * @default null
		 */
		this._widget = null;
	};

	var p = Property.prototype;
// public methods: ============================================================
	/**
	 * 这里初始化2组值，配置值和真实值
	 * @param {Object} _w
	 */
	p.initialize = function( _w ){
		if( !_w ) throw "控件不能为空!";
		// 主要为坐标和auto类型的宽高
		this._widget = _w;
		
		this._reset_size();
		this._reset_position();
	}
	/**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {w,h}
	 */
	p.getPosition = function(){return { x: this.x, y: this.y };}
	/**
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		if( _x ) this.x = _x;
		if( _y ) this.y = _y;
	}
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t 是否配置的值
	 * @return {Integer,Integer} {w,h}
	 */
	p.getSize = function( _t ){
		return _t ? { w: this.width , h: this.height } : { w: this.w, h: this.h };
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function( _w, _h ){
		if( _w ) this.width = _w;
		if( _h ) this.height = _h;
		
		this._reset_size();
	}
	/**
	 * @public
	 * @method getScale
	 * @return {Integer|Float,Integer|Float} {x,y}
	 */
	p.getScale = function(){return { x: this.scaleX, y: this.scaleY };}
	/**
	 * @public
	 * @method setScale
	 * @param {Integer|Float,Integer|Float} _x
	 * @param {Integer|Float,Integer|Float} _y
	 */
	p.setScale = function( _x, _y ){
		if( _x ) this.scaleX = _x;
		if( _y ) this.scaleY = _y;
	}
	/**
	 * @public
	 * @method getAlign
	 * @return {Integer,Integer} {x,y}
	 */
	p.getAlign = function(){return { x: this.alignX, y: this.alignY };}
	/**
	 * @public
	 * @method setAlign
	 * @param {Integer,Integer} _x
	 * @param {Integer,Integer} _y
	 */
	p.setAlign = function( _x, _y ){
		if( _x ) this.alignX = _x;
		if( _y ) this.alignY = _y;
		
		this._reset_position();
	}
// private methods: ===========================================================
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
				real_val = parseInt( _val );
			}
		}else real_val = _val;
		return real_val;
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var parent = this._widget.parent;
		var parent_size = null;
		if( parent )
			if( parent instanceof createjs.Stage 
				|| parent instanceof createjs.StageGL ) parent_size = jees.APP.getScreenSize();
			else parent_size = parent.getSize();
		else parent_size = jees.APP.getScreenSize();

		var childs_size = { w:0, h:0 };
		var size = this.getSize( true );
		if( parent && ( this.layoutX || this.layoutY ) ){
			if( ( typeof( size.w ) == "string" && size.w.toLowerCase() == "auto" )
				|| ( typeof( size.h ) == "string" && size.h.toLowerCase() == "auto" ) ){
					
				if( this.layoutX ){
					var layoutXWgts = this.layoutX.split(",");
					layoutXWgts.forEach( function( _w ){
						var w = parent.getChildByName( _w );
						if( !w.property.state ) w.initialize();
						childs_size.w += w.getSize().w;
					} );
				}
				if( this.layoutY ){
					var layoutYWgts = this.layoutY.split(",");
					layoutYWgts.forEach( function( _w ){
						var w = parent.getChildByName( _w );
						if( !w.property.state ) w.initialize();
						childs_size.h += w.getSize().h;
					} );
				}
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
		var parent = this._widget.parent;
		var parent_size = null;
		if( parent )
			if( parent instanceof createjs.Stage 
				|| parent instanceof createjs.StageGL ) parent_size = jees.APP.getScreenSize();
			else parent_size = parent.getSize();
		else parent_size = jees.APP.getScreenSize();
		
		var pos = this.getPosition();
		var size = this.getSize();
		
		var x = pos.x;
		var y = pos.y;

		if( this.alignX == 2 ){
			x = parent_size.w - size.w - x;
		}else if( this.alignX == 1 ){
			x = ( parent_size.w - size.w ) / 2 + x;
		}
		
		if( this.alignY == 2 ){
			y = parent_size.h - size.h - y;
		}else if( this.alignY == 1 ){
			y = ( parent_size.h - size.h ) / 2 + y;
		}
		
		this.x = x;
		this.y = y;
	};
	jees.UI.Property = Property;
})();