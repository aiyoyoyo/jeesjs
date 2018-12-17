/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/manager/ModulesManager.js
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
	function ModulesManager(){ throw "jees.MM不允许做初始化操作。"; };
// private static properties: 
	/**
	 * 当前绘制模块ID
	 * @private
	 * @static
	 * @property _ids
	 * @type {Array<String>}
	 */
	ModulesManager._ids         = new Array();
	/**
	 * 已加载的模块
	 * @private
	 * @static
	 * @property _modules
	 * @type {Map<String, jees.Module>}
	 */
	ModulesManager._modules     = new Map();
	/**
	 * 最上层模块
	 * @private
	 * @static
	 * @property _module
	 * @type {jess.Module}
	 * @default null;
	 */
	ModulesManager._module      = null;
// private static methods: ================================================
	/**
	 * 加入某个模块
	 * @public
	 * @static
	 * @method enter
	 * @param {jeesjs.Module} _m 进入的模块
	 */
	ModulesManager.enter = function( _m ) {
		if( _m == undefined || !_m instanceof jees.Module ) throw "加入模块对象错误";
		
        if( this._modules.has( _m.getId() ) )
            throw "添加了重复的模块[" + _m.getId() + "]";

	    if( this._module != null )
	        this._module.interrupt();
        this._ids.push( _m.getId() );
        this._modules.set( _m.getId(), _m );
	    this._module = _m;
        _m.enter();
	};
	/**
	 * 退出最上层模块
	 * @public
	 * @static
	 * @method leave
	 */
	ModulesManager.leave = function() {
	    if( this._module == null || this._ids.length == 0 ) return;

        var cur_id = this._ids.pop();
        this._module.leave();
        this._modules.delete( cur_id );

        if( this._modules.size == 0 ) return;
        var prv_id = this._ids[ this._ids.length - 1 ];

        this._module = this._modules.get( prv_id );
        this._module.recovery();
	};
	/**
	 * 逐个退出全部模块
	 * @public
	 * @static
	 * @method leave
	 */
	ModulesManager.clear = function() {
		while( this._modules.length > 0 ) {
			this.leave();
		}
	};
	/**
	 * 调用所有加入的模块update方法
	 * @public
	 * @static
	 * @method update
	 * @param {Number} _t 绘制时间，单位：毫秒
	 */
	ModulesManager.update = function( _t ) {
		this._modules.forEach( function( _mod ){
			_mod.update( _t );
		} );
	};
	/**
	 * 获取当前模块
	 * @public
	 * @static
	 * @method current
	 * @return {jeesjs.Module}
	 */
	ModulesManager.current = function() {
		return this._module;
	};

	jees.MM = ModulesManager;
})();