/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src//Manager/QueueManager.js
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
	 * @class ModulesManager
	 */
    function QueueManager(){ throw "QueueManager cannot be instantiated."; };
// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
    QueueManager._inited = false;
	/**
	 * 文件队列对象
	 * @property _queue
	 * @static
	 * @type {createjs.LoadQueue}
	 * @protected
	 */
    QueueManager._queue = null;
	/**
	 * 文件队列的进度
	 * @property _progress
	 * @static
	 * @type {Number}
	 * @protected
	 */
    QueueManager._progress 	= 0;
	/**
	 * 文件队列
	 * @property _list
	 * @static
	 * @type {Array}
	 * @protected
	 */
    QueueManager._list = [];
    /**
	 * 文件队列配置属性
	 * @property _options
	 * @static
	 * @type {Object}
	 * @protected
	 */
    QueueManager._options 	= {
		size: 100
	};
    /**
	 * 文件队列配置属性
	 * @property _handler
	 * @static
	 * @type {Function}
	 * @protected
	 */
    QueueManager._handler	= null;
// public static methods:  
    /**
	 * 初始化模块管理器
	 * @method init
	 * @static
	 * @param {Object} _o 配置属性
	 * @param {Function} _f 加载完毕的回调事件
	 **/
    QueueManager.init = function( _o, _f ) {
		if( this._inited ){ return; }
		this._inited = true;
		
		if( typeof _o === 'object' ) {
            for ( var i in _o ) {
                if (_o.hasOwnProperty( i )) {
                    this._options[i] = _o[ i ];
                }
            }
        }
		
    	this._queue = new createjs.LoadQueue( false,"","Anonymous" );
    	this._queue.maintainScriptOrder = true;
    	this._queue.setMaxConnections( this._options.size );
    	this._queue.installPlugin( createjs.Sound );
	};
	/**
	 * 获取文件加载进度，进度值为0~1之间。
	 * @method getProgress
     * @static
     * @return {Float}
	 */
	QueueManager.getProgress = function(){
		return this._queue.progress;
	}
	/**
	 * 开始预加载文件
	 * @method load
     * @static
     * @param {Function} _f 加载完毕的回调事件
	 */
	QueueManager.load = function( _f ){
		if( this._handler == null && typeof _f === 'function' ){
			this._bind_handler( "complete", _f );
		}
		
		if( this._list.length != 0 ) this._queue.loadManifest( this._list );
	}
	/**
	 * 添加一个预加载文件
	 * @method addSource
     * @static
     * @param {String} _k 源别名
     * @param {String} _v 源地址
	 */
	QueueManager.addSource = function( _k, _v ) {
		var length = this._list.length;
		this._list[length] = {
			id : _k,
			src : _v
		};
	}
	/**
	 * 获取预加载的数据，返回格式参考preloadjs的Handling Results部分：
	 * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @method getSource
     * @static
     * @param {String} _k 源别名
     * @return {Object} 源地址
	 */
	QueueManager.getSource = function( _k ) {
		return this._queue.getResult( _k );
	}
	// private methods:
	/**
     * @method _bind_handler
	 * @param {String} _e
	 * @param {Function} _f
	 * @private
     */
	QueueManager._bind_handler = function( _e, _f ){
		var _this = this;
		this._handler = this._queue.addEventListener( _e, function( e ) { 
			_this._unbind_handler( _e );
			_this._list = [];
			_f( e ); 
		} );
	};
	/**
	 * @method _unbind_handler
	 * @param {String} _e
	 * @private
	 */
	QueueManager._unbind_handler = function( _e ){
		if( this._handler != null ){
			this._queue.removeEventListener( _e, this._handler );
			this._handler = null;
		}
	};

	jeesjs.QM = QueueManager;
})();