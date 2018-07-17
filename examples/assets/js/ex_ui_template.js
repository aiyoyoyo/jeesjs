/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/examples/assets/js/ex_ui_template.js
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
	function ExUITemplate() { throw "ExUITemplate cannot be instantiated."; };

	// private static properties: =============================================
    ExUITemplate._init = false;
    ExUITemplate._widget = null;
    ExUITemplate._panel = null;
    ExUITemplate._title = null;
    ExUITemplate._field = null;
    ExUITemplate._button = null;
    ExUITemplate._posY = 0;


	// public static properties: ==============================================
    // private static methods: ================================================

    ExUITemplate._att_size = function(){
        var ipt = this._field.get( "Size" );

        ipt.setText( this._widget.getSize().w + "," + this._widget.getSize().h );
    };
    ExUITemplate._att_position = function(){
        var ipt = this._field.get( "Position" );

        ipt.setText( this._widget.getPosition().x + "," + this._widget.getPosition().y );
    };
	// public static methods: =================================================
    /**
     * 初始化调试器
     * @method startup
     * @static
     **/
	ExUITemplate.startup = function( _p, _o ) {
        if( this._init ) return;
        this._init = true;

        this._field = new Map();

        this._panel = _p;
        this._widget = _o;

        this._title = new jees.TextBox();
        this._title.setColor( "#000000" );
        this._title.setFontSize( 26 );
        this._title.setText( "Title" );
        this._panel.addWidget( this._title );
        this._posY += this._title.getSize().h;

        var lab0 = new jees.TextBox();
        lab0.setColor( "#000000" );
        lab0.setFontSize( 16 );
        lab0.setText( "属性" );
        lab0.setPosition( 0, this._posY );
        this._panel.addWidget( lab0 );
        this._posY += lab0.getSize().h + 2;

        this._button = new jees.Button( jees.Button.TYPE_NORMAL, "btn_skin", "执行" );
        this._button.setPosition( 0, this._posY );
        this._panel.addWidget( this._button );

        this._button.onEvent( "click", jees.DEMO.build );
	};

    ExUITemplate.title = function( _t ){
        this._title.setText( _t );
    };

    ExUITemplate.attribute = function( _t, _h ){
        if( this._field.has( _t ) )
            throw "已存在同类标签[" + _t + "]";

        var lab = new jees.TextBox();
        lab.setColor( "#000000" );
        lab.setFontSize( 14 );
        lab.setText( _t + _h + ": ");
        lab.setPosition( 0, this._posY );
        this._panel.addWidget( lab );

        var ipt = new jees.InputBox();
        ipt.setPosition( lab.getSize().w + 10, this._posY );
        this._panel.addWidget( ipt );

        this._posY += lab.getSize().h + 10;
        this._field.set( _t, ipt );

        if( _t == "Size" ) this._att_size();
        if( _t == "Position" ) this._att_position();
    };

	ExUITemplate.get = function( _t ){
	    if( !this._field.has( _t ) )
	        throw "未找到对应标签[" + _t + "]";

        var ipt = this._field.get( _t );
        var vals = ipt.getText().split( "," );
        if( _t == "Size" ) return { w: vals[0], h: vals[1] };
        if( _t == "Position" ) return { x: vals[0], y: vals[1] };

        return 0;
	};

	jees.DEMO_TPL = ExUITemplate;
})();