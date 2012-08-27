define(["dojo/_base/declare", "dijit/form/Button", "dojo/dom-style"], 
	function(declare, Button, domStyle){
		return declare("com.ibm.ciolab.core.Button", [Button], {
			showLoading: function(){
				domStyle.set(this.focusNode, {
					background: "url('image/ajax-loader-small.gif') no-repeat 0 1px"
				});
				this.set("disabled", true);
			},
			hideLoading: function(){
				domStyle.set(this.focusNode, {
					background: "none"
				});
				this.set("disabled", false);
			}
		});
	});

