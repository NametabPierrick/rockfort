$(document).ready( function () {
	
	//slider
	$('.single-slider').jRange({
		from: -2.0,
		to: 2.0,
		step: 0.5,
		scale: [-2.0,-1.0,0.0,1.0,2.0],
		format: '%s',
		width: 300,
		showLabels: true,
		snap: true
		});
		$('.range-slider').jRange({
		from: 1949,
		to: 2009,
		step: 1,
		scale: [1949,2009],
		format: '%s',
		width: 600,
		showLabels: true,
		isRange : true
	});

	/* TUTO */
	$("#btnTutoMap").click(function(){
		$("#page_map").fadeOut(function(){
			$("#tutoMap").fadeIn();
		});
	});
	$("#btnTutoLab").click(function(){
		$("#lab").fadeOut(function(){
			$("#tutoLab").fadeIn();
		});
	});
	$("#closeTutoLab").click(function(){
			$("#tutoLab").fadeOut(function(){
				$("#lab").fadeIn();
			});
		});
	$("#closeTutoMap").click(function(){
			$("#tutoMap").fadeOut(function(){
				$("#page_map").fadeIn();
			});
		});

	cacheList();
	hoverGenre();
	selectGenre();
	filtre();

});

//========================
function cacheList(){
//========================
	// On cache les sous-menus :
	$(".sm2-playlist-bd ul.subMenu").hide();
	// On sélectionne tous les items de liste portant la classe "toggleSubMenu"
	// On modifie l'évènement "click" sur les liens dans les items de liste
	// qui portent la classe "toggleSubMenu" :
	$(".sm2-playlist-bd li.toggleSubMenu > img").click( function () {
	// Si le sous-menu était déjà ouvert, on le referme :
		if ($(this).next("ul.subMenu:visible").length != 0) {
			$(this).next("ul.subMenu").slideUp("normal");
			$('.sm2-playlist-bd li.toggleSubMenu > .fleche_bottom').attr('src','img/fleche_bottom.png');
		}
		// Si le sous-menu est caché, on ferme les autres et on l'affiche :
		else {
			$(".sm2-playlist-bd ul.subMenu").slideUp("normal");
			$(this).next("ul.subMenu").slideDown("normal");
			$('.sm2-playlist-bd li.toggleSubMenu > .fleche_bottom').attr('src','img/fleche_top.png');
	}
	// On empêche le navigateur de suivre le lien :
	return false;
	});//fin toggle playlist
	//Initialisation de la timeline
}


/*changement de map*/
//========================
function changementPage(){
//========================
	var btnSwitch = $("#myonoffswitch");
	if (btnSwitch.is(':checked')){
		$("#lab").fadeOut(function(){
			$("#tutoLab").fadeOut(function(){
				$("#page_map").fadeIn();
			});
			$("#titre_conteneur").text("la map");
		})
	}else{
		$("#page_map").fadeOut(function(){
			$("#tutoMap").fadeOut(function(){
				$("#lab").fadeIn();
			});
			$("#titre_conteneur").text("le lab");
		})
	}
}

/*************************************************
Changement de page au clic sur bouton switch
*************************************************/
$("#myonoffswitch").change(function(){
	changementPage();
})


function getTimelineGenre(nbmax){
	$.ajax({
		url: 'php/timelineGenre.php',
		type: 'POST',
		data: 'new_periode='+$("#timelineMap").val(),
		dataType: 'html',
		success: function(data){
			
			$('#tableau_association').html(data);
			$(".genre").hide();
			$(".genreassociation").each(function(){
				var iddugenre = $(this).find(".iddugenre");
				var currentGenre = $("#"+iddugenre.text());
				var compteurdugenre = $(this).find(".compteurdugenre");
				//console.log(currentGenre);
				var rayon = compteurdugenre.text();
				if(rayon > 0 && rayon <= nbmax/3){
					rayon = 14;	
				}else if(rayon > nbmax/3 && rayon <= nbmax/3*2){
					rayon=21;
				}
				else{
					rayon=26;
				}
				currentGenre.show().attr("r", rayon);
			})
		}
	})
}

