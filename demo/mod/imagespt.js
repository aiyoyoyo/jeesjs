// 构造Module对象
var Mod_ImageSpt = new jeesjs.Module();

// 重载Module的enter实现
Mod_ImageSpt.enter = function() {
	var anime_data ={ count : 64, width: 165, height: 292, type: "run", animations: {
		run : [0, 26, "run" ],
		jump : [26,63, "run"]
	}};
	var grant = new jeesjs.ImageSpt( true, "grant", anime_data, this.panel );
	grant.setPosition( 100, 100 );

	grant.onEvent( "click", function(){
		grant.play( "jump" );
	});
			
	jeesjs.CM.addWidget( grant );
};