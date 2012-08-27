define({
	//default settings
	loginSettings: (function(){
		var useHttps = false, httpsPort = 443;  //https settings
		var l = window.location, ptc = l.protocol, h = l.host, c = l.pathname.split("/")[1], hn = l.hostname, pt = l.port, 
		home = [ptc+'/', h, c].join('/'), login=home+"/j_spring_security_check",logout=home+"/j_spring_security_logout";
		useHttps && (login = ['https:/', (httpsPort?hn+':'+httpsPort:h), c, 'j_spring_security_check'].join('/'));
		var certificateTest = login.replace("j_acegi_check", "certificateTest.html"), sslHome=login.replace("j_spring_security_check", "");
		return {
			"useHttps":useHttps,
			"protocol": ptc, 
			"host": h, 
			"context": c, 
			"hostname": hn, 
			"port": pt, 
			"home": home, 
			"login": login,
			"logout":logout, 
			"certificateTest": certificateTest, 
			"sslHome":sslHome
		};
	})(),
	BLUEPAGES_IMAGE_API_URL : "http://w3.ibm.com/bluepages/api/BluePagesPhoto.jsp?EMAIL=",
	
	// project settings start
	homePage: "AAA",
	// add project service url in this object
	serviceURL: {
		USER: "UserComponent/IUserService/secured/user?smd"
	}
});

