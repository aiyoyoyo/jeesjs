function UITest(){
	var Mod_Test = new jeesjs.Module();
	Mod_Test.enter = function() {
		var d0 = new createjs.Bitmap( jeesjs.QM.getSource( "jpg" ) );
		jeesjs.APP._contar.addChild( d0 );
		
		var d1 = new createjs.Bitmap( jeesjs.QM.getSource( "png" ) );
		jeesjs.APP._contar.addChild( d1 );
		d1.x = 200;
		d1.alpha = 0.5
		d1.visible = true;
		
		d0.addEventListener( "click", function(){
			console.log("click d0");
		});
		d1.addEventListener( "click", function(){
			console.log("click d1");
		});
	};
	Mod_Test.leave = function() { console.log("--Mod_Test leave"); };
	Mod_Test.update = function( _t ) { console.log("--Mod_Test update" ); }
	
	jeesjs.QM.addSource( "jpg", "res/demo.jpg" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	
	jeesjs.APP.init( Mod_Test );
}