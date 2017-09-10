// 构造Module对象
var Mod_TextBox = new jeesjs.Module();

// 重载Module的enter实现
Mod_TextBox.enter = function() {
	var _this = this;
	var size = jeesjs.APP.getSize();
	this._panel = new jeesjs.Panel();
	this._panel.setSize(size.w, size.h );
	this._panel.setPosition(0, 100);

	var t = new jeesjs.TextBox("点击文字变色", this._panel);
	t.setColor(jeesjs.UT.RandomColor());
	t.setFontSize(18);
	t.setLineWidth(60);
	t.onEvent("click", function() {
				t.setColor(jeesjs.UT.RandomColor());
				while (t.getColor() == "#000000")
					t.setColor(jeesjs.UT.RandomColor());
				t.setText("点击面板空白处显示");
				t.setVisible(false);
			});

	this._panel.onEvent("click", function() {
				t.setText("点击文字变色");
				t.setColor(jeesjs.UT.RandomColor());
				while (t.getColor() == "#000000")
					t.setColor(jeesjs.UT.RandomColor());
				t.setVisible(true);
			});

	jeesjs.CM.addWidget(this._panel);
};
Mod_TextBox.leave = function() {
	jeesjs.CM.removeWidget(this._panel);
	delete this._panel;
}