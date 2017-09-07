// 构造Module对象
var Mod_TextBox = new jeesjs.Module();

// 重载Module的enter实现
Mod_TextBox.enter = function() {
	var p = new jeesjs.Panel();

	var t = new jeesjs.TextBox("点击文字变色", p);
	t.setPosition(60, 100);
	t.setColor(jeesjs.UT.RandomColor());
	t.setFontSize(18);
	t.setLineWidth(60);
	t.onEvent("click", function() {
				t.setColor(jeesjs.UT.RandomColor());
				t.setText("点击面板空白处显示");
				t.setVisible(false);
			});

	p.onEvent("click", function() {
				t.setText("点击文字变色");
				t.setColor(jeesjs.UT.RandomColor());
				t.setVisible(true);
			});

	jeesjs.CM.addWidget(p);
};