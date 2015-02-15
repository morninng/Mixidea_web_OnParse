
var Parse_Role_Name = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply","Audience1","Audience2","Audience3","Audience4" ];
var event_span_name = ["#event_PM","#event_LO","#event_MG","#event_MO","#event_RPM","#event_LOR"];
var Debate_Role_name = [  "Prime Minister", "Leader Opposition", "Member Government", "Member Opposition", "eply Prime Minister", "Leader Opposition Reply","Audience","Audience","Audience","Audience"];
var Join_btn_id = ["join_PM","join_LO","join_MG","join_MO","join_RPM","join_LOR","join_Audience"];
var Cancel_btn_id = ["cancel_PM","cancel_LO","cancel_MG","cancel_MO","cancel_RPM","cancel_LOR","cancel_Audience"];
var Role_Container = ["#PM_container","#LO_container","#MG_container","#MO_container","#RPM_container","#LOR_container"];
var Participant_Group = ["Proposition", "Opposition", "Audience"];
var Participant_Role_Group = ["Proposition", "Opposition","Proposition", "Opposition","Proposition", "Opposition","Audience","Audience","Audience","Audience","Audience","Audience","Audience","Audience"];
var participant_role_key_for_view = ["PM_key","LO_key","MG_key","MO_key","RPM_key","LOR_key"];
var maximum_number_of_audience = 2;


function Put_CurrentUser_Profile(num_role){

	var currentUser = Parse.User.current();

	var profile_picture_link = currentUser.get("Profile_picture");
	var profile_first_name = currentUser.get("FirstName");
	var profile_last_name = currentUser.get("LastName");
	var profile_id = currentUser.id;

	var image_pre_str = "<div class = 'image_container' style='float:left; margin-left:5px;'><img src=";
	var image_post_str = "></div>";
	var profile_pre_str = "<div class='profile_container' style='float:left; margin-left:10px;' ><a href=./profijoinle.html#show_profile/";
	var profile_mid = ">";
	var profile_post = "</a></div>";

	$(Role_Container[num_role]).children(".participant").append(image_pre_str + profile_picture_link + image_post_str);
	$(Role_Container[num_role]).children(".participant").append(profile_pre_str + profile_id + profile_mid + profile_post);

}

function Remove_CurrentUser_Profile(num_role){
	$(Role_Container[num_role]).children(".participant").html("");
	
}
function Set_Join_Button(num_role){

	var button_pre = "<button id='";
	var button_post = "' class='btn btn-primary'><i class='glyphicon glyphicon-book'></i> Join</button>";
	var button_id = Join_btn_id[num_role];

	$(Role_Container[num_role]).children(".event_button").html(button_pre + button_id + button_post);
}
function Set_Cancel_Button(num_role){

	var button_pre = "<button id='";
	var button_post = "' class='btn btn-inverse'><i class='glyphicon glyphicon-book'></i> Cancel</button>";
	var button_id = Cancel_btn_id[num_role];

	$(Role_Container[num_role]).children(".event_button").html(button_pre + button_id + button_post);


}
function Cancel_Success_Message(num_role){
	$(event_span_name[num_role]).html("<p><font color='green'>Cancelation success</font><p>");
				
}
function Regist_Success_Message(num_role){
	$(event_span_name[num_role]).html("<p><font color='green'>Registration success</font>you have now joined this event as a" + Debate_Role_name[num_role] + "<p>");				
}
function Regist_Failure_Message(num_role){
	$(event_span_name[num_role]).html("<p><font color='red'>Registration failed</font>" * Debate_Role_name[num_role] * " was already assingned to others. please register other role.<p>" );			
}


function Click_Participate_button( event_object, num_role){
	console.log("participate as " + Debate_Role_name[num_role]);


	if(self.group && self.group !=  Participant_Role_Group[num_role]){
		alert("you can have multiple role only in your team");
		return;
	}

	var currentUser = Parse.User.current();
	event_object.fetch().then(function(event_obj){
		if(event_obj.get(Parse_Role_Name[num_role])){
			Regist_Failure_Message(num_role);
			return null;
		}else{
			self.model.set(Parse_Role_Name[num_role],currentUser);
			self.model.save(null,{
				success: function(){
					var hangout_element = $("#hangout_area");
					showHangoutButton(hangout_element, event_object);
					Regist_Success_Message(num_role);
					Set_Cancel_Button(num_role);
					Put_CurrentUser_Profile(num_role);
					self.group =  Participant_Role_Group[num_role];
					self.number_of_your_role++;
				},
				error: function(){
					alert("registration has been failed due to the network problem");
				}
			});
		}
	});
}

function Click_Cancel_button( event_object, num_role){
		console.log("cancel" + Debate_Role_name[num_role] );
		var currentUser = Parse.User.current();

		if(currentUser.id != event_object.get(Parse_Role_Name[num_role]).id){
			alert("you cannot change the status");
		}else{
			event_object.fetch().then(function(event_obj){
				event_obj.unset(Parse_Role_Name[num_role]);
				return event_obj.save();
			}).then(function(){
				Cancel_Success_Message(num_role);
				Set_Join_Button(num_role);
				Remove_CurrentUser_Profile(num_role);

				self.number_of_your_role--;
				if(self.number_of_your_role < 1){
					self.group = null;
				}

			});
		}
}

