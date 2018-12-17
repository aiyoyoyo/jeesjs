/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Application.js
 * License: MIT license
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Application
	 * @static
	 */
	function Application() {
		throw "jees.APP不允许做初始化操作。";
	}
	
// private static properties:
	/**
	 * 全局唯一画布
	 * @property _canvas
	 * @private
	 * @type {DOMElemet}
	 */
    Application._canvas = null;
    /**
     * 全局唯一舞台
	 * @property _stage
	 * @private
	 * @type {cratejs.StageL}
	 **/
    Application._stage = null;
    /**
     * 入口模块
	 * @property _module
	 * @private
	 * @type {jees.Module}
	 **/
    Application._module = null;
    /**
     * 初始化是否完成
	 * @property _inited
	 * @private
	 * @type {Boolean}
	 **/
    Application._inited = false;
    /**
     * 监听事件
	 * @property _handler
	 * @private
	 * @type {Function}
	 **/
    Application._handler = null;
    /**
     * 加载事件队列
	 * @property _loader
	 * @private
	 * @type {Function}
	 **/
    Application._loader = new Array();
// public static properties:

// public static methods: =====================================================
	/**
     * 程序启动
     * @public
     * @static
     * @method startup
     * @param {jess.Module} _m 初始模块
     *
     */
	Application.startup = function( _m ) {
		var _this = this;
		_this._module = _m;
		
        jees.RM.startup();
        
        // see Define.js
		jees.Skins.register( "default", jees.SET.SKIN_FILE );
        jees.Config.register( "config", jees.SET.CONFIG_FILE );
        
        this.addLoader( function(){
	        jees.Config.onload( function(){ _this._initialize(); } );
	    });
        
        this._handler = jees.E.tick( function(e){ _this.update(e); } );
	};
	/**
	 * 刷新模块、画布
	 * @public
	 * @static
	 * @method update
	 * @param {createjs.Event} _e
	 */
	Application.update = function(_e) {
		if( this._loader.length > 0 )
			this._loader.pop().call();
		if( !this._inited ){ return;}
		if( this._module != null ){
			jees.MM.enter( this._module );
			this._module = null;
		}
		if (!_e.paused) {
			var t = jees.CJS.getTicker().getTime();
			var tick = t - jees.SET.getTimestamp();
			jees.SET.setTimestamp(t);
			jees.MM.update(tick);
			jees.CM.update();
			
			this._stage.update();
		}
	};
	/**
	 * 为舞台添加绘制对象
     * @public
     * @static
     * @method addChild
	 * @param {createjs.DisplayObject | jees.Widget} _c
	 */
	Application.addChild = function( _c ){
		this._stage.addChild( _c );
	}
	/**
	 * 删除舞台绘制对象
	 * @public
	 * @static
	 * @method removeChild
	 * @param {createjs.DisplayObject | jees.Widget} _c
	 */
	Application.removeChild = function( _c ){
		this._stage.removeChild( _c );
	}
	/**
     * @public
     * @static
     * @method addLoader
	 * @param {Function} _f
	 */
	Application.addLoader = function( _f ){
		this._loader.push( _f );
	}
	/**
     * 获取全局配置
     * @public
     * @static
     * @method getConfig
     * @return {Object}
     */
	Application.getConfig = function(){
		return this._config;
	}
	/**
	 * @public
	 * @static
	 * @method getTimestamp
	 * @return {Float}
	 */
	Application.getTimestamp = function(){
		
	}
	/**
	 * @public
	 * @static
	 * @method getCanvas
	 * @return {Canvas}
	 */
	Application.getCanvas = function(){ return this._canvas; }
	/**
	 * @public
	 * @static
	 * @method getConnector
	 * @return {Canvas}
	 */
	Application.getConnector = function(){ return this._connector; }
	/**
	 * 获取屏幕宽高
	 * @public
	 * @static
	 * @method getScreenSize
	 */
	Application.getScreenSize = function(){
		return { w: this._canvas.width, h: this._canvas.height};
	}
	/**
	 * 设置FPS
	 * @public
	 * @static
	 * @method setFPS
	 * @param {Integer} _f
	 */
	Application.setFPS = function( _f ){
		jees.SET.setFPS( _f );
		jees.CJS.getTicker().framerate = jees.SET.getFPS();
	}
	/**
	 * 屏幕方向
	 * TODO 待完成
	 * 考虑真锁定(设备锁定)和假锁定(浏览器锁定/绘制锁定)
	 */
	Application.screenOrientation = function(){
		if( jees.DEV.isPortrait() ){
			jees.APP._stage.x = self.canvasHeight; // 注意：x偏移相当于旋转中点处理，更简单
			jees.APP._stage.rotation = 90;
		}else{
			jees.APP._stage.x = 0;
  			jees.APP._stage.rotation = 0;
		}
//  	var w = window.innerWidth;
//		var h = window.innerHeight;
  		// 	jees.APP._canvas.width = w;
		// 	jees.APP._canvas.height = h;

//		 jees.APP._stage.update();
		
		// var o = window.orientation;
		// var w = window.innerWidth
		// var h = window.innerHeight;
		// if( o == 90 ){
		// 	jees.APP._stage.children[0].rotation = -o;
		// 	jees.APP._stage.children[0].y = jees.SET.getWidth();
		// 	jees.APP._stage.children[0].scaleY = 2;
		// 	jees.APP._stage.y = jees.SET.getWidth();
		// 	jees.APP._stage.scaleX = 2;// jees.SET.getHeight() / jees.SET.getWidth();
		// 	jees.APP._stage.scaleY = 2;

		// 	jees.APP._canvas.width = w;
		// 	jees.APP._canvas.height = h;

		// 	jees.APP._stage.updateViewport(w,h);
		// }
		// var w = window.innerWidth
		// var h = window.innerHeight;
		// jees.APP._stage.updateViewport(w,h);
		// jees.APP._stage.update();
	}
	/**
	 * 屏幕大小
	 * TODO 待完成
	 */
	Application.screenResize = function(){
	}
