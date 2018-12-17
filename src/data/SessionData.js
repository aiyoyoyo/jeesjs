/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/data/SessionData.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class SessionData
	 * @static
	 * @constructor
	 */
	function SessionData() { throw "SessionData cannot be instantiated."; };
// public static properties:
	SessionData._storage = sessionStorage;
// public static methods: =====================================================
	/**
	 * @public
	 * @static
	 * @method set
	 * @param {String} _k
	 * @param {String||Object} _v
	 */
	SessionData.set = function( _k, _v ){
		var set_data = null;
		if( typeof _v == "object" ){
			set_data = JSON.stringify( _v );
			
			var obj_keys = this._storage.getItem( "object_keys" );
			var keys = _k + ",";
			if( !obj_keys || obj_keys.indexOf( keys ) == -1 ){
				obj_keys = obj_keys || "" ;
				obj_keys += keys;
				this._storage.setItem( "object_keys", obj_keys );
			}
		}else set_data = _v;
		
		this._storage.setItem( _k, set_data );
	};
	/**
	 * @public
	 * @static
	 * @method get
	 * @param {String} _k
	 * @returns {String||Object}
	 */
	SessionData.get = function( _k ){
		var get_data = this._storage.getItem( _k );
		var obj_keys = this._storage.getItem( "object_keys" );
		var keys = _k + ",";
		if( obj_keys && obj_keys.indexOf( keys ) != -1 ){
			return JSON.parse( get_data );
		}
		return get_data;
	};
	/**
	 * @public
	 * @static
	 * @method delete
	 * @param {String} _k
	 * @returns {String||Object}
	 */
	SessionData.delete = function( _k ){
		var obj_keys = this._storage.getItem( "object_keys" );
		var keys = _k + ",";
		if( obj_keys && obj_keys.indexOf( keys ) != -1 ){
			obj_keys.replace( keys , "" );
			this._storage.setItem( this._storage.setItem( "object_keys", obj_keys ) );
		}
		
		this._storage.removeItem( _k );
	};
	/**
	 * @public
	 * @static
	 * @method clear
	 */
	SessionData.clear = function( _k ){
		this._storage.clear();
	};
	jees.SD = SessionData;
})();