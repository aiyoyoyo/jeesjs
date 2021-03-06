/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/manager/FileLoadManager.js
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
	 * @class FileLoadManager
	 * @param {String} _g 文件加入的分组
	 * @param {String} _s 固定文件的格式
	 */
	function FileLoadManager( _g, _s ){
// private properties:
		/**
		 * 是否设定分组
		 * @param _group
		 * @private
		 * @type {String}
		 * @defualt {@link jees.RM.DEFAULT_GROUP}
		 */
		this._group = _g == undefined ? jees.RM.DEFAULT_GROUP : _g;
		/**
		 * 是否指定后缀
		 * @param _suffix
		 * @private
		 * @type {String}
		 * @defualt {@link jees.RM.DEFAULT_GROUP}
		 */
		this._suffix = _s == undefined ? "" : _s;
	};
	var p = FileLoadManager.prototype;
// public methods: ============================================================
	/**
	 * 注册文件
	 * @public
	 * @method register
	 * @param {Object} _n
	 * @param {Object} _f
	 */
	p.register = function( _n, _f ) {
		var status = false;
		if( this._suffix.length > 0 ){
			if( _f.lastIndexOf( "." + this._suffix ) != -1 )
				status = true;
		}else status = true;

		if( status ){
			jees.RM.add( _n, _f, this._group );
		}else throw "文件格式不正确";
	};
	/**
	 * 加载
	 * @public
	 * @method onload
	 * @param {Object} _h
	 */
	p.onload = function( _h ){
		jees.RM.onload( _h );
	};
	/**
	 * 获取文件
	 * @public
	 * @method get
	 * @param {String} _n
	 * @return {Object|createjs.LoadItem}
	 */
	p.get = function( _n ){
		if( this._group != null )
			return jees.RM.get( _n, this._group );
		return jees.RM.get( _n );
	}
	/**
	 * 删除已加载文件
	 * @public
	 * @method del
	 * @param {String} _n
	 */
	p.del = function( _n ){
		if( this._group != null )
			jees.RM.del( _n, this._group );
		else jees.RM.del( _n );
	}
	/**
	 * 获取文件内容，这里配置文件等json对象凡是结尾属性的","一律要去掉。
	 * @link https://github.com/douglascrockford/JSON-js
	 * @public
	 * @method getContent
	 * @param {String} _n
	 * @return {String}
	 */
	p.getContent = function( _n ){
		return JSON.parse( this.get( _n ) );
	}
	
	jees.FileLoadManager = FileLoadManager;
})();