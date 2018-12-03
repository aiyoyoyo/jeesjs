///<jscompress sourcefile="Module.js" />
/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/base/Module.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Module
	 * @abstract
	 * @param {String} _id
	 */
    function Module( _id ){
		if( !_id ) throw "模块必须设置ID。";
// public properties:
		/**
		 * 模块ID
		 */
        this.id = _id;
    };

    var p = Module.prototype;
// public static methods: =====================================================
	/**
	 * @public
	 * @method getId
	 * @returns {String}
	 */
    p.getId = function(){ return this.id; };
    /**
	 * 进入模块
	 * @public
	 * @abstract
	 * @method enter
	 */
	p.enter = function(){};
	/**
	 * 退出模块
	 * @public
	 * @abstract
	 * @method leave
	 */
	p.leave = function(){};
	/**
	 * 执行模块更新，模块中断后，不在被调用，直到恢复通知。
	 * @public
	 * @abstract
	 * @method update
	 * @param Number _t 绘制时间，单位：毫秒
	 */
	p.update = function( _t ){};
	/**
	 * 模块被中断通知
	 * @public
	 * @abstract
	 * @method interrupt
	 */
	p.interrupt = function(){};
	/**
	 * 模块恢复通知
	 * @public
	 * @abstract
	 * @method interrupt
	 */
	p.recovery = function(){};
	
	jees.Module = Module;
})();;
///<jscompress sourcefile="UtilTools.js" />
/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Tools/UtilTools.js License: MIT
 * license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor:
	/**
	 * @class UtilTools
	 */
	function UtilTools() {
		throw "UtilTools cannot be instantiated.";
	};
// public static methods: =====================================================
	/**
	 * 伪随机数生成器/线性同余生成器
	 * 
	 * @static
	 * @method Random
	 * @param {Integer} _n 生成1~_n之间的随机数
	 * @param {Integer} _m 生成_m~-n之间的随机数
	 * @return {Integer}
	 */
	UtilTools.Random = (function() {
		var seed = new Date().getTime();
		function r() {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280.0;
		};
		return function(_n, _m) {
			return Math.ceil(r() * _n) + (_m ? _m : 0);
		};
	})();
	/**
	 * 随机生成颜色码
	 * 
	 * @static
	 * @method RandomColor
	 * @return {String} #000000
	 */
	UtilTools.RandomColor = (function() {
		function rc2hex(){
			var c = jees.UT.Random(256);
			if( c < 10 ) return "0" + c;
		    return c.toString(16);
		};
		return function(){
			return "#" + rc2hex() + rc2hex() + rc2hex();
		};
	})();
	/**
	 * 生成反色码
	 * 
	 * @static
	 * @method ReversalColor
	 * @param {String} _c #000000
	 * @return {String} #ffffff
	 */
	UtilTools.OppositeColor = (function() {
		function c2rgb( _c ){
			var _r = parseInt( _c.substring( 1, 3 ), 16);
			var _g = parseInt( _c.substring( 3, 5 ), 16);
			var _b = parseInt( _c.substring( 5 ), 16);
			return { r: _r, g: _g, b: _b };
		};
		function c2hex( _c ){
		    var cc = 255 - _c;
		    if( cc>64 && cc<128 )  
		        cc -= 64;  
		    else if( cc>=128 && cc<192 )  
		        cc += 64;
		    if( cc < 10 ) return "0" + cc;
		    return cc.toString(16);
		};
		return function( _c ) {
			var rgb = c2rgb( _c );
			var r = c2hex( rgb.r );
			var g = c2hex( rgb.g );
			var b = c2hex( rgb.b );
			return "#" + r + g + b;
		}
	})();
	/**
	 * @method Grid
	 * @param {Object} _r 分割区域{ l: left, r: right, t: top, b: bottom }
	 * @param {Integer} _w 素材宽
	 * @param {Integer} _h 素材高
	 * @param {Integer} _sw 目标宽
	 * @param {Integer} _sh 目标高
	 * @return {Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,}
	 * {
	 * 	x,y,w,h,  		素材区域坐标
	 *  dx,dy,dw,dh, 	实际绘制坐标 
	 *  sw,sh 			缩放宽高
	 * }
	 */
	UtilTools.Grid = (function(){
		function Region( _r, _row, _col, _w, _h ){
			var w;
	    	var h;
	    	var x;
	    	var y;
			if( _row == 1 ) {
	    		h = [_h];
	    		y = [0];
	    	}else if( _row == 2 ){
	    		if( _r.t != 0 ){
	    			h = [_r.t, _h - _r.t];
	    			y = [0, _r.t];
	    		}else{
	    			h = [_h - _r.b, _r.b];
	    			y = [0, _h - _r.b];
	    		}
	    	}else{
	    		h = [_r.t, _h - _r.t - _r.b, _r.b];
	    		y = [0, _r.t, _h - _r.b];
	    	}
	    	
	    	if( _col == 1 ){
	    		w = [_w];
	    		x = [0];
	    	}else if( _col == 2 ){
	    		if( _r.l != 0 ) { 
	    			w = [_r.l, _w - _r.l];
	    			x = [0, _r.l];
	    		}else{
	    			w = [_w - _r.r, _r.r];
	    			x = [0, _w - _r.r];
	    		}
	    	}else{
	    		w = [_r.l, _w - _r.l - _r.r, _r.r];
	    		x = [0, _r.l, _w - _r.r];
	    	}
			return {x: x, y: y, w: w, h: h};
		}
		
		return function( _r, _w, _h, _tw, _th ){
			var regions = new Array();
			var row = 1; // row
			var col = 1; // colum
			
			if( _r.l != 0 ) col ++;
			if( _r.r != 0 ) col ++;
			if( _r.t != 0 ) row ++;
			if( _r.b != 0 ) row ++;
			
	    	// 计算分割
	    	var w;
	    	var h;
	    	var x;
	    	var y;
	    	var sw;
	    	var sh;
	    	// rect 分割区域 draw绘制区域
	    	var rect = Region( _r, row, col, _w, _h );
	    	var draw = Region( _r, row, col, _tw, _th );
	    	for( var i = 0; i < row; i ++ ){
	    		for( var j = 0; j < col; j ++ ){
	    			
	    			var rg = { x: rect.x[j], y: rect.y[i], w: rect.w[j], h: rect.h[i], 
	    				dx: draw.x[j], dy: draw.y[i], dw: draw.w[j], dh: draw.h[i] ,
	    				sw: draw.w[j] / rect.w[j], sh: draw.h[i] / rect.h[i],
	    			} 
	    			
	    			if( typeof rg.x == "string" ) rg.x = parseInt( rg.x );
					if( typeof rg.y == "string" ) rg.y = parseInt( rg.y );
					if( typeof rg.w == "string" ) rg.w = parseInt( rg.w );
					if( typeof rg.h == "string" ) rg.h = parseInt( rg.h );
					if( typeof rg.dx == "string" ) rg.dx = parseInt( rg.dx );
					if( typeof rg.dy == "string" ) rg.dy = parseInt( rg.dy );
					if( typeof rg.dw == "string" ) rg.dw = parseInt( rg.dw );
					if( typeof rg.dh == "string" ) rg.dh = parseInt( rg.dh );
					if( typeof rg.sw == "string" ) rg.sw = parseFloat( rg.sw );
					if( typeof rg.sh == "string" ) rg.sh = parseFloat( rg.sh );
	    			
	    			regions.push( rg );
	    		}
	    	}
	    	
	    	return regions;
		}
	})();
	
	jees.UT = UtilTools;
})();;
///<jscompress sourcefile="StringTools.js" />
/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/tools/StringTools.js License: MIT
 * license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class UtilTools
	 */
	function StringTools() { throw "StringTools cannot be instantiated."; };
	// public static properties: ==============================================

	jees.TL_STRING = StringTools;
})();;
///<jscompress sourcefile="CreateJS.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/CreateJS.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
    "use strict";
// constructor: ===============================================================
	/**
	 * @class CreateJS
	 * @static
	 */
	function CreateJS() { throw "jees.CJS不允许做初始化操作。"; }
// protected static methods: ==================================================
	CreateJS.startup = function() {};

    // getter and setter
    CreateJS.get = function(){return createjs;};
    CreateJS.getTickerTime = function(){return this.getTicker().getMeasuredTickTime().toFixed(0);};
	CreateJS.getFPS = function(){return this.getTicker().getMeasuredFPS().toFixed(0);};
    CreateJS.getTouch = function(){ return createjs.Touch; };
    CreateJS.getTicker = function(){ return createjs.Ticker; };
    CreateJS.getSound = function(){ return createjs.Sound; };
    // new element
    CreateJS.newContainer = function(){
        var c = new createjs.Container();
        return c;
    };
    CreateJS.newShape = function( _w, _h, _c ){
        var s = new createjs.Shape();
        var g = s.graphics;
        if( _c ){
        	g.beginFill( _c );
        }
        if( _w && _h ){
        	g.drawRect( 0, 0, _w, _h );
        }
        if( _c || ( _w && _h ) )
        	g.endFill();
        return s;
    };
	CreateJS.newObject = function(){
		var o = new createjs.DisplayObject();
		return o;
	};
	CreateJS.newBox = function( _w, _h, _c ){
        var s = new createjs.Shape();
        s.graphics.beginStroke( _c ).drawRect( 0, 0, _w, _h );
        return s;
    };
    CreateJS.newBitmap = function( _r ){
    	var b = new createjs.Bitmap( _r );
    	return b;
    };
    CreateJS.newRect = function( _l, _r, _t, _b ){
    	var r = new createjs.Rectangle( _l, _r, _t, _b );
    	return r;
    }
    CreateJS.newText = function( _t, _f, _c ){
    	var t = new createjs.Text( _t, _f, _c );
    	return t;
    }
	jees.CJS = CreateJS;
})();;
///<jscompress sourcefile="Debug.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Debug.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class Debug
	 * @static
	 */
	function Debug() { throw "Debug cannot be instantiated."; };

	// private static properties: =============================================
    Debug._init = false;
    Debug._width = 200;
    Debug._height = 100;
    Debug._wgt_text = null;
    Debug._wgt_panel = null;
    Debug._print = "";
	// public static properties: ==============================================
    // private static methods: ================================================
	// public static methods: =================================================
	/**
	 * 提供自定义输出内容
	 */
	Debug.print = function( _t ){
        this._print = _t;
	};
    /**
     * 初始化调试器
     * @method startup
     * @static
     **/
	Debug.startup = function() {
	    if( !jees.SET.isDebug() ) return;
        if( this._init ) return;
        this._init = true;

        var c = jees.CM._get_container( jees.CM.Container.DEBUG  );

        this.panel = new jees.Panel();
        this.panel.setSize( this._width, this._height );
        this.panel.setColor( "#8080C0" );
        this.panel.setBackAlpha( 0.5 );

        this._wgt_text = new jees.TextBox();
        this._wgt_text.setColor( "#FFFF00" );
        this._wgt_text.setMaxWidth( this._width );    //最大显示宽度，超出后缩放
        this._wgt_text.setLineWidth( this._height );	//最大换行宽度，超出后换行

        this.panel.addWidget( this._wgt_text );

        jees.CM.addWidget( this.panel, false, jees.CM.Container.DEBUG );
        jees.CM.update( jees.CM.Container.DEBUG );
	};
    /**
     * 刷新调试内容
     */
	Debug.update = function(){
	    if( !jees.SET.isDebug() ) return;
	    var str = " 帧率: " + jees.CJS.getFPS( true )
	        + "\n 回调时间：" + jees.CJS.getTickerTime() + "ms"
	        + "\n 自定输出：" + this._print;
        this._wgt_text.setText( str );
	};

	jees.DEBUG = Debug;
})();;
///<jscompress sourcefile="Event.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Event.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Event
	 * @static
	 */
	function Event() { throw "Event cannot be instantiated."; };

// public static properties: 
	/**
	 * ResourceManager Events
	 */
	Event.RM = {
	    FL: "fileload",
	    C: "complete",
	};

	/**
	 * UI Widget Events
	 * @link https://www.createjs.com/docs/easeljs/classes/Event.html
	 * @link https://www.createjs.com/docs/easeljs/classes/DisplayObject.html
	 */
	Event.Widget = {
        C: "click",
        DC: "dblclick",
        MD: "mousedown",
        MO: "mounseout",
        MIn: "mouseover",
	};
