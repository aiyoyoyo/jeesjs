/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/connector/Response.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Request
	 * @static
	 * @constructor
	 */
	function Response() {
		this._module_maps = new Map();
		this._module_id_maps = new Map();
	};
// public static properties:
// private methods: ====================================================
	var p = Response.prototype;
	
// public methods: =====================================================
	/**
	 * @public
	 * @method bind
	 * @param {Integer} _id
	 * @param {jees.Module} _handler
	 */
	p.bind = function( _id, _module ){
		var ids = this._module_id_maps.get( _module.id );
		if( ids == null ){
			ids = new Set();
			this._module_id_maps.set( _module.id, ids );
		}
		if( ids.has( _id ) ){
			return;
		}
		
		ids.add( _id );
		
		var mods = this._module_maps.get( _id );
		
		if( mods == null ){
			mods = new Set();
			this._module_maps.set( _id, mods );
		}
		if( mods.has( _module ) ){
			return;
		}
		
		mods.add( _module );
	}
	/**
	 * @public
	 * @method unbind
	 * @param {jees.Module} _module
	 */
	p.unbind = function( _module ){
		if( !this._module_id_maps.has( _module.id  ) ) return;
		
		var ids = this._module_id_maps.get( _module.id );
		for( var id of ids ){
			var mods = this._module_maps.get( id );
			
			for( var idx in mods ){
				var mod = mods[idx];
				if( mod.id == _module.id ){
					arrs.slice( id );
					break;
				}
			}
		}
		
		ids.clear();
	}
	/**
	 * 按加入顺序通知对应Module
	 * @public
	 * @method notify
	 * @param {jees.Message} _msg
	 */
	p.notify = function( _msg ){
		if( this._module_maps.has( _msg.id ) ){
			var mods = this._module_maps.get( _msg.id );
			mods.forEach( function( _mod ){
				_mod.notify( _msg );
			} );
		}
	}
	jees.Response = Response;
})();