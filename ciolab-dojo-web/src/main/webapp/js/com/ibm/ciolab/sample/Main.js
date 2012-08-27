define(["dojo/_base/declare", "dojo/_base/lang", "com/ibm/ciolab/core/Main", "dojo/i18n!./nls/Main"], 
	function(declare, lang, Main, i18n){
		return declare("com.ibm.ciolab.sample.Main", [Main], {
			unsecuredPages: [],
			postMixInProperties: function(){
				this.inherited(arguments);
				lang.mixin(this.i18n, i18n);
			},
			getMenuItems: function(){
				var menuItems = [];
				if(this.currentUser || this.currentPage != "Login"){
					menuItems =[{
						id: "sample-tab-aaa",
						text: this.i18n.aaaTab,
						hash: "AAA"
					},{
						id: "sample-tab-bbb",
						text: this.i18n.bbbTab,
						hash: "BBB"
					}];
				}else{
					menuItems =[{
						id: "sample-tab-login",
						text: this.i18n.loginTab
					}];
				}
				return menuItems;
			},
			displayLogin: function(){
				this.setMenuItemSelected("sample-tab-login");
				this.inherited(arguments);
			},
			displayAAA: function(){
				this.setMenuItemSelected("sample-tab-aaa");
				console.log(1);
			},
			displayBBB: function(){
				this.setMenuItemSelected("sample-tab-bbb");
				console.log(2);
			}
		});
	});

