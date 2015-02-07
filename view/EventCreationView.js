
var CreateEventView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("event creation view");
		self.render();
		return self;
	},

	template: _.template( $('#event-creation-template').html()),
	
	render: function(){
		var self=this;
		var output = self.template({'eventmodel': self.model.toJSON()});
		self.$el.html(output);
		router.navigate("EventContext", {trigger:false});
		return self;
	},

	events: {
	   'submit form': 'onSubmit',
		'click #event_hangout_button': 'EventHangoutClick'
	},

	onSubmit: function(e) {
    	e.preventDefault();
    	var user_query = new Parse.Query(MixidiaUser);
    	var user_id = Parse.User.current().id;
    	user_query.equalTo("objectId", user_id);
    	user_query.find().then(function(user_obj){
			self.model.set( "title", self.$('#eventTitle').val());
        	self.model.set( "description", self.$('#eventDescription').val());
        	self.model.set("EventOwner", user_obj[0].id);
        	self.model.set("date", self.$('#event_date').val());
        	self.model.set("StartTime", self.$('#event_start_time').val());
        	self.model.set("duration", self.$('#event_duration').val());
        	return self.model.save();
    	}).then(function(){
    		console.log("success to save" + self.model.id);
    		var hangout_element = $("#hangout_btn_event_create");
    		showHangoutButton( hangout_element,self.model)

    	});
  	},
  	EventHangoutClick: function(){
		Util_EventHangoutClick(self.model);
  	}

});