// public static methods: =====================================================
	/**
	 * @static
	 * @method bind
	 * @param {jees.Widget|createjs.DisplayObject} _o
	 * @param {String} _e
	 * @param {Function} _f
	 * @return {Event}
	 */
	Event.bind = function( _o, _e, _f ){
		return _o.addEventListener( _e, _f );
	}
	/**
	 * @static
	 * @method unbind
	 * @param {jees.Widget|createjs.DisplayObject} _o
	 * @param {String} _e
	 * @param {Event} _h
	 */
	Event.unbind = function( _o, _e, _h ){
		_o.removeEventListener( _e, _h );
		_h = null;
	}
	/**
	 * @static
	 * @method tick
	 * @param {Function} _f
	 * @return {Function}
	 */
	Event.tick = function( _f ){
        return jees.E.bind( createjs.Ticker, "tick", _f );
	}
	/**
	 * @static
	 * @method untick
	 * @param {Function} _h
	 */
	Event.untick = function( _h ){
		jees.E.unbind( createjs.Ticker, "tick", _h );
	}
	
	jees.E = Event;
})();;
///<jscompress sourcefile="Setting.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/Setting.js
 * License: MIT license
 *
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Template
	 * @static
	 */
	function Setting() { throw "jees.SET 不允许做初始化操作。"; }
// private static properties:
	Setting.CONFIG_FILE = "../assets/configs/jees.default.config";
	Setting.SKIN_FILE = "../assets/images/skin_default.png";
	Setting._config = null;
    Setting._timestamp = 0;
	Setting._fps = 30;
	Setting._canvas = null;
	Setting._width = 0;
	Setting._height = 0;
	Setting._sound = false;
	Setting._debug = false;
	Setting._mouseover = false;
	
	Setting.connector = {
		enable: false,
		host: null,
		port: null,
		path: null,
	}
// public static getter/setter method: ========================================
	// getter and setter
	Setting.getCanvas = function(){ return this._canvas; }
	Setting.getWidth = function(){ return this._width; }
    Setting.getHeight = function(){ return this._height; }
    Setting.getFPS = function(){return this._fps;}
    Setting.setFPS = function( _f ){this._fps = _f;}
    Setting.getTimestamp = function(){ return this._timestamp; }
    Setting.setTimestamp = function( _t ){ this._timestamp = _t; }
    Setting.getConfig = function(){ return this._config; }
    Setting.getSkin = function(){ return this._skin; }
    Setting.enableSound = function(){ return this._sound; }
    Setting.enableDebug = function(){ return this._debug; }
    Setting.enableMouseOver = function(){ return this._mouseover; }
	
	Setting.enableConnector = function(){ return this.connector.enable; }
// public static method: ======================================================
	/**
	 * @public
     * @static
	 * @method startup
     * @return
     */
	Setting.startup = function() {
		var cfg = this._config.Setting;
		
		this._canvas = cfg.canvas;
		this._fps = cfg.fps;
		
		this._width = cfg.width != 0 ? cfg.width : ( document.documentElement.clientWidth || document.body.clientWidth );
		this._height = cfg.height != 0 ? cfg.height : ( document.documentElement.clientHeight || document.body.clientHeight );
		
		this._sound = cfg.sound;
		this._mouseover = cfg.mouseover;
		
		this._skin = cfg.skin;
		
		for ( var i in this._config.Connector ) {
            if ( this.connector.hasOwnProperty( i ) ) {
            	this.connector[i] = this._config.Connector[i];
            }	
       	}
	}
	
	jees.SET = Setting;
})();;
///<jscompress sourcefile="ModulesManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/manager/ModulesManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class ModulesManager
	 */
	function ModulesManager(){ throw "jees.MM不允许做初始化操作。"; };
// private static properties: 
	/**
	 * 当前绘制模块ID
	 * @private
	 * @static
	 * @property _ids
	 * @type {Array<String>}
	 */
	ModulesManager._ids         = new Array();
	/**
	 * 已加载的模块
	 * @private
	 * @static
	 * @property _modules
	 * @type {Map<String, jees.Module>}
	 */
	ModulesManager._modules     = new Map();
	/**
	 * 最上层模块
	 * @private
	 * @static
	 * @property _module
	 * @type {jess.Module}
	 * @default null;
	 */
	ModulesManager._module      = null;
// private static methods: ================================================
	/**
	 * 加入某个模块
	 * @public
	 * @static
	 * @method enter
	 * @param {jeesjs.Module} _m 进入的模块
	 */
	ModulesManager.enter = function( _m ) {
		if( _m == undefined || !_m instanceof jees.Module ) throw "加入模块对象错误";
		
        if( this._modules.has( _m.getId() ) )
            throw "添加了重复的模块[" + _m.getId() + "]";

	    if( this._module != null )
	        this._module.interrupt();
        this._ids.push( _m.getId() );
        this._modules.set( _m.getId(), _m );
	    this._module = _m;
        _m.enter();
	};
	/**
	 * 退出最上层模块
	 * @public
	 * @static
	 * @method leave
	 */
	ModulesManager.leave = function() {
	    if( this._module == null || this._ids.length == 0 ) return;

        var cur_id = this._ids.pop();
        this._module.leave();
        this._modules.delete( cur_id );

        if( this._modules.size == 0 ) return;
        var prv_id = this._ids[ this._ids.length - 1 ];

        this._module = this._modules.get( prv_id );
        this._module.recovery();
	};
	/**
	 * 逐个退出全部模块
	 * @public
	 * @static
	 * @method leave
	 */
	ModulesManager.clear = function() {
		while( this._modules.length > 0 ) {
			this.leave();
		}
	};
	/**
	 * 调用所有加入的模块update方法
	 * @public
	 * @static
	 * @method update
	 * @param {Number} _t 绘制时间，单位：毫秒
	 */
	ModulesManager.update = function( _t ) {
        for( var mod of this._modules.values() ) {
            mod.update( _t );
        }
	};
	/**
	 * 获取当前模块
	 * @public
	 * @static
	 * @method current
	 * @return {jeesjs.Module}
	 */
	ModulesManager.current = function() {
		return this._module;
	};

	jees.MM = ModulesManager;
})();;
///<jscompress sourcefile="ResourceManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/ResourceManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class ModulesManager
	 */
    function ResourceManager(){ throw "jees.RM不允许做初始化操作。"; };
// private static properties: 
    /**
	 * CreateJS加载资源队列对象
	 * @private
	 * @property _queue
	 * @type {createjs.LoadQueue}
	 **/
    ResourceManager._queue = null
    /**
	 * 当前加载队列信息,每次加载队列完成后清空
	 * @property _loader
	 * @private
	 * @type {Array}
	 **/
    ResourceManager._loader = null;
    /**
     * 资源数据
     * @private
     * @property _loader
	 * @type {Map<String, Map<String, String>>}
     **/
    ResourceManager._resources = null;
    /**
	 * 当前加载队列结束的回调方法，每次完成后清空
	 * @private
	 * @property _callback
	 * @type {Function}
	 **/
    ResourceManager._callback = null;
    /**
	 * @private
	 * @property _handler
	 * @type {Function}
	 **/
    ResourceManager._handler = null;
// public static properties:
    /**
	 * @public
	 * @static
	 * @final
	 * @property DEFAULT_GROUP
	 * @type {String}
	 **/
    ResourceManager.DEFAULT_GROUP = "default";
// public static methods:  ================================================
    /**
	 * 初始化模块管理器
	 * @public
	 * @static
	 * @method startup
	 **/
    ResourceManager.startup = function() {
    	this._loader = new Array();
    	this._resources = new Map();
    	this._resources.set( this.DEFAULT_GROUP, new Map() );
    	
    	this._queue = new createjs.LoadQueue( false, "", "Anonymous" );
    	this._queue.maintainScriptOrder = true;
        
	};
	/**
	 * 重新配置
	 * @public
	 * @static
	 * @method startup
	 **/
	ResourceManager.reload = function(){
		if( jees.SET.enableSound() ){
			this._queue.installPlugin( createjs.Sound );
		}

		//  	this._queue.setMaxConnections( this._options.size );
	}
	/**
	 * 获取文件加载进度，进度值为0~1之间。
	 * @public
     * @static
	 * @method getProgress
     * @return {Float}
	 */
	ResourceManager.getProgress = function(){
		return this._queue.progress;
	};
    /**
    * 添加一个预加载文件
	* @public
    * @static
    * @method add
    * @param {String} _k 源别名
    * @param {String} _r 源地址
    * @param {String} _g 分组
    */
	ResourceManager.add = function( _k, _r, _g ){
		var group = null;
		if( _g == undefined ){
			group = this._resources.get( this.DEFAULT_GROUP );
		}else{
			if( this._resources.has( _g ) ){
				group = this._resources.get( _g );
			}else{
				group = new Map();
				this._resources.set( _g, group );
			}
		}
		
	    if( group.has( _k ) ){
	    	 //"已存在同名资源[" + _k + "]"
	    }else{
	    	this._loader.push( { id: _k, src: _r, group: _g } );
	    }
	};
	/**
	 * 开始预加载文件, 目前只支持单一加载队列。如果上次队列没有完成，则后续队列需要重新加载
	 * @public
     * @static
	 * @method onload
     * @param {Function} _f 加载完毕的回调事件
	 */
	ResourceManager.onload = function( _f ){
	    if( this._callback != null )
	        throw "上次加载尚未结束。";
		if( this._callback == null && typeof _f === 'function' ){
			this._callback = _f;
			var _this = this;
			this._handler = jees.E.bind( this._queue, "complete", function( e ) {
				_this._complete_handler( e );
			} );
		}
		if( this._loader.length != 0 ) this._queue.loadManifest( this._loader );
		else this._complete_handler();
	};
	/**
	 * 获取预加载的数据，返回格式参考preloadjs的Handling Results部分：
	 * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @public
     * @static
	 * @method get
     * @param {String} _k 源别名
     * @param {String} _g 分组
     * @return {Object} 源地址
	 */
	ResourceManager.get = function( _k, _g ) {
		var group = null;
		if( _g != undefined ){
			group = this._resources.get( _g );
		}else{
			group = this._resources.get( this.DEFAULT_GROUP );
		}
		if( group.has( _k ) ){
			return group.get( _k );
		}
		
		throw "没有找到对应资源：RES=[" + _k + ", GROUP=[" + _g + "]";
		
	};
	/**
     * 删除已有资源
     * @link http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html
	 * @public
     * @static
     * @method del
     * @param {String} _k 源别名
	 * @param {String} _g 分组
     */
	ResourceManager.del = function( _k, _g ){
		var group = null;
		if( _g != undefined ){
			group = this._resources.get( _g );
		}else{
			group = this._resources.get( this.DEFAULT_GROUP );
		}
		if( group.has( _k ) ){
			group.delete( _k );
		}else this._queue.remove( _k );
	};
// private methods: =======================================================
    /**
     * @private
     * @method _complete_handler
     * @param {createjs.Event} _e
     */
    ResourceManager._complete_handler = function( _e ){
    	if( this._handler != null ){
    		jees.E.unbind( this._queue, "complete", this._handler );
    	}
    	
    	this._loader.forEach( function( _load ){
      		var res = jees.RM._queue.getResult( _load.id );
      		var maps = jees.RM._resources.get( _load.group );
      		maps.set( _load.id, res );
    	} );
    	this._loader = new Array();

		this._callback( _e );
		this._callback = null;
    };

	jees.RM = ResourceManager;
})();;
///<jscompress sourcefile="CanvasManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/CanvasManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class CanvasManager
	 */
	function CanvasManager() { throw "CanvasManager cannot be instantiated."; };
// public static properties:
	/**
	 * 容器层级类型，默认为DEFAULT
	 * @property Container
	 * @static
	 */
	CanvasManager.Container = {
		BACK : -2,
		BOTTOM : -1,
		DEFAULT: 0,
		TOP : 1,
		POPUP : 2,
		SYSTEM : 3,
		DEBUG : 4,
		CONSOLE : 5,
	};
// private static properties:
	/**
	 * @private
	 * @static
	 * @property _caches
	 * @type {Map}
	 */
	CanvasManager._caches = null;
	
	CanvasManager._containers = null;
