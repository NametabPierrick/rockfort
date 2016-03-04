var undoingText="";
var READING_WPM=200;
var more_stats_status=false;



function getwccInfo(withExtraStatistics){
  
  var text = $("#textbox").val();
  var wccInfo;


  var selected_text = "";
  var select_range=$("#textbox").textrange();
  selected_text=select_range.text;

  var wccInfo_selected;

    wccInfo = $.wordCountTool.getwccInfo(text,withExtraStatistics);
    wccInfo_selected =$.wordCountTool.getwccInfo(selected_text,withExtraStatistics);

  displaywccInfo(wccInfo,withExtraStatistics);
  displaywccInfoInTitle(wccInfo);  

  displaywccInfo_Selected(wccInfo_selected,withExtraStatistics);
  
}

function displaywccInfo(wccInfo,withExtraStatistics){
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

function displaywccInfo_Selected(wccInfo,withExtraStatistics){
  
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
    var y = 80;
    var rayon = weight * 10;
    var couleurs = ['rgb230, 107, 240)', 'rgb(81, 107, 240)', 'rgb(180, 107, 240)', 'rgb(130, 107, 240)'];
    var couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
    
    var cercle = new Cercle(x, y, rayon, couleur);
    cercles.push(cercle);
    

    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var e = 0; e < cercles.length; e++) {
    
      var cercle = cercles[e];
      
      context.globalAlpha = 0.8;
      context.beginPath();
      context.arc(cercle.x, cercle.y, cercle.rayon, 0, Math.PI * 2);
      
      context.fillStyle = cercle.couleur;
      context.strokeStyle = "rgb(81, 107, 240)";
      
      context.fill();
      context.stroke();
    }

  }
    $.wordStats.clear();
}


function clear_text(){
  $("#textbox").val("");
  updateStatsWithExtraStatistics();
}

$(document).ready(function(){

  
  var textbox=$("#textbox");

  textbox.on('input propertychange updateInfo keyup mousedown mouseup',getwccInfo);
  textbox.on('input propertychange updateInfo keyup mousedown mouseup',densityStats);
  textbox.on('paste', function () {
  setTimeout(function () {
    getwccInfo();
    densityStats();
  }, 10);
  });
  
  resizeHeightOfDefinitionBox();
  $(window).resize(resizeHeightOfDefinitionBox);


  var timeStamp=Date.now? Date.now(): new Date().getTime();
  

});

function updateInputText(file, data){  

  console.log(data);
  $('#textbox').val(data);
  updateStatsWithExtraStatistics();
  $("#close_file").click(clear_text);
  $("#counter").focus();
}