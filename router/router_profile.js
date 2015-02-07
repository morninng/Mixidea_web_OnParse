
  var Mixidea_Profile_Router = Backbone.Router.extend({
    routes: {
      'show_profile/:id': 'show_profile',
      'show_activity/:id': 'show_activity',
      'edit_profile/:id': 'edit_profile',
      '': 'defaultRoute'
    },
    defaultRoute: function() {
      this.RenderHeader();
      
    },
    RenderHeader: function(){
     var currentUser = Parse.User.current();
     if (currentUser) {
       var query = new Parse.Query(MixidiaUser);  
       query.get(currentUser.id, {
       success: function(mixidea_user) {
         var header_view = new HeaderView_LogedUser({model: mixidea_user, el: '#header-container'});
         header_view.render();
       },
       error: function(object, error) {
         var header_view = new HeaderView_Login({el: '#header-container'});
         header_view.render();
       }
      });
     } else {
       var header_view = new HeaderView_Login({el: '#header-container'});
         header_view.render();
     }
    },
    show_profile: function(id){
      this.RenderHeader();
      var profile_query = new Parse.Query(MixidiaUser);
      profile_query.get(id, {
        success: function(user_profile){
          var user_view = new ProfileView({
            model: user_profile,
            el: '#profile_main'
            });
        },
        error: function(){
          alert("user cannot be found");
        }
      });
    },
    show_activity: function(id){
    },
    edit_profile: function(id){

    }
  });



