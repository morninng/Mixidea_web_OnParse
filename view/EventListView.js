
var EventListView = Backbone.View.extend({

	template: _.template( $('#tab-event-template').html()),

	initialize:  function(options){
		self=this;
		console.log("content list view");
		//self.render();
		self.showEventList();
		return self;
	},

	events: {
		'click #create_event': 'Create_event_view',
	},
	showEventList: function(){
		var self=this;
		var EventCollection = Parse.Collection.extend({
			model: MixideaEvent,
		//	query: (new Parse.Query(MixideaEvent)).exists("hangout_url")
		});
		var event_collection = new EventCollection();
		event_collection.fetch({
			success: function(collection){
				collection.each(function(object){
					console.log(object);
				});
				console.log(collection.toJSON());
				var output = self.template({'event_collection':collection.toJSON()});
				self.$el.html(output);
			},
			error: function(collection, error){
				console.log("error");
			}
		});
		return self;
	},

	Create_event_view: function(){
		 var currentUser = Parse.User.current();
	     if (!currentUser) {
	     	alert("you need to login before creating context");
			window.location.href = "./login.html";
	     }
	     var create_event_view = new CreateEventView({
	        model: new MixideaEvent(),
	        el: '#main-context'
	      });
	},

	render: function(){
		var self=this;
		var output = self.template();
		self.$el.html(output);
		return self;
	}
});