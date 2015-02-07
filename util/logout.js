
function ParseLogout(){

Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");


     console.log("logout");
     Parse.User.logOut();
     
	 var header_view = new HeaderView_Login({el: '#HeaderView'});
}
