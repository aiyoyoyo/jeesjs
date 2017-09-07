// 构造Module对象
var Mod_Panel = new jeesjs.Module();

// 重载Module的enter实现
Mod_Panel.enter = function() {
	// 主面板
	var p = new jeesjs.Panel();
	p.onEvent("click", function() {
				p.setSize(jeesjs.UT.Random(1000, 100), jeesjs.UT.Random(1000,
								100));
			});

	// 二级面板
	var p2 = new jeesjs.Panel(p);
	p2.setColor("#ffff00");
	p2.setPosition(20, 20);
	p2.setSize(600, 600);
	p2.onEvent("click", function() {
				p2.setSize(jeesjs.UT.Random(600, 300), jeesjs.UT.Random(600,
								300));
				var x = jeesjs.UT.Random(p.getSize().w - p2.getSize().w, p
								.getPosition().x);
				var y = jeesjs.UT.Random(p.getSize().h - p2.getSize().h, p
								.getPosition().y);
				p2.setPosition(x, y);
			});

	// 三级面板
	var p3 = new jeesjs.Panel(p2);
	p3.setColor("#ff0000");
	p3.setPosition(50, 50);
	p3.setSize(300, 300);
	p3.onEvent("click", function() {
				p3.setSize(jeesjs.UT.Random(300, 100), jeesjs.UT.Random(300,
								100));
				var x = jeesjs.UT.Random(p2.getSize().w - p3.getSize().w, p2
								.getPosition().x);
				var y = jeesjs.UT.Random(p2.getSize().h - p3.getSize().h, p2
								.getPosition().x);
				p3.setPosition(x, y);
				p3.setColor(jeesjs.UT.RandomColor());
			});

	jeesjs.CM.addWidget(p);
};