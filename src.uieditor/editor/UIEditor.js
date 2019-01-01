/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/editor/UIEditor.js
 * License: MIT license
 */

/**
 * @module jees
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class UIEditor
	 */
	function UIEditor() {
		this.Module_constructor( "UIEditor" );
// private properties:	
		this._layout = null;
	}
    var p = createjs.extend( UIEditor, jees.Module );
// private static methods: ====================================================
    p._initialize = function(){
       	// 绘制界面
    	this._layout = jees.Layout.load( "uieditor" );
    	var wgt = this._layout;
    	var txt = wgt.findChildByName( "testText" );
    	var img = wgt.findChildByName( "testImage" );
    	var spt = wgt.findChildByName( "testSprite" );
    	var btn0 = wgt.findChildByName( "testButton0" );
    	var btn1 = wgt.findChildByName( "testButton1" );
    	var btn2 = wgt.findChildByName( "testButton2" );
    	var chk0 = wgt.findChildByName( "testCheckBox0" );
		var chk1 = wgt.findChildByName( "testCheckBox1" );
		var ipt0 = wgt.findChildByName( "testInputBox0" );
		var ipt1 = wgt.findChildByName( "testInputBox1" );
      	/* TEST Widget ==
      	jees.E.bind( wgt, "click", function( _e ){
//    		wgt.setAlign( 2, 2 );
//    		wgt.setSize( "50%", "50%" ); // 相对父节点大小50%
//			wgt.setScale( 0.75, 0.75 );  // 不会改变坐标
//			wgt.setPosition( 100, 100 );
			// 事件有依赖性，混用会导致布局混乱。
		});
//		*/
		/* TEST TextBox ==
        jees.E.bind( wgt, "click", function( _e ){
//    		txt.setAlign( 2, 2 );
//			txt.setPosition( 100, 100 );
//			txt.setColor( "#00FF00" );
//			txt.setFontStyle( "宋体" );
//			txt.setFontSize( 40 );
//			txt.setBold( true );
//			txt.setItalic( true );
//			txt.setFont( _s, _f, _i, _b );
//			txt.setMaxWidth( 300 );
//			txt.setWarp( true );
//			txt.setLineWidth( null );
//			txt.setText( "十九八七六五四三二一十九八七六五四三二一" );
//			txt.setVisible( false );
//			txt.setScale( 1.5, 1.5 );
		});
//		*/	
		/* TEST ImageBox ==
        jees.E.bind( wgt, "click", function( _e ){
//			spt.setSize( 300, 300 );
//			spt.setPosition( 100, 100 );
//			spt.setScale( 1.5, 1.5 );
//			spt.setVisible( false );
//			spt.setAlign( 2, 2 );
//			spt.setSpeed( 500 );
		});
//		*/
//		/* TEST Button ==
		var align = 0;
//		btn0.setDisabled( true );
        jees.E.bind( btn0, "click", function( _e ){
//      	var btn = btn1;
//        	btn.setAlign( align, align );
//        	align ++;
//        	if( align == 3 ) align = 0;
//			btn.setPosition( 100, 100 );
//			btn.setVisible( false );
//			btn.setDisabled( true );
//			btn.setText( "确  定" );
			console.log( "btn.click" );
		});
		
		jees.E.unbind( btn0, "click", f );
//		*/
		/* TEST CheckBox ==
		var align = 0;
        jees.E.bind( wgt, "click", function( _e ){
        	var chk = chk1;
//        	chk.setAlign( align, align );
//        	align ++;
//        	if( align == 3 ) align = 0;
//			chk.setPosition( 100, 100 );
//			chk.setVisible( false );
//			chk.setDisabled( true );
//			chk.setText( "  确  定" );
		});
//		*/
		/* TEST InputBox ==
		var align = 0;
        jees.E.bind( wgt, "click", function( _e ){
        	var ipt = ipt1;
          	align ++;
          	if( align == 3 ) align = 0;
//        	ipt.setAlign( align, align );
//			ipt.setPosition( 100, 100 );
//			ipt.setVisible( false );
//			ipt.setDisabled( true );
//			ipt.setText( "一二三四一二三四一二三四一二三四一二三四" );
		});
//		*/
    }
    // public static methods: =================================================
    p.enter = function(){
    	// 程序启动
    	var _this = this;
		jees.Resource.register( "logo", "../assets/images/JeesJS_Logo.png" );
		jees.Resource.register( "cover", "../assets/images/cover.png" );
		jees.Resource.register( "anima0", "../assets/images/anima_0.png" );
		jees.Resource.register( "chk", "../assets/images/chk.png" );
		jees.Resource.register( "btn_green", "../assets/images/btn_green.png" );
		jees.Resource.register( "btn_short", "../assets/images/btn_short.png" );
		jees.Resource.register( "ipt_short", "../assets/images/ipt_short.png" );
		jees.Resource.register( "panel_bg", "../assets/images/panel_bg.png" );
		
    	jees.Layout.register( "uieditor", "../assets/layouts/jees.uieditor.layout" );
    	
    	jees.RM.onload( function(){ _this._initialize(); } );
    }
    p.leave = function(){
    	jees.Layout.unload( "uieditor" );
    }
    p.update = function(){
    	
    }
    
    jees.UIEditor = createjs.promote( UIEditor, "Module");
})();