// private static methods: ====================================================
	/**
	 * 绘制缓存池内容
	 * @private
	 * @static
	 * @method __update_cache_level
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager.__update_cache_level = function( _v ){
		if( this._caches.has( _v ) ){
			var eles = this._caches.get( _v );
			if( eles.length > 0 ){
				var wgt = eles.pop();
				wgt.initialize();
				
				var c = this._containers.get( _v );
				c.addChild( wgt );
			}
		}
	}
	/**
	 * 绘制缓存池内容
	 * @private
	 * @static
	 * @method _update_cache
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager._update_cache = function(){
		// 根据层级优先加入绘制
		this.__update_cache_level( CanvasManager.Container.DEFAULT );
	}
// public static methods: =====================================================
	/**
	 * 初始化面板管理器
	 * @public
	 * @static
	 * @method startup
	 **/
	CanvasManager.startup = function() {
		this._caches = new Map();
		this._containers = new Map();
	};
	/**
	 * 刷新画布，并重建画布缓存
	 * @public
	 * @static
	 * @method update
	 */
	CanvasManager.update = function( _c ) {
		this._update_cache();
	};
	/**
	 * 添加一个预加载控件
	 * @public
     * @static
	 * @method addChild
     * @param {createjs.DisplayObject|jeesjs.Widget} _w 添加的控件
     * @param {CanvasManager.Container}
	 */
	CanvasManager.addChild = function( _w, _v ){
		var v = _v || CanvasManager.Container.DEFAULT;
		
		if( this._caches.has( v ) ){
			var eles = this._caches.get( v );
			eles.push( _w );
		}else{
			var eles = new Array();
			eles.push( _w );
			this._caches.set( v, eles );
			
			var c = new jees.CJS.newContainer();
			this._containers.set( v, c );
			jees.APP.addChild( c );
		}
	}
	
	jees.CM = CanvasManager;
})();;
///<jscompress sourcefile="FileLoadManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/manager/FileLoadManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class FileLoadManager
	 * @param {String} _g 文件加入的分组
	 * @param {String} _s 固定文件的格式
	 */
	function FileLoadManager( _g, _s ){
// private properties:
		/**
		 * 是否设定分组
		 * @param _group
		 * @private
		 * @type {String}
		 * @defualt {@link jees.RM.DEFAULT_GROUP}
		 */
		this._group = _g == undefined ? jees.RM.DEFAULT_GROUP : _g;
		/**
		 * 是否指定后缀
		 * @param _suffix
		 * @private
		 * @type {String}
		 * @defualt {@link jees.RM.DEFAULT_GROUP}
		 */
		this._suffix = _s == undefined ? "" : _s;
	};
	var p = FileLoadManager.prototype;
// public methods: ============================================================
	/**
	 * 注册文件
	 * @public
	 * @method register
	 * @param {Object} _n
	 * @param {Object} _f
	 */
	p.register = function( _n, _f ) {
		var status = false;
		if( this._suffix.length > 0 ){
			if( _f.lastIndexOf( "." + this._suffix ) != -1 )
				status = true;
		}else status = true;

		if( status ){
			jees.RM.add( _n, _f, this._group );
		}else throw "文件格式不正确";
	};
	/**
	 * 加载
	 * @public
	 * @method onload
	 * @param {Object} _h
	 */
	p.onload = function( _h ){
		jees.RM.onload( _h );
	};
	/**
	 * 获取文件
	 * @public
	 * @method get
	 * @param {String} _n
	 * @return {Object|createjs.LoadItem}
	 */
	p.get = function( _n ){
		if( this._group != null )
			return jees.RM.get( _n, this._group );
		return jees.RM.get( _n );
	}
	/**
	 * 删除已加载文件
	 * @public
	 * @method del
	 * @param {String} _n
	 */
	p.del = function( _n ){
		if( this._group != null )
			jees.RM.del( _n, this._group );
		else jees.RM.del( _n );
	}
	/**
	 * 获取文件内容
	 * @public
	 * @method getContent
	 * @param {String} _n
	 * @return {String}
	 */
	p.getContent = function( _n ){
		return eval( '(' + this.get( _n ) + ')' );
	}
	
	jees.FileLoadManager = FileLoadManager;
})();;
///<jscompress sourcefile="Application.js" />
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
     * 连接模块
	 * @property _connector
	 * @private
	 * @type {jees.Connector}
	 **/
    Application._connector = null;
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
		// var w = window.innerWidth
		// var h = window.innerHeight;
		
		// jees.APP._canvas.width = w;
		// jees.APP._canvas.height = h;
	
		// jees.APP._stage.updateViewport(w,h);
		// jees.APP._stage.update();
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
		jees.SET._config = jees.Config.getContent( "config" );
		// 实际的初始化工作
		jees.SET.startup();
		
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
			this._connector = new jees.WebSocketConnector( jees.SET.connector.host,jees.SET.connector.port, jees.SET.connector.path );
			this._connector.connect();
		}
    	
//		window.addEventListener( "orientationchange", this.screenOrientation );
//		window.addEventListener( "resize", this.screenResize );

		// TIPS HBuilder API 这里是真锁定
//		plus.screen.lockOrientation( "portrait" );
		
		jees.RM.reload();
		jees.CM.startup();
		jees.Skins.startup();
		
		this._inited = true;
	}
	
	jees.APP = Application;
})();;
///<jscompress sourcefile="ConfigManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/ConfigManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.EX = this.jees.EX || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class ConfigManager
	 * @extends FileLoadManager
	 */
	function ConfigManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
	};
	var p = createjs.extend( ConfigManager, jees.FileLoadManager );
	
	jees.EX.ConfigManager = createjs.promote( ConfigManager, "FileLoadManager");
})();
;
///<jscompress sourcefile="LayoutManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/LayoutManager.js
 * License: MIT license
 */

/**
 * layout管理器
 * @module jeesjs
 */
// namespace:
this.jees = this.jees || {};
this.jees.EX = this.jees.EX || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class LayoutManager
	 * @extends FileLoadManager
	 */
	function LayoutManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
// private properties: 
		/**
		 * 已经解析的UI文件
		 * @private
		 * @property _layouts
		 * @type {Map<String, jees.Widget>}
		 */
		this._layouts = new Map();
	};
	var p = createjs.extend( LayoutManager, jees.FileLoadManager );
// private methods: ===========================================================
	/**
	 * 解析配置转为jees.Widget类型
	 * @method _layout_property_2_widget
	 * @private
	 * @param {String} _t 类型
	 * @param {Object} _w 配置值
	 * @return {jees.Widget}
	 */
	p._layout_property_2_widget = function( _t, _w ){
		var _this = this;
		var wgt = null;
		var type = _t ? _t.toString().toLowerCase() : "widget";
		
		if( type == "widget") wgt = new jees.UI.Widget();
		else if( type == "panel" ) wgt = new jees.UI.Panel();
		else if( type == "textbox" ) wgt = new jees.UI.TextBox();
		else if( type == "imagebox" ) wgt = new jees.UI.ImageBox();
		else if( type == "imagespt" ) wgt = new jees.UI.ImageSpt();
		else if( type == "button" ) wgt = new jees.UI.Button();
		else if( type == "checkbox" ) wgt = new jees.UI.CheckBox();
		else if( type == "inputbox" ) wgt = new jees.UI.InputBox();
		else throw "错误的控件类型：" + _t;
		
		// 解析createjs属性
		for ( var i in wgt ) {
            if ( _w.hasOwnProperty( i ) ) {
            	wgt[i] = _w[i];
            }	
       	}
		// 解析自定义属性
		for ( var i in wgt.property ) {
            if ( _w.hasOwnProperty( i ) ) {
            	wgt.property[i] = _w[i];
            }	
       	}
		
		// 解析子控件
		if( wgt.property.childs ){
			wgt.property.childs.forEach( function( _c ) {
				for( var i in _c ){
					wgt.addChild( _this._layout_property_2_widget( i, _c[i] ) );
					break;
				}
			} );
		}
		
		return wgt;
	}
	/**
	 * 解析Layout文件根节点
	 * @private
	 * @method _layout_2_widget
	 * @param {Object} _w
	 * @returns {jees.Widget}
	 */
	p._layout_2_widget = function( _w ){
		var wgt = null;
		for( var i in _w ){
			var wgt = this._layout_property_2_widget( i, _w[i] );
			break;
		}
		return wgt;
	}
// public methods: ============================================================
	/**
	 * @public
	 * @method onload
	 * @param {Object} _n
	 * @returns {jees.Widget}
	 */
	p.load = function( _n ){
		var wgt = null;
		
		if( this._layouts.has( _n ) ){
			wgt = this._layouts.get( _n );
		}else{
			wgt = this._layout_2_widget( this.getContent( _n ) );
			this._layouts.set( _n, wgt );
		}
		
		jees.CM.addChild( wgt );
		return wgt;
	}
	/**
	 * @public
	 * @method unload
	 * @param {Object} _n
	 */
	p.unload = function( _n ){
		if( this._layouts.has( _n ) ){
			var wgt = this._layouts.get( _n );
			jees.APP.removeChild( wgt );
			this._layouts.delete( _n );
			this.del( _n );
		}
	}
	
	jees.EX.LayoutManager = createjs.promote( LayoutManager, "FileLoadManager");
})();
;
///<jscompress sourcefile="SkinManager.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/extends/SkinManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.EX = this.jees.EX || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class SkinManager
	 * @extends FileLoadManager
	 */
	function SkinManager( _g, _s ){
		this.FileLoadManager_constructor( _g, _s );
// private properties:
		/**
		 * 皮肤配置文件
		 * @type {String}
		 * @default "default"
		 */
		this._config = null;
		/**
		 * 默认用的图片组
		 * @type {String}
		 * @default "default"
		 */
		this._skin = "default";
	};
	var p = createjs.extend( SkinManager, jees.FileLoadManager );
// public methods: ============================================================
	
	/**
	 * 启动器
	 * @public
	 * @method startup
	 */
	p.startup = function(){
		this._config = jees.SET.getConfig().Skin;
		this._skin = jees.SET.getSkin();
	}
	/**
	 * @public
	 * @method getSkin
	 * @returns {jees.Skin, JSONData } { resource, property}
	 */
	p.getSkin = function( _t, _g ){
		return {
			resource : this.get( _g != undefined ? _g : this._skin ),
			property: this._config[_t]
		};
	}
	
	jees.EX.SkinManager = createjs.promote( SkinManager, "FileLoadManager");
})();
;
///<jscompress sourcefile="Skin.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/Skin.js
 * License: MIT license
 */

/**
 * 控件的基类，建议在构件控件时，优先构建非容器对象后，在将其加入容器对象中。
 * 容器对象不建议变换坐标或者嵌套容器对象。
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===========================================================
	/**
	 * @class Skin
	 * @constructor
	 * @param {String} _t 皮肤类型
	 * @param {Integer} _w 目标宽度
	 * @param {Integer} _h 目标高度
	 * @param {String} _g 皮肤组
	 */
	function Skin( _t, _w, _h, _g ) {
// private properties: 
		// 自定义图片>自定义皮肤>默认皮肤
		/**
		 * 皮肤类型
		 * @type {String}
		 * @default "" | "None"
		 */
		this._type = _t ? _t.toLowerCase() : "none";
		/**
		 * 使用的皮肤分组
		 * @type {String}
		 * @default "default"
		 */
    	this._skinResource = _g ? _g : "default";
    	/**
    	 * 配置数据
    	 * @type{Object}
    	 */
    	this._config = jees.Skins.getSkin( this._type, this._skinResource );
    	/**
    	 * 皮肤资源
    	 * @type {Image | String}
    	 * @default ""
    	 */
    	this._resource = this._config.resource;
    	/**
    	 * 资源图片中的区域
    	 * @type {Map<String>,<x,y,w,h>}
    	 */
    	this._rects = new Map();
    	/**
    	 * 分割区域
    	 * @type {Map<String>,<l,r,t,b>}
    	 */
    	this._regions = new Map();
    	/**
    	 * 重组的元素
    	 * @type {Map<String>,<cratejs.BitmapCache>}
    	 */
    	this._bitmaps = new Map();
    	
    	this._init_rects();
    	this._init_regions( _w, _h );
    	this._init_bitmap( _w, _h );
	};

	var p = Skin.prototype;
// public methods: ============================================================
	p.getSkinType = function(){
		return this._type;
	}
	p.getSkinResource = function(){
		return this._skinResource;
	}
	/**
	 * 获取皮肤分格融合的图片
	 * @public
	 * @method getCacheDataURL
	 * @param {String} _type
	 * @returns {Image}
	 */
    p.getCacheDataURL = function( _type ){
		if( _type && this._bitmaps.has( _type ) ){
			return this._bitmaps.get( _type );
		}else if( this._bitmaps.has("rect") ) return this._bitmaps.get("rect");
		else return null;
    }
