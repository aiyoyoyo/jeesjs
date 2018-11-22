/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/ResourceManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class ModulesManager
	 */
    function ResourceManager(){ throw "jees.RM不允许做初始化操作。"; };
// private static properties: 
    /**
	 * CreateJS加载资源队列对象
	 * @private
	 * @property _queue
	 * @type {createjs.LoadQueue}
	 **/
    ResourceManager._queue = null
    /**
	 * 当前加载队列信息,每次加载队列完成后清空
	 * @property _loader
	 * @private
	 * @type {Array}
	 **/
    ResourceManager._loader = null;
    /**
     * 资源数据
     * @private
     * @property _loader
	 * @type {Map<String, Map<String, String>>}
     **/
    ResourceManager._resources = null;
    /**
	 * 当前加载队列结束的回调方法，每次完成后清空
	 * @private
	 * @property _callback
	 * @type {Function}
	 **/
    ResourceManager._callback = null;
    /**
	 * @private
	 * @property _handler
	 * @type {Function}
	 **/
    ResourceManager._handler = null;
// public static properties:
    /**
	 * @public
	 * @static
	 * @final
	 * @property DEFAULT_GROUP
	 * @type {String}
	 **/
    ResourceManager.DEFAULT_GROUP = "default";
// public static methods:  ================================================
    /**
	 * 初始化模块管理器
	 * @public
	 * @static
	 * @method startup
	 **/
    ResourceManager.startup = function() {
    	this._loader = new Array();
    	this._resources = new Map();
    	this._resources.set( this.DEFAULT_GROUP, new Map() );
    	
    	this._queue = new createjs.LoadQueue( false, "", "Anonymous" );
    	this._queue.maintainScriptOrder = true;
        
	};
	/**
	 * 重新配置
	 * @public
	 * @static
	 * @method startup
	 **/
	ResourceManager.reload = function(){
		if( jees.SET.enableSound() ){
			this._queue.installPlugin( createjs.Sound );
		}

		//  	this._queue.setMaxConnections( this._options.size );
	}
	/**
	 * 获取文件加载进度，进度值为0~1之间。
	 * @public
     * @static
	 * @method getProgress
     * @return {Float}
	 */
	ResourceManager.getProgress = function(){
		return this._queue.progress;
	};
    /**
    * 添加一个预加载文件
	* @public
    * @static
    * @method add
    * @param {String} _k 源别名
    * @param {String} _r 源地址
    * @param {String} _g 分组
    */
	ResourceManager.add = function( _k, _r, _g ){
		var group = null;
		if( _g == undefined ){
			group = this._resources.get( this.DEFAULT_GROUP );
		}else{
			if( this._resources.has( _g ) ){
				group = this._resources.get( _g );
			}else{
				group = new Map();
				this._resources.set( _g, group );
			}
		}
		
	    if( group.has( _k ) )
	        throw "已存在同名资源[" + _k + "]";

        this._loader.push( { id: _k, src: _r, group: _g } );
	};
	/**
	 * 开始预加载文件, 目前只支持单一加载队列。如果上次队列没有完成，则后续队列需要重新加载
	 * @public
     * @static
	 * @method onload
     * @param {Function} _f 加载完毕的回调事件
	 */
	ResourceManager.onload = function( _f ){
	    if( this._callback != null )
	        throw "上次加载尚未结束。";
		if( this._callback == null && typeof _f === 'function' ){
			this._callback = _f;
			var _this = this;
			this._handler = jees.E.bind( this._queue, "complete", function( e ) {
				_this._complete_handler( e );
			} );
		}
		if( this._loader.length != 0 ) this._queue.loadManifest( this._loader );
		else this._complete_handler();
	};
	/**
	 * 获取预加载的数据，返回格式参考preloadjs的Handling Results部分：
	 * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @public
     * @static
	 * @method get
     * @param {String} _k 源别名
     * @param {String} _g 分组
     * @return {Object} 源地址
	 */
	ResourceManager.get = function( _k, _g ) {
		var group = null;
		if( _g != undefined ){
			group = jees.RM._resources.get( _g );
		}else{
			group = jees.RM._resources.get( this.DEFAULT_GROUP );
		}
		if( group.has( _k ) ){
			return group.get( _k );
		}
		
		throw "没有找到对应资源：RES=[" + _k + ", GROUP=[" + _g + "]";
		
	};
	/**
     * 删除已有资源
     * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @public
     * @static
     * @method del
     * @param {String} _k 源别名
     */
	ResourceManager.del = function( _k ){
	    this._resources.delete( _k );
	    this._queue.remove( _k );
	};
// private methods: =======================================================
    /**
     * @private
     * @method _complete_handler
     * @param {createjs.Event} _e
     */
    ResourceManager._complete_handler = function( _e ){
    	if( this._handler != null ){
    		jees.E.unbind( this._queue, "complete", this._handler );
    	}
    	
    	this._loader.forEach( function( _load ){
      		var res = jees.RM._queue.getResult( _load.id );
      		var maps = jees.RM._resources.get( _load.group );
      		maps.set( _load.id, res );
    	} );
    	this._loader = new Array();

		this._callback( _e );
		this._callback = null;
    };

	jees.RM = ResourceManager;
})();