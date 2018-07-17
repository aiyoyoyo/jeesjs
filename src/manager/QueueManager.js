/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/QueueManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
    // constructor: ===========================================================
	/**
	 * @class ModulesManager
	 */
    function QueueManager(){ throw "QueueManager cannot be instantiated."; };
    // private static properties: =============================================
    QueueManager._init = false;
    QueueManager._queue = null;
    QueueManager._progress 	= 0;
    QueueManager._loader = null;
    QueueManager._resources = null;
    QueueManager._options 	= {
		size: 100
	};
    QueueManager._handler	= null;
    // public static methods:  ================================================
    /**
	 * 初始化模块管理器
	 * @method startup
	 * @static
	 * @param {Object} _o 配置属性
	 * @param {Function} _f 加载完毕的回调事件
	 **/
    QueueManager.startup = function( _o, _f ) {
		if( this._init ){ return; }
		this._init = true;
		
		if( typeof _o === 'object' ) {
            for ( var i in _o ) {
                if (_o.hasOwnProperty( i )) {
                    this._options[i] = _o[ i ];
                }
            }
        }

        this._loader = new Array();
		this._resources = new Set();

    	this._queue = jees.CJS.newLoader();
    	this._queue.maintainScriptOrder = true;
    	this._queue.setMaxConnections( this._options.size );

        this._queue.addEventListener( "fileload", this._onload_handler );

    	if( jees.SET.isSound() )
    	    this._queue.installPlugin( jees.CJS.Sound() );
	};
	/**
	 * 获取文件加载进度，进度值为0~1之间。
	 * @method getProgress
     * @static
     * @return {Float}
	 */
	QueueManager.getProgress = function(){
		return this._queue.progress;
	};

    /**
    * 添加一个预加载文件
    * @method add
    * @static
    * @param {String} _k 源别名
    * @param {String} _r 源地址
    */
	QueueManager.add = function( _k, _r ){
	    if( this._resources.has( _k ) )
	        throw "已存在资源[" + _k + "]";

        this._loader.push( { id: _k, src: _r } );
	};
	/**
	 * 开始预加载文件, 目前只支持单一加载队列。如果上次队列没有完成，则后续队列需要重新加载
	 * @method doload
     * @static
     * @param {Function} _f 加载完毕的回调事件
	 */
	QueueManager.doload = function( _f ){
	    if( this._handler != null )
	        throw "上次加载尚未结束。";
		if( this._handler == null && typeof _f === 'function' ){
			this._bind_handler( "complete", _f );
		}
		
		if( this._loader.length != 0 ) this._queue.loadManifest( this._loader );
	};
	/**
	 * 获取预加载的数据，返回格式参考preloadjs的Handling Results部分：
	 * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @method get
     * @static
     * @param {String} _k 源别名
     * @param {Boolean} _b 是否转为二进制
     * @return {Object} 源地址
	 */
	QueueManager.get = function( _k, _b ) {
	    if( !this._resources.has( _k ) )
	        throw "未找到资源[" + _k + "]";
	    if( _b == undefined ) _b = false;
		return this._queue.getResult( _k, _b );
	};
	/**
     * 删除已有资源
     * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
     * @method del
     * @static
     * @param {String} _k 源别名
     */
	QueueManager.del = function( _k ){
	    this._resources.delete( _k );
	    this._queue.remove("png");
	};
	// private methods: =======================================================
	/**
     * @method _bind_handler
	 * @param {String} _e
	 * @param {Function} _f
	 * @private
     */
	QueueManager._bind_handler = function( _e, _f ){
		var _this = this;
		this._handler = this._queue.addEventListener( _e, function( e ) { 
			_this._loader = [];
			_f( e );
			_this._unbind_handler( _e );
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
    /**
     * @method _onload_handler
     * @param {createjs.Event} _e
     * @private
     */
    QueueManager._onload_handler = function( _e ){
        jees.QM._resources.add( _e.item.id );
    };

	jees.QM = QueueManager;
})();