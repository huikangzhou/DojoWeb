define(["dojo/_base/declare", "com/ibm/ciolab/core/_Widget", "dojo/topic", "dojo/dom-style",
	"dojo/text!./templates/Login.html", "dojo/i18n!./nls/Login", "dojo/on", "dojo/_base/json", "com/ibm/ciolab/Constants",
	"dojox/io/windowName", "dojox/io/xhrWindowNamePlugin", "dijit/form/ValidationTextBox", "com/ibm/ciolab/core/Button"], 
	function(declare, _Widget, topic, domStyle, template, i18n, on, dojo, Constants, ioWindowName){
		return declare("com.ibm.ciolab.core.Login", [_Widget], {
			templateString: template,
			i18n: i18n,
			
			postCreate: function(){
				var that = this;
				this.inherited(arguments);
				on(this,"keyPress", function(evt) {
					var key = evt.keyCode;
					if(key == dojo.keys.ENTER) {
						that.login();
					}
					evt.stopPropagation();
				});
			},
			login: function(){
				var that = this;
				this.loginButton.showLoading();
				var xhrArgs = {
					url : Constants.loginSettings.login,
					content : {
						j_username:that.userNameInput.get("value"),
						j_password:that.userPassword.get("value")
					},
					load: function(data) {
						data = dojo.fromJson(data);
						if(data.message == "loginsuccess"){
							that.loginSuccess();
						}
						if(data.error){
							that.loginFailed();
						}
					}
				}
				ioWindowName.send("POST", xhrArgs);
			},
			loginSuccess: function(){
				var that = this;
				this.getService(Constants.serviceURL.USER, "getCurrentUser")().then(function(result){
					topic.publish("user/login/success", result);
					that.loginButton.hideLoading();
				});
			},
			loginFailed: function(){
				domStyle.set(this.loginFailedText,"display","block");
				this.userPassword.set("value", "");
				this.loginButton.hideLoading();
			}
		});
	});