// private methods: ===========================================================
	p.__init_rect = function( _k, _r ){
		if( _r ) this._rects.set( _k, _r );
	}
	p._init_rects = function(){
		this.__init_rect( "rect", this._config.property.rect );
		this.__init_rect( "highlight", this._config.property.highlight );
		this.__init_rect( "push", this._config.property.push );
		this.__init_rect( "disable", this._config.property.disable );
		this.__init_rect( "checked", this._config.property.checked );
		this.__init_rect( "checkedHighlight", this._config.property.checkedHighlight );
		this.__init_rect( "checkedPush", this._config.property.checkedPush );
		this.__init_rect( "checkedDisable", this._config.property.checkedDisable );
	}
	p.__init_region = function( _k, _r, _w, _h ){
		var target_width = _w != undefined ? _w : _r.w;
    	var target_height = _h != undefined ? _h : _r.h;
		// 默认>拉伸>平铺>根据类型使用格子
    	// 格子类型
    	if( _r ){
    		// config.property.region 根据分割区域计算出各个区域的坐标、大小等
    		this._regions.set( _k, jees.UT.Grid( this._config.property.region, _r.w, _r.h, target_width, target_height ) );
    	}
	}
	p._init_regions = function( _w, _h ){
		var _this = this;
		this._rects.forEach( function( _r, _k ){
			_this.__init_region( _k, _r, _w, _h );
		});
	}
	p.__init_bitmap = function( _k, _w, _h ){
		if( _k ){
			var r = this._rects.get( _k );
			var rg = this._regions.get( _k );
			// 资源原图
	    	var skin_bitmap = jees.CJS.newBitmap( this._resource );
			skin_bitmap.sourceRect = jees.CJS.newRect( r.x, r.y, r.w, r.h );
			
			var _this = this;
			// 融合9宫格图片
			var tmp_container = jees.CJS.newContainer();
			
			var x = r.x, y = r.y;
			/**
			 * 分割区域信息
			 * @type{jees.UtilTools.Grid}
			 */
			rg.forEach( function( _r ){
				var o = skin_bitmap.clone();
				o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
				o.x = _r.dx;
				o.y = _r.dy;
				o.scaleX = _r.sw;
				o.scaleY = _r.sh;
				
				tmp_container.addChild( o );
			} );
			tmp_container.cache( 0, 0, _w, _h );
			this._bitmaps.set( _k, tmp_container.getCacheDataURL() );
		}
	}
	p._init_bitmap = function( _w, _h ){
		var _this = this;
		this._rects.forEach( function( _r, _k ){
			_this.__init_bitmap( _k, _w, _h );	
		});
		// TODO 将多状态皮肤合并在一起无效
//		var tmp_container = jees.CJS.newContainer();
//		for( var i = 0; i < this._bitmaps.length; i ++ ){
//			var bit = jees.CJS.newBitmap( this._bitmaps[i].getCacheDataURL() );
//			bit.sourceRect = jees.CJS.newRect( 0, 0 , _w, _h );
//			bit.x = 0;
//			bit.y = 0;
//			tmp_container.addChild( bit );
//		}
//		tmp_container.cache( 0, 0, _w * this._bitmaps.length , _h );
//		if( this._type == "button" ){
//			var bit = jees.CJS.newBitmap( tmp_container.bitmapCache.getCacheDataURL() );
//			jees.APP.addChild( tmp_container );
//		}
	}
	jees.UI.Skin = Skin;
})();;
///<jscompress sourcefile="Property.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/UI/Property.js
 * License: MIT license
 */

/**
 * 控件的属性
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * createjs.DisplayObject之外的自定义属性，主要用于解析自定义配置项
	 * @example 
	 * var prop = new jees.UI.Property();
	 * @class Property
	 * @constructor
	 */
	function Property() {
// public properties: 
		/**
		 * 控件配置横坐标
		 * @public
		 * @property y
    	 * @type {Integer}
    	 * @default 0
		 */
		this.x = 0;
		/**
		 * 控件配置纵坐标
		 * @public
		 * @property y
    	 * @type {Integer}
    	 * @default 0
		 */
		this.y = 0;
		/**
		 * 控件实际宽度
		 * @public
		 * @property w
    	 * @type {Integer}
    	 * @default 0
		 */
		this.w = 0;
		/**
		 * 控件实际高度
		 * @public
		 * @property h
    	 * @type {Integer}
    	 * @default 0
		 */
		this.h = 0;
		/**
		 * 控件配置宽度， 可用 100 | "100%" | "auto"
		 * @public
		 * @property width
    	 * @type {Integer|String}
    	 * @default 0
		 */
		this.width = 0;
		/**
		 * 控件配置高度， 可用 100 | "100%" | "auto"
		 * @public
		 * @property height
    	 * @type {Integer|String}
    	 * @default 0
		 */
		this.height = 0;
		/**
		 * 控件配置横向缩放
		 * @public
		 * @property scaleX
    	 * @type {Float}
    	 * @default 1
		 */
		this.scaleX = 1;
		/**
		 * 控件配置纵向缩放
		 * @public
		 * @property scaleY
    	 * @type {Float}
    	 * @default 1
		 */
		this.scaleY = 1;
		/**
    	 * 水平对齐方式 0-Left|1-Center|2-Right
    	 * x属性将会根据方向做偏移 Left从左向右偏移, Center从中心向右, Right从右向左偏移
		 * @public
    	 * @property alignX
    	 * @type {Integer}
    	 * @default 0
    	 */
		this.alignX = 0;
		/**
    	 * 垂直对齐方式 0-Top|1-Middle|2-Bottom
    	 * y属性将会根据方向做偏移 Top从上往下, Middle从中心向下, Bottom从下向上偏移
		 * @public
    	 * @property alignY
    	 * @type {Integer}
    	 * @default 0
    	 */
		this.alignY = 0;
		/**
		 * 内容填充方式 0 - 不改变资源内容, 1 - 拉伸, 2 - 平铺
		 * @public
		 * @property style
		 * @type {Integer}
		 * @default 0
		 */
		this.style = 0;
		/**
		 * 是否启用容器遮罩
		 * @public
		 * @property enableMask
    	 * @type {Boolean}
    	 * @default false
		 */
		this.enableMask = false;
		/**
		 * @public
		 * @property visibleMask
		 * @type {Boolean}
		 * @default false
		 */
		this.visibleMask = false;
		/**
		 * 是否启用容器布局,必须配置中width|height属性为字符类型AUTO关键字，则会根据同组的layoutGroup进行计算
		 * 
		 * @example
		 * val=100px: w0      | w1       | w2
		 * w:       auto=0px  | 30px     | 70%
		 * w:       30px      | auto=50px| 20px 
		 * @public
		 * @property layoutGroup
		 * @type {String}
		 * @default null
		 */
		this.layoutX = null;
		/**
		 * 是否启用容器布局,必须配置中width|height属性为字符类型AUTO关键字，则会根据同组的layoutGroup进行计算
		 * 
		 * @example
		 * val=100px: w0      | w1       | w2
		 * w:       auto=0px  | 30px     | 70%
		 * w:       30px      | auto=50px| 20px 
		 * @public
		 * @property layoutGroup
		 * @type {String}
		 * @default null
		 */
		this.layoutY = null;
		/**
		 * @public
		 * @property enableSkin
		 * @type {Boolean}
		 * @default true
		 */
		this.enableSkin = true;
		/**
    	 * 使用的皮肤
		 * @public
		 * @property skinResource
    	 * @type {String}
    	 * @default null
    	 */
    	this.skinResource = null;
    	/**
    	 * 使用得皮肤类型
    	 * @public
    	 * @property skinType
    	 * @type {String}
    	 * @default null
    	 */
    	this.skinType = null;
		/**
    	 * 实际使用的资源路径
		 * @public
		 * @property resource
    	 * @type {String|createjs.Bitmap}
    	 * @default null
    	 */
    	this.resource = null;
    	/**
		 * 使用的图片资源分割区域
		 * @public
		 * @property
		 * @type {String}
		 * @default null
		 */
		this.region = null;
		/**
		 * 图片资源的使用区域
		 * @public
		 * @property rect
		 * @type {String}
		 * @default null
		 */
		this.rect = null;
		/**
		 * 是否有子节点配置
		 * @public
		 * @property _childs
    	 * @type {Array}
    	 * @default null
		 */
		this.childs = null;
		/**
		 * 防止重复初始化
		 * @public
		 * @property state
		 * @type {Boolean}
		 * @default false
		 */
		this.state = false;
// private properties:
		/**
		 * 控件备份
		 * @private
		 * @property _widget
		 * @type {jees.UI.Widget}
		 * @default null
		 */
		this._widget = null;
	};

	var p = Property.prototype;
// public methods: ============================================================
	/**
	 * 这里初始化2组值，配置值和真实值
	 * @param {Object} _w
	 */
	p.initialize = function( _w ){
		if( !_w ) throw "控件不能为空!";
		// 主要为坐标和auto类型的宽高
		this._widget = _w;
		
		this._reset_size();
		this._reset_position();
	}
	/**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {w,h}
	 */
	p.getPosition = function(){return { x: this.x, y: this.y };}
	/**
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		if( _x ) this.x = _x;
		if( _y ) this.y = _y;
	}
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t 是否配置的值
	 * @return {Integer,Integer} {w,h}
	 */
	p.getSize = function( _t ){
		return _t ? { w: this.width , h: this.height } : { w: this.w, h: this.h };
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function( _w, _h ){
		if( _w ) this.width = _w;
		if( _h ) this.height = _h;
		
		this._reset_size();
	}
	/**
	 * @public
	 * @method getScale
	 * @return {Integer|Float,Integer|Float} {x,y}
	 */
	p.getScale = function(){return { x: this.scaleX, y: this.scaleY };}
	/**
	 * @public
	 * @method setScale
	 * @param {Integer|Float,Integer|Float} _x
	 * @param {Integer|Float,Integer|Float} _y
	 */
	p.setScale = function( _x, _y ){
		if( _x ) this.scaleX = _x;
		if( _y ) this.scaleY = _y;
	}
	/**
	 * @public
	 * @method getAlign
	 * @return {Integer,Integer} {x,y}
	 */
	p.getAlign = function(){return { x: this.alignX, y: this.alignY };}
	/**
	 * @public
	 * @method setAlign
	 * @param {Integer,Integer} _x
	 * @param {Integer,Integer} _y
	 */
	p.setAlign = function( _x, _y ){
		if( _x ) this.alignX = _x;
		if( _y ) this.alignY = _y;
		
		this._reset_position();
	}
// private methods: ===========================================================
	/**
	 * @private
	 * @method _get_size
	 * @param {Integer|String} _val 纪录的值
	 * @param {Integer} _parent 父控件的值
	 * @param {Integer} _child 其他同组子控件的值之和(不包含自己)
	 */
	p._calculate_size = function( _val, _parent, _child ){
		var real_val = 0;
		if( _val && typeof( _val ) == "string" ){
			if( _val.toLowerCase() == "auto" ){
				real_val = _parent - _child;
			}else if( _val.indexOf( "%" ) != -1 ){
				real_val = parseInt( _val.substring( 0, _val.length - 1 ) ) * _parent / 100 ;
			}else{
				real_val = parseInt( _val );
			}
		}else real_val = _val;
		return real_val;
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var parent = this._widget.parent;
		var parent_size = null;
		if( parent )
			if( parent instanceof createjs.Stage 
				|| parent instanceof createjs.StageGL ) parent_size = jees.APP.getScreenSize();
			else parent_size = parent.getSize();
		else parent_size = jees.APP.getScreenSize();

		var childs_size = { w:0, h:0 };
		var size = this.getSize( true );
		if( parent && ( this.layoutX || this.layoutY ) ){
			if( ( typeof( size.w ) == "string" && size.w.toLowerCase() == "auto" )
				|| ( typeof( size.h ) == "string" && size.h.toLowerCase() == "auto" ) ){
					
				if( this.layoutX ){
					var layoutXWgts = this.layoutX.split(",");
					layoutXWgts.forEach( function( _w ){
						var w = parent.getChildByName( _w );
						if( !w.property.state ) w.initialize();
						childs_size.w += w.getSize().w;
					} );
				}
				if( this.layoutY ){
					var layoutYWgts = this.layoutY.split(",");
					layoutYWgts.forEach( function( _w ){
						var w = parent.getChildByName( _w );
						if( !w.property.state ) w.initialize();
						childs_size.h += w.getSize().h;
					} );
				}
			}
		}
		
		this.w = this._calculate_size( size.w, parent_size.w, childs_size.w );
		this.h = this._calculate_size( size.h, parent_size.h, childs_size.h );
	}
	
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var parent = this._widget.parent;
		var parent_size = null;
		if( parent )
			if( parent instanceof createjs.Stage 
				|| parent instanceof createjs.StageGL ) parent_size = jees.APP.getScreenSize();
			else parent_size = parent.getSize();
		else parent_size = jees.APP.getScreenSize();
		
		var pos = this.getPosition();
		var size = this.getSize();
		
		var x = pos.x;
		var y = pos.y;

		if( this.alignX == 2 ){
			x = parent_size.w - size.w - x;
		}else if( this.alignX == 1 ){
			x = ( parent_size.w - size.w ) / 2 + x;
		}
		
		if( this.alignY == 2 ){
			y = parent_size.h - size.h - y;
		}else if( this.alignY == 1 ){
			y = ( parent_size.h - size.h ) / 2 + y;
		}
		
		this.x = x;
		this.y = y;
	};
	jees.UI.Property = Property;
})();;
///<jscompress sourcefile="Widget.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/UI/Widget.js
 * License: MIT license
 */

/**
 * 控件的基类，建议在构件控件时，优先构建非容器对象后，在将其加入容器对象中。
 * 容器对象不建议变换坐标或者嵌套容器对象。
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Widget
	 * @extends createjs.Container
	 * @constructor
	 */
	function Widget() {
		this.Container_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
// private properties:
	};
	var p = createjs.extend( Widget, createjs.Container );
