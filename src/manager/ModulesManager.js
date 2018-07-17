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
	// constructor: ===========================================================
	/**
	 * @class ModulesManager
	 */
	function ModulesManager(){ throw "ModulesManager cannot be instantiated."; };
	// private static properties: =============================================
	ModulesManager._init        = false;
	ModulesManager._modules     = null;
	ModulesManager._module      = null;
	ModulesManager._ids         = null;
	// public static properties: ==============================================
	// private static methods: ================================================
	ModulesManager.startup = function() {
		if (this._init) {return;}
		this._init = true;
		this._modules = new Map();
		this._ids = new Array();
	};

	/**
	 * 加入某个模块
	 * @method enter
	 * @static
	 * @param {jeesjs.Module} _m 进入的模块
	 */
	ModulesManager.enter = function( _m ) {
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
	 * @method leave
	 * @static
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
	 * @method leave
	 * @static
	 */
	ModulesManager.clear = function() {
		while( this._modules.length > 0 ) {
			this.leave();
		}
	};
	/**
	 * 调用所有加入的模块update方法
	 * @method update
	 * @static
	 * @param {Number} _t 绘制时间，单位：毫秒
	 */
	ModulesManager.update = function( _t ) {
        for( var mod of this._modules.values() ) {
            mod.update( _t );
        }
	};
	/**
	 * 获取当前模块
	 * @method current
	 * @static
	 * @return {jeesjs.Module}
	 */
	ModulesManager.current = function() {
		return this._module;
	};

	jees.MM = ModulesManager;
})();