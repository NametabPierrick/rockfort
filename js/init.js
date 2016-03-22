$(document).ready( function () {
	

	$(".subMenu").hide();

	$(".fleche_bottom").click(function(){
		$(this).parent().find(".subMenu").slideToggle();
	});


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
	$(".track ul.subMenu").hide();
	// On sélectionne tous les items de liste portant la classe "toggleSubMenu"
	// On modifie l'évènement "click" sur les liens dans les items de liste
	// qui portent la classe "toggleSubMenu" :
	$(".track > img").click( function () {
	// Si le sous-menu était déjà ouvert, on le referme :
		if ($(this).next("ul.subMenu:visible").length != 0) {
			$(this).next("ul.subMenu").slideUp("normal");
			$('.track > .fleche_bottom').attr('src','img/fleche_bottom.png');
		}
		// Si le sous-menu est caché, on ferme les autres et on l'affiche :
		else {
			$(".track ul.subMenu").slideUp("normal");
			$(this).next("ul.subMenu").slideDown("normal");
			$('.track > .fleche_bottom').attr('src','img/fleche_top.png');
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
	if($(".genre").closest(".selected").attr('id')){
		var partGenreSel = ($(".genre").closest(".selected").attr('id'));
		var genreselectionner = $('#'+partGenreSel+'nom').text();
	}else{
		var genreselectionner = "";
	}
	//var genreselectionner = "funk";

    $.ajax({
		url: 'php/timelineRange.php',
		type:'POST',
		data: 'new_periode='+$("#timelineMap").val()+'&genreselectionner='+genreselectionner,
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
		//var idSelected = $(this).attr('id');
		var idGenre = $(this).attr("id");
		var territoireGenre = $("."+idGenre+"territoire");
		var territoireGenreNom = $("."+idGenre+"territoirenom");
		var nomGenre = $("#"+idGenre+"nom");
		var genreAssoc = $("."+idGenre+"assoc");
		var path = $("."+idGenre+"link g path")[0];
		var nomgenresel = nomGenre.text();
		reloadPlaylist(nomgenresel);

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
function reloadPlaylist(nomgenresel){
/***********************************************/
	$.ajax({
		url: 'php/reloadPlaylist.php',
		type: 'POST',
		data: 'new_periode='+$("#timelineMap").val()+'&nomgenresel='+nomgenresel,
		dataType: 'html',
		success: function(filtregenre){
			$('#playlist_dynamique').html(filtregenre);
			cacheList();

			//alert(filtregenre);
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

// suggestions

//var refreshsuggestion;


/****************************************/
function songSelected(idsong){
/****************************************/	
	console.log(window.location.pathname);
	var periode = '<?php echo implode(",", $annee);?>';
	console.log(periode);
	$.post(window.location.pathname, {"id_morceau":idsong,"periode":periode}, function(result){
		var div = $(result).find("#divsug");
		var divm = $(result).find("#divmot");
          $('#divsug').html(div);
          $('#divmot').html(divm);
    }); 
}


// IMPORT STAFF EVE

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});

// wavesurfer.load('Rolling Stones-GimmeShelter.mp3');


// Equalizer
wavesurfer.on('ready', function () {
    var EQ = [
        {
            f: 32,
            type: 'lowshelf'
    }, {
            f: 64,
            type: 'peaking'
    }, {
            f: 125,
            type: 'peaking'
    }, {
            f: 250,
            type: 'peaking'
    }, {
            f: 500,
            type: 'peaking'
    }, {
            f: 1000,
            type: 'peaking'
    }, {
            f: 2000,
            type: 'peaking'
    }, {
            f: 4000,
            type: 'peaking'
    }, {
            f: 8000,
            type: 'peaking'
    }, {
            f: 16000,
            type: 'highshelf'
    }
  ];

    // Create filters
    var filters = EQ.map(function (band) {
        var filter = wavesurfer.backend.ac.createBiquadFilter();
        filter.type = band.type;
        filter.gain.value = 0;
        filter.Q.value = 1;
        filter.frequency.value = band.f;
        return filter;
    });

    // Connect filters to wavesurfer
    wavesurfer.backend.setFilters(filters);

    // Bind filters to vertical range sliders
    var container = document.querySelector('#equalizer');
    filters.forEach(function (filter) {
        var input = document.createElement('input');
        wavesurfer.util.extend(input, {
            type: 'range',
            min: -40,
            max: 40,
            value: 0,
            title: filter.frequency.value
        });
        input.style.display = 'inline-block';
        input.setAttribute('orient', 'vertical');
        wavesurfer.drawer.style(input, {
            'webkitAppearance': 'slider-vertical',
            width: '50px',
            height: '150px'
        });
        container.appendChild(input);

        var onChange = function (e) {
            filter.gain.value = ~~e.target.value;
        };

        input.addEventListener('input', onChange);
        input.addEventListener('change', onChange);
    });

    // For debugging
    wavesurfer.filters = filters;
});