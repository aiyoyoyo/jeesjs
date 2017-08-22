function ModuleTest() {
	var Mod_TestA = new jeesjs.Module();
	Mod_TestA.enter = function() {
		console.log( "--Mod_Test A enter" );
		jeesjs.MM.enter( Mod_TestB, 1 );
	};
	Mod_TestA.leave = function(){ console.log("--Mod_Test A leave"); };
	Mod_TestA.update = function(){ console.log("--Mod_Test A update"); };
	Mod_TestA.interrupt = function(){ console.log("--Mod_Test A interrupt"); };
	Mod_TestA.recovery = function(){ console.log("--Mod_Test A recovery"); };
	
	var Mod_TestB = new jeesjs.Module();
	Mod_TestB.enter = function(){
		console.log("--Mod_Test B enter")
		jeesjs.MM.enter( Mod_TestC, 0 );
	};
	Mod_TestB.leave = function(){
		console.log("--Mod_Test B leave"); 
		jeesjs.MM.leave();
	};
	Mod_TestB.update = function() {
		console.log("--Mod_Test B update")
		jeesjs.MM.leave();
	}
	Mod_TestB.interrupt = function(){ console.log("--Mod_Test B interrupt"); };
	Mod_TestB.recovery = function(){ console.log("--Mod_Test B recovery"); };
	
	var Mod_TestC = new jeesjs.Module();
	Mod_TestC.enter = function(){ console.log("--Mod_Test C enter"); };
	Mod_TestC.leave = function(){ console.log("--Mod_Test C leave"); };
	Mod_TestC.update = function(){ console.log("--Mod_Test C update"); };
	Mod_TestC.interrupt = function(){ console.log("--Mod_Test C interrupt"); };
	Mod_TestC.recovery = function(){ console.log("--Mod_Test C recovery"); };
	
	jeesjs.APP.init(Mod_TestA);
}