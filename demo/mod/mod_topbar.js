// 构造Module对象
var Mod_Topbar = new jeesjs.Module();

// 重载Module的enter实现
Mod_Topbar.enter = function() {
	// 逻辑属性部分
	this._index = 0; 					// 默认选中的菜单索引
	this._btns = new Array();			// 菜单
	this._mods = [ Mod_Blank, Mod_UI ]	// 菜单对应的模块对象
	
	// 界面部分
	this._panel = new jeesjs.Panel();

	var size = jeesjs.APP.getSize();

	this._panel.setSize(size.w, 40);
	this._panel.setColor("#ffffff");

	var top_menus = ["首 页", "U I"];
	
	// 生成菜单按钮
	for (var i = 0; i < top_menus.length; i++) {
		var tmp = new jeesjs.Button(jeesjs.Button.TYPE_NORMAL, "btn",
				top_menus[i], this._panel);
		tmp.index = i; // 定义一个用于识别是哪个按钮的索引

		tmp.setPosition(i * (tmp.getSize().w + 5), 0);
		tmp.setEnabled(i != this._index);

		tmp.onEvent("click", this._handle_click_btns );

		this._btns.push(tmp);
	}
	jeesjs.CM.addWidget( this._panel );
	jeesjs.MM.enter( this._mods[ this._index ], 0 ); 
};
// 菜单的点击事件
Mod_Topbar._handle_click_btns = function(_e, _w) {
	var _this = Mod_Topbar;
	if (_this._index === _w.index) return;

	// 离开上一个模块
	jeesjs.MM.leave( _this._mods[ _this._index ] );
	// 进入下一个模块
	_this._btns[ _this._index ].setEnabled( true );
	_this._btns[ _w.index ].setEnabled( false );
	_this._index = _w.index;
	
	jeesjs.MM.enter( _this._mods[ _this._index ] );
}