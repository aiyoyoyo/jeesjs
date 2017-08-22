function QueueTest(){
	var Mod_Test = new jeesjs.Module();
	Mod_Test.enter = function() {
		this.d0 = new createjs.Bitmap( jeesjs.QM.getSource( "png" ) );
		jeesjs.APP._contar.addChild( this.d0 );
		
//		this.s0 = createjs.Sound.play( "mp3", {delay: 3000, volume: 0.1, startTime: 15000, duration: 50000} );
		this.s0 = createjs.Sound.play( "mp3" );
		this.s0.volume = 0.1;
		this.s0.loop = -1;
		this.s0.pan = 0;
	};
	
	jeesjs.QM.addSource( "gif", "res/demo.gif" );
	jeesjs.QM.addSource( "jpg", "res/demo.jpg" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	
	jeesjs.QM.addSource( "mp3", "res/sounds/demo.mp3" );
	jeesjs.QM.addSource( "ogg", "res/sounds/demo.ogg" );
	jeesjs.QM.addSource( "wav", "res/sounds/demo.wav" );
	jeesjs.QM.addSource( "wma", "res/sounds/demo.wma" );
	jeesjs.APP.init( Mod_Test );
}