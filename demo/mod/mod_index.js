// 构造Module对象
var Mod_Index = new jeesjs.Module();

// 重载Module的enter实现
Mod_Index.enter = function(){
	var size = jeesjs.APP.getSize();
	
	var p = new jeesjs.Panel();
	p.setSize( size.w, size.h );

	jeesjs.CM.addWidget( p );
	
//	Mod_Topbar.enter();
	// 在更高一级的位置显示菜单。避免遮挡
	jeesjs.MM.enter( Mod_Topbar );
};

Mod_Index.init = function(){
	// 初始化一部分资源
	jeesjs.QM.addSource( "btn", "res/buttons/btn_green.png" );
	jeesjs.QM.addSource( "btnc", "res/buttons/btn_check.png" );
	jeesjs.QM.addSource( "png", "res/demo.png" );
	
	jeesjs.QM.addSource( "grant", "res/spritesheet_grant.png" );
	jeesjs.QM.addSource( "ground", "res/ground.png" );
	jeesjs.QM.addSource( "hill1", "res/hill1.png" );
	jeesjs.QM.addSource( "hill2", "res/hill2.png" );
	jeesjs.QM.addSource( "sky", "res/sky.png" );
	
	jeesjs.QM.load( function(){
		jeesjs.MM.enter( Mod_Index );
	} );
}