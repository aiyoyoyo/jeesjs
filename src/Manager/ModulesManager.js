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
		this._ident = 0;
	};
    /**
	 * 新增某层级的一个模块，如果该加入的模块在最上层，则中断之前的最上层模块
	 * 如果是新增加的层级，则会中断上个层级的最上层模块。
	 * @method enter
	 * @static
	 * @param {jeesjs.Module} _m 进入的模块
	 * @param {Number} _h 进入的层级
	 */
	ModulesManager.enter = function( _m, _h ){
		var h = _h != undefined ? _h : 0;
		var ins_mod = null;
		for( var i in this._modules ){
			if( h == i ) {
				ins_mod = h;
				break;
			}
		}
		if( ins_mod == null ) this._modules.splice( h, 0, new Array() );

		var mods = this._modules[ h ];
		if( mods === undefined ){
			mods = new Array();
			this._modules.push( mods );
		}
		if( _m.id == -1 )
			_m.id = this._ident ++;
		mods.push( _m );
		
		// 加入的是最上层
		if( h === this.hierarchy() ) {
			var tmp_mods = this._modules[ h ];
			if( tmp_mods.length > 1 )
				tmp_mods[ tmp_mods.length - 2 ].interrupt();
		}
		_m.enter();
	};
	/**
	 * 退出最上层层级的最上层模块，退出的模块如果存在上个模块，则调用上个模块的恢复。
	 * @method leave
	 * @param {Number} _h 退出指定层级的最上层模块
	 * @static
	 */
	ModulesManager.leave = function( _h ){
		if( typeof _h === "object" ){
			// 退出指定模块
			this._leave_module_byid( _h.id );
		}else if( typeof _h === "number" && _h != this.hierarchy() ){
			// 退出指定层级的最上层模块
			this._leave_module_bylv( _h );
		}else{
			// 退出最上层层级的最上层模块
			var h = this.hierarchy();
			var mods = this._modules[ this.hierarchy() ];
			if( mods == undefined ) return;
			mods.pop().leave();
			if( mods.length == 0 )
				this._modules.pop();
			
			mods = this._modules[ this.hierarchy() ];
			if( mods == undefined ) return;
				mods[ mods.length - 1 ].recovery();
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
	};
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
	
// private method
	/**
	 * 根据模块id来移除模块
	 * @method _leave_module_byid
	 * @param {Number} _id
	 */
	ModulesManager._leave_module_byid = function( _id ){
		var cur_lvl = 0;
		var cur_mod = 0;
		
		for( var i = 0; i < this._modules.length; i ++ ){
			var mods = this._modules[i];
			cur_lvl = i;
			var find = false;
			for( var j = 0; j < mods.length; j ++ ){
				var tmp = mods[j];
				if( tmp.id === _id ){
					tmp.leave();
					mods.splice( j, 1 );
					cur_mod = j;
					if( mods.length == 0 ){
						this._modules.pop();
					}
					find = true;
					break;
				}
			}
			if( find ) break;
		}
		
		if( cur_mod == 0 && cur_lvl == this.hierarchy() ){
			var mods = this._modules[ this.hierarchy() - 1 ];
			if( mods != undefined )
				mods[ mods.length - 1 ].recovery();
		}
	};
	/**
	 * 根据层级来移除该层级最上层模块
	 * @method _leave_module_bylv
	 * @param {Number} _lv
	 */
	ModulesManager._leave_module_bylv = function( _lv ){
		var mods = this._modules[ _lv ];
		if( mods == undefined ) return;
		mods.pop().leave();
		if( mods.length == 0 )
			this._modules.splice( _lv, 1 );
	};
	
	jeesjs.MM = ModulesManager;
})();