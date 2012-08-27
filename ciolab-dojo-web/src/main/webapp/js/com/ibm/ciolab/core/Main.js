define(["dojo/_base/declare", "com/ibm/ciolab/core/_Widget", "dojo/on", "dojo/topic", "dojo/hash", "dojo/dom", 
	"dojo/dom-construct", "dojo/dom-class", "dojo/dom-attr", "dojo/query", "dojo/_base/lang", "dojo/_base/xhr",
	"dojo/_base/Deferred", "dojo/_base/array", "dojo/text!./templates/Main.html", "dojo/i18n!./nls/Main", 
	"com/ibm/ciolab/Constants", "com/ibm/ciolab/core/Login",
	"dijit/layout/BorderContainer"], 
	function(declare, _Widget, on, topic, hash, dom, domConstruct, domClass, domAttr, query, lang, xhr, 
		Deferred, array, template, i18n, Constants, Login){
		return declare("com.ibm.ciolab.core.Main", [_Widget], {
			templateString: template,
			i18n: i18n,
			
			currentPage: "",
			currentUser: null,
			lastHash: "",
			serviceCache: [],
			
			unsecuredPages: [], // need set in project Main widget
			
			loginPage: null,
			initialize: function(){
				var that = this;
				this.currentPage = hash();
				// set hash with "" and then set it back to current page hash 
				// will make sure fire the hashchange event when fresh the page
				hash("");
				topic.subscribe("/dojo/hashchange", lang.hitch(this, "handleHash"));				
				topic.subscribe("need/login", function(){
					hash("Login");
				});
				topic.subscribe("user/login/success", function(user){
					that.currentUser = user;
					that.showUserProfile(user);
					if(that.currentPage && that.currentPage!="Login"){
						hash(that.currentPage);
					}else{
						hash(Constants.homePage);
					}
					that._renderMenuItems();
				});
				if(this.currentPage!=""&&this.currentPage!="Login"){
					Deferred.when(this.getCurrentUser(), function(user){
						if(user){
							that.currentUser = user;
							that.showUserProfile(user);
							that._renderMenuItems();
						}
						hash(that.currentPage);
					});
				}else{
					this._renderMenuItems();
					if(this.currentPage == ""){
						hash(Constants.homePage);
					}else{
						hash(this.currentPage);
					}
				}
			},
			getCurrentUser: function(){
				return this.getService(Constants.serviceURL.USER, "getCurrentUser")().then(function(result){
					return result;
				});
			},
			showUserProfile: function(user){
				var ssoDiv = dom.byId("ibm-sso");
				var thumbnail = domConstruct.create("span",{
					"class":"ibm-thumbnail"
				},ssoDiv);
				domConstruct.create("img",{
					width:25,
					height:25,
					src:Constants.BLUEPAGES_IMAGE_API_URL+user.intranetId
				},thumbnail);

				var welcome = domConstruct.create("a",{
					"class":"ibm-user",
					innerHTML:i18n.welcomeBack
				},ssoDiv);
				domConstruct.create("span",{
					id:"ibm-user-name",
					style:{
						"paddingLeft":"5px"
					},
					innerHTML:user.name
				},welcome);
				var logout = domConstruct.create("a",{
					innerHTML:i18n.logout
				},ssoDiv);
				
				on(logout, "click", lang.hitch(this, "_logout"));
			},
			getMenuItems: function(){
				// description:
				//		get avaialiable menu items according with context(login status/user/user role/etc.)
				//		should be implements in project main widget to show the menu bar of project
			},
			_logout: function(){
				var that = this;
				xhr.get({
					url: Constants.loginSettings.logout,
					handleAs: "text",
					preventCache: true,
					handle: function(data, ioargs) {
						if (ioargs.xhr.status == 200) {
							that.logoutSuccess();
						} else {
							console.log("logout error");
						}
					}
				});
			},
			logoutSuccess: function(){
				this.currentUser = null;
				domConstruct.empty(dom.byId("ibm-sso"));
				this._renderMenuItems();
				hash(Constants.homePage);
			},
			handleHash: function(){
				var that = this;
				var widgetPath = that._getPathFromHash();
				this.currentPage = widgetPath;
				var param = that._getParamFromHash();
				var currentWidget = this;
				if(widgetPath){
					if(this.currentUser || widgetPath[0]=="Login" || array.indexOf(this.unsecuredPages,this.currentPage)>-1){
						for(var i = 0; i < widgetPath.length; i++){
							var functionName = "display"+widgetPath[i];
							if(!this.lastHash[i] || widgetPath[i] != this.lastHash[i]){
								if(lang.isFunction(currentWidget[functionName])){
									if(i == widgetPath.length - 1){
										if(param){
											currentWidget[functionName](param);
										}else{
											currentWidget[functionName]();
										}
									}else{
										currentWidget = currentWidget[functionName]();
									}
								}
							}
						}
					}else{
						hash("Login");
					}
					this.lastHash = widgetPath;
				}
			},
			_getPathFromHash: function(){
				return hash().split("?")[0] && hash().split("?")[0].split("/");
			},
			_getParamFromHash: function(){
				var param = {};
				if(hash().split("?")[1]){
					array.forEach(hash().split("?")[1].split("&"), function(item){
						var obj = item.split("=");
						param[obj[0]] = obj[1];
					});
					return param;
				}else{
					return false;
				}
			},
			_renderMenuItems: function(){
				var items = this.getMenuItems();
				domConstruct.empty(dom.byId("ibm-primary-tabs"));
				var ul = domConstruct.create("ul", {
					"class": "ibm-tabs"
				},dom.byId("ibm-primary-tabs"))
				for(var i=0;i<items.length;i++){
					var li = domConstruct.create("li",{
						id:items[i].id
					},ul);
					if(i==0){
						domClass.add(li, "ibm-active");
					}
					var li_a = domConstruct.create("a",{
						innerHTML:items[i].text
					},li);
					if(items[i].hash){
						domAttr.set(li_a, "href", "#"+items[i].hash);
					}
					if(items[i].clickEvent){
						on(li_a, "click", lang.hitch(this, items[i].clickEvent));
					}
				}
			},
			setMenuItemSelected: function(id){
				// summary:
				//		set one of menu item as selected
				// description:
				//		add ibm-active class in selected menu item and remove class of other items
				this._renderMenuItems();
				query("#ibm-primary-tabs > ul > li").forEach(function(node){
					domClass.remove(node);
				});
				if(dom.byId(id)){
					domClass.add(dom.byId(id), "ibm-active");
					domAttr.remove(dom.byId(id).children[0], "href");
				}
			},
			displayLogin: function(){
				this.currentUser = null;
				domConstruct.empty(dom.byId("ibm-sso"));
				this.setMenuItemSelected("sample-tab-login");
				if(this.loginPage==null){
					this.loginPage = new Login();
				}
				this.showChild(this.loginPage);
			}
		});
	});