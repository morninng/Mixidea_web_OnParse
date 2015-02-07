
function CreateSpeech(){

Parse.initialize("wxaNxdtmCOUJm8QHPYr8khYkFJiBTMvEnv1jCDZg", "OuSaCarL4ltnPsuwptJMBvoZ7v3071MCUE7Y5MfD");

  var speech_title = document.forms.create_speech.title.value;
  var speech_description = document.forms.create_speech.description.value;

  var speech_file = document.getElementById("SpeechFile").files[0];
  var speech_file_name = speech_file.name;
  var  SpeechFile = new Parse.File(speech_file_name, speech_file);

  var speech_picture = document.getElementById("SpeechPicture").files[0];
  var speech_picture_name = speech_picture.name;
  var SpeechPicture = new Parse.File(speech_picture_name, speech_picture);


    SpeechFile.save().then(function() {
        alert("speech file upload success");
        return SpeechPicture.save();
    }).then(function(){
        alert("all file upload has been succeeded");
        var speech_obj = new SpeechContext();
        speech_obj.set("title",speech_title);
        speech_obj.set("description",speech_description);
        speech_obj.set("SpeechFile",SpeechFile);
        speech_obj.set("SpeechPicture",SpeechPicture);
        return speech_obj.save();
    }).then(function(){
        alert("upload success");
    },function(error){
        alert("file upload failed");
    });

}

