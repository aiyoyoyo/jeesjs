/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Manager/ModulesManager.js
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
    function ModulesManager(){ throw "ModulesManager cannot be instantiated."; };
// private static properties:
	/**
	 * 多层级模块池，前面为层级，后面为模块列表
	 * @property _modules
	 * @static
	 * @type {Array}{Array}
	 * @protected
	 */
    ModulesManager._modules 	= null;
	
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	ModulesManager._inited = false;
	
// public static methods:  
    /**
	 * 初始化模块管理器
	 * @method init
	 * @static
	 **/
	ModulesManager.init = function() {
		if (this._inited) { return; }
		this._inited = true;
		this._modules = new Array();
	};
    /**
	 * 新增某层级的一个模块，会中断该层级的上一个模块。
	 * 如果是新增加的层级，则会中断上个层级的最上层模块。
	 * @method enter
	 * @static
	 * @param {jeesjs.Module} _m 进入的模块
	 * @param {Number} _h 进入的层级
	 */
	ModulesManager.enter = function( _m, _h ){
		var h = this.hierarchy();
		if( _h != undefined ) h = _h;
		
		var mods = this._modules[ h ];
		if( mods === undefined ){
			mods = new Array();
			
			if( h > 0 ){
				var last_mod = this._modules[ h - 1 ];
				if( last_mod.length != 0 ) last_mod[ last_mod.length - 1 ].interrupt();
			}
			this._modules.push( mods );
		}
		
		if( mods.length != 0 ) mods[ mods.length - 1 ].interrupt();
		mods.push( _m );
		_m.enter();
	};
	/**
	 * 退出最上层层级的最上层模块，退出后如果存在上个模块，则恢复上个模块的执行。
	 * @method leave
	 * @static
	 */
	ModulesManager.leave = function(){
		if( this._modules.length > 0 ){
			var mods = this._modules[ this._modules.length - 1 ];
			if( mods.length > 0 ) {
				mods.pop().leave();
			}
			if( mods.length > 0 ) mods[ mods.length - 1 ].recovery();
			else{
				this._modules.pop();
				if( this._modules.length > 0 ){
					mods = this._modules[ this._modules.length - 1 ];
					if( mods.length > 0 ) mods[ mods.length - 1 ].recovery();
				}
			}
		}
	};
	/**
	 * 逐个退出全部模块
	 * @method leave
	 * @static
	 */
	ModulesManager.clear = function(){
		while( this._modules.length != 0 ){
			var mods = this._modules[ this._modules.length - 1 ];
			while( mods.length != 0 ){
				mods.pop().leave();
			}
			this._modules.pop();
		}
	}
	/**
	 * 执行所有加入的模块更新
	 * @method update
	 * @static
	 * @param {Number} _t 绘制时间，单位：毫秒
	 */
	ModulesManager.update = function( _t ){
		this._modules.forEach( function( _mods ){
			_mods.forEach( function( _mod ){
				_mod.update( _t );
			});
		});
	};
	/**
	 * 获取当前层级数
	 * @method hierarchy
	 * @static
	 * @return {Number} 
	 */
	ModulesManager.hierarchy = function(){
		return this._modules.length > 0 ? this._modules.length - 1 : 0;
	};
	
	jeesjs.MM = ModulesManager;
})();