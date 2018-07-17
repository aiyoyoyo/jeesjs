/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/examples/assets/js/ex_ui_inputbox.js
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
	function ExUIInputBox() { throw "ExUIInputBox cannot be instantiated."; };

	// private static properties: =============================================
    ExUIInputBox._init = false;

	// public static properties: ==============================================
    // private static methods: ================================================
	// public static methods: =================================================
    /**
     * 初始化调试器
     * @method startup
     * @static
     **/
	ExUIInputBox.startup = function() {
        if( this._init ) return;
        this._init = true;

        jees.SET.startup( { debug: true } );
        jees.CJS.startup();
        jees.CM.startup();
        jees.DEBUG.startup();

        var p0 = new jees.Panel();
        var p1 = new jees.Panel();
        var eI = new jees.InputBox();

        jees.CM.addWidget( p0, false );

        // p0
        p0.setSize( jees.SET.getWidth(), jees.SET.getHeight() );
        p0.setColor("#EFEFDA");
        p0.addWidget( p1 );
        p0.addWidget( eI );
        // p1
        p1.setSize( 600, jees.SET.getHeight() );
        p1.setColor("#6699CC");
        p1.setPosition( jees.SET.getWidth() - p1.getSize().w, 0 );
        // eI
        eI.setPosition( p1.getSize().w / 2 , p1.getSize().h / 2 );
        var _this = this;
        _this.input = eI;

        function _event_print( _e ){
            jees.DEBUG.print( "event->" + _e.type );
        }
        eI.onEvent( "mousedown", _event_print );
        eI.onEvent( "mousedown", _event_print );
        eI.onEvent( "mouseup", _event_print );
        eI.onEvent( "dblclick", _event_print );
        eI.onEvent( "mouseover", _event_print );
        eI.onEvent( "mouseout", _event_print );

        // 默认内容
        var ticker = jees.CJS.getTicker();
        ticker.addEventListener( "tick", this.update );

        jees.DEMO_TPL.startup( p1, _this.input );
        this.help();
	};

	ExUIInputBox.help = function(){
         jees.DEMO_TPL.title( "InputBox" );
         jees.DEMO_TPL.attribute( "Size", "(eg. w, h )" );
         jees.DEMO_TPL.attribute( "Position", "(eg. x, y )"  );
	};

    ExUIInputBox.build = function(){
        var size = jees.DEMO_TPL.get( "Size" );
        jees.DEMO.input.setSize( size.w, size.h );

        var position = jees.DEMO_TPL.get( "Position" );
        jees.DEMO.input.setPosition( position.x, position.y );
    };

	ExUIInputBox.update = function( _e ){
        jees.CM.update();
	};

	jees.DEMO = ExUIInputBox;
})();