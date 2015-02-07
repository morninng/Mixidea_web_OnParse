
var HeaderView_Login = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("login view");
		self.render();
		return self;
	},

	template: _.template( $('#header_login-template').html()),



	events: {
		'click #Login': 'Parse_Login'
	},
	Parse_Login: function(){
		window.location.href = "./login.html";
	},



	render: function(){
		var self=this;
		var output = self.template();
		self.$el.html(output);
		return self;
	}


});