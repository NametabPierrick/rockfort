<?php
	session_start();
	require_once('php/connexion.php');
	$periode = $_POST['periode'];
	$annee = explode(",", $periode);
	/*echo $periode;*/
	/*echo $annee[0]." et ";
	echo $annee[1];*/
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>Rockfort - Lab</title>
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="js/jquery.range.css">
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic,700,300,300italic,700italic,400italic,600,800,800italic' rel='stylesheet' type='text/css'>
		<script type="text/javascript" src="js/soundmanager2.js"></script>
		<script src="js/bar-ui.js"></script>
		<link rel="stylesheet" href="css/bar-ui.css" />
		<link rel="stylesheet" href="js/jquery.range.css">
		<script src="js/jquery-1.12.0.min.js"></script>
		<link rel="icon" type="image/png" href="img/favicon/favicon-196x196.png" sizes="196x196" /><link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96" /><link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32" /><link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16" /><link rel="icon" type="image/png" href="img/favicon/favicon-128.png" sizes="128x128" /><meta name="msapplication-TileImage" content="mstile-144x144.png" /><meta name="msapplication-square70x70logo" content="mstile-70x70.png" /><meta name="msapplication-square150x150logo" content="mstile-150x150.png" /><meta name="msapplication-wide310x150logo" content="mstile-310x150.png" /><meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
		<!-- demo for this page only, you don't need this stuff -->
		<script src="js/demo.js"></script>
		<!-- <link rel="stylesheet" href="css/demo.css" /> -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	</head>
	<body>
		<div id="super_container">
			<div id="lab">
			<header>
				<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
				<h1 class="titre_page" id="titre_conteneur">Le Lab</h1>
				<hr class="hr hrLab">
				<button class="info" id="btnTutoLab">i</button>
			</header>
				<section id="container_equalizer"><!-- commentaire obligatoire pour supprimer le caractère invisible entre ces deux eléments
					--><div id="contain_parametre">
						<h3 id="titre_parametre" class="titre_encart">Paramètres</h3>
						<div id="parametre"></div>
					</div>
				</section>
			<section id="mots"></section>
			<section id="suggestion">
				<h3 class="titre_encart">Ecoute aussi ...</h3>
				<?php
					$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND rf_genre_morceau.id_genre = rf_genre.id_genre AND rf_morceau.id_morceau = rf_genre_morceau.id_morceau ORDER BY RAND() LIMIT 3");
					while ($donnees = $reponse->fetch()){
				?>
				<div class="sug">
					<img src="<?php echo "artistes/".$donnees['id_artiste'].".png"; ?>" alt="photo_artiste" class="pochette_sug"/><div class="contain_info_sug">
						<div class="nom_artiste_sug"><?php echo $donnees['nom']; ?></div>
						<div class="titre_sugg"><?php echo $donnees['titre']; ?></div>
						<div class="genre_sug"><?php echo $donnees['nom_genre']; ?></div>
					</div>
				</div>
				<?php
					}
					$reponse->closeCursor();
				?>
			</section>
			<section id="signal" class="invisible">
				<label><input type="checkbox" checked="checked" />Stabilize</label>
				<label>Frequency #1: <input type="range" min="20" max="1000" value="440" /><span></span></label>
				<label>Shape #1: <select>
					<option value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
					<option value="sawtooth">Sawtooth</option>
				</select></label>
				<label>Frequency #2: </label>
				<label>Shape #2: </label>
			</section>
			<input type="radio" name="mode" id="mode-local" value="local" class="invisible" />
			<!-- C'est ici qu'on lance les fichiers audio -->
			
			<section id="local">
				<button value="Rolling Stones-GimmeShelter.mp3" type="button" />The Rolling Stones, Gimme shelter</button>
				<button value="Pink Floyd-Wish.mp3" type="button" />Pink Floyd, Wish you were here</button>
			</section>
			
		<section id="player"></section>
	</div>
	<div id="page_map">
			<header>
				<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
				<h1 class="titre_page" id="titre_conteneur">La map</h1>
				<hr class="hr hrMap">
				<button class="info" id="btnTutoMap">i</button>
			</header>
		<object type="image/svg+xml" data="map.svg">
		Le navigateur ne peut lire cette map
		</object>
		<form id="form_timelineMap" action="php/timelineRange.php" method="POST">
			<input class="range-slider" id="timelineMap" name="timelineMap" type="hidden" value=<?php echo '"'.$periode.'"'; ?>/>
		</form>
	</div>
	<div id="tutoMap">
			<header>
				<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
				<h1 class="titre_page" id="titre_conteneur">Aide Map</h1>
				<hr class="hr hrMap">
				<button class="info" id="closeTutoMap">x</button>
			</header>
			<p>tuto map</p>
	</div>
	<div id="tutoLab">
			<header>
				<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
				<h1 class="titre_page" id="titre_conteneur">Aide Lab</h1>
				<hr class="hr hrMap">
				<button class="info" id="closeTutoLab">x</button>
			</header>
			<p>tuto lab</p>
	</div>
