// 构造Module对象
var Mod_UI = new jeesjs.Module();

// 重载Module的enter实现
Mod_UI.enter = function(){
	var _this = this;
	var size = jeesjs.APP.getSize();
	this._index = 0;
	this._btns = new Array();
	this._mods = [ Mod_Panel, Mod_Button, Mod_TextBox, Mod_ImageBox, Mod_ImageSpt ]
	this._panel = new jeesjs.Panel();
	
	this._panel.setSize( size.w, 40 );
	this._panel.setColor( "#00aa00" );
	this._panel.setPosition( 0, 42 );
	
	var str_btns = [ "Panel", "Button", "TextBox", "ImageBox", "ImageSpt" ];
	for( var i = 0; i < str_btns.length; i++ ){
		var tmp = new jeesjs.Button( jeesjs.Button.TYPE_NORMAL, "btn", str_btns[i], this._panel );
		tmp.index = i;	// 定义一个用于识别是哪个按钮的索引
		
		tmp.setPosition( i * ( tmp.getSize().w + 5 ), 0 );
		tmp.setEnabled( i != this._index );
		
		tmp.onEvent( "click", this._handle_btn );
		
		this._btns.push( tmp );
	}
	
	jeesjs.CM.addWidget( this._panel );
	
	jeesjs.MM.enter( Mod_Panel, 0 ); 
};

Mod_UI.leave = function(){
	for( var i = 0; i < this._mods.length; i++ ){
		jeesjs.MM.leave( this._mods[ i ] );
	}
	jeesjs.CM.removeWidget( this._panel );
	delete this._panel;
}

// 菜单的点击事件
Mod_UI._handle_btn = function( _e, _w ){
	var _this = Mod_UI;
	if( _this._index === _w.index ) return;
	// 离开上一个模块
	jeesjs.MM.leave( _this._mods[ _this._index ] );
	// 进入下一个模块
	_this._btns[ _this._index ].setEnabled( true );
	_this._btns[ _w.index ].setEnabled( false );
	_this._index = _w.index;
	
	jeesjs.MM.enter( _this._mods[ _this._index ] );
}