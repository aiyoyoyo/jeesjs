// 构造Module对象
var Mod_CheckBox = new jeesjs.Module();

// 重载Module的enter实现
Mod_CheckBox.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	this._index = 0;
	this._btns = new Array();
	this._panel = new jeesjs.Panel();
	
	this._btn = new jeesjs.CheckBox(jeesjs.Button.TYPE_CHECK, "btnc", "",
			this._panel);

	this._panel.setSize(size.w, 400);
	this._panel.setPosition(0, 100);

	this._btn.setPosition(200, 0);
	this._btn.onEvent("click", function() {
				_this._btn.setChecked(!_this._btn.isChecked());
			});

	jeesjs.CM.addWidget(this._panel);
};
Mod_CheckBox.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}