var EventContext_DebeteNA = Backbone.View.extend({

	template: _.template( $('#one-event-context-template_NA').html()),

	initialize:  function(options){
		self=this;

		var hangout_url = self.model.get("hangout_url");
		self.group = null;
		self.number_of_your_role = 0;
		self.number_of_audience =0;

		console.log(hangout_url);
		self.isHangoutButton = false;

		self.RetrieveParticipants().then(function(){
			return self.RetrieveAudiences();
		}).then(function(){
			self.showDataOnView();
			self.showDefaultHangoutButton();
		});
		

		return self;
	},
	events: {
		'click #join_PM': 'Participate_PM',
		'click #join_LO': 'Participate_LO',
		'click #join_MG': 'Participate_MG',
		'click #join_MO': 'Participate_MO',
		'click #join_RPM': 'Participate_RPM',
		'click #join_LOR': 'Participate_LOR',
		'click #cancel_PM': 'cancel_PM_participate',
		'click #cancel_LO': 'cancel_LO_participate',
		'click #cancel_MG': 'cancel_MG_participate',
		'click #cancel_MO': 'cancel_MO_participate',
		'click #cancel_RPM': 'cancel_RPM_participate',
		'click #cancel_LOR': 'cancel_LOR_participate',
		'click #event_hangout_button': 'EventHangoutClick',
		'click #join_Audience': 'Participate_Audience',
		'click #cancel_Audience': 'cancel_Audience_participate'
	},
	Participate_Audience: function(){

	if(self.group =="Proposition" || self.group =="Opposition" ){
		alert("you can not join as a Audience if you already join as a debater");
		return;
	}

		var event_id = self.model.id;
		var currentUser = Parse.User.current();

		var user_audience_query = new Parse.Query(MixidiaUser);
		user_audience_query.equalTo("Event_Audience", event_id);
		user_audience_query.find().then(function(audience_list){
		  	if(audience_list.length < maximum_number_of_audience){
				var relation = currentUser.relation("Event_Audience");
				relation.add(self.model);
				currentUser.save(null, {
				  success: function(obj) {
				    console.log("user info updated : " + obj);
				    $("#audiencd_button_container").html("<button id='cancel_Audience' class='btn btn-inverse'><i class='glyphicon glyphicon-book'></i> Cancel</button>");
				  	self.RetrieveAudiences().then(function(){
						self.showDataOnView();
						var hangout_element = $("#hangout_area");
						var event_object = self.model;
						showHangoutButton(hangout_element, event_object);
					});
				  },
				  error: function(obj, error) {
				  	console.log("error");
				  }
				});
		  	}else{
				alert("other person has already registered as a audience");
				self.RetrieveAudiences().then(function(){
					self.showDataOnView();
				});
		  	}
		});
	},
	cancel_Audience_participate: function(){

		var currentUser = Parse.User.current();
		var relation = currentUser.relation("Event_Audience");
		relation.remove(self.model);
		currentUser.save(null, {
		  success: function(obj) {
			$("#audiencd_button_container").html("<button id='join_Audience' class='btn btn-primary'><i class='glyphicon glyphicon-book'></i> Join</button>");
		   // refresh_audience_field();
		    self.group =null;
		  	self.RetrieveAudiences().then(function(){
				self.showDataOnView();
			});

		  },
		  error: function(obj, error) {
		  	alert("failure");
		  }
		});
	},
	cancel_PM_participate: function(){
		Click_Cancel_button(  self.model, 0);
	},
	Participate_PM: function(){
		Click_Participate_button( self.model, 0);
	},
	cancel_LO_participate: function(){
		Click_Cancel_button(  self.model, 1);
	},
	Participate_LO: function(){
		Click_Participate_button( self.model, 1);
	},
	cancel_MG_participate: function(){
		Click_Cancel_button(  self.model, 2);
	},	
	Participate_MG: function(){
		Click_Participate_button( self.model, 2);
	},
	cancel_MO_participate: function(){
		Click_Cancel_button(  self.model, 3);
	},	
	Participate_MO: function(){
		Click_Participate_button( self.model, 3);
	},
	cancel_RPM_participate: function(){
		Click_Cancel_button(  self.model, 4);
	},	
	Participate_RPM: function(){
		Click_Participate_button( self.model, 4);
	},
	cancel_LOR_participate: function(){
		Click_Cancel_button(  self.model, 5);
	},	
	Participate_LOR: function(){
		Click_Participate_button( self.model, 5);
	},
	AddHangoutButton: function(){
		console.log("add hangout button")
	},
	Go_To_Profile: function(user_id){
		var currentUser = Parse.User.current();
		window.location.href = "./profile.html#show_profile/" + user_id;
	},
	RetrieveParticipants: function(){


		var d = new $.Deferred;

		self=this;
		var currentUser = Parse.User.current();
		var event_id = self.model.id;

		var participants = [];
		var participants_role = [];
		var participant_group = [];

///(1)check which role have participant on parse

		for(i=0;i<Parse_Role_Name.length;i++){
			var tmp_participant_object = self.model.get(Parse_Role_Name[i]);
			if(tmp_participant_object){
				participants.push(tmp_participant_object);
				participants_role.push(participant_role_key_for_view[i]);
				participant_group.push(Participant_Role_Group[i]);
			}
		}

//(2) create object to pass data to view
		self.participant_obj = {};


//(3) retrieve participants data from server, which is found on step (1)
		var audience_number = 0;

		var f1 = function(){
			if(participants.length>0 && i<participants.length){

				var user_query = new Parse.Query(MixidiaUser);
				user_query.equalTo("objectId", participants[i].id);
				var query_promise = user_query.find({
					success: function(participant_o){

						//(4) check wheether this participant is local particiant or not
						var yourself;
						if (currentUser.id == participant_o[0].id){
							yourself = true;
							self.my_participation = true;
							self.group = participant_group[i];
							self.number_of_your_role++;
						}else{
							yourself = false;
						}

						//(5) get participant registered information to the participant object
						var participant = {"FirstName":participant_o[0].get("FirstName"),
										   "LastName":participant_o[0].get("LastName"),
										   "Profile_picture":participant_o[0].get("Profile_picture"),
										   "idid":participant_o[0].id,
										   "yourself":yourself};
						self.participant_obj[participants_role[i]] =participant;
						i++;
					}
				})
				query_promise.done(f1);
			}else if(i == participants.length || participants.length==0){
				console.log("retrieving participant object finish");
				console.log("participant_obj = " + JSON.stringify(self.participant_obj));

				d.resolve();
			}
		}
		var i=0;
		f1();
		return d.promise();

	},
	RetrieveAudiences: function(){


		var d = new $.Deferred;

		var self = this;
		var currentUser = Parse.User.current();
		var event_id = self.model.id;
		self.audience_obj = {};
		self.audience_obj.audience = [];
		self.audience_obj.audience_property = [];
		self.audience_obj.waiting_audience = [];

// default number of audience who can join
		self.audience_obj.remained_sheet = maximum_number_of_audience;
		self.audience_obj.yourself = false;


		var user_audience_query = new Parse.Query(MixidiaUser);
		user_audience_query.equalTo("Event_Audience", event_id);
		user_audience_query.find().then(function(audience_list){
		  	console.log("number of audience is " + audience_list.length);
			for (var i = 0; i < audience_list.length; i++) { 
				self.audience_obj.audience.push(audience_list[i]);
			}
			var user_waiting_query = new Parse.Query(MixidiaUser);
			user_waiting_query.equalTo("Event_Audience_waiting", event_id);
			return user_waiting_query.find();

		}).then(function(waiting_audience_list){
		  	console.log("number of audience is " + waiting_audience_list.length);
			for (var j = 0; j < waiting_audience_list.length; j++) { 
				console.log(waiting_audience_list[j]);
			}
			Retrieve_AudienceInfo();
		})


		var k=0;
		var Retrieve_AudienceInfo = function(){
			if(self.audience_obj.audience.length>0 && k<self.audience_obj.audience.length){

				var user_query = new Parse.Query(MixidiaUser);
				user_query.equalTo("objectId", self.audience_obj.audience[k].id);
				var query_promise_audience = user_query.find({
					success: function(audience_o){

						var yourself;
						if (currentUser.id == audience_o[0].id){
							self.my_participation = true;
							self.group = "Audience";
							self.audience_obj.yourself = true
						}
						var audience = {"FirstName":audience_o[0].get("FirstName"),
										   "LastName":audience_o[0].get("LastName"),
										   "Profile_picture":audience_o[0].get("Profile_picture"),
										   "idid":audience_o[0].id,
										   };
						self.audience_obj.audience_property.push(audience);
						k++;
						//number of remained sheet decrease 
						self.audience_obj.remained_sheet--;
					}
				})
				query_promise_audience.done(Retrieve_AudienceInfo);
			}else if(k == self.audience_obj.audience.length || self.audience_obj.audience.length==0){
				console.log("retrieving audience info finish");
				console.log("audience_obj = " + JSON.stringify(self.audience_obj.audience_property));

				d.resolve();
			}
		}
		return d.promise();

	},
	showDataOnView: function(){
		var output = self.template({'event_object':self.model.toJSON(), 
									'participant_obj': self.participant_obj , 
									'audience_obj_property':self.audience_obj.audience_property, 
									'audience_remained_sheet':self.audience_obj.remained_sheet,
									'audience_yourself':self.audience_obj.yourself
									});
		self.$el.html(output);
	},
	showDefaultHangoutButton: function(){
		var self = this;
		if(self.my_participation == true){
			var hangout_element = $("#hangout_area");
			showHangoutButton(hangout_element, self.model);
		}
		return self;
	},
	EventHangoutClick: function(){
		var self = this;
		Util_EventHangoutClick(self.model);

		return self;
	}, 
	render: function(){
		var self=this;
		return self;
	}
});
