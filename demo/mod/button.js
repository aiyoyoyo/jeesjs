// 构造Module对象
var Mod_Button = new jeesjs.Module();

// 重载Module的enter实现
Mod_Button.enter = function(){
	// 按钮
	var b = new jeesjs.Button( jeesjs.Button.TYPE_CHECK, "btnc", "" );
	b.setPosition( 100,100 );
	
	b.onEvent( "click", function(){
		b.setChecked( !b.isChecked() );
	});
	
	jeesjs.CM.addWidget( b );
};