// public methods: ============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
		this._reset_size();
		this._reset_position();
		this._reset_scale();
		this._reset_mask();
		this._init_childs();
		
//		this._cache();
	};
	/**
	 * 绝对位置
	 * @public 
	 * @method getAbsPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAbsPosition = function(){
		var m = this.getConcatenatedMatrix();
		return { x: m.tx, y: m.ty };
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setSize = function( _w, _h ){
		this.property.setSize( _w, _h );
		this._reset_size();
	}
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t
	 * @returns {Integer,Integer} {w,h}
	 */
	p.getSize = function( _t ){
		return this.property.getSize( _t );
	}
	/**
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	}
	/**
	 * @public
	 * @method getPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getPosition = function(){
		return this.property.getPosition();
	}
	/**
	 * @public
	 * @method setScale
	 * @param {Float} _x
	 * @param {Float} _y
	 */
	p.setScale = function( _x, _y ){
		this.property.setScale( _x, _y );
		this._reset_scale();
	}
	/**
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	}
	/**
	 * @public
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function( _x, _y ){
		this.property.setAlign( _x, _y );
		this._reset_position();
	}
	/**
	 * @public
	 * @method getAlign
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAlign = function(){
		return this.property.getAlign();
	}
// private methods: ===========================================================
	/**
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		
		this.cache( pos.x, pos.y, size.w, size.h );
	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		this.setBounds( 0, 0, size.w, size.h );
		
		if( this.property.enableMask ){
			this._reset_mask();
		}
	}
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		
		this.x = pos.x;
		this.y = pos.y;
	}
	/**
	 * @private
	 * @method _reset_scale
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	};
	/**
	 * @private
	 * @method _reset_mask
	 */
	p._reset_mask = function(){
		if( this.property.enableMask ){
			var size = this.property.getSize();
			var pos = this.getPosition();
			
			if( this.mask == null ){
				this.mask = jees.CJS.newShape( size.w, size.h, "#000000" );
				if( this.property.visibleMask )
					this.addChildAt( this.mask, 0 );
			}
			
			if( this.mask && this.property.visibleMask ){
				this.mask.alpha = 0.5;
				this.mask.cache( pos.x, pos.y, size.w, size.h );
				this.mask.graphics.drawRect( pos.x, pos.y, size.w, size.h );
			}
		}
	};
	/**
	 * @private
	 * @method _init_childs
	 */
	p._init_childs = function(){
		if( this.children ){
			for( var i = 0; i < this.children.length; i ++ ){
				var c = this.children[i];
				if( c instanceof jees.UI.Widget
					|| c instanceof jees.UI.TextBox 
					|| c instanceof jees.UI.ImageBox 
					|| c instanceof jees.UI.ImageSpt
					|| c instanceof jees.UI.InputBox
				) {
					c.initialize();
				}
				
				if( this.property.enableMask ) {
					c.mask = this.mask;
				}
			}
		}
	};
	
	jees.UI.Widget = createjs.promote( Widget, "Container" );
})();;
///<jscompress sourcefile="Panel.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/ui/Panel.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Panel
	 * @extends jees.UI.Widget
	 * @constructor
	 */
    function Panel(){
    	this.Widget_constructor();
// public properties:
		/**
    	 * 使用的皮肤
		 * @public
		 * @property skinResource
    	 * @type {String}
    	 * @default null
    	 */
    	this.property.skinResource = "default";
    	/**
    	 * 使用得皮肤类型
    	 * @public
    	 * @property skinType
    	 * @type {String}
    	 * @default null
    	 */
    	this.property.skinType = "Panel";
    	
		
		this.bgScaleX = 1;
		this.bgScaleY = 1;
// private properties:
		/**
		 * 控件使用得皮肤，为空不使用
		 * @private
		 * @property _skin
		 * @type {jees.Skin}
		 * @default null
		 */
		this._skin = null;
		/**
		 * @private
		 * @property _object
		 * @extend
		 * @type {jees.UI.ImageBox}
		 * @default null
		 */
		this._background = null;
    };
  	var p = createjs.extend( Panel, jees.UI.Widget );
// public methods: ============================================================
    p.initialize = function(){
    	if( this.property.state ) return;
    	
    	this.Widget_initialize();
		this._reset_background();
		
//		this._cache();
	};
	p.setSkinType = function( _t ){
		this.property.skinType = _t;
		this._reset_background();
	}
// private method: ============================================================
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		this.Widget__reset_size();
		// 重设背景大小
		this._reset_background();
	}
	/**
	 * @private
	 * @method _reset_background
	 */
	p._reset_background = function(){
		if( !this._background ){
			this._background = new jees.UI.ImageBox();
			this.addChildAt( this._background, this.visibeMask ? 1 : 0 );
			this._background.initialize();
		}
		
		if( this.property.enableSkin ){
			this._reset_skin();
		}else{
			this._reset_custom();
		}
	}
	/**
	 * @private
	 * @method _reset_custom_grid
	 */
	p._reset_custom_grid = function(){
		var size = this.getSize();
		
		var res = jees.Resource.get( this.property.resource );
		var rw = res.width;
		var rh = res.height;
		var rs = this.property.region.split(",");
		var rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, size.w, size.h );
		
		var tc = jees.CJS.newContainer();
		var bg = jees.CJS.newBitmap( res );
		var _this = this;
		rg.forEach( function( _r ){
			var o = bg.clone();
			o.sourceRect = jees.CJS.newRect( _r.x, _r.y, _r.w, _r.h );
			o.x = _r.dx;
			o.y = _r.dy;
			o.scaleX = _r.sw;
			o.scaleY = _r.sh;
			o.cache( 0, 0, _r.w , _r.h );
			tc.addChild( o );
		} );
		
		tc.cache( 0, 0, size.w, size.h );
		
		var b = tc.getBounds();
		this.property.resource = tc.getCacheDataURL();
		this._background.setSize( size.w, size.h );
		this._reset_background_resource();
	}
	/**
	 * @private
	 * @method _reset_custom
	 */
	p._reset_custom = function(){
		var size = this.getSize();
		this._reset_background_resource();
		
		switch( this.property.style ){
			case 1: // 拉伸
				var res = jees.Resource.get( this.property.resource );
				var sx = size.w / res.width;
				var sy = size.h / res.height;
				this._background.setScale( sx, sy );
				break;
			case 2: // 平铺
				if( this.mask == null ){
					this.mask = jees.CJS.newShape();
				}
				this.addChildAt( this.mask, 0 );
				this.mask.graphics.beginBitmapFill( this._background.image ).drawRect( 0, 0, size.w, size.h );
				this.mask.cache( 0, 0, size.w, size.h );
				break;
			case 3: //9宫格
				this._reset_custom_grid();
				break;
		}
	}
	/**
	 * @private
	 * @method _reset_skin
	 */
	p._reset_skin = function(){
		var size = this.getSize();
		if( !this._skin ){
			this._skin = new jees.UI.Skin( this.property.skinType, size.w, size.h, this.property.skinResource );
		}
		if( this._skin.getSkinType() != this.property.skinType || this._skin.getSkinResource() != this.property.skinResource ){
			this._skin = new jees.UI.Skin( this.property.skinType, size.w, size.h, this.property.skinResource );
		}
		
		this.property.resource = this._skin.getCacheDataURL("rect");
		
		this._reset_background_resource();
	}
	/**
	 * @private
	 * @method _reset_background_resource
	 */
	p._reset_background_resource = function(){
		if( this._background.getResource() != this.property.resource ){
			this._background.setResource( this.property.resource );
		}
	}

	jees.UI.Panel = createjs.promote( Panel, "Widget" );
})();;
///<jscompress sourcefile="ImageBox.js" />
/*
 * Author: Aiyoyoyo 
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/ImageBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * 支持基本的图片格式。
	 * @class ImageBox
	 * @extends createjs.BitMap
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @constructor
	 */
	function ImageBox() {
		this.Bitmap_constructor();
	// private properties: ====================================================
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
	};
	var p = createjs.extend( ImageBox, createjs.Bitmap );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
		this._reset_bitmap();
		this._reset_size();
		this._reset_rect();
	}
	/**
	 * @public
	 * @method getResource
	 */
	p.getResource = function(){
		return this.property.resource;
	}
	/**
	 * @public
	 * @method setResource
	 * @param {String|Image|createjs.Bitmap} _r
	 */
	p.setResource = function( _r ){
		this.property.resource = _r;
		this._reset_bitmap();
	}
//	/**
//	 * @public
//	 * @extends
//	 * @method initialize
//	 */
//	p.initialize = function(){
//		if( this.state ) return;
//		this.state = true;
//		
//		if( typeof this.property.resource == "string" ){
//			if( this.property.resource.startsWith( "data:image" ) ){
//				this.image = document.createElement("img");
//				this.image.src = this.property.resource;
//			}else if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.property.resource)){
//				this.image = jees.Resource.get( this.property.resource );
//			}else{
//				this.image = document.createElement("img");
//				this.image.src = this.property.resource;
//				// 这里可能需要延迟加载
//			}
//		}else this.image = this.property.resource; // type = image
//		
//		if( this.region ){
//			var r = this.region.split(",");
//			if( r.length != 4 ) throw "分割区域错误:" + r;
//			this.setRect( r[0], r[1], r[2], r[3] );
//		}else{
//			this.setRect( 0, 0, this.image.width, this.image.height );
//		}
//		
//		this._reset_size();
//		this._reset_position();
//		this._reset_scale();
////		this.cache( this.x, this.y, this.getSize().w, this.getSize().h );
//	}
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t
	 * @return {Integer,Integer} {w,h}
	 */
	p.getSize = function ( _t ) {
		return this.property.getSize( _t );
	};
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size();
	};
	/**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return this.property.getPosition();
	}
	/**
     * @method setPosition
     * @extends
     * @param {Integer} _x
     * @param {Integer} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
//	/**
//	 * 绝对位置
//	 * @public 
//	 * @method getAbsPosition
//	 * @returns {Integer,Integer} {x,y}
//	 */
//	p.getAbsPosition = function(){
//		var m = this.getConcatenatedMatrix();
//		return { x: m.tx, y: m.ty };
//	}
	/**
	 * 获取缩放
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	}
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		this._reset_scale();
	}
//	/**
//	 * @public
//	 * @method getRect
//	 * @return {Integer,Integer,Integer,Integer} {x,y,w,h}
//	 */
//	p.getRect = function(){
//		return this.sourceRect;
//	}
//	/**
//	 * 绘制图片的局部
//	 * @public
//	 * @method setRect
//	 * @param {Integer} _x
//	 * @param {Integer} _y
//	 * @param {Integer} _w
//	 * @param {Integer} _h
//	 */
//	p.setRect = function( _x, _y, _w, _h ){
//		this.region = _x + "," + _y + "," + _w + "," + _h;
//		this.sourceRect = jees.CJS.newRect( _x, _y, _w, _h );
//		this.setBounds( _x, _y, _w, _h);
//	}
//	/**
//	 * 设置图片热点
//	 * @public
//	 * @method setReg
//	 * @param {Integer} _x
//	 * @param {Integer} _y
//	 */
//	p.setReg = function( _x, _y ){
//		if( _x ) this.regX = _x;
//		if( _y ) this.regY = _y;
//	}
//	/**
//	 * @public
//	 * @method getReg
//	 * @returns {Integer,Integer} {x,y}
//	 */
//	p.getReg = function(){
//		return {x: this.regX, y: this.regY};
//	}
 // private method: ===========================================================
 	/**
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		this.cache( 0, 0, size.w, size.h );
	}
	/**
	 * @private
	 * @method _reset_bitmap
	 */
 	p._reset_bitmap = function(){
   		if( typeof this.property.resource == "string" ){
			if( this.property.resource.startsWith( "data:image" ) ){
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
			}else if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.property.resource)){
				this.image = jees.Resource.get( this.property.resource );
			}else{
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
				// 这里可能需要延迟加载
			}
		}else this.image = this.property.resource; // type = image
 	}
	// /**
	//  * @method _onload
	//  * @param {Object|String} _r 
	//  * @private
	//  */
	// p._onload = function( _r ){
	// 	if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
	// 		this._sourcePath = _r;
	// 		this._onload_finish( this );
    //     }else{
	// 		this._sourcePath = _r;
	// 		var _this = this;
	// 		jeesjs.QM.addSource( _r , _r );
	// 		jeesjs.QM.load( function(){
	// 			_this._onload_finish( _this ) 
	// 		} );
	// 	}
	// }
	// /**
	//  * @method _onload_finish
	//  * @param {Event} _e
	//  * @private
	//  */
	// p._onload_finish = function( _o ){
	// 	_o._source = typeof _o._sourcePath === "object" ? _o._sourcePath : jeesjs.QM.getSource( _o._sourcePath );
	// 	_o._object = new createjs.Bitmap( _o._source );
	// 	_o._reset();
	// }
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		
		this.setBounds( 0, 0, size.w, size.h );
	};
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		this.x = pos.x;
		this.y = pos.y;
	};
