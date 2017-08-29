function UITest(){
	var Mod_Test = new jeesjs.Module();
	Mod_Test.enter = function() {
		function test( _e ){
			console.log( _e.target.id );
		}
		
		function test_widget(){
			var w = new jeesjs.Widget();
			jeesjs.CM.addWidget( w );
		}
		
		function test_panel(){
			var p = new jeesjs.Panel();
			jeesjs.CM.addWidget( p );
		}
		function test_panel2(){
			var p = new jeesjs.Panel();
			p.onClick( test );
//			p.unClick();
			jeesjs.CM.addWidget( p );
		}
		function test_panel3(){
			var p = new jeesjs.Panel();
			var p2 = new jeesjs.Panel( p );
			var p3 = new jeesjs.Panel( p2 );
			
			p.onClick( test );
			
			p2.setColor( "#ffff00" );
			p2.setPosition( 50, 50 );
			p2.onClick( test );
			
			p3.setColor( "#ff0000" );
			p3.setPosition( 10, 10 );
			p3.onClick( test );
			
			jeesjs.CM.addWidget( p );
//			p.setSize(300,300 );
//			p.setPosition(100, 100);
		}
		
		function test_textbox(){
			var p = new jeesjs.Panel();
			var t = new jeesjs.TextBox( "测试文本", p );
			
			t.setPosition( 10, 10 );
			t.setColor( "#ffff00" );
			t.setFontSize( 16 );
			t.setFont( "微软雅黑" );
//			t.setAlign( jeesjs.TextBox.ALIGN_START  );
//			t.setAlign( jeesjs.TextBox.ALIGN_END );
//			t.setAlign( jeesjs.TextBox.ALIGN_LEFT 	 );
//			t.setAlign( jeesjs.TextBox.ALIGN_RIGHT  );
//			t.setAlign( jeesjs.TextBox.ALIGN_CENTER );
//			t.setBaseline( jeesjs.TextBox.BASELINE_TOP 		 );
//			t.setBaseline( jeesjs.TextBox.BASELINE_HANGING	);
//			t.setBaseline( jeesjs.TextBox.BASELINE_MIDDLE 		 );
//			t.setBaseline( jeesjs.TextBox.BASELINE_ALPHABETIC  );
//			t.setBaseline( jeesjs.TextBox.BASELINE_IDEOGRAPHIC );
//			t.setBaseline( jeesjs.TextBox.BASELINE_BOTTOM 	 );
//			t.setMaxWidth( 50 );
//			t.setLineWidth( 48 );
//			t.setText( "过长的中文" );
			t.onClick( test );
			jeesjs.CM.addWidget( p );
		}
		
		function test_image(){
			var tmp_p = new jeesjs.Panel();
//			var tmp_i = new jeesjs.ImageBox( "res/demo.jpg" , tmp_p );
//			var tmp_i = new jeesjs.ImageBox( jeesjs.QM.getSource( "png" ), tmp_p );
			var tmp_i = new jeesjs.ImageBox( "png", tmp_p );
			jeesjs.CM.addWidget( tmp_p );
			if( tmp_i.getState() ){
				tmp_p.setSize( tmp_i.getSize().w, tmp_i.getSize().h );
			}
			
			window.setTimeout( function(){
				if( tmp_i.getState() ){
					tmp_p.setSize( tmp_i.getSize().w, tmp_i.getSize().h );
				}
			}, 500 );
		}
		function test_image2(){
			this._image = new createjs.Bitmap( "res/demo.jpg" );
			jeesjs.CM.addChild( this._image );
		}
		
		function test_button(){
			var p = new jeesjs.Panel();
			p.setSize( 400, 400 );
			
			var b = new jeesjs.Button( jeesjs.Button.TYPE_CHECK, "btnc", "", p );
			b.setPosition( 200,200 );
//			b.setEnabled( false );
			b.setChecked( true );
			
//			b.onMouseDown( test  );
//			b.onClick( test  );
			
			jeesjs.CM.addWidget( p );
		}
		
		// 组合测试
		function test_ui(){
			var p = new jeesjs.Panel();
			var i = new jeesjs.ImageBox( "png", p );
			var t = new jeesjs.TextBox( "测试文本", p );
			var b = new jeesjs.Button( jeesjs.Button.TYPE_NORMAL, "btn", "", p );
			
			t.setColor( "#ffffff" );
			t.setPosition( 200, 200 );
			t.setFontSize( 32 );
			t.onClick( test );
			
			b.setPosition( 400,400 );
			b.onClick( test );
			
			p.setSize(800, 600);
			
			jeesjs.CM.addWidget( p );
		}
//		test_panel();
//		test_panel2();
//		test_panel3();
//		test_textbox();
//		test_image();
//		test_button();
		test_ui();
	};
	Mod_Test.leave = function() { console.log("--Mod_Test leave"); };
	Mod_Test.update = function( _t ) { console.log("--Mod_Test update"); }
	
	jeesjs.QM.addSource( "jpg", "res/demo.jpg" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	jeesjs.QM.addSource( "btn", "res/buttons/btn_green.png" );
	jeesjs.QM.addSource( "btnc", "res/buttons/btn_check.png" );
	
	jeesjs.APP.init( Mod_Test );
	jeesjs.APP.showFPS( true );
}