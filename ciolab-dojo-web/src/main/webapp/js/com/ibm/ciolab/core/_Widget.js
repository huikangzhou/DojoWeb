define(["dojo/_base/declare", "dojo/dom-attr", "dojo/_base/array", "dojo/_base/Deferred", "dojo/dom-style", "dojo/dom-construct",
	"dijit/_WidgetBase", "dijit/_WidgetsInTemplateMixin", "dijit/_TemplatedMixin", "com/ibm/ciolab/core/_UtilMixin",
	"dojo/i18n!./nls/_Widget", "dojo/_base/lang"], 
	function(declare, domAttr, array, Deferred, domStyle, domConstruct, 
		_WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin, _UtilMixin,  i18n){
		return declare("com.ibm.ciolab.core._Widget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilMixin], {
			i18n: {},
			
			postCreate: function(){
				for(var i=0; i<this._attachPoints.length; i++){
					var element = this._attachPoints[i];
					if(domAttr.get(this[element],"data-dojo-i18n") || this[element]["data-dojo-i18n"]){
						if(this[element].containerNode){
							this[element].containerNode.innerHTML = this.i18n[element];
						}else{
							this[element].innerHTML = this.i18n[element];
						}
					}
				}
			},
			initialize: function(){},
			showChild: function(widget){
				var that = this;
				array.forEach(this.childrenContainer.getChildren(),function(childWidget){
					that.childrenContainer.removeChild(childWidget);
				});
				this.childrenContainer.addChild(widget);
				widget.showLoading();
				Deferred.when(widget.initialize(), function(){
					widget.hideLoading();
				});
			},
			showLoading: function(loadingMessage){
				domStyle.set(this.domNode, "display", "none");
				this.loadingDiv = domConstruct.create("div",{
					style:{
						textAlign: "center",
						verticalAlign: "middle",
						lineHeight: "250px",
						fontSize: "1.1em"
					}
				}, this.domNode, "after");
				domConstruct.create("span", {
					"class": "loadingIcon"
				}, this.loadingDiv);
				this.loadingMessageDiv = domConstruct.create("span", {
					innerHTML: loadingMessage || i18n.widgetLoadingMessage,
					style: {
						paddingLeft: "5px"
					}
				}, this.loadingDiv);
			},
			hideLoading: function(){
				domStyle.set(this.domNode, "display", "block");
				domConstruct.destroy(this.loadingDiv);
			},
			changeLoadingMessage: function(message){
				this.loadingMessageDiv.innerHTML = message;
			}
		});
	});