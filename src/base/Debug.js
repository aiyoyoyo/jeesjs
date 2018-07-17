/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Debug.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class Debug
	 * @static
	 */
	function Debug() { throw "Debug cannot be instantiated."; };

	// private static properties: =============================================
    Debug._init = false;
    Debug._width = 200;
    Debug._height = 100;
    Debug._wgt_text = null;
    Debug._wgt_panel = null;
    Debug._print = "";
	// public static properties: ==============================================
    // private static methods: ================================================
	// public static methods: =================================================
	/**
	 * 提供自定义输出内容
	 */
	Debug.print = function( _t ){
        this._print = _t;
	};
    /**
     * 初始化调试器
     * @method startup
     * @static
     **/
	Debug.startup = function() {
	    if( !jees.SET.isDebug() ) return;
        if( this._init ) return;
        this._init = true;

        var c = jees.CM._get_container( jees.CM.Container.DEBUG  );

        this.panel = new jees.Panel();
        this.panel.setSize( this._width, this._height );
        this.panel.setColor( "#8080C0" );
        this.panel.setBackAlpha( 0.5 );

        this._wgt_text = new jees.TextBox();
        this._wgt_text.setColor( "#FFFF00" );
        this._wgt_text.setMaxWidth( this._width );    //最大显示宽度，超出后缩放
        this._wgt_text.setLineWidth( this._height );	//最大换行宽度，超出后换行

        this.panel.addWidget( this._wgt_text );

        jees.CM.addWidget( this.panel, false, jees.CM.Container.DEBUG );
        jees.CM.update( jees.CM.Container.DEBUG );
	};
    /**
     * 刷新调试内容
     */
	Debug.update = function(){
	    if( !jees.SET.isDebug() ) return;
	    var str = " 帧率: " + jees.CJS.getFPS( true )
	        + "\n 回调时间：" + jees.CJS.getTickerTime() + "ms"
	        + "\n 自定输出：" + this._print;
        this._wgt_text.setText( str );
	};

	jees.DEBUG = Debug;
})();