</div>
<div id="panel_right">
	<h2 class="titre_playlist">Playlist</h2>
	<img src="img/icones/casque.png" id="icocasque" alt="icone casque">
	
	<div id="playlist">
		<div class="sm2-bar-ui fixed playlist-open flat">
			
			<div class="bd sm2-playlist-drawer sm2-element">
				<!-- playlist content is mirrored here -->
				<div class="sm2-playlist-wrapper">
					<ul class="sm2-playlist-bd" id="playlist_dynamique">
						<!-- standard one-line items -->
						
						<?php
						// On récupère tout le contenu de la table jeux_video
						$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND annee BETWEEN'.$annee[0].'AND'.$annee[1].'");
						/*$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND rf_genre_morceau.id_genre = rf_genre.id_genre AND annee BETWEEN'.$annee[0].'AND'.$annee[1].'");*/
						// On affiche chaque entrée une à une
						while ($donnees = $reponse->fetch()){
						?>
						
						<li class="toggleSubMenu">
							<a href=<?php echo "song/".$donnees['id_morceau'].".mp3"; ?>>
								<span class="nomArtiste"><?php echo $donnees['titre']; ?></span> - <?php echo $donnees['nom']; ?><!--<span class="label">Essai Label</span>-->
							</a>
							<img src="img/fleche_bottom.png" class="fleche_bottom">
							
							<ul class="subMenu">
								<li>
									<img src=<?php echo "artistes/".$donnees['id_artiste'].".png"; ?>>
									<p class="infoSong"><?php echo $donnees['annee']; ?></p>
									<p class="infoSong"><?php echo $donnees['id_morceau']; ?></p>
									<img id="medaille" src="img/medaille.png"><p class="infoSong"><?php echo $donnees['id_morceau']; ?></p>
									<p>La chanson devient un hymne de la génération X et fait accéder le groupe à la célébrité internationale, une notoriété que ses membres, et Kurt Cobain en particulier, ont du mal à assumer.</p>
								</li>
							</ul>
						</li>
						<?php
						}
						$reponse->closeCursor(); // Termine le traitement de la requête
						?>
					</ul>
				</div>
			</div>
			<div class="bd sm2-main-controls">
				<div class="sm2-inline-element sm2-inline-status">
					<div class="sm2-playlist">
						<div class="sm2-playlist-target">
							<!-- playlist <ul> + <li> markup will be injected here -->
							<!-- if you want default / non-JS content, you can put that here. -->
							<noscript><p>JavaScript is required.</p></noscript>
						</div>
					</div>
					<div class="sm2-progress">
						<div class="sm2-row">
							<div class="sm2-inline-time">0:00</div>
							<div class="sm2-progress-bd">
								<div class="sm2-progress-track">
									<div class="sm2-progress-bar"></div>
									<div class="sm2-progress-ball"><div class="icon-overlay"></div></div>
								</div>
							</div>
							<div class="sm2-inline-duration">0:00</div>
						</div>
					</div>
				</div>
				<div class="sm2-inline-element sm2-button-element sm2-menu">
					<div class="sm2-button-bd">
						<a href="#menu" class="sm2-inline-button menu">menu</a>
					</div>
				</div>
				<div class="sm2-inline-element sm2-button-element">
					<div class="sm2-button-bd">
						<a href="#prev" title="Previous" class="sm2-inline-button previous">&lt; previous</a>
					</div>
				</div>
				<div class="sm2-inline-element sm2-button-element">
					<div class="sm2-button-bd">
						<a href="#play" id="start_song" value="song/1.mp3" class="sm2-inline-button play-pause">Play / pause</a>
					</div>
				</div>
				<div class="sm2-inline-element sm2-button-element">
					<div class="sm2-button-bd">
						<a href="#next" title="Next" class="sm2-inline-button next">&gt; next</a>
					</div>
				</div>
				<div class="sm2-inline-element sm2-button-element">
					<div class="sm2-button-bd">
						<a href="#repeat" title="Repeat playlist" class="sm2-inline-button repeat">&infin; repeat</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="onoffswitch">
		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
		<label class="onoffswitch-label" for="myonoffswitch">
			<span class="onoffswitch-inner"></span>
			<span class="onoffswitch-switch"></span>
		</label>
	</div>
</div>
<!-- script pour spectre -->
<script src="js/object.assign.js"></script>
<script src="js/performance.now.js"></script>
<script src="js/oscope.js"></script>
<script src="js/app_1_1.js"></script>
<script>App.init();</script>
<!-- fin script pour spectre -->
<script type="text/javascript">
$(document).ready( function () {
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
//fin initialisation de la timeline
});
/*changement de map*/
function changementPage(){
	var btnSwitch = $("#myonoffswitch");
	if (btnSwitch.is(':checked')){
		$("#lab").fadeOut(function(){
			$("#page_map").fadeIn();
			$("#titre_conteneur").text("la map");
			$("#tutoLab").fadeOut(10);
		})
	}else{
		$("#page_map").fadeOut(function(){
			$("#lab").fadeIn();
			$("#titre_conteneur").text("le lab");
			$("#tutoMap").fadeOut(10);
		})
	}
}
/*changement de page au changement d'etat du bouton*/
$("#myonoffswitch").change(function(){
	changementPage();
})



/*affichage tuto*/
$(function(){
	$("#btnTutoMap").click(function(){

		$("#page_map").fadeOut(10);
			$("#tutoMap").fadeIn(10);
     });	

	$("#btnTutoLab").click(function(){

		$("#lab").fadeOut(10);
			$("#tutoLab").fadeIn(10);
     });

     $("#closeTutoLab").click(function(){

		$("#tutoLab").fadeOut(10);
			$("#lab").fadeIn(10);
     });	

     $("#closeTutoMap").click(function(){

		$("#tutoMap").fadeOut(10);
			$("#page_map").fadeIn(10);
     });	
});


$("#form_timelineMap").mouseup(function(e){
	//e.preventDefault();

	$.ajax({
		url: 'php/timelineRange.php',
		type:'POST',
		data: 'new_periode='+$("#timelineMap").val(),
		dataType : 'html',
		success: function(code_html){
			$('#playlist_dynamique').html(code_html);
		}
	});
});


</script>
<script src="js/jquery.range.js"></script>
</body>
</html>