/**************************************************
Rechargement dynamique de la playlist et de la taille des genre en fonction de la nouvelle periode
**************************************************/
var timelineMapVal = $("#timelineMap").val();
$("#form_timelineMap input").change(filtre);
/******************************************/
function filtre(){
/******************************************/
	//e.preventDefault();
	$.ajax({
		url: 'php/timelineRange.php',
		type:'POST',
		data: 'new_periode='+$("#timelineMap").val(),
		dataType : 'html',
		success: function(code_html){
			$('#playlist_dynamique').html(code_html);
			cacheList();
		}
	});

	$.ajax({
		url: 'php/nbmax.php',
		type: 'POST',
		data: 'new_periode='+$("#timelineMap").val(),
		dataType: 'html',
		success: function(nbmaximum){
			var nbmax = nbmaximum;
			getTimelineGenre(nbmax);
		}
	})	
}

/***********************************************/
function selectGenre(){
/***********************************************/
	$(".genre").click(function(){
		reloadPlaylist();
		var idGenre = $(this).attr("id");
		var territoireGenre = $("."+idGenre+"territoire");
		var territoireGenreNom = $("."+idGenre+"territoirenom");
		var nomGenre = $("#"+idGenre+"nom");
		var genreAssoc = $("."+idGenre+"assoc");
		var path = $("."+idGenre+"link g path")[0];
		
		$(".link").hide();
		$(".genre").removeClass("selected");
		$(this).addClass("selected");
		$(".territoire").hide();
		$(".territoirenom").hide();
		$(".genre").removeClass("selectedassoc");
		territoireGenre.fadeIn();
		territoireGenreNom.fadeIn();
		genreAssoc.addClass("selectedassoc");
		$('.genrenom').hide().removeClass("active");
		nomGenre.fadeIn().addClass("active");

		// var path = document.querySelector('.squiggle-animated path');
		var length = path.getTotalLength();
		// Clear any previous transition
		path.style.transition = path.style.WebkitTransition =
		'none';
		// Set up the starting positions
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		path.getBoundingClientRect();
		// Define our transition
		$("."+idGenre+"link").fadeIn('slow');
		path.style.transition = path.style.WebkitTransition =
		'stroke-dashoffset 1.5s ease-in-out';
		// Go!
		path.style.strokeDashoffset = '0';
		path.style.strokeWidth = '1px';

	})
}

/***********************************************/
function reloadPlaylist(){
/***********************************************/
	var idSelected = $(this).attr('id');
	$.ajax({
		url: 'php/reloadPlaylist.php',
		type: 'POST',
		data: 'new_periode='+$("#timelineMap").val()+'&idselected='+idSelected,
		dataType: 'html',
		success: function(filtregenre){
			$('#playlist_dynamique').html(filtregenre);
		}
	})
}

/***********************************************/
function hoverGenre(){
/***********************************************/
	$(".genre")
	.mouseout(function() {
		var idGenre = $(this).attr("id");
		var nomGenre = $("#"+idGenre+"nom");

		if(nomGenre.hasClass("active")){
	    	return false;
		}else{
			nomGenre.fadeOut();
		}
  	})
	.mouseover(function() {
    	var idGenre = $(this).attr("id");
		var nomGenre = $("#"+idGenre+"nom");

		nomGenre.fadeIn();
	});
}

// Suggestion 
var refreshsuggestion;
function songSelected(idsong){
	
	//$('#divsug').load(document.URL+'?id_morceau='+idsong +  ' #divsug');
	//alert(document.url);
	// var xhttp = new XMLHttpRequest();
 //    xhttp.onreadystatechange = function() {
 //    if (xhttp.readyState == 4 && xhttp.status == 200) {
 //    	//alert("okajax");
    	
 //    	document.getElementById("#divsug").innerHTML = $().text(xhttp.responseText).html().getElementById("#divsug").innerHTML;



 //  };
 //  //alert("id_morceau="+idsong+"&periode="+<? echo $annee[1].",".$annee[1];?>);
 //  xhttp.open("POST", window.location.pathname, true);
 //  xhttp.overrideMimeType('text/xml');
 //  xhttp.send("id_morceau="+idsong+"&periode="+<? echo implode(",", $annee);?>);
console.log(window.location.pathname);
var periode = '<?php echo implode(",", $annee);?>';
console.log(periode);
$.post(window.location.pathname, {"id_morceau":idsong,"periode":periode}, function(result){
		var div = $(result).find("#divsug");
          $('#divsug').html(div);
    });
 
	
// }

    
}