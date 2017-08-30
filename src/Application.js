/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Application.js
 * License: MIT license
 */
/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
// constructor:
	/**
	 * @class Application
	 * @static
	 */
    function Application(){ throw "Application cannot be instantiated."; };
// private static properties:
	/**
	 * 本次回调的时间戳
	 * @property _time
	 * @static
	 * @type {Number}
	 * @protected
	 */
	Application._time 	= 0;
	/**
	 * 画布控件
	 * @property _canvas
	 * @static
	 * @type {DOM Object}
	 * @protected
	 */
	Application._canvas = null;
	/**
	 * 全局容器
	 * @property _contar
	 * @static
	 * @type {createjs.Container}
	 * @protected
	 */
	Application._contar = null;			
	/** 
	 * 全局舞台
	 * @property _stages
	 * @static
	 * @type {createjs.Stage}
	 * @protected
	 */
	Application._stages = null;
	/**
	 * fps文本控件
	 * @property _txtfps
	 * @static
	 * @type {createjs.Text}
	 * @protected
	 */
	Application._txtfps = null;
	/**
	 * 初始模块
	 * @property _module
	 * @static
	 * @type {jeesjs.Module}
	 * @protected
	 */
	Application._module = null;
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	Application._inited = false;
	/**
	 * @property _showfps
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	Application._showfps = false;
	/**
	 * 应用配置属性
	 * @property _options
	 * @static
	 * @type {Object}
	 * @protected
	 */
	Application._options 	= {
		canvasId: "gCanvas",
	    fps		: 45,
		width	: document.documentElement.clientWidth,
	    height	: document.documentElement.clientHeight,
	    queueSize : 100
	};
    	
//    	TODO: 数据缓存部分
//    	this._localStorage = localStorage;
//    	this._sessionStorage = sessionStorage;

// public static methods:
	/**
     * 程序初始化，初始模块用于文件队列加载结束后，进入初始模块。
     * @method start
     * @static
     * @param Module _m 初始模块
     * @param {Object} _o 配置属性
     */
    Application.init = function( _m, _o ){
    	if (this._inited) { return; }
		this._inited = true;
		
    	jeesjs.MM.init();
    	jeesjs.QM.init({}, this._handle_queue_complete );
    	jeesjs.CM.init();
    	
    	if (typeof _o === 'object') {
            for (var i in _o) {
                if (_o.hasOwnProperty(i)) {
                    this._options[i] = _o[i];
                }
            }
        }
        
    	this._canvas = document.getElementById( this._options.canvasId );
    	this._canvas.width = this._options.width;
    	this._canvas.height = this._options.height;
    	
    	this._contar = new createjs.Container();
    	this._stages = new createjs.Stage( this._canvas );
    	this._stages.addChild( this._contar );
    	
    	this._txtfps = new createjs.Text();
    	this._txtfps.color = "red";
    	this._txtfps.font = "bold 24px arial";
    	this._stages.addChild( this._txtfps );
    	
    	createjs.Touch.enable( this._stages );
    	createjs.Ticker.setFPS( this._options.fps );
    	createjs.Ticker.addEventListener( "tick", this._handle_ticker );
		
    	// 事件开始
    	if( _m != undefined )
    		this._module = _m;
    		
		jeesjs.QM.load();
    };
    /**
     * @method showFPS
     * @static
     * @param {Boolean} _v 
     */
    Application.showFPS = function( _v ){
    	this._showfps = _v;
    	if( !this._showfps ) this._txtfps.text = "";
    };
    /**
     * @method getSize
     * @static
     * @return {Object}[w,h] 
     */
    Application.getSize = function(){
    	return { w : this._canvas.width, h : this._canvas.height };
    };
    Application.setScale = function( _sx, _sy ){
    	if( _sx ){
    		this._canvas.width = this._canvas.width * _sx;
    		this._contar.scaleX = _sx;
    	}
    	if( _sy ){
	    	this._canvas.height = this._canvas.height * _sy;
	    	this._contar.scaleY = _sx;
    	}
    }
    /**
	 * 伪随机数生成器/线性同余生成器
	 * @param {Number} _n 生成1-_n之间的随机数
	 * @return {Number} 
	 */
	Application.Random = ( function(){
		var seed = new Date().getTime();
		function r(){
		    seed = ( seed * 9301 + 49297 ) % 233280;
		    return seed / 233280.0;
		}
		return function( _n ){
		    return Math.ceil( r() * _n );
		}
	})();
	/**
	 * 随机生成颜色码
	 * @return {String} #000000
	 */
	Application.RandomColor = function(){
		var r = this.Random( 256 ).toString( 16 );
		var g = this.Random( 256 ).toString( 16 );
		var b = this.Random( 256 ).toString( 16 );
		return "#" + r + g + b;
	};
// protected methods:
	/**
	 * 队列加载结束，结束后进入第一个模块
	 * @method _handle_queue_complete
     * @static
     * @protected
	 */
	Application._handle_queue_complete = function() {
		if( jeesjs.APP._module != null )
			jeesjs.MM.enter(  jeesjs.APP._module, jeesjs.MM.hierarchy() );
	};
	/**
     * 进入模块后，开始绘制过程
     * @method _handle_ticker
     * @static
     * @param {createjs.Event} _e Tick事件
     */
	Application._handle_ticker = function( _e ){
		if( jeesjs.APP._showfps ) jeesjs.APP._txtfps.text = parseInt( createjs.Ticker.getMeasuredFPS());
		jeesjs.APP._stages.update();
    	if( !_e.paused ){
    		var t = createjs.Ticker.getTime( false );
    		var tick = t - jeesjs.APP._time;
			jeesjs.APP._time = t;
    		jeesjs.MM.update( tick );
    	}
	};
	jeesjs.APP = Application;
})();