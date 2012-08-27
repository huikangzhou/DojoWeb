define(["dojo/_base/declare", "dojo/_base/lang", "dojo/topic", "dojo/rpc/JsonService"], 
	function(declare, lang, topic, JsonService){
		return declare("com.ibm.ciolab.core._UtilMixin", null, {
			serviceCache: {},
			getService : function(serviceUrl, serviceName){
				if(serviceUrl && serviceName){
					var service = null;
					if(this.serviceCache[serviceUrl]){
						service = this.serviceCache[serviceUrl];
					}else{
						if(typeof(appURL)=='undefined'){
							appURL = "";
						}
						service = new JsonService(appURL+serviceUrl);
						service.resultCallback = function(/* dojo.Deferred */ deferredRequestHandler){
							var tf = lang.hitch(this,
								function(obj){
									if(obj.error!=null){
										deferredRequestHandler.errback(obj);
										if(typeof obj.error == 'object' && obj.error.code=="403"){
											topic.publish("need/login");
										}
									}else{
										deferredRequestHandler.callback(this.parseResults(obj));
									}
								});
							return tf;
						};
						this.serviceCache[serviceUrl] = service;
					}
					if(service[serviceName]){
						//provide an empty cancel callback to avoid error throwing
						service[serviceName].cancel = function(){};
						return service[serviceName];
					}else{
						this.serviceCache[serviceUrl] = null;
						topic.publish("need/login");
						return null;
					}
				}else{
					console.log("Parameter serviceUrl or serviceName is missing!");
					return null;
				}
			}
		});
	});