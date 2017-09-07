// 构造Module对象
var Mod_ImageBox = new jeesjs.Module();

// 重载Module的enter实现
Mod_ImageBox.enter = function() {
	var ib = new jeesjs.ImageBox( "gif" );
	ib.setScale(0.7, 0.7);
	var y = ib.getSize().h + 5;

	// 88 * 148
	for (var i = 0; i < 4; i++) {
		var tmp_i = new jeesjs.ImageBox( "btn" );
		tmp_i.setRect(0, i * 37, 88, 37);
		tmp_i.setPosition(i * (tmp_i.getSize().w + 5), y + i * 37);
		jeesjs.CM.addWidget( tmp_i );
	}

	jeesjs.CM.addWidget( ib );
};