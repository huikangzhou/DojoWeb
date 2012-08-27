define(["dojo/_base/declare", "dojo/_base/lang", "com/ibm/ciolab/core/Login", "dojo/i18n!./nls/Login"], 
	function(declare, lang, Login, i18n){
		return declare("com.ibm.ciolab.sample.Login", [Login], {
			postMixInProperties: function(){
				this.inherited(arguments);
				lang.mixin(this.i18n, i18n);
			}
		});
	});

