
var ProfileView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		self.render();
		return self;
	},

	template: _.template( $('#profile-template').html()),
	
	render: function(){
		var self=this;
		var output = self.template({'profile_model': self.model.toJSON()});
		self.$el.html(output);
		return self;
	}

});
