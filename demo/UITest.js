function UITest(){
	var Mod_Test = new jeesjs.Module();
	Mod_Test.enter = function() {
		function test( _e ){
			console.log( _e.target.id );
		}
		
//		var w = new jeesjs.Widget();
//		w.setSize( 100, 100 );
		
		var p = new jeesjs.Panel();
		p.setSize( 200 ,200 );
		p.onClick( test );
		
//		w.addChild( p );
		
		var p2 = new jeesjs.Panel();
		p2.setColor( "#ffff00" );
		p2.setPosition( 50, 50 );
		p2.setSize( 200 ,200 );
		p2.onClick( test );
		
		p.addChild( p2 );
//		var w2 = new jeesjs.Widget();
//		w2.setSize( 200 ,200 );
//		w2.addChild( p2 );
//		w.addChild( p2 );
		
//		jeesjs.CM.addWidget( p );
		jeesjs.CM.addWidget( p );
		
//		jeesjs.CM.addWidget( p, w );
//		var d0 = new createjs.Bitmap( jeesjs.QM.getSource( "jpg" ) );
//		jeesjs.APP._contar.addChild( d0 );
		
//		var d1 = new createjs.Bitmap( jeesjs.QM.getSource( "png" ) );
//		jeesjs.APP._contar.addChild( d1 );
//		d1.x = 200;
//		d1.alpha = 0.5
//		d1.visible = true;
//		
//		d0.addChild( d1 );
//		jeesjs.CM.addWidget( d0 );
	};
	Mod_Test.leave = function() { console.log("--Mod_Test leave"); };
	Mod_Test.update = function( _t ) { console.log("--Mod_Test update" ); }
	
	jeesjs.QM.addSource( "jpg", "res/demo.jpg" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	
	jeesjs.APP.init( Mod_Test );
}