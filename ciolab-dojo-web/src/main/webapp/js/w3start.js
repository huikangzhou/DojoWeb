if(!dojo._hasResource["ibmweb.overlay"]){
	dojo._hasResource["ibmweb.overlay"]=true;
	dojo.provide("ibmweb.overlay");
	ibmweb.overlay.show=function(_1,_2,_3){
		dojo["require"]("dijit.Dialog");
		dojo.addOnLoad(function(){
			var _4=dijit.byId("dialog_"+_1);
			if(_4==null){
				var _5=dojo.byId(_1);
				dojo.query(".ibm-common-overlay-close",_5).onclick(function(_6){
					ibmweb.overlay.hide(_1);
					dojo.stopEvent(_6);
				});
				_5.style.display="block";
				var _4=new dijit.Dialog(dojo.mixin({
					"content":_5,
					"id":"dialog_"+_1
					},_3));
			}
			_4.show();
			ibmweb.util.statsHelper({
				"ibmEV":"overlay",
				"ibmEvAction":"show",
				"ibmEvGroup":"Opening overlay",
				"ibmEvModule":_1
			});
		});
	};
	
	ibmweb.overlay.hide=function(_7){
		var _8=dijit.byId("dialog_"+_7);
		ibmweb.util.statsHelper({
			"ibmEV":"overlay",
			"ibmEvAction":"close",
			"ibmEvGroup":"Closing overlay",
			"ibmEvModule":_7
		});
		_8.hide();
	};
	
	ibmweb.overlay.init=function(){};
	
}