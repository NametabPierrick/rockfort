var undoingText="";
var READING_WPM=200;
var more_stats_status=false;



function getwccInfo(withExtraStatistics){
  
  var text = $("#textbox").val();
  var English=$("#English").prop('checked');
  var wccInfo;


  var selected_text = "";
  var select_range=$("#textbox").textrange();
  selected_text=select_range.text;

  var wccInfo_selected;


  if(English){
    wccInfo = getwccInfoForNonEnglishText(text);
    wccInfo_selected=getwccInfoForNonEnglishText(selected_text);
  }
  else{
    wccInfo = $.wordCountTool.getwccInfo(text,withExtraStatistics);
    wccInfo_selected =$.wordCountTool.getwccInfo(selected_text,withExtraStatistics);
  }

  displaywccInfo(wccInfo,withExtraStatistics);
  displaywccInfoInTitle(wccInfo);  

  displaywccInfo_Selected(wccInfo_selected,withExtraStatistics);
  
}

function displaywccInfo(wccInfo,withExtraStatistics){
  var English=$("#English").prop('checked');
  if(!English){
	  $("#num_word").text(wccInfo['num_word']);  
	  $("#num_character").text(wccInfo['num_character']);
	  $("#num_character_wo_spaces").text(wccInfo['num_character_wo_spaces']);

    $("#num_syllable").text(wccInfo['num_syllable']);
    $("#num_mono_syllable").text(wccInfo['num_mono_syllable']);
    $("#num_poly_syllable").text(wccInfo['num_poly_syllable']);

	  $("#num_sentence").text(wccInfo['num_sentence']);
	  $("#num_paragraph").text(wccInfo['num_paragraph']);
	  $("#avg_sentence_length").text(wccInfo['avg_sentence_length']);
	  $("#avg_word_length").text(wccInfo['avg_word_length']);
	  $("#dale_chall_readability").text(wccInfo['dale_chall_index']);    

    if(wccInfo['num_character']>0)
	    $("#readability_level").text(getReadabilityLevel(wccInfo['dale_chall_index']));
    else
      $("#readability_level").text("N/A");
    $("#estimate_reading_time").text(Math.ceil(wccInfo['num_word']/READING_WPM) + ' min.');
	  
	  var MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN= 10000;
	  var numDifficultWords=wccInfo['num_difficult_words']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
	  ""+wccInfo['num_difficult_words']+" <span class='stat_percentage'>("+wccInfo['percentage_difficult_words']+"%)</span>":""+wccInfo['num_difficult_words'];
	  $("#num_difficult_word").html(numDifficultWords);	
	  
	  var numShortWords=wccInfo['num_short_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
	  ""+wccInfo['num_short_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_short_word']+"%)</span>":""+wccInfo['num_short_word'];	  
	  $("#num_short_word").html(numShortWords);


    var numLongWords=wccInfo['num_long_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
    ""+wccInfo['num_long_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_long_word']+"%)</span>":""+wccInfo['num_long_word'];    
    $("#num_long_word").html(numLongWords);


	  if(wccInfo['num_word']<MAX_WORDS_TO_DISPLAY_UNIQUENESS||withExtraStatistics==true){
	    $("#unique_word_container").show();
	    $("#showExtraStatistics").hide(); 
	    var numUniqueWords=wccInfo['num_unique_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
	      ""+wccInfo['num_unique_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_unique_word']+"%)</span>":""+wccInfo['num_unique_word'];
	    $("#num_unique_word").html(numUniqueWords);
	  }
	  else{
  	  $("#unique_word_container").hide();
  	  $("#showExtraStatistics").show();  	  
	  }
	  

    $("#automated_readability_index").text(wccInfo['automated_readability_index']);
    $("#coleman_liau_index").text(wccInfo['coleman_liau_index']);
    $("#flesch_reading_ease_score").text(wccInfo['flesch_reading_ease_score']);
    $("#flesch_kincaid_grade_level").text(wccInfo['flesch_kincaid_grade_level']);
    $("#gunning_fog_index").text(wccInfo['gunning_fog_index']);

  }
  else{
	  $("#num_word").html(wccInfo['num_word']);
	  $("#num_difficult_word").html("&nbsp;");
	  $("#num_short_word").html("&nbsp;");
    $("#num_long_word").html("&nbsp;");
	  $("#num_unique_word").html("&nbsp;");
	  $("#num_character").html(wccInfo['num_character']);
	  $("#num_character_wo_spaces").html("&nbsp;");

    $("#num_syllable").html("&nbsp;");
    $("#num_mono_syllable").html("&nbsp;");
    $("#num_poly_syllable").html("&nbsp;");

	  $("#num_sentence").html("&nbsp;");
	  $("#num_paragraph").html("&nbsp;");
	  $("#avg_sentence_length").html("&nbsp;");
	  $("#avg_word_length").html("&nbsp;");
	  $("#dale_chall_readability").html("&nbsp;");
	  $("#readability_level").html("&nbsp;");


    $("#automated_readability_index").html("&nbsp;");
    $("#coleman_liau_index").html("&nbsp;");
    $("#flesch_reading_ease_score").html("&nbsp;");
    $("#flesch_kincaid_grade_level").html("&nbsp;");
    $("#gunning_fog_index").html("&nbsp;");

  }

}

function displaywccInfo_Selected(wccInfo,withExtraStatistics){
  var English=$("#English").prop('checked');
  if(!English){
    $("#num_word_selected").text(wccInfo['num_word']);  
    $("#num_character_selected").text(wccInfo['num_character']);
    $("#num_character_wo_spaces_selected").text(wccInfo['num_character_wo_spaces']);

    $("#num_syllable_selected").text(wccInfo['num_syllable']);
    $("#num_mono_syllable_selected").text(wccInfo['num_mono_syllable']);
    $("#num_poly_syllable_selected").text(wccInfo['num_poly_syllable']);


    $("#num_sentence_selected").text(wccInfo['num_sentence']);
    $("#num_paragraph_selected").text(wccInfo['num_paragraph']);
    $("#avg_sentence_length_selected").text(wccInfo['avg_sentence_length']);
    $("#avg_word_length_selected").text(wccInfo['avg_word_length']);
    $("#dale_chall_readability_selected").text(wccInfo['dale_chall_index']);

    

    if(wccInfo['num_character']>0)
      $("#readability_level_selected").text(getReadabilityLevel(wccInfo['dale_chall_index']));
    else
      $("#readability_level_selected").text("N/A");
    
    var MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN= 10000;
    var numDifficultWords=wccInfo['num_difficult_words']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
    ""+wccInfo['num_difficult_words']+" <span class='stat_percentage'>("+wccInfo['percentage_difficult_words']+"%)</span>":""+wccInfo['num_difficult_words'];
    $("#num_difficult_word_selected").html(numDifficultWords); 
    
    var numShortWords=wccInfo['num_short_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
    ""+wccInfo['num_short_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_short_word']+"%)</span>":""+wccInfo['num_short_word'];    
    $("#num_short_word_selected").html(numShortWords);

    var numLongWords=wccInfo['num_long_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
    ""+wccInfo['num_long_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_long_word']+"%)</span>":""+wccInfo['num_long_word'];    
    $("#num_long_word_selected").html(numLongWords);

    if(wccInfo['num_word']<MAX_WORDS_TO_DISPLAY_UNIQUENESS||withExtraStatistics==true){
      $("#unique_word_container_selected").show();
      var numUniqueWords=wccInfo['num_unique_word']< MAX_NUMBER_TO_DISPLAY_PERCENTAGE_SIGN? 
        ""+wccInfo['num_unique_word']+" <span class='stat_percentage'>("+wccInfo['percentage_num_unique_word']+"%)</span>":""+wccInfo['num_unique_word'];
      $("#num_unique_word_selected").html(numUniqueWords);
    }
    else{
      $("#unique_word_container_selected").hide();
    }
    
  }
  else{
    $("#num_word_selected").text(wccInfo['num_word']);  

    $("#num_difficult_word_selected").html("&nbsp;");
    $("#num_short_word_selected").html("&nbsp;");
    $("#num_long_word_selected").html("&nbsp;");
    $("#num_unique_word_selected").html("&nbsp;");

    $("#num_character_selected").text(wccInfo['num_character']);
    $("#num_character_wo_spaces_selected").html("&nbsp;");

    $("#num_syllable_selected").html("&nbsp;");
    $("#num_mono_syllable_selected").html("&nbsp;");
    $("#num_poly_syllable_selected").html("&nbsp;");


    $("#num_sentence_selected").html("&nbsp;");
    $("#num_paragraph_selected").html("&nbsp;");
    $("#avg_sentence_length_selected").html("&nbsp;");
    $("#avg_word_length_selected").html("&nbsp;");

    
  }

}

function getReadabilityLevel(score){
  var readability="";
  if(score>10)
	readability+="graduate";
  else if(score>9)
		readability+="13-15th";
  else if(score>8)
		readability+="11-12th";
  else if(score>7)
		readability+="9-10th";
  else if(score>6)
        readability+="7-8th";
  else if(score>5)
		readability+="5-6th";
  else
	    readability+="< 4th";
  return readability;
}
function displaywccInfoInTitle(wccInfo){
  var WORDS=" mots";
  if(wccInfo['num_word']<=1)
    WORDS=" word";
  var CHARACTERS=" characters";  
  if(wccInfo['num_character']<=1)
    CHARACTERS=" character";

    
  var str=wccInfo['num_word']+WORDS+", "+wccInfo['num_character']+CHARACTERS+".";
  

}

function sumWeight(weights){
  var sum=0;
  $.each(weights,function(){
    sum+=this;
  });
  return sum;
}


function densityStats(){  
  var numTop=5;

    $.wordStats.setStopWords(true);

  $.wordStats.computeTopWords(numTop,$("#textbox"));

  if(numTop>$.wordStats.topWords.length)
    numTop=$.wordStats.topWords.length;
  var sum=sumWeight($.wordStats.topWeights);

  listHtml="<div>";

  for(var i=0;i<numTop;i++){
    var word=$.wordStats.topWords[i];
    var weight=$.wordStats.topWeights[i];
    var percentage=(weight/sum*100).toFixed(1);
    var timeAppeared=weight>1?"times":"time";
	var orderInList=""+(i+1);	

	listHtml+='<div>'+orderInList+' - '+word+'  x  '+weight+' </div>';

  }

  listHtml+="</div>";
  $.wordStats.clear();
  $("#result").html(listHtml);

}



function Cercle(x, y, rayon, couleur) {
  this.x = x;
  this.y = y;
  this.rayon = rayon;
  this.couleur = couleur;
  this.isSelected = false;
}


var cercles = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  
}

function ajouterCercle() {
  var numTop=5;
      $.wordStats.setStopWords(true);

  $.wordStats.computeTopWords(numTop,$("#textbox"));

  if(numTop>$.wordStats.topWords.length)
    numTop=$.wordStats.topWords.length;
  var sum=sumWeight($.wordStats.topWeights);
  for(var i=0;i<numTop;i++){
    var word=$.wordStats.topWords[i];
    var weight=$.wordStats.topWeights[i];
    var percentage=(weight/sum*100).toFixed(1);
    var timeAppeared=weight>1?"times":"time";
    var orderInList=""+(i+1); 

    var x = Math.floor(Math.random() * canvas.width);
    var y = 50;
    var rayon = weight * 10;
    var couleurs = ['rgb230, 107, 240)', 'rgb(81, 107, 240)', 'rgb(180, 107, 240)', 'rgb(130, 107, 240)'];
    var couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
    
    var cercle = new Cercle(x, y, rayon, couleur);
    cercles.push(cercle);
    
    dessinerCercle();
  }
    $.wordStats.clear();
}


function dessinerCercle() {
  

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var i = 0; i < cercles.length; i++) {
    
    var cercle = cercles[i];
    
    context.globalAlpha = 0.8;
    context.beginPath();
    context.arc(cercle.x, cercle.y, cercle.rayon, 0, Math.PI * 2);
    
    context.fillStyle = cercle.couleur;
    context.strokeStyle = "rgb(81, 107, 240)";

    
    context.fill();
    context.stroke();
    
  }
}


function clear_text(){
  $("#textbox").val("");
  updateStatsWithExtraStatistics();
}

$(document).ready(function(){

  
  var textbox=$("#textbox");

  textbox.on('input propertychange updateInfo keyup mousedown mouseup',getwccInfo);
  textbox.on('input propertychange updateInfo keyup mousedown mouseup',densityStats);
  textbox.on('input propertychange updateInfo keyup mousedown mouseup',ajouterCercle);
  textbox.on('paste', function () {
  setTimeout(function () {
    getwccInfo();
    densityStats();
    ajouterCercle();
  }, 10);
  });
  
  resizeHeightOfDefinitionBox();
  $(window).resize(resizeHeightOfDefinitionBox);


  var timeStamp=Date.now? Date.now(): new Date().getTime();


  $('#file_upload').uploadifive({
        'auto'             : true,
        'fileSizeLimit'    : 10240,
        'queueSizeLimit' : 1,

        'formData'         : {
                     'timestamp' : timeStamp,

                     'token'     : 'unique_salt' +timeStamp
                             },
        'queueID'          : 'queue',
        'uploadScript'     : 'helpers/uploadifive.php',
        'onUploadComplete' : updateInputText
  }); 
  


  $("#more_stats_header").click(function(){
    $('#more_stats').slideToggle('normal');
    more_stats_status=!more_stats_status;
    if(more_stats_status){
      $('#more_stats_icon').html("&#x25B6;");
    }
    else{
      $('#more_stats_icon').html("&#x25BC;");
    }    
  });

});

function updateInputText(file, data){  

  console.log(data);
  $('#textbox').val(data);
  updateStatsWithExtraStatistics();
  $("#close_file").click(clear_text);
  $("#counter").focus();
}