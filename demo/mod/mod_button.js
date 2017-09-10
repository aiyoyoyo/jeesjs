// 构造Module对象
var Mod_Button = new jeesjs.Module();

// 重载Module的enter实现
Mod_Button.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	this._index = 0;
	this._btns = new Array();
	this._panel = new jeesjs.Panel();
	this._btn0 = new jeesjs.Button(jeesjs.Button.TYPE_NORMAL, "btn", jeesjs.UT
					.RandomColor(), this._panel);
	this._btn1 = new jeesjs.Button(jeesjs.Button.TYPE_CHECK, "btnc", "",
			this._panel);

	this._panel.setSize(size.w, 400);
	this._panel.setPosition(0, 100);

	this._btn0.setPosition(100, 0);
	this._btn0.onEvent("click", function() {
				_this._btn0.setText(jeesjs.UT.RandomColor());
			});

	this._btn1.setPosition(200, 0);
	this._btn1.onEvent("click", function() {
				_this._btn1.setChecked(!_this._btn1.isChecked());
			});

	jeesjs.CM.addWidget(this._panel);
};
Mod_Button.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}