//	/** 
//	 * @method _reset_size
//	 * @private
//	 */
//	p._reset_size = function(){
//		if( !this.state ) return;
//		
//		var parent_size = null;
//		if( this.parent instanceof createjs.Stage || this.parent instanceof createjs.StageGL ){
//			parent_size = jees.APP.getScreenSize();
//		}else parent_size = this.parent ? this.parent.getSize() : jees.APP.getScreenSize();
//
//		var prop_size = this.property.getSize();
//
//		var w = this.property._calculate_size( prop_size.w, parent_size.w, 0 );
//		var h = this.property._calculate_size( prop_size.h, parent_size.h, 0 );
//		
//		var bounds = this.getBounds();
//		
//		if( w != bounds.width )
//			this.property.scaleX = w / bounds.width;
//		if( h != bounds.height )
//			this.property.scaleY = h / bounds.height;
//		
//		this._reset_scale();
//		
//		if( this.region ){
//			var b = this.getBounds();
//			this.sourceRect = jees.CJS.newRect( 0, 0, b.width, b.height );
//		}
//	}
//	/**
//	 * 重置坐标
//	 * @private
//	 * @method _reset_position
//	 */
//	p._reset_position = function(){
//		var pos = this.property.getPosition();
//		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
//		var x = pos.x;
//		var y = pos.y;
//		
//		this.setReg( this.getReg().x, this.getReg().y );
//		if( this.property.alignX == 2 ){
//			console.log( this.parent, jees.APP.getScreenSize(), relative_pos, this.getSize() );
//			x = relative_pos.w - this.getSize().w - x;
//		}else if( this.property.alignX == 1 ){
//			this.setReg( this.getSize().w / 2, this.getReg().y );
//			x = ( relative_pos.w / 2 ) + x;
//		}
//		
//		if( this.property.alignY == 2 ){
//			y = relative_pos.h - this.getSize().h - y;
//		}else if( this.property.alignY == 1 ){
//			this.setReg( this.getReg().x, this.getSize().h / 2 );
//			y = ( relative_pos.h / 2 ) + y;
//		}
//		
//		this.x = x;
//		this.y = y;
//	}
	 /**
	  * @method _reset_rect
	  * @private
	  */
	 p._reset_rect = function(){
	 	if( this.porperty.rect ){
//	 		this.sourceRect = 
//	 		this._object.sourceRect = this._rect;
	 	}
	 	
	 }
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	}
    
	jees.UI.ImageBox = createjs.promote( ImageBox, "Bitmap");
})();;
///<jscompress sourcefile="ImageSpt.js" />
/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/ImageSpt.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * 支持基本的图片格式。
	 * @class ImageSpt
	 * @extends createjs.Sprite
	 * @constructor
	 */
	function ImageSpt() {
		this.Sprite_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
		 * @public
		 * @property rows
		 * @type {Integer}
		 * @default 1
		 */
		this.rows = 1;
		/**
		 * @public
		 * @property cols
		 * @type {Integer}
		 * @default 1
		 */
		this.cols = 1;
		/**
		 * 起始帧
		 * @public
		 * @property start
		 * @type {Integer}
		 * @default 0
		 */
		this.start = 0;
		/**
		 * 帧速 ms
		 * @public
		 * @property speed
		 * @type {Integer}
		 * @default 100
		 */
		this.speed = 100;
		/**
		 * @public
		 * @property auto
		 * @type {Boolean}
		 * @default true
		 */
		this.auto = true;
		/**
		 * @public
		 * @property state
		 * @type {Boolean}
		 * @default false
		 */
		this.state = false;
// private properties:
		/**
		 * @private 
		 * @property _data
		 * @type {Object}
		 * @defualt null
		 */
		this._data = null;
		/**
		 * @private
		 * @property _frame_count
		 * @type {Integer}
		 * @default 1
		 */
		this._frame_count = 1;
	};

	var p = createjs.extend( ImageSpt, createjs.Sprite );
// public method: =============================================================
	p.initialize = function(){
		if( this.state ) return;
		this.state = true;
		var res =  jees.Resource.get( this.property.resource );
		var frame_width = res.width / this.cols;
		var frame_height = res.height / this.rows;
//	    framerate: rate, 这里无视ticker的timingMode，也许是bug也许是我错了。
		this._frame_count = ( this.cols * this.rows );
		
		this._data = {
	        images: [ res ],
	        framerate: this._frame_count,
	        frames: { width: frame_width, height: frame_height, count: this._frame_count, regX: this.regX, regY: this.regY },
	        animations: {
	        	default: [ 0, this._frame_count - 1, "default", 1]
	        }
	   	};
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
	   	
	    this._reset_speed();
	    this._reset_size();
	    this._reset_position();
	    
	    this._goto( this.start );
	    if( this.auto ){
	    	this.gotoAndPlay( "default" );
	    }
	}
	/**
	 * @public
	 * @method getSize
	 * @returns {Integer,Integer} {w,h}
	 */
	p.getSize = function(){
		return this.property.getSize();
	}
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size();
	};
	/**
	 * 获取控件坐标
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return { x: this.x, y: this.y };
	}
	/**
     * 设置坐标
     * @public
     * @method setPosition
     * @overview
     * @param {Integer} _x
     * @param {Integer} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	}
	/**
	 * 绝对位置
	 * @public 
	 * @method getAbsPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAbsPosition = function(){
		var m = this.getConcatenatedMatrix();
		return { x: m.tx, y: m.ty };
	}
	/**
	 * 获取缩放
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return {x: this.scaleX, y: this.scaleY};
	}
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		this._reset_scale();
	}
	/**
	 * 绘制图片的局部
	 * @method setRect
	 * @param {Integer} _x
	 * @param {Integer} _y
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		this.region = _x + "," + _y + "," + _w + "," + _h;
		this.sourceRect = jees.CJS.newRect( _x, _y, _w, _h );
		this.setBounds( _x, _y, _w, _h);
		this.cache( 0, 0, _w, _h );
	}
	/**
	 * 设置图片热点
	 * @public
	 * @method setReg
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setReg = function( _x, _y ){
		if( _x ) this.regX = _x;
		if( _y ) this.regY = _y;
	}
	p.setSpeed = function( _s ){
		this.speed = _s;
		this._reset_speed();
	}
 // private method: ===========================================================
	/** 
	 * @method _reset_size
	 * @private
	 */
	p._reset_size = function(){
		if( !this.state ) return;
		
		var prop_size = this.property.getSize();
		var bounds = this.getBounds();
		
		if( prop_size.w == 0 ){
			this.property.setSize( bounds.width, prop_size.h );
			prop_size = this.property.getSize();
		}
		if( prop_size.h == 0 ){
			this.property.setSize( prop_size.w, bounds.height );
			prop_size = this.property.getSize();
		}
		
		if( prop_size.w != bounds.width )
			this.property.scaleX = prop_size.w / bounds.width;
		if( prop_size.h != bounds.height )
			this.property.scaleY = prop_size.h / bounds.height;
		
		this._reset_scale();
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.property.getPosition();
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		var x = pos.x;
		var y = pos.y;
		
		this.setReg( 0, 0 );
		if( this.property.alignX == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.property.alignX == 1 ){
			this.setReg( this.getSize().w / 2, this.getSize().h / 2 );
			x = ( relative_pos.w / 2 ) + x;
		}
		
		if( this.property.alignY == 2 ){
			y = relative_pos.h - this.getSize().h - y;
		}else if( this.property.alignY == 1 ){
			this.setReg( this.getSize().w / 2, this.getSize().h / 2 );
			y = ( relative_pos.h / 2 ) + y;
		}
		this.x = x;
		this.y = y;
	}
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		if( !this.state ) return;
		
		this.scaleX = this.property.scaleX;
		this.scaleY = this.property.scaleY;
		
		if( this.region ){
			var b = this.getBounds();
			this.sourceRect = jees.CJS.newRect( 0, 0, b.width, b.height );
		}
	}
	p._reset_speed = function(){
		var spd = 1000 / jees.SET.getFPS() / this.speed;
		
		this._data.animations.default[3] = spd;
		this.spriteSheet._parseData( this._data );
	}
	jees.UI.ImageSpt = createjs.promote( ImageSpt, "Sprite");
})();;
///<jscompress sourcefile="TextBox.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/TextBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class TextBox
	 * @extends createjs.Text
	 * @constructor
	 */
	function TextBox() {
		this.Text_constructor( "", "", "" );
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
		 * @public
		 * @property italic
		 * @type {Boolean}
		 * @default false
		 */
		this.italic = false;
		/**
		 * @public
		 * @property bold
		 * @type {Boolean}
		 * @default false
		 */
		this.bold = false;
		/**
		 * 拆分的字体样式-字体样式
		 * @public
		 * @property fontStyle
		 * @type {String}
		 * @default "Arial"
		 */
		this.fontStyle = "Arial";
		/**
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
// private properties:
		/**
		 * @private
		 * @override
		 * @function _drawText
		 */
		this._drawText = this._reset_text;
	};
