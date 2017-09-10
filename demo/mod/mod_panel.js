// 构造Module对象
var Mod_Panel = new jeesjs.Module();

// 重载Module的enter实现
Mod_Panel.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	// 主面板
	this._panel = new jeesjs.Panel();
	this._panel0 = new jeesjs.Panel(this._panel);
	this._panel1 = new jeesjs.Panel(this._panel0);

	this._panel.setSize(size.w, 400);
	this._panel.setPosition(0, 100);
	this._panel.setColor("#ff0000");
	this._panel.onEvent("click", function() {
				_this._panel.setColor(jeesjs.UT.RandomColor());
			});
	// 二级面板
	this._panel0.setColor("#00ff00");
	this._panel0.setPosition(20, 20);
	this._panel0.setSize(600, 600);
	this._panel0.onEvent("click", function() {
				// 在一级面板的宽度和高度之间变换。
				var s = _this._panel.getSize();
				_this._panel0.setSize(jeesjs.UT.Random(s.w / 2, s.w / 4),
						jeesjs.UT.Random(s.h / 2, s.h / 4));
			});

	// 三级面板
	this._panel1.setColor("#0000ff");
	this._panel1.setPosition(50, 50);
	this._panel1.setSize(300, 300);
	this._panel1.onEvent("click", function() {
				var s = _this._panel0.getSize();
				var p = _this._panel0.getPosition();
				_this._panel1.setSize(jeesjs.UT.Random(s.w / 2, s.w / 4),
						jeesjs.UT.Random(s.h / 2, s.h / 4));
				var x = jeesjs.UT.Random(s.w - _this._panel1.getSize().w, p.x);
				var y = jeesjs.UT.Random(s.h - _this._panel1.getSize().h, p.x);
				_this._panel1.setPosition(x, y);
				_this._panel1.setColor(jeesjs.UT.RandomColor());
				while (_this._panel1.getColor() == _this._panel0.getColor())
					_this._panel1.setColor(jeesjs.UT.RandomColor());
			});

	jeesjs.CM.addWidget(this._panel);
};

Mod_Panel.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}