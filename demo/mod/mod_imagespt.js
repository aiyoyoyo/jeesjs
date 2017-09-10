// 构造Module对象
var Mod_ImageSpt = new jeesjs.Module();

// 重载Module的enter实现
Mod_ImageSpt.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	var w = size.w, h = size.h;
	this._panel = new jeesjs.Panel();
	this._panel.setSize( w, h );
	this._panel.setPosition(0, 100);
	this._panel.setTile( "sky" );
	
	var img_ground = jeesjs.QM.getSource( "ground" );
	
	this._hill1 = new jeesjs.ImageBox( "hill1", this._panel );
	this._hill1.getObject().setTransform( Math.random() * w, h - this._hill1.getSize().h * 4 - img_ground.height, 4, 4 );
	this._hill1.setAlpha( 0.5 );

	this._hill2 = new jeesjs.ImageBox( "hill2", this._panel );
	this._hill2.getObject().setTransform( Math.random() * w, h - this._hill2.getSize().h * 3 - img_ground.height, 3, 3);
	
	this._ground = new createjs.Shape();
	this._ground.graphics.beginBitmapFill( img_ground ).drawRect( 0, 0, size.w + img_ground.width, img_ground.height);
	this._ground.tileW = img_ground.width;
	this._ground.y = size.h - img_ground.height;
	this._panel.addChild( this._ground );
	
	var anime_data ={ "regX": 82, count : 64, width: 165, height: 292, type: "run", animations: {
		run : [0, 26, "run" ],
		jump : [26,63, "run"]
	}};
	
	this._grant = new jeesjs.ImageSpt( true, "grant", anime_data, this._panel );
	this._grant.setPosition( 0, 130 );
	
	this._panel.onEvent( "click", function(){
		_this._grant.play( "jump" );
	});
			
	jeesjs.CM.addWidget( this._panel );
	
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
};
Mod_ImageSpt.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}
Mod_ImageSpt.update = function( _t ){
	var w = jeesjs.APP.getSize().w;
	var deltaS = _t / 1000;
	var grant = this._grant.getObject();
	var ground = this._ground;
	var hill =  this._hill1.getObject();
	var hill2 =  this._hill2.getObject();
	
	var position = grant.x + 150 * deltaS;
	var grantW = grant.getBounds().width * grant.scaleX;
	grant.x = (position >= w + grantW) ? - grantW : position;

	ground.x = (ground.x - deltaS * 150) % ground.tileW;
	hill.x = (hill.x - deltaS * 30);
	if (hill.x + hill.image.width * hill.scaleX <= 0) {
		hill.x = w;
	}
	hill2.x = (hill2.x - deltaS * 45);
	if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
		hill2.x = w;
	}
}