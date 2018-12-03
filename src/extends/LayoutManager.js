/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/LayoutManager.js
 * License: MIT license
 */

/**
 * layout管理器
 * @module jeesjs
 */
// namespace:
this.jees = this.jees || {};
this.jees.EX = this.jees.EX || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class LayoutManager
	 * @extends FileLoadManager
	 */
	function LayoutManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
// private properties: 
		/**
		 * 已经解析的UI文件
		 * @private
		 * @property _layouts
		 * @type {Map<String, jees.Widget>}
		 */
		this._layouts = new Map();
	};
	var p = createjs.extend( LayoutManager, jees.FileLoadManager );
// private methods: ===========================================================
	/**
	 * 解析配置转为jees.Widget类型
	 * @method _layout_property_2_widget
	 * @private
	 * @param {String} _t 类型
	 * @param {Object} _w 配置值
	 * @return {jees.Widget}
	 */
	p._layout_property_2_widget = function( _t, _w ){
		var _this = this;
		var wgt = null;
		var type = _t ? _t.toString().toLowerCase() : "widget";
		
		if( type == "widget") wgt = new jees.UI.Widget();
		else if( type == "panel" ) wgt = new jees.UI.Panel();
		else if( type == "textbox" ) wgt = new jees.UI.TextBox();
		else if( type == "imagebox" ) wgt = new jees.UI.ImageBox();
		else if( type == "imagespt" ) wgt = new jees.UI.ImageSpt();
		else if( type == "button" ) wgt = new jees.UI.Button();
		else if( type == "checkbox" ) wgt = new jees.UI.CheckBox();
		else if( type == "inputbox" ) wgt = new jees.UI.InputBox();
		else throw "错误的控件类型：" + _t;
		
		// 解析createjs属性
		for ( var i in wgt ) {
            if ( _w.hasOwnProperty( i ) ) {
            	wgt[i] = _w[i];
            }	
       	}
		// 解析自定义属性
		for ( var i in wgt.property ) {
            if ( _w.hasOwnProperty( i ) ) {
            	wgt.property[i] = _w[i];
            }	
       	}
		
		// 解析子控件
		if( wgt.property.childs ){
			wgt.property.childs.forEach( function( _c ) {
				for( var i in _c ){
					wgt.addChild( _this._layout_property_2_widget( i, _c[i] ) );
					break;
				}
			} );
		}
		
		return wgt;
	}
	/**
	 * 解析Layout文件根节点
	 * @private
	 * @method _layout_2_widget
	 * @param {Object} _w
	 * @returns {jees.Widget}
	 */
	p._layout_2_widget = function( _w ){
		var wgt = null;
		for( var i in _w ){
			var wgt = this._layout_property_2_widget( i, _w[i] );
			break;
		}
		return wgt;
	}
// public methods: ============================================================
	/**
	 * @public
	 * @method onload
	 * @param {Object} _n
	 * @returns {jees.Widget}
	 */
	p.load = function( _n ){
		var wgt = null;
		
		if( this._layouts.has( _n ) ){
			wgt = this._layouts.get( _n );
		}else{
			wgt = this._layout_2_widget( this.getContent( _n ) );
			this._layouts.set( _n, wgt );
		}
		
		jees.CM.addChild( wgt );
		return wgt;
	}
	/**
	 * @public
	 * @method unload
	 * @param {Object} _n
	 */
	p.unload = function( _n ){
		if( this._layouts.has( _n ) ){
			var wgt = this._layouts.get( _n );
			jees.APP.removeChild( wgt );
			this._layouts.delete( _n );
			this.del( _n );
		}
	}
	
	jees.EX.LayoutManager = createjs.promote( LayoutManager, "FileLoadManager");
})();
