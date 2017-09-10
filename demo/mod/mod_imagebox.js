// 构造Module对象
var Mod_ImageBox = new jeesjs.Module();

// 重载Module的enter实现
Mod_ImageBox.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	this._panel = new jeesjs.Panel();
	this._panel.setSize(size.w, 400);
	this._panel.setPosition(0, 100);
	
	var ib = new jeesjs.ImageBox( "png", this._panel );
	ib.setScale(0.7, 0.7);
	var y = ib.getSize().h + 5;

	// 88 * 148
	for (var i = 0; i < 4; i++) {
		var tmp_i = new jeesjs.ImageBox( "btn", this._panel );
		tmp_i.setRect(0, i * 37, 88, 37);
		tmp_i.setPosition( i * (tmp_i.getSize().w + 5), y + i * 37);
	}

	jeesjs.CM.addWidget( this._panel );
};
Mod_ImageBox.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}