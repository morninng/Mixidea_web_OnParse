
var TabView = Backbone.View.extend({

	initialize:  function(options){
		self=this;
		console.log("content creation view");
		self.render();
		return self;
	},

	template: _.template( $('#tab-view-template').html()),
	
	events: {
		'click #content_list_tab': 'context_list_view',
		'click #event_list_tab': 'event_list_view'
	},

	context_list_view: function(){
		$("#second_tab").removeAttr("class");
		$("#first_tab").attr("class","active");
		router.showContextList();
	},

	event_list_view: function(){
		$("#first_tab").removeAttr("class");
		$("#second_tab").attr("class","active");
		router.showEventList();
	},

	render: function(){
		var self=this;
		var output = self.template();
		self.$el.html(output);
		return self;
	}

});