// private static methods: ====================================================
	/**
     * 程序初始化完成
     * @private
     * @static
     * @method _initialize
     *
     */
	Application._initialize = function(){
		// 实际的初始化工作
		jees.SET.startup( jees.Config.getContent( "config" ) );
		
		var scale = 1 / window.devicePixelRatio;
		document.querySelector('meta[name="viewport"]')
			.setAttribute('content',
				'width=device-width,initial-scale=' + scale + 
				', maximum-scale=' + scale + 
				', minimum-scale=' + scale + 
				', user-scalable=no');

		jees.SET.viewportScale = scale;
		
		this._canvas = document.getElementById( jees.SET.getCanvas() );
        this._stage = new createjs.StageGL( this._canvas );
        this._canvas.width = jees.SET.getWidth();
        this._canvas.height = jees.SET.getHeight();
        
		this._stage.updateViewport( jees.SET.getWidth(), jees.SET.getHeight() );
		
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        this.setFPS( jees.SET.getFPS() );
        createjs.Touch.enable( this._stage );
		if( jees.SET.enableMouseOver() )
        	this._stage.enableMouseOver();
		
		if( jees.SET.enableConnector() ){
			var connect = new jees.WebSocketConnector( jees.SET.connector.host,jees.SET.connector.port, jees.SET.connector.path );
			jees.SM.register( connect );
		}
    	
//		window.addEventListener( "orientationchange", this.screenOrientation );
//		window.addEventListener( "resize", this.screenResize );

		// TIPS HBuilder API 这里是真锁定
//		plus.screen.lockOrientation( "portrait" );
		
		jees.DEV.startup();
		jees.RM.reload();
		jees.CM.startup();
		jees.Skins.startup();
		
		this._inited = true;
	}
	
	jees.APP = Application;
})();