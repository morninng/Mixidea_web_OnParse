function showHangoutButton(hangout_element, event_object){

	var hangout_button_string = "<a id='event_hangout_button'  style='text-decoration:none;'><img src='https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-60x230-normal.png' alt='Start a Hangout' style='border:0;width:230px;height:60px;'/></a>";
	hangout_element.html(hangout_button_string);
	event_object.fetch({
		success: function(one_event_obj){
			if(!one_event_obj.get("hangout_url")){
				hangout_alert_string = "<p>you should<font color='green'> copy and paste</font> this E-mail address<br> for invitation:<font color='red'> mr_morninng@gmail.com</font> </p>";
				hangout_element.html(hangout_button_string + hangout_alert_string);
			}
		}
	});
	return;
}


function Util_EventHangoutClick(event_object){
	event_object.fetch({
		success: function(one_event_obj){
			var registered_hangout_url = one_event_obj.get("hangout_url");
			if(registered_hangout_url){
				var event_type = one_event_obj.get("event_type");
				if(event_type == "NA"){
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Debate_NA);
				}else if(event_type == "BP"){
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Debate_BP);
				}else if(event_type == "Asian"){
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Debate_Asian);
				}else if(event_type == "Austral"){
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Debate_Austral);
				}else if(event_type == "discussion"){
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Discussion);
				}else{
					GoToHangoutPage(registered_hangout_url, config_hangout_app_id_Debate_NA);	
				}
			}else{
				GoToHangoutPage(default_hangout_url, config_hangout_app_id_Registration);
			}
		}
	});
	return;
}


function GoToHangoutPage(hangout_domain , hangout_app_id){

	var currentUser = Parse.User.current();
	var hangout_gid = "?gid=";
	var event_id = self.model.id;
	var hangout_query_key = "&gd=";
	var hangout_query_value = currentUser.id;
	var hangout_query_split = "_";
	var hangout_second_query_value = event_id;
	var hangout_link= hangout_domain + hangout_gid + hangout_app_id + hangout_query_key
					 + hangout_query_value + hangout_query_split + hangout_second_query_value;
	console.log(hangout_link);
	location.href = hangout_link;
		
}


