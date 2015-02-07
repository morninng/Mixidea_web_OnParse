
var HeaderView_LogedUser = Backbone.View.extend({


	initialize:  function(options){
		self=this;
		console.log("logeduser");
		return self;
	},

	template: _.template( $('#header_logeduser-template').html()),

	events: {
		'click #Logout': 'Parse_Logout',
		'click #loged_user_name': 'Go_To_Profile'
	},
	Parse_Logout: function(){
		Parse.User.logOut();
		router.RenderHeader();
	},
	Go_To_Profile: function(){
		var currentUser = Parse.User.current();
		window.location.href = "./profile.html#show_profile/" + currentUser.id;

	},
	render: function(){
		var self=this;
		console.log(self.model.toJSON());
		console.log(JSON.stringify(self.model));
		var output = self.template(self.model.toJSON());
		self.$el.html(output);
		return self;
	}


});