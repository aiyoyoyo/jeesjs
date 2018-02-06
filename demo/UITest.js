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

		var p1 = new jeesjs.Panel();
		var p2 = new jeesjs.Panel();
		var p3 = new jeesjs.Panel();
		jeesjs.CM.addWidget( p1 );

		function test_panel(){
			p2.addChild( p3 );
			// Widget属性 =================
			// p1.setAlpha( 0.5 );
			// p1.setVisible( false );
			p1.onEvent( "click", test );
			// p1.unEvent( "click" );
			// p1.setEnabled( false );// 影响事件
			p1.setChecked( false );// 影响显示
			// Panel属性 ==================
			// p1.setColor( "#00ff00" );
			p1.setPosition( 50, 50 );
			p1.setSize( 800, 800 );
			// p1.setTile( "ground", 1 );
			// Panel容器属性 ==============

			p2.setColor( "#00ff00" );
			p2.setSize( 300, 300 );
			p2.setPosition( 50, 50 );
			p1.addChild( p2 );

			p3.setColor( "#ff0000" );
			p3.setPosition( -50, -50 );
			p2.addChild( p3 );
			
			p2.onEvent( "click", function() {
				var pos = p3.getPosition();
				p3.setPosition( pos.x + 5, pos.y );
			} );
		}
		
		function test_textbox(){
			var t = new jeesjs.TextBox();
			t.setText("sdf asdf fas fdasf fa dsf");
			t.setColor( "#ffff00" );
			t.setPosition( 50, 50 );
			t.setFontSize( 16 );
			t.setFont( "微软雅黑" );
//			t.setAlign( jeesjs.TextBox.ALIGN_START  );	// 水平对齐方式
//			t.setBaseline( jeesjs.TextBox.BASELINE_TOP ); // 垂直对齐方式
			// t.setMaxWidth( 32 );		//最大显示宽度，超出后缩放
			// t.setLineWidth( 16 );	//最大换行宽度，超出后换行
			t.onEvent( "click", test );
			p3.addChild( t );
			// t.setText("测试文本测试文本测试文本");-	
		}
		
		function test_image(){
			var img;
			img = new jeesjs.ImageBox( "demo/res/demo.jpg" );
			// img = new jeesjs.ImageBox( jeesjs.QM.getSource( "jpg" ) );
			// img = new jeesjs.ImageBox( "pngr" );
			// img = new jeesjs.ImageBox( "https://raw.githubusercontent.com/aiyoyoyo/jeesjs/master/demo/res/buttons/btn_check.png" );
			p2.addChild( img );

			// img.setRect( 0, 0, 200, 200 );
			// img.setSize( 200,100 );
			img.setPosition( 50, 50 );
			img.onEvent( "click" , test );
		}
		
		// 组合测试
		function test_sprite(){
			// var anime_data = { count : 6, width: 291/3, height: 206/2, type: "run", animations: {
			// 	run : [0, 3, "run", 1.5],
			// 	jump : [3,6, "run"]
			// }};
			var spt;
			// spt = new jeesjs.ImageSpt( "demo/res/demo.jpg" );
			spt = new jeesjs.ImageSpt( "png" );
			// var spt = new jeesjs.ImageSpt( "pnga", { width: 97, height: 103, count: 6,  begin: 0, end: 5, speed: 0.05 }, p );
			// var spt = new jeesjs.ImageSpt( "png", { row : 2, col : 3, animations: { default: [0, 6, "default", 1] } } );
			// spt.play();
			// spt.setPosition( 100, 100 );
			p2.addChild( spt );

			spt.play();
			stp.setSplit( 2, 3 );

			// console.log( spt._spt_data.frames );

			// p.onEvent( "click", function(){
			// 	spt.play( "jump" );
			// });
			
			// jeesjs.CM.addWidget( p );
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
		test_panel();
		// test_textbox();
		// test_image();
		test_sprite();
//		test_button();
//		test_ui();
//		test_perf();
	};
	Mod_Test.leave = function() { console.log("--Mod_Test leave"); };
	Mod_Test.update = function( _t ) {
//		console.log("--Mod_Test update" , _t );
//		this._upd_perf();
//		this._upd_image( _t );
	}
	jeesjs.APP.init( {fps: 25} );
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	
	jeesjs.QM.addSource( "ground1", "demo/res/ground1.jpg" );
	jeesjs.QM.addSource( "ground", "demo/res/ground.png" );
	jeesjs.QM.addSource( "jpg", "demo/res/demo.jpg" );
	jeesjs.QM.addSource( "gif", "demo/res/demo.gif" );
	jeesjs.QM.addSource( "png", "demo/res/demo.png" );
	jeesjs.QM.addSource( "pngr", "https://raw.githubusercontent.com/aiyoyoyo/jeesjs/master/demo/res/buttons/btn_check.png" );
	jeesjs.QM.addSource( "btn", "demo/res/buttons/btn_green.png" );
	jeesjs.QM.addSource( "btnc", "demo/res/buttons/btn_check.png" );
	jeesjs.QM.load( function(){
		jeesjs.MM.enter( Mod_Test );
	} );
}