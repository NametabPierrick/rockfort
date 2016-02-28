var undoingText="";
var READING_WPM=200;
var more_stats_status=false;

function getwccInfoForNonEnglishText(nonEnglishText){
  var wccInfo=[];
  var trimedText=$.trim(nonEnglishText);
  wccInfo['num_character'] = trimedText.length;
  var wordList=trimedText.split(/[\s\n]+/);
  wccInfo['num_word']=trimedText.length>0? wordList.length:0;
  return wccInfo;
}
function updateStats(){
  getwccInfo();
  densityStats();
}

function updateStatsWithExtraStatistics(){
  getwccInfo(true);
  densityStats();
}


function getwccInfo(withExtraStatistics){
  
  var text = $("#textbox").val();
  var isNotEnglish=$("#isNotEnglish").prop('checked');
  var wccInfo;


  var selected_text = "";
  var select_range=$("#textbox").textrange();
  selected_text=select_range.text;

  var wccInfo_selected;


  if(isNotEnglish){
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
  var isNotEnglish=$("#isNotEnglish").prop('checked');
  if(!isNotEnglish){
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
  var isNotEnglish=$("#isNotEnglish").prop('checked');
  if(!isNotEnglish){
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
  
  var isNotEnglish=$("#isNotEnglish").prop('checked');
  if(!isNotEnglish && wccInfo['num_character']>0){
  	  var readability="<span id='readability'> Readability level: ";
	  if(wccInfo['dale_chall_index']>10)
		readability+="college graduate";
	  else if(wccInfo['dale_chall_index']>9)
			readability+="college student";
	  else if(wccInfo['dale_chall_index']>8)
			readability+="11-12th grade student";
	  else if(wccInfo['dale_chall_index']>7)
			readability+="9-10th grade student";
	  else if(wccInfo['dale_chall_index']>6)
	        readability+="7-8th grade student";
	  else if(wccInfo['dale_chall_index']>5)
			readability+="5-6th grade student";
	  else
		    readability+="lower than 4th grade student";

	  str+=readability+"</span>";
  }
  $("#counter").html(str);
}

function sumWeight(weights){
  var sum=0;
  $.each(weights,function(){
    sum+=this;
  });
  return sum;
}
function displayWordCloud(){
	$('#myCanvasContainer').show();
	if( ! $('#myCanvas').tagcanvas({
		 weight:true,
		 weightMode:"both",
 		 weightFrom:"data-weight",
		 weightSizeMin:5,
		 weightSizeMax:150
	   },'tagList')) {

	     $('#myCanvasContainer').hide();
	}
}

function densityStats(){  
  var isNotEnglish=$("#isNotEnglish").prop('checked');
  if(isNotEnglish){
	$("#topDensity").html("");
	$('#myCanvasContainer').hide();
	return;
  }
  var numTop=parseInt($("#numTopKeyWord").val());;


  if($("#excludingCheckbox").prop('checked'))
    $.wordStats.setStopWords(true);
  else
    $.wordStats.setStopWords(false);

  $.wordStats.computeTopWords(numTop,$("#textbox"));

  if(numTop>$.wordStats.topWords.length)
    numTop=$.wordStats.topWords.length;
  var sum=sumWeight($.wordStats.topWeights);

  listHtml="<div id='densityList' class='row col-md-12'>";
  for(var i=0;i<numTop;i++){
    var word=$.wordStats.topWords[i];
    var weight=$.wordStats.topWeights[i];
    var percentage=(weight/sum*100).toFixed(1);
    var timeAppeared=weight>1?"times":"time";
	var orderInList=""+(i+1);	

	listHtml+='<div class="col-md-4"><label class="density">'+orderInList+'. <strong>'+word+'</strong> - '+weight+' '+timeAppeared+'<span class="percentage"> ('+percentage+'%)</span></label></div>';

  }
  listHtml+="</div>";
  $.wordStats.clear();
  $("#topDensity").html(listHtml);

}


function generateClicked(){
  var typeOption = $('#typeOption').val();
  var amountOption = $('#amountOption').val();

  var lorem=$.lorem.getLorem({type:typeOption,amount:amountOption,ptags:false});
  $("#textbox").val(lorem);

  getwccInfo();
  densityStats();
}

function defaultinnerHTMLForOption(){
  var typeOption = $('#typeOption').val();

  switch(typeOption){
    case "paragraphs":
      $('#amountOption').val("3")
      break;
    case "words":
      $('#amountOption').val("250")
      break;
    case "characters":
      $('#amountOption').val("1000")
      break;
  }
  generateClicked();
}

String.prototype.toTitleCase = function() {
    var i, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });


    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0; i < lowers.length; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
            function(txt) {
                return txt.toLowerCase();
            });


    uppers = ['Id', 'Tv'];
    for (i = 0; i < uppers.length; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
            uppers[i].toUpperCase());

    return str;
}
String.prototype.toAlternatingCase = function() {
    var str="",i;
    var isLower=false;
    for (i = 0; i < this.length; i++){
      if(/\s/.test(this[i])){
        str+=this[i];
        continue;
      }
      if(isLower)
        str+=this[i].toLowerCase(); 
      else
        str+=this[i].toUpperCase();

      if(this[i]!=this[i].toUpperCase()||this[i]!=this[i].toLowerCase())
        isLower=!isLower;
    }
    
    return str;
}
function convertCaseForText(){
  var text = $("#textbox").val();  
  var buttonID=$(this).attr("id");
  switch (buttonID){
	case "toUpperCaseButton":
	  undoingText=text;
	  text=text.toUpperCase();
	  break;
	case "toLowerCaseButton":
	  undoingText=text;
	  text=text.toLowerCase();
	  break;
	case "toSentenceCaseButton":
	  undoingText=text;
	  text=text+'.'
	  text=text.replace(/\w[^.?!:\n]*[.?!:\n$]+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	  text=text.substr(0,text.length-1);
	  break;
	case "toTitleCaseButton":
	  undoingText=text;
	  text=text.toTitleCase();	  
	  break;
  case "toAlternatingCaseButton":
    undoingText=text;
    text=text.toAlternatingCase();
    break;
	case "toToggleCaseButton":
	  undoingText=text;
	  text=text.replace(/[\w]*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1).toUpperCase();});
	  break;
	case "htmlStripButton":
	  undoingText=text;
	  html="<html>"+text+"</html>";
	  text=$(html).text();
	  break;
	case "clearTextButton":
	  undoingText=text;
	  text="";
	  break;
	case "undoButton":
	  if(undoingText.length!=0){
	    var temp=text;
	    text=undoingText;
	    undoingText=temp;
	  }
	  break;
  }    
  $("#textbox").val(text);
  updateStats();
}
function clear_text(){
  $("#textbox").val("");
  updateStatsWithExtraStatistics();
}
function isNotEnglishUpdate(){
  getwccInfo();
  densityStats();
  $("#counter").focus();
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

  $("#numTopKeyWord").on('keyup blur change',densityStats);
  $("#excludingCheckbox").change(densityStats);

  $("#isNotEnglish").change(isNotEnglishUpdate);

  $('#amountOption').on('keyup keypress blur change',generateClicked);
  

  $("#typeOption").change(defaultinnerHTMLForOption);

  $(".convert input").click(convertCaseForText);

  $("#extraStatisticsButton").click(updateStatsWithExtraStatistics);
  
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

function resizeHeightOfDefinitionBox(){

  var definitionBox=$("#definitionBox").height();
  var infoBox=$("#infoBox").height();
  if(infoBox>definitionBox)
    $("#definitionBox").height($("#infoBox").height());
  else
    $("#infoBox").height($("#definitionBox").height());
  
  var statistics_height=$("#statistics").height();
  var boxContainer_height=$("#boxContainer").height();

  if(boxContainer_height>statistics_height)
    $("#statistics").height($("#boxContainer").height());
  else{
    $("#boxContainer").height($("#statistics").height());
  }
}

function generate_customized_ads(){
  var img_url="assets/ads/why-would-you-appear-on-tv-news.jpg";
  var img_str="<a rel='nofollow' target='_blank' href='http://funfortuneteller.net/app/what-would-you-on-the-tv-breaking-news-for'><img id='customized_img_ad' src='"+img_url+"'/></a>";
  $("#customized_ads").html(img_str);
}


(function(factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }

})(function($) {

  var browserType,

  textrange = {

    get: function(property) {
      return _textrange[browserType].get.apply(this, [property]);
    },

    set: function(start, length) {
      var s = parseInt(start),
          l = parseInt(length),
          e;

      if (typeof start === 'undefined') {
        s = 0;
      } else if (start < 0) {
        s = this[0].value.length + s;
      }

      if (typeof length !== 'undefined') {
        if (length >= 0) {
          e = s + l;
        } else {
          e = this[0].value.length + l;
        }
      }

      _textrange[browserType].set.apply(this, [s, e]);

      return this;
    },

    setcursor: function(position) {
      return this.textrange('set', position, 0);
    },


    replace: function(text) {
      _textrange[browserType].replace.apply(this, [String(text)]);

      return this;
    },


    insert: function(text) {
      return this.textrange('replace', text);
    }
  },

  _textrange = {
    xul: {
      get: function(property) {
        var props = {
          position: this[0].selectionStart,
          start: this[0].selectionStart,
          end: this[0].selectionEnd,
          length: this[0].selectionEnd - this[0].selectionStart,
          text: this.val().substring(this[0].selectionStart, this[0].selectionEnd)
        };

        return typeof property === 'undefined' ? props : props[property];
      },

      set: function(start, end) {
        if (typeof end === 'undefined') {
          end = this[0].value.length;
        }

        this[0].selectionStart = start;
        this[0].selectionEnd = end;
      },

      replace: function(text) {
        var start = this[0].selectionStart;
        var end = this[0].selectionEnd;
        var val = this.val();
        this.val(val.substring(0, start) + text + val.substring(end, val.length));
        this[0].selectionStart = start;
        this[0].selectionEnd = start + text.length;
      }
    },

    msie: {
      get: function(property) {
        var range = document.selection.createRange();

        if (typeof range === 'undefined') {
          var props = {
            position: 0,
            start: 0,
            end: this.val().length,
            length: this.val().length,
            text: this.val()
          };

          return typeof property === 'undefined' ? props : props[property];
        }

        var start = 0;
        var end = 0;
        var length = this[0].value.length;
        var lfValue = this[0].value.replace(/\r\n/g, '\n');
        var rangeText = this[0].createTextRange();
        var rangeTextEnd = this[0].createTextRange();
        rangeText.moveToBookmark(range.getBookmark());
        rangeTextEnd.collapse(false);

        if (rangeText.compareEndPoints('StartToEnd', rangeTextEnd) === -1) {
          start = -rangeText.moveStart('character', -length);
          start += lfValue.slice(0, start).split('\n').length - 1;

          if (rangeText.compareEndPoints('EndToEnd', rangeTextEnd) === -1) {
            end = -rangeText.moveEnd('character', -length);
            end += lfValue.slice(0, end).split('\n').length - 1;
          } else {
            end = length;
          }
        } else {
          start = length;
          end = length;
        }

        var props = {
          position: start,
          start: start,
          end: end,
          length: length,
          text: range.text
        };

        return typeof property === 'undefined' ? props : props[property];
      },

      set: function(start, end) {
        var range = this[0].createTextRange();

        if (typeof range === 'undefined') {
          return;
        }

        if (typeof end === 'undefined') {
          end = this[0].value.length;
        }

        var ieStart = start - (this[0].value.slice(0, start).split("\r\n").length - 1);
        var ieEnd = end - (this[0].value.slice(0, end).split("\r\n").length - 1);

        range.collapse(true);

        range.moveEnd('character', ieEnd);
        range.moveStart('character', ieStart);

        range.select();
      },

      replace: function(text) {
        document.selection.createRange().text = text;
      }
    }
  };

  $.fn.textrange = function(method) {
    if (typeof this[0] === 'undefined') {
      return this;
    }

    if (typeof browserType === 'undefined') {
      browserType = 'selectionStart' in this[0] ? 'xul' : document.selection ? 'msie' : 'unknown';
    }

    if (browserType === 'unknown') {
      return this;
    }

    if (document.activeElement !== this[0]) {
      this[0].focus();
    }

    if (typeof method === 'undefined' || typeof method !== 'string') {
      return textrange.get.apply(this);
    } else if (typeof textrange[method] === 'function') {
      return textrange[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      $.error("Method " + method + " does not exist in jQuery.textrange");
    }
  };
});