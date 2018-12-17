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
		 * 控件配置宽度， 可用 100 | "100%" | "auto" | "default"
		 * @public
		 * @property width
    	 * @type {Integer|String}
    	 * @default "default"
		 */
		this.width = "default";
		/**
		 * 控件配置高度， 可用 100 | "100%" | "auto" | "default"
		 * @public
		 * @property height
    	 * @type {Integer|String}
    	 * @default default
		 */
		this.height = "default";
		/**
		 * 偏移坐标，alignX变化时，x属性将会重置为相对位置，之后根据offsetX偏移横坐标。
		 * alignX==2，offsetX = -offsetX;
		 * @public
		 * @property offsetX
		 * @type {Integer}
		 * @default 0;
		 */
		this.offsetX = 0;
		/**
		 * 偏移坐标，alignY变化时，y属性将会重置为相对位置，之后根据offsetY偏移纵坐标。
		 * alignY==2，offsetY = -offsetY;
		 * @public
		 * @property offsetY
		 * @type {Integer}
		 * @default 0;
		 */
		this.offsetY = 0;
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
    	 * 资源宽度
		 * @public
		 * @property resWidth
    	 * @type {Integer}
    	 * @default -1
    	 */
    	this.resWidth = -1;
    	/**
    	 * 资源高度
		 * @public
		 * @property resHeight
    	 * @type {Integer}
    	 * @default -1
    	 */
    	this.resHeight = -1;
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
		/**
		 * @public
		 * @property enableDrag
		 * @type {Boolean}
		 * @default false
		 */
		this.enableDrag = false;
		/**
		 * @public
		 * @property dragX
		 * @type {Boolean}
		 * @default true
		 */
		this.dragX = true;
		/**
		 * @public
		 * @property dragY
		 * @type {Boolean}
		 * @default true
		 */
		this.dragY = true;
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
		
		this._resource_size();
		
		this.setSize();
		this.setAlign();
		
		if( this.enableDrag ){
			var _this = this;
			jees.E.bind( _w, "mousedown", function ( _evt ) {
				this.offset = { x: this.x - _evt.stageX, y: this.y - _evt.stageY }
			});
			jees.E.bind( _w, "pressmove", function ( _evt ) {
				if( _this.dragX )
					this.x = this.property.x = _evt.stageX + this.offset.x;
				if( _this.dragY )
					this.y = this.property.y = _evt.stageY + this.offset.y;
			});
		}
	}
	/**
	 * @public
	 * @method getResourceSize
	 * @return {Integer,Integer} {w,h}
	 */
	p.getResourceSize = function(){
		return { w: this.resWidth, h: this.resHeight };
	}
	/**
	 * @public
	 * @method setResourceSize
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setResourceSize = function( _w, _h ){
		if( _w != undefined ) this.resWidth = _w;
		if( _h != undefined ) this.resHeight = _h;
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
		if( _w != undefined ) this.width = _w;
		if( _h != undefined ) this.height = _h;
		
		var parent_size = this._get_parnet_size();
		
		this.w = this._calculate_size( this.width, this.resWidth, this.layoutX, this._widget.parent, parent_size.w, true );
		this.h = this._calculate_size( this.height, this.resHeight, this.layoutY, this._widget.parent, parent_size.h, false );
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
		if( _x != undefined ) this.offsetX = _x;
		if( _y != undefined ) this.offsetY = _y;
		
		var parent_size = this._get_parnet_size();

		this.x = this._calculate_position( this.offsetX, this.alignX, parent_size.w, this.w );
		this.y = this._calculate_position( this.offsetY, this.alignY, parent_size.h, this.h );
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
	p.getAlign = function(){return { x: this.alignX, y: this.alignY };};
	/**
	 * @public
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function( _x, _y ){
		if( _x != undefined ) this.alignX = _x;
		if( _y != undefined ) this.alignY = _y;
		
		this._widget.regX = this._calculate_align( this.alignX, this.w );
		this._widget.regY = this._calculate_align( this.alignY, this.h );
		
		if( this._widget instanceof jees.UI.ImageBox ){
			this._widget.regX = this._calculate_align( this.alignX, this.resWidth );
			this._widget.regY = this._calculate_align( this.alignY, this.resHeight );
		}
		
		this.setPosition();
	};
// private methods: ===========================================================
	p._get_parnet_size = function(){
		var parent = this._widget.parent;
		var parent_size = null;
		
		if( parent )
			if( parent instanceof jees.UI.Widget ){
				parent_size = parent.getSize();
			}else if( parent instanceof createjs.Container ){
				var b = parent.getBounds();
				parent_size = { w: b.width, h: b.height };
			}else if( parent instanceof createjs.Stage 
				|| parent instanceof createjs.StageGL ) {
				parent_size = jees.APP.getScreenSize();
			}else parent_size = parent.getSize();
		else parent_size = jees.APP.getScreenSize();
		return parent_size;
	}
	/**
	 * @private
	 * @method _calculate_size
	 * @param {Integer} _size 纪录尺寸
	 * @param {Integer} _resSize 资源值
	 * @param {Integer} _lxy 同组组名
	 * @param {Integer} _parent 父控件
	 * @param {Integer} _parentSize 父控件尺寸
	 * @param {Integer} _isWidth 是否宽度
	 */
	p._calculate_size = function( _size, _resSize, _lxy, _parent, _parentSize, _isWidth ){
		if( typeof _size == "string" ){
			if( _size == "default" ){
				// 图片类
				if( _resSize != -1 ) return _resSize;
				else return _parentSize;
			}else if ( _size == "auto" ){
				var cs = 0;
				if( _lxy ){
					var layoutWgts = _lxy.split(",");
					layoutWgts.forEach( function( _name ){
						var wgt = _parent.getChildByName( _name );
						if( !wgt.property.state ) wgt.initialize();
						cs += _isWidth ? wgt.getSize().w : wgt.getSize().h;
					} );
				}
				return _parentSize - cs;
			}else if( _size.indexOf( "%" ) != -1 ){
				return parseInt( _size.substring( 0, _size.length - 1 ) ) * _parentSize / 100 ;
			}else return parseInt( _size );
		}
		
		return _size;
	}
	/**
	 * @private
	 * @method _calculate_align
	 * @param {Integer} _align 对齐方式
	 * @param {Integer} _size 当前尺寸
	 */
	p._calculate_align = function( _align, _size ){
		if( _align == 2 ){ // 右下对齐
			return _size;
		}else if( _align == 1 ){ // 中间对齐
			return _size / 2;
		}
		
		return 0;
	}
	/**
	 * @private
	 * @method _calculate_position
	 * @param {Integer} _pos 当前值
	 * @param {Integer} _align 对齐方式
	 * @param {Integer} _parentSize 父控件尺寸
	 * @param {Integer} _size 当前尺寸
	 */
	p._calculate_position = function( _pos, _align, _parentSize, _size ){
		if( _align == 2 ){ // 右下对齐
			return _parentSize - _pos;
		}else if( _align == 1 ){ // 中间对齐
			return _parentSize / 2 + _pos;
		}
		
		return _pos;
	}
	/**
	 * @private
	 * @method _resource_size
	 */
	p._resource_size = function(){
		if( !this.resource ) return;
		
		if( typeof this.resource == "string" ){
			if( this.resource.startsWith( "data:image" ) ){
				var img = document.createElement("img");
				img.src = this.resource;
				this.resWidth = img.width;
				this.resHeight = img.height;
			}else if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.resource)){
				var res = jees.Resource.get( this.resource );
				this.resWidth = res.width;
				this.resHeight = res.height;
			}
		}else if( this.resource instanceof createjs.Bitmap ){
			var b = this.resource.getBounds();
			this.resWidth = b.width;
			this.resHeight = b.height;
		}
	}
	jees.UI.Property = Property;
})();