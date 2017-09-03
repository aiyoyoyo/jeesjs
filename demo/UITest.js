function UITest(){
	var Mod_Test = new jeesjs.Module();
	Mod_Test.enter = function() {
		function test( _e, _w ){
			console.log( _w.getWidget().id );
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
			p.onEvent( "click", test );
//			p.unClick( "click" );
			jeesjs.CM.addWidget( p );
		}
		function test_panel3(){
			var p = new jeesjs.Panel();
			var p2 = new jeesjs.Panel( p );
			var p3 = new jeesjs.Panel( p2 );
			
			p.onEvent( "click", test );
			
			p2.setColor( "#ffff00" );
			p2.setPosition( 50, 50 );
			p2.onEvent( "click", test );
			
			p3.setColor( "#ff0000" );
			p3.setPosition( 10, 10 );
			p3.onEvent( "click", test );
			
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
			t.onEvent( "click", test );
			jeesjs.CM.addWidget( p );
		}
		
		function test_image(){
			var tmp_p = new jeesjs.Panel();
//			var tmp_i = new jeesjs.ImageBox( "res/demo.jpg" , tmp_p );
			var tmp_i = new jeesjs.ImageBox( jeesjs.QM.getSource( "png" ), tmp_p );
//			var tmp_i = new jeesjs.ImageBox( "png", tmp_p );
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
			p.setPosition( 200, 200 );
			
			var b = new jeesjs.Button( jeesjs.Button.TYPE_CHECK, "btnc", "测试文字", p );
			b.setPosition( 200,200 );
//			b.setEnabled( false );
//			b.setChecked( true );
			
			b.onEvent( "click", test  );
//			b.unEvent( "click" );
			
			p.onEvent( "click", test  );
			jeesjs.CM.addWidget( p );
		}
		
		// 组合测试
		this._spt = null;
		function test_sprite(){
			var p = new jeesjs.Panel();
			p.setSize( 800, 600 );
			
			var anime_data ={ count : 64, width: 165, height: 292, type: "run", animations: {
				run : [0, 26, "run", 1.5],
				jump : [26,63, "run" ]
			}};
			Mod_Test._spt = new jeesjs.ImageSpt( true, "png", anime_data, p );
//			Mod_Test._spt = new jeesjs.ImageSpt( false, "pnga", { width: 97, height: 103, count: 6,  begin: 0, end: 5, speed: 0.05 }, p );
//			Mod_Test._spt = new jeesjs.ImageSpt( false, "gifa", { count: 1,  begin: 0, end: 5, speed: 1 }, p );
			Mod_Test._spt.setPosition( 100, 100 );
			
			p.onEvent( "click", function(){
				Mod_Test._spt.play( "jump" );
			});
			
			jeesjs.CM.addWidget( p );
		}
		
		// 组合测试
		this._img = null;
		function test_ui(){
			var p = new jeesjs.Panel();
//			var i = new jeesjs.ImageBox( "png", p );
			Mod_Test._img = new jeesjs.ImageBox( "png", p );
			
			var t = new jeesjs.TextBox( "测试文本", p );
			var t2 = new jeesjs.TextBox( "测试文本", p );
			var b = new jeesjs.Button( jeesjs.Button.TYPE_NORMAL, "btn", "", p );
			
			t.setColor( "#ffff00" );
			t.setPosition( 150, 150 );
			t.setFontSize( 32 );
			t.setItalic( true );
			t.onEvent( "click", test );
			
			t2.setColor( "#00ffff" );
			t2.setPosition( 200, 200 );
			t2.setFontSize( 32 );
			t2.setBold( true );
			
			b.setPosition( 400,400 );
			b.onEvent( "click", test );
			
			p.setSize(jeesjs.APP.getSize().w, jeesjs.APP.getSize().h);
			
			jeesjs.CM.addWidget( p );
//			jeesjs.CM.addWidget( t2 );
		}
		
		this._list = new Array();
		function test_perf(){
			var i = 0;
			while( i ++ < 1000 ){
				var p = new jeesjs.Panel();
				jeesjs.CM.addWidget( p );
				Mod_Test._list.push( p );
			}
		}
		this._upd_perf = function(){
			var x = jeesjs.UT.Random( jeesjs.APP.getSize().w );
			var y = jeesjs.UT.Random( jeesjs.APP.getSize().h );
			var index = jeesjs.UT.Random( Mod_Test._list.length );
			var p = Mod_Test._list[index - 1];
			p.setColor( jeesjs.UT.RandomColor() );
			p.setPosition( x, y );
		}
		this._i = 0;
		this._upd_image = function( _t ){
			this._time += _t;
			if( this._time > 500 ){
				this._time = 0;
//				this._img.setRect( 10, 10, 30, 30 );
				
				this._spt.setStop( this._i );
				if( this._i ++ > 19 ) this._i = 0;
			}
		}
		this._time = 0;
//		test_panel();
//		test_panel2();
//		test_panel3();
//		test_textbox();
//		test_image();
//		test_button();
		test_sprite();
//		test_ui();
//		test_perf();
	};
	Mod_Test.leave = function() { console.log("--Mod_Test leave"); };
	Mod_Test.update = function( _t ) {
//		console.log("--Mod_Test update" , _t );
//		this._upd_perf();
//		this._upd_image( _t );
	}
	
	jeesjs.QM.addSource( "gifa", "res/anim.gif" );
	jeesjs.QM.addSource( "pnga", "res/anim.png" );
	jeesjs.QM.addSource( "jpg", "res/demo.jpg" );
	jeesjs.QM.addSource( "gif", "res/demo.gif" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	jeesjs.QM.addSource( "pngr", "https://raw.githubusercontent.com/aiyoyoyo/jeesjs/master/demo/res/buttons/btn_check.png" );
	jeesjs.QM.addSource( "btn", "res/buttons/btn_green.png" );
	jeesjs.QM.addSource( "btnc", "res/buttons/btn_check.png" );
	
	jeesjs.APP.init( Mod_Test,{fps: 25} );
	jeesjs.APP.showFPS( true );
//	jeesjs.APP.setScale( 1.5, 2  );
}