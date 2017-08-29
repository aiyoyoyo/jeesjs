/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/UI/Widget.js
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
	 * @class Widget
	 * @extends createjs.Container
	 * @param {Widget} _p
	 * @constructor
	 */
    function Widget( _p ){
// public properties:
    	 /**
    	 * 控件横坐标
    	 * @property x
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.x = 0;
    	/**
    	 * 控件纵坐标
    	 * @property y
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.y = 0;
    	/**
    	 * 控件宽度
    	 * @property w
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.w = 0;
    	/**
    	 * 控件高度
    	 * @property h
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.h = 0;
    	/**
    	 * 控件状态
    	 * @property e
    	 * @type {Boolean}
    	 * @default true
    	 */
    	this.e = true;
    	/**
    	 * 事件的方法池
    	 * @property _event_map
    	 * @type {Map}
    	 */
    	this._event_map = [];
		/**
    	 * CreateJS绘制容器
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._container = null;
    	/**
    	 * 父控件
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._parent = _p ? _p : null;
    };
	
    var p = Widget.prototype;
// public method
     /**
     * 返回根容器
     * @method getWidget
     * @type {createjs.DisplayObject}
     * @return 
     */
    p.getWidget = function(){
    	return this._container;
    }
    /**
     * 添加子控件
     * @method addChild
     * @param {createjs.DisplayObject}
     */
    p.addChild = function( _d ){
    	if( this.isContainer() )
    		this.getWidget().addChild( _d );
    	else throw "根节点为非容器类型控件。";
    }
    /**
     * 是否是容器形式的控件
     * @method isContainer
     * @return {Boolean}
     */
    p.isContainer = function(){
    	return this._container != null;
    }
    /**
	 * 获取控件宽高
	 * @method getSize
	 * @return {w,h}
	 */
	p.getSize = function(){
		return { w: this.w, h: this.h };
	};
    /**
     * 设置宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.w = _w;
    	this.h = _h;
    	if( this.isContainer() ){
    		this.getWidget().setBounds( this.x, this.y, this.w, this.h );
    		// TODO 当容器大小变化时，更新子容器的mask
    		// 主要用于容器在添加至绘制面板后的子控件同步变化
    	}else{
    		this.getWidget().w = this.w;
    		this.getWidget().h = this.h;
    	}
    };
    /**
	 * 获取控件宽高
	 * @method getPosition
	 * @return {x,y}
	 */
	p.getPosition = function(){
		return { x: this.x, h: this.y };
	}
    /**
     * 设置坐标
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.x = this._parent ? this._parent.x + _x : _x;
    	this.y = this._parent ? this._parent.y + _y : _y;
    	if( this.isContainer() ){
    		this.getWidget().setBounds( this.x, this.y, this.w, this.h );
    		// TODO 当容器位置变化时，更新子控件的位置
    		// 主要用于容器在添加至绘制面板后的子控件同步变化
    	}else{
    		this.getWidget().x = this.x;
    		this.getWidget().y = this.y;
    	}
	};
	/**
	 * 获取控件状态
	 * @method getEnabled
	 * @return {Boolean}
	 */
	p.getEnabled = function(){
		return this.e;
	}
	/**
	 * 设置控件状态，主要用于屏蔽事件穿透
	 * @method setEnabled
     * @param {Boolean} _e
	 */
	p.setEnabled = function( _e ){
		this.e = _e;
	}
    /**
     * 绑定点击事件
     * @method onClick
     * @param {Function} _f
     */
    p.onClick = function( _f ){
    	this._bind_event( "click", this.getWidget(), _f );
    };
    /**
     * 移除绑定点击事件
     * @method unClick
     */
    p.unClick = function(){
    	this._unbind_event( "click", this.getWidget() );
    };
    /**
     * 绑定控件按下事件
     * @method onMouseDown
     * @param {Function} _f
     */
    p.onMouseDown = function( _f ){
    	this._bind_event( "mousedown", this.getWidget(), _f );
    }
    /**
     * 解绑控件按下事件
     * @method unMouseDown
     */
    p.unMouseDown = function(){
    	this._unbind_event( "mousedown", this.getWidget() );
    };
    /**
     * 绑定控件弹起事件
     * @method onMouseUp
     * @param {Function} _f
     */
    p.onMouseUp = function( _f ){
    	this._bind_event( "pressup", this.getWidget(), _f );
    }
    /**
     * 解绑控件弹起事件
     * @method unMouseDown
     */
    p.unMouseUp = function(){
    	this._unbind_event( "pressup", this.getWidget() );
    };
    /**
     * 自定义绑定事件
     * @method onEvent
     * @param {String} _e 事件比如："click"等。
     * @param {Function} _f
     */
    p.onEvent = function( _e, _f ){
    	this._bind_event( _e, this.getWidget(), _f );
    }
    /**
     * 解绑控件弹起事件
     * @method unEvent
     */
    p.unEvent = function( _e ){
    	this._unbind_event( _e, this.getWidget() );
    };
// private method
    /**
     * 用于子控件初始化结束后调用，保证子控件管理器绘制父控件之前加入。 
     * @method _init_finish
     * @param {Widget} _p
     */
    p._init_finish = function(){
    	if( this._parent != undefined ){
    		this._parent.addChild( this.getWidget() );
    	}
    }
    /**
     * @method _bind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @param {Function} _f
	 * @private
     */
	p._bind_event = function( _e, _w, _f ){
		this._event_map[ _e ] = _f;
    	_w.addEventListener( _e, this._event_map[ _e ] );
	};
	/**
	 * @method _unbind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @private
	 */
	p._unbind_event = function( _e, _w ){
		_w.removeEventListener( _e, this._event_map[_e] );
		this._event_map[ _e ] = null;
	};
    
	jeesjs.Widget = Widget;
})();