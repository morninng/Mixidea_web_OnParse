
function ParseLoginUser(){

Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");

  var user_name = document.forms.mixidea_user_login_form.user.value;
   console.log("user name = " + user_name); 
  var password = document.forms.mixidea_user_login_form.password.value;
   console.log(password);


 Parse.User.logIn(user_name, password, {
   success: function(user) {
     console.log("login success");
     var header_view = new HeaderView_LogedUser({model: user, el: '#HeaderView'});
     header_view.render();
   },
   error: function(user, error) {
     console.log("login fail");
   }
 });


}