// public static properties:
	TextBox.ALIGN_START = "start";
	TextBox.ALIGN_END = "end";
	TextBox.ALIGN_LEFT = "left";
	TextBox.ALIGN_RIGHT = "right";
	TextBox.ALIGN_CENTER = "center";

	TextBox.BASELINE_TOP = "top";
	TextBox.BASELINE_HANGING = "hanging";
	TextBox.BASELINE_MIDDLE = "middle";
	TextBox.BASELINE_ALPHABETIC = "alphabetic";
	TextBox.BASELINE_IDEOGRAPHIC = "ideographic";
	TextBox.BASELINE_BOTTOM = "bottom";
	
	var p = createjs.extend( TextBox, createjs.Text );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this.font = this._get_font();
		this.lineHeight = this.getFontSize();
		this.setColor( this.color );
		this.setText( this.text );
		this._reset_position();
		this._cache();
	}
    /**
     * 获取文本绘制的宽高
	 * @public
     * @method getSize
     * @return { w, h }
     */
	p.getSize = function(){
	    return {w: this.getMeasuredWidth() , h: this.getMeasuredLineHeight() }
	};
    /**
     * 设置坐标
	 * @public
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function (_x, _y) {
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * @public
	 * @method getPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getPosition = function(){
		return { x: this.x , y: this.y };
	}
	/**
	 * 当前颜色
	 * @public
	 * @method getColor
	 * @return {String}
	 */
	p.getColor = function () {
		return this.color;
	};
	/**
	 * 设置颜色
	 * @public
	 * @method setColor
	 * @param {String} _c
	 */
	p.setColor = function (_c) {
		this.color = _c;
	};
	/**
	 * 设置完整的字体样式
	 * 参考html5字体样式
	 * @public
	 * @method setFont
	 * @param {Integer} _s // 字号 px
	 * @param {String} _f // 字体
	 * @param {Boolean} _i // 斜体
	 * @param {Boolean} _b // 粗体
	 */
	p.setFont = function ( _s, _f, _i, _b ) {
		this._set_font( _s, _f, _i, _b );
		this.font = this._get_font();
	};
	/**
	 * 当前字体样式
	 * @method getFontStyle
	 * @return {String}
	 */
	p.getFontStyle = function () {
		return this.fontStyle;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontStyle
	 * @param {String} _s
	 */
	p.setFontStyle = function (_s) {
		this.fontStyle = _s;
		this.font = this._get_font();
	};
	/**
	 * 当前字体大小
	 * @method getFontSize
	 * @return {Integer}
	 */
	p.getFontSize = function () {
		return this.fontSize;
	}
	/**
	 * 设置字体大小
	 * 
	 * @method setFontSize
	 * @param {Integer}  _s
	 */
	p.setFontSize = function (_s) {
		this.fontSize = _s;
		this.lineHeight = this.fontSize + "px";
		this.font = this._get_font();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getAlign = function () {
		return this.textAlign;
	}
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * "start", "end", "left", "right", and "center"
	 * @method setAlign
	 * @param {String} _a
	 */
	p.setAlign = function (_a) {
		this.textAlign = _a;
	};
	/**
	 * 当前字体基于坐标的垂直对齐方式
	 * @method getAlign
	 * @return {String}
	 */
	p.getBaseline = function () {
		return this.textBaseline;
	}
	/**
	 * 设置文字基于坐标的垂直对齐方式
	 * "top", "hanging", "middle", "alphabetic", "ideographic", or "bottom".
	 * @method setAlign
	 * @param {String} _a
	 */
	p.setBaseline = function (_b) {
		this.textBaseline = _b;
	};
	/**
	 * 当前显示内容的固定宽度
	 * @method getAlign
	 * @return {String}
	 */
	p.getMaxWidth = function () {
		return this.maxWidth;
	}
	/**
	 * 设置显示内容的固定宽度，内容超出后，会压缩文字宽度至该范围内。
	 * @method setMaxWidth
	 * @param {Integer} _w
	 */
	p.setMaxWidth = function (_w) {
		this.maxWidth = _w;
	}
	/**
	 * 当前显示范围的固定宽度
	 * @method getLineWidth
	 * @return {String}
	 */
	p.getLineWidth = function () {
		return this.lineWidth;
	}
	/**
	 * 设置显示范围的固定宽度，超出后自动换行。可以通过字体大小计算出换行位置。
	 * @method setLineWidth
	 * @param {Integer} _w
	 */
	p.setLineWidth = function (_w) {
		this.lineWidth = _w;
	}
	/**
	 * 当前显示的内容
	 * @method getText
	 * @return {String}
	 */
	p.getText = function () {
		return this.text;
	}
	/**
	 * 设置显示的内容
	 * @method setText
	 * @param {String} _t
	 */
	p.setText = function (_t) {
		this.text = _t;
		this._cache();
	}
	/**
	 * 是否使用粗体
	 * @method isBold
	 * @return {Boolean}
	 */
	p.isBold = function () {
		return this.bold;
	}
	/**
	 * 使用粗体
	 * @method setBold
	 * @param {Boolean}
	 */
	p.setBold = function (_v) {
		this.bold = _v;
		this.font = this._get_font();
	}
	/**
	 * 是否使用斜体
	 * @method isItalic
	 * @return {Boolean}
	 */
	p.isItalic = function () {
		return this.italic;
	}
	/**
	 * 使用斜体
	 * @method setItalic
	 * @param {Boolean}
	 */
	p.setItalic = function (_v) {
		this.italic = _v;
		this.font = this._get_font();
	}
	/**
	 * 设置是否可见
	 * @public
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function(_v){
		this.visible = _v;
	}
	/**
	 * 是否可见
	 * @public
	 * @method isVisible
	 * @return {Boolean}
	 */
	p.isVisible = function(){
		return this.visible;
	}
// private method: ============================================================
	/**
	 * @private
	 * @method _cache
	 */
	p._cache = function(){
		var size = this.getSize();
		this.cache( 0, 0, size.w, size.h );
	}
	/**
	 * 根据字体属性生成控件字体的属性字符串
	 * @private
	 * @method _get_font
	 * @return {String}
	 */
	p._get_font = function () {
		return ( this.italic ? "italic" : "" ) + ( this.bold ? " bold" : "" ) + " " + this.fontSize + "px " + this.fontStyle;
	}
	/**
	 * @private
	 * @method _set_font
	 * @param {Integer} _s
	 * @param {String} _f
	 * @param {Boolean} _i
	 * @param {Boolean} _b
	 */
	p._set_font = function( _s, _f, _i, _b ){
		this.fontSize = _s;
		this.fontStyle = _f ? _f : "Arial";
		this.italic = _i || this.italic;
		this.bold = _b || this.bold;
	}
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.property.getPosition();
		var relative_pos = this.parent != null ? this.parent.getSize() : jees.APP.getScreenSize();
		var x = pos.x;
		var y = pos.y;

		if( this.property.alignX == 2 ){
			x = relative_pos.w - this.getSize().w - x;
		}else if( this.property.alignX == 1 ){
			x = ( relative_pos.w - this.getSize().w ) / 2 + x;
		}
		
		if( this.property.alignY == 2 ){
			y = relative_pos.h - this.getSize().h - y;
		}else if( this.property.alignY == 1 ){
			y = ( relative_pos.h - this.getSize().h ) / 2 + y;
		}
		
		this.x = x;
		this.y = y;
	}
	/** 
     * Draws multiline text. 修复createjs的text为中文时，自动换行的问题。
     * TIP: 实测下来，存在BUG，尚未分析具体原因。
     * @method _drawText 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Object} o 
     * @param {Array} lines 
     * @return {Object} 
     * @extends
     * @protected 
     * 转载：http://blog.csdn.net/yyf1990cs/article/details/51000447
     **/
	p._reset_text = function (ctx, o, lines) {
		var paint = !!ctx;
		if (!paint) {
			ctx = createjs.Text._workingContext;
			ctx.save();
			this._prepContext(ctx);
		}
		var lineHeight = this.lineHeight || this.getMeasuredLineHeight();

		var maxW = 0, count = 0;
		var hardLines = String(this.text).split(/(?:\r\n|\r|\n)/);
		for (var i = 0, l = hardLines.length; i < l; i++) {
			var str = hardLines[i];
			var w = null;

			if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
				// text wrapping:  
				var words = str.split(/(\s|[\u4e00-\u9fa5]+)/);//按照中文和空格来分割  
				var splitChineseWords = [];
				for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
					var chineseWordStr = words[wordIndex];
					if (chineseWordStr == "")
						continue;
					if ((/([\u4e00-\u9fa5]+)/).test(chineseWordStr)) {
						splitChineseWords = splitChineseWords.concat(chineseWordStr.split(""));//再把中文拆分成一个一个的  
					}
					else {
						splitChineseWords.push(chineseWordStr);
					}
				}
				words = splitChineseWords;//重新组成数组  
				str = words[0];
				w = ctx.measureText(str).width;

				for (var j = 1, jl = words.length; j < jl; j += 2) {
					// Line needs to wrap:  
					var nextStr = j + 1 < jl ? words[j + 1] : "";
					var wordW = ctx.measureText(words[j] + nextStr).width;
					if (w + wordW > this.lineWidth) {
						if (words[j] != "\s") //原版没有这个IF，  
							str += words[j]; //英文时为空格，不需要加，中文时为汉字，所以不能漏了  
						if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
						if (lines) { lines.push(str); }
						if (w > maxW) { maxW = w; }
						str = nextStr;
						w = ctx.measureText(str).width;
						count++;
					} else {
						str += words[j] + nextStr;
						w += wordW;
					}
				}
			}

			if (paint) { this._drawTextLine(ctx, str, count * lineHeight); }
			if (lines) { lines.push(str); }
			if (o && w == null) { w = ctx.measureText(str).width; }
			if (w > maxW) { maxW = w; }
			count++;
		}

		if (o) {
			o.width = maxW;
			o.height = count * lineHeight;
		}
		if (!paint) { ctx.restore(); }
		return o;
	};

	jees.UI.TextBox = createjs.promote( TextBox, "Text" );
})();;
///<jscompress sourcefile="Button.js" />

/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/Button.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * TODO 自定义皮肤和素材的配合有点问题。
	 * @class Button
	 * @extends jees.UI.ImageSpt
	 * @constructor
	 */
	function Button() {
		this.ImageSpt_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Button"
    	 */
		this.property.skinResource = "Button";
		/**
		 * @public
		 * @property text
		 * @type {String}
		 * @default ""
		 */
		this.text = "";
		/**
		 * @public
		 * @property types
		 * @type {Integer}
		 * @default 4
		 */
		this.types = 4;
		/**
		 * 是否禁用控件
		 * @public
		 * @property disable
		 * @type {Boolean}
		 * @default false
		 */
		this.disable = false;
		/**
		 * @public
		 * @property italic
		 * @type {Boolean}
		 * @default false
		 */
		this.italic = false;
		/**
		 * @public
		 * @property bold
		 * @type {Boolean}
		 * @default false
		 */
		this.bold = false;
		/**
		 * 拆分的字体样式-字体样式
		 * @public
		 * @property fontStyle
		 * @type {String}
		 * @default "Arial"
		 */
		this.fontStyle = "Arial";
		/**
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
		/**
		 * @public
		 * @property color
		 * @type {String}
		 * @default "#FFFFFF"
		 */
		this.color = "#FFFFFF";
		/**
		 * @public
		 * @property spriteX
		 * @type {Integer}
		 * @default 0
		 */
		this.spriteX = 0;
		/**
		 * @public
		 * @property spriteY
		 * @type {Integer}
		 * @default 0
		 */
		this.spriteY = 0;
		/**
		 * @public
		 * @property region
		 * @type {String}
		 * @default ""
		 */
		this.region = "";
// private properties:
		this._data = null;
		this._object = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( Button, jees.UI.ImageSpt );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this._init_background();
		this._init_text();
		
		var _this = this;
		if( this.types.indexOf( "push") != -1 ){
			jees.E.bind( this, "mousedown", function( e ){ _this._handle_mousedown( e, _this ); });
        	jees.E.bind( this, "pressup", function( e ){ _this._handle_pressup( e, _this ); });
		}
		
        if( this.types.indexOf( "highlight") != -1 ){
        	jees.E.bind( this, "mouseover", function( e ){ _this._handle_mouseover( e, _this ); });
        	jees.E.bind( this, "mouseout", function( e ){ _this._handle_mouseout( e, _this ); });
        }
		this._reset_disable();
	    this._reset_position();
//		this.cache( 0, 0, this.getSize().w, this.getSize().h );
	}
	/**
	 * 设置状态
	 * @public
	 * @method setDisabled
	 * @param {Boolean} _e
	 */
	p.setDisabled = function( _e ){
		this.disable = _e;
	}
	/**
	 * 是否禁用
	 * @public
	 * @method isDisabled
	 * @return {Boolean}
	 */
	p.isDisabled = function(){
		return this.disable;
	}
	p.setText = function( _t ){
		this._object.setText( _t );
	}
// private method: ============================================================
	p._init_skin = function(){
		var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		
		this._data.images.push( this._skin.getCacheDataURL("rect") );
		this._data.images.push( this._skin.getCacheDataURL("highlight") );
		this._data.images.push( this._skin.getCacheDataURL("push") );
		this._data.images.push( this._skin.getCacheDataURL("disable") );
	}
	p._init_custom = function(){
		var bitmap = jees.CJS.newBitmap( jees.Resource.get( this.property.resource ) );
		var b = bitmap.getBounds();
		var c = this.types.split(",").length;
		var size = this.getSize();
		var w = this.spriteX == 0 ? size.w : this.spriteX;
		var h = this.spriteY == 0 ? size.h : this.spriteY;
		var rw = this.spriteX == 0 ? b.width : this.spriteX;
		var rh = this.spriteY == 0 ? b.height : this.spriteY;
		
		var rg = null;
		if( this.region != "" ){
			var rs = this.region.split(",");
			rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, w, h );
		}
		
		for( var i = 0; i < c; i ++ ){
			var bg = bitmap.clone();
			var x = this.spriteX * i;
			var y = this.spriteY * i;
			bg.sourceRect = jees.CJS.newRect( x, y, w, h );
			bg.cache( 0, 0, w, h );
			
			if( this.region != "" ){
				var tc = jees.CJS.newContainer();
				rg.forEach( function( _r ){
					var o = bg.clone();
					o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
					o.x = _r.dx;
					o.y = _r.dy;
					o.scaleX = _r.sw;
					o.scaleY = _r.sh;
					
					o.cache( 0, 0, w, h );
					tc.addChild( o );
				} );
				tc.cache( 0, 0, w, h );
				this._data.images.push( tc.bitmapCache.getCacheDataURL() );
			}else{
				this._data.images.push( bg.bitmapCache.getCacheDataURL() );
			}
		}
	}
	p._init_background = function(){
		this.state = true;
		var size = this.getSize();
		
		this._data = {
			images: [],
			frames: {width: size.w, height: size.h, count: 4 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        	highlight: [1, 1, "highlight"],
	        	push: [2, 2, "push"],
	        	disable: [3, 3, "disable"],
	        	test: [0, 3, "test", 0.15],
	        }
	   	};
	   	
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
		
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
		this.gotoAndPlay( "test" );
	}
	p._init_text = function(){
		this.parent.addChildAt( this._object, this.parent.getChildIndex( this ) + 1 );
		
		this._object.setText( this.text );
		this._object.setFontSize( this.fontSize );
		this._object.setFontStyle( this.fontStyle );
		this._object.setColor( this.color );
		this._object.setItalic( this.italic );
		this._object.setBold( this.bold );
		this._object.setPosition( this.x + ( this.getSize().w / 2 ) - ( this._object.getSize().w / 2 ) , 
			this.y + ( this.getSize().h / 2 - ( this._object.getSize().h / 2 ) ) );
	}
	p._reset_disable = function(){
		if( this.disable ){
			this.gotoAndPlay( "disable" );
		}else{
			this.gotoAndPlay( "normal" );
		}
	}
	 /**
	  * 当按钮按下时，文本控件做字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mousedown = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	var obj = _w._object;
	 	var pos = obj.getPosition();
	 	var offset = obj.getFontSize() / 10;
	 	
	 	this._object.setPosition( pos.x - offset, pos.y - offset );
	 	this.gotoAndPlay( "push" );
	 }
	 /**
	  * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_pressup = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	var obj = _w._object;
	 	var pos = obj.getPosition();
	 	var offset = obj.getFontSize() / 10;
	 	this._object.setPosition( pos.x + offset, pos.y + offset );
	 	this.gotoAndPlay( "normal" );
	 }
	/**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseover
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseover = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( "highlight" );
	 }
	 /**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseout
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseout = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( "normal" );
	 }
	 
	jees.UI.Button = createjs.promote( Button, "ImageSpt" );
})();;
///<jscompress sourcefile="CheckBox.js" />

/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/CheckBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * 纯外框时，需要使用容器来保证透明区域可点击。建议素材中添加地板。
	 * @class CheckBox
	 * @extends jees.UI.ImageSpt
	 * @constructor
	 */
	function CheckBox() {
		this.Button_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Button"
    	 */
		this.property.skinResource = "CheckBox";
		/**
		 * @public
		 * @property checked
		 * @type {Boolean}
		 * @default false
		 */
		this.checked = false;
		/**
		 * @public
		 * @property group
		 * @type {String}
		 * @defualt ""
		 */
		this.group = "";
// private properties:
		this._object = new jees.UI.TextBox();
	};
