
var ContentCreationView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content creation view");
		self.render();
		return self;
	},

	template: _.template( $('#content-creation-template').html()),
	
	render: function(){
		var self=this;
		var output = self.template({'contentmodel': self.model.toJSON()});
		self.$el.html(output);
		router.navigate("CreateContext", {trigger:false});
		return self;
	},

	events: {
	   'submit form': 'onSubmit'
	},

	onSubmit: function(e) {
    	e.preventDefault();

    	var user_query = new Parse.Query(MixidiaUser);
    	var user_id = Parse.User.current().id;
    	user_query.equalTo("objectId", user_id);
    	user_query.find().then(function(user_obj){
			self.model.set( "title", self.$('#speechTitle').val());
        	self.model.set( "description", self.$('#speechDescription').val());
        	self.model.set("writer", user_obj[0]);
        	return self.model.save();
    	}).then(function(){
    		console.log("success to save");
    	});

  	}

});