// public static properties:
	var p = createjs.extend( CheckBox, jees.UI.Button );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		this._init_background();
		this._init_text();
		
		var _this = this;
		if( this.types.indexOf( "push") != -1 ){
			jees.E.bind( this, "mousedown", function( e ){ _this._handle_mousedown( e, _this ); });
        	jees.E.bind( this, "pressup", function( e ){ _this._handle_pressup( e, _this ); });
		}
		
        if( this.types.indexOf( "highlight") != -1 ){
        	jees.E.bind( this, "mouseover", function( e ){ _this._handle_mouseover( e, _this ); });
        	jees.E.bind( this, "mouseout", function( e ){ _this._handle_mouseout( e, _this ); });
        }
        
        jees.E.bind( this, "click", function( e ){ _this._handle_click( e, _this ); });
        
		this._reset_disable();
	    this._reset_position();
	}
	/**
	 * 设置状态
	 * @public
	 * @method setChecked
	 * @param {Boolean} _e
	 */
	p.setChecked = function( _e ){
		this.checked = _e;
	}
	/**
	 * 是否禁用
	 * @public
	 * @method isChecked
	 * @return {Boolean}
	 */
	p.isChecked = function(){
		return this.checked;
	}
// private method: ============================================================
	p._init_skin = function(){
		var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		
		this._data.images.push( this._skin.getCacheDataURL("rect") );
		this._data.images.push( this._skin.getCacheDataURL("highlight") );
		this._data.images.push( this._skin.getCacheDataURL("push") );
		this._data.images.push( this._skin.getCacheDataURL("disable") );
		this._data.images.push( this._skin.getCacheDataURL("checked") );
		this._data.images.push( this._skin.getCacheDataURL("checkedHighlight") );
		this._data.images.push( this._skin.getCacheDataURL("checkedPush") );
		this._data.images.push( this._skin.getCacheDataURL("checkedDisable") );
	
	}
	p._init_custom = function(){
		var bitmap = jees.CJS.newBitmap( jees.Resource.get( this.property.resource ) );
		var b = bitmap.getBounds();
		var c = this.types.split(",").length;
		var size = this.getSize();
		var w = this.spriteX == 0 ? size.w : this.spriteX;
		var h = this.spriteY == 0 ? size.h : this.spriteY;
		var rw = this.spriteX == 0 ? b.width : this.spriteX;
		var rh = this.spriteY == 0 ? b.height : this.spriteY;
		
		var rg = null;
		if( this.region != "" ){
			var rs = this.region.split(",");
			rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, w, h );
		}
		
		for( var i = 0; i < c; i ++ ){
			var bg = bitmap.clone();
			var x = this.spriteX * i;
			var y = this.spriteY * i;
			bg.sourceRect = jees.CJS.newRect( x, y, w, h );
			bg.cache( 0, 0, w, h );
			
			if( this.region != "" ){
				var tc = jees.CJS.newContainer();
				rg.forEach( function( _r ){
					var o = bg.clone();
					o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
					o.x = _r.dx;
					o.y = _r.dy;
					o.scaleX = _r.sw;
					o.scaleY = _r.sh;
					
					o.cache( 0, 0, w, h );
					tc.addChild( o );
				} );
				tc.cache( 0, 0, w, h );
				this._data.images.push( tc.bitmapCache.getCacheDataURL() );
			}else{
				this._data.images.push( bg.bitmapCache.getCacheDataURL() );
			}
		}
	}
	p._init_background = function(){
		this.state = true;
		var size = this.getSize();
		
		this._data = {
			images: [],
			frames: {width: size.w, height: size.h, count: 8 },
	        animations: {
	        	normal: [0, 0, "normal"],
	        	highlight: [1, 1, "highlight"],
	        	push: [2, 2, "push"],
	        	disable: [3, 3, "disable"],
	        	checked: [4, 4, "checked"],
	        	checkedHighlight: [5, 5, "checkedHighlight"],
	        	checkedPush: [6, 6, "checkedPush"],
	        	checkedDisable: [7, 7, "checkedDisable"],
	        }
	   	};
	   	
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
		
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
		this.gotoAndPlay( "normal" );
	}
	p._init_text = function(){
		this._object.setText( this.text );
		this._object.setFontSize( this.fontSize );
		this._object.setFontStyle( this.fontStyle );
		this._object.setColor( this.color );
		this._object.setItalic( this.italic );
		this._object.setBold( this.bold );
		this._object.setPosition( this.x + this.getSize().w + this._object.getFontSize(), 
			this.y + ( this.getSize().h / 2 - ( this._object.getSize().h / 2 ) ) );
		// 描述为几态按钮(1-正常 2-高亮 3-按下 4-禁用)
		this.parent.addChild( this._object );
	}
	p._reset_disable = function(){
		if( this.disable ){
			this.gotoAndPlay( this.checked ? "checkedDisable" : "disable" );
		}else{
			this.gotoAndPlay( this.checked ? "checked" : "normal" );
		}
	}
	 /**
	  * 当按钮按下时，文本控件做字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mousedown = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checkedPush":"push" );
	 }
	 /**
	  * 当按钮弹起时，文本控件恢复字体/10大小的偏移
	  * @private
	  * @method _handle_mousedown
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_pressup = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	/**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseover
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseover = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checkedHighlight" : "highlight" );
	 }
	 /**
	  * 当按钮移上按钮时
	  * @private
	  * @method _handle_mouseout
	  * @param {createjs.Event} _e
	  * @param {jees.Widget} _w
	  */
	 p._handle_mouseout = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	 p._handle_click = function( _e, _w ){
	 	if( _w.isDisabled() ) return;
	 	this.setChecked( !this.checked );
	 	this.gotoAndPlay( this.checked ? "checked" : "normal" );
	 }
	jees.UI.CheckBox = createjs.promote( CheckBox, "Button" );
})();;
///<jscompress sourcefile="InputBox.js" />
/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/ui/InputBox.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class InputBox
	 * @extends jees.UI.ImageBox
	 * @constructor
	 */
    function InputBox(){
    	this.ImageBox_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @override
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Panel"
    	 */
		this.property.skinResource = "InputBox";
		/**
		 * @public
		 * @property placeholder
		 * @type {String}
		 * @default "";
		 */
		this.placeholder = "";
		/**
		 * 拆分的字体样式-字体大小
		 * @public
		 * @property fontSize
		 * @type {Integer}
		 * @default 12
		 */
		this.fontSize = 12;
		/**
		 * @public
		 * @property color
		 * @type {String}
		 * @default "#FFFFFF"
		 */
		this.color = "#FFFFFF";
		/**
		 * 不为空时用字符替换输入内容
		 * @public
		 * @property password
		 * @type {Boolean}
		 * @default false
		 */
		this.password = false;
		/**
		 * 允许被遮罩
		 * @public
		 * @property enableMask
		 * @type {Boolean}
		 * @default false
		 */
		this.enableMask = false;
		/**
		 * @public
		 * @property region
		 * @type {String}
		 * @default null
		 */
		this.region = null;
// private properties:
		/**
		 * 皮肤对象
		 */
		this._skin = null;
		
    	var o = document.body;
    	var ipt = document.createElement("INPUT");
    	o.appendChild( ipt );
    	/**
    	 * 输入框对象
    	 */
    	this._object = new createjs.DOMElement( ipt );
    	/**
    	 * 输入框的HTML元素
    	 */
    	this._input = this._object.htmlElement;
    	/**
    	 * 遮罩对象
    	 */
  		this._mask = null;
    };
  	var p = createjs.extend( InputBox, jees.UI.ImageBox );
// public methods: ============================================================
    p.initialize = function(){
    	if( this.state ) return;
    	this._init_background();
		
		// 遮罩调整
    	if( this.enableMask ){
    		this._mask = new jees.UI.TextBox();
    		this._init_text();
    	}
		
		this._reset_size();
	    this._reset_position();
		this._reset_input();
		
	    var _this = this;
	    
    	
    	if( this.enableMask ){
    		this._input.hidden = true;
    		jees.E.bind( this, "click", function( _e ){
    			_this._input.hidden = false;
	    		_this._input.focus();
	    	});
    		
    		this._input.style.setProperty( "hidden", "true" );
    		
      		this._input.onfocus = function( _e ){
	    		_this._input.hidden = false;
    			_this._mask.setVisible( false );
	    	}
	    	this._input.onblur = function( _e ){
	    		_this._input.hidden = true;
	    		_this._mask.setVisible( true );
	    		_this._reset_text();
	    	}
	    	this._input.onchange = function( _e ){
	    		_this._input.hidden = true;
	    	}
    	}
};
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size();
	};
	/**
	 * 设置控件坐标 如果align不为0，则设置无效
	 * @public
	 * @method setPosition
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	}
// private method: ============================================================
	p._init_skin = function(){
		var size = this.getSize();
		if( !this._skin ){
			this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
			this.property.resource = this._skin.getCacheDataURL("rect");
			
			this.image.src = this.property.resource;
			this.state = true;
		}
	}
	p._init_custom_grid = function(){
		var size = this.getSize();
		var img = jees.Resource.get( this.property.resource );
		var rw = img.width;
		var rh = img.height;
		var rs = this.region.split(",");
		var rg = jees.UT.Grid( {l: rs[0], r: rs[1], t: rs[2], b: rs[3]}, rw, rh, size.w, size.h );
		
		var tc = jees.CJS.newContainer();
		var bg = jees.CJS.newBitmap( img );
		rg.forEach( function( _r ){
			var o = bg.clone();
			o.sourceRect = jees.CJS.newRect( _r.x, _r.y, _r.w, _r.h );
			o.x = _r.dx;
			o.y = _r.dy;
			o.scaleX = _r.sw;
			o.scaleY = _r.sh;
			
			o.cache( 0, 0, size.w, size.h );
			tc.addChild( o );
		} );
		tc.cache( 0, 0, size.w, size.h );
		this.image.src = tc.bitmapCache.getCacheDataURL();
	}
	p._init_custom = function(){
		//
		if( this.region != "" ){
			this._init_custom_grid();
		}else{
			this.image.src = jees.Resource.get( this.property.resource );
		}
	}
	p._init_background = function(){
		this.state = true;
		this.image = document.createElement("img");
		if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
		}else{
			this._init_skin();
		}
	}
	p._init_text = function(){
		this.parent.addChildAt( this._mask, this.parent.getChildIndex( this ) + 1 );
		this._mask.setFontSize( this.fontSize );
//		this._mask.setFontStyle( this.fontStyle );
		this._mask.setColor( this.color );
//		this._mask.setItalic( this.italic );
//		this._mask.setBold( this.bold );
	}
	p._reset_position = function(){
		var abs_pos = this.getAbsPosition();
		var pos = this.getPosition();
		var style = this._input.style;
		var fix_x = abs_pos.x + ( this.fontSize / 2 );
		style.setProperty( "left", fix_x + "px");
		style.setProperty( "top", abs_pos.y + "px");
		
		if( this._mask ){
			this._mask.setPosition( pos.x + ( this.fontSize / 2 ), pos.y + this._mask.fontSize );
		}
	}
	p._reset_size = function(){
		var size = this.getSize();
		var style = this._input.style;
		// 保证内部背景元素与容器一致
		style.setProperty( "height", size.h + "px" );
		style.setProperty( "width", ( size.w - this.fontSize )  + "px" );
	}
	p._reset_input = function(){
		var style = this._input.style;
		
		this._input.type = this.password ? "password" : "text";
		this._input.placeholder = this.placeholder;
		style.setProperty( "color", this.color );
		
		this._reset_text();
	}
	p._reset_text = function(){
		if( this._mask ){
			this._mask.setText( this._input.value != "" ? this._input.value : this.placeholder );
		}
	}
	jees.UI.InputBox = createjs.promote( InputBox, "ImageBox" );
})();;
