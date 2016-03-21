<?php
	session_start();
	require_once('php/connexion.php');
	$periode = $_POST['periode'];
	$annee = explode(",", $periode);
	if(isset($_POST['id_morceau'])){
		$morceauActuel = $_POST['id_morceau'];
	}
	/*echo $periode;*/
	/*echo $annee[0]." et ";
	echo $annee[1];*/
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>Rockfort | Map & Lab</title>
		<meta name="description" content="Toi, petit amateur de la musique, tu as forcément déjà entendu les grands noms de la musique rock, mais les connais-tu vraiment ?"/>       
    	<meta name="keywords" content="Rockfort, rock, rolling stones"/>
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="js/jquery.range.css">
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic,700,300,300italic,700italic,400italic,600,800,800italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/bar-ui.css" />
		<link rel="stylesheet" href="js/jquery.range.css">
		<link rel="icon" type="image/png" href="img/favicon/favicon-196x196.png" sizes="196x196" /><link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96" /><link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32" /><link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16" /><link rel="icon" type="image/png" href="img/favicon/favicon-128.png" sizes="128x128" /><meta name="msapplication-TileImage" content="mstile-144x144.png" /><meta name="msapplication-square70x70logo" content="mstile-70x70.png" /><meta name="msapplication-square150x150logo" content="mstile-150x150.png" /><meta name="msapplication-wide310x150logo" content="mstile-310x150.png" /><meta name="msapplication-square310x310logo" content="mstile-310x310.png" />

		<!-- <link rel="stylesheet" href="css/demo.css" /> -->
		<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> -->
	</head>
	<body>

		<!-- Dans l'immédiat, j'ai laissé ces <input> car le script app_1_1-js est basé sur eux -->
            
            <!-- *********************** Sautez à la ligne 58 ************************************ -->

			<input type="radio" name="mode" id="mode-math" value="math" class="invisible" />
            
			<section id="math"class="invisible">
				<label>
                	<input type="text" value="return Math.sin((x + t/1000) * 2 * Math.PI)" />
				</label>
				<label>
					<input type="text" value="return Math.cos(x * 2 * Math.PI)" />
				</label>
			</section>
			
            
			<input type="radio" name="mode" id="mode-signal" value="signal" class="invisible" />
			
            <section id="signal" class="invisible">
				<label><input type="checkbox" checked="checked" /></label>
				<label><input type="range" min="20" max="1000" value="440" /><span></span></label>
				<label><select>
					<option value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
					<option value="sawtooth">Sawtooth</option>
				</select></label>
				<label></label>
				<label></label>
			</section>

			<input type="radio" name="mode" id="mode-remote" value="remote" class="invisible" />
            
			<section id="remote" class="invisible">
				<form>
					<label><input type="text" value="jerobeam.ogg" /><input type="submit" value="Load" /></label>
				</form>
			</section>

			<input type="radio" name="mode" id="mode-local" value="local" class="invisible" />
            
			<!-- *********************** FIN des <input> ************************************ -->

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
						<div id="parametre">
							<div class="container" style="text-align: center">
				                <button class="btn btn-primary" onclick="wavesurfer.playPause()" style="display:none;">Play/Pause</button>
				                <div id="equalizer" style="margin-top: 10px"></div>
				            </div>

						</div>
					</div>
				</section>
			<section id="mots">
				<div id="divmot">
					<?php

					if(is_null($morceauActuel))
						{
							$query = "SELECT  * from rf_morceau where rf_morceau.id_morceau LIMIT 0";
						}
						else
						{
							$query = "SELECT  * from rf_morceau where rf_morceau.id_morceau =".$morceauActuel." LIMIT 1";
						}	
						$reponse = $bdd->query($query);
						while ($donnees = $reponse->fetch()){
							?>
							<script>
	   						 console.log(<? echo json_encode($donnees); ?>);
							</script>
							<textarea id="textbox"><?php echo $donnees['parole']; ?></textarea>
							<div id="result" class="clear"></div>
					<?php
						}
						$reponse->closeCursor();
					?>
				</div>
			</section>
			<section id="suggestion">
				<div id="divsug">
					<h3 class="titre_encart">Ecoute aussi ...</h3>
					<?php

					

					if(empty($morceauActuel))
					{
						
						$query = "SELECT * FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND rf_genre_morceau.id_genre = rf_genre.id_genre AND rf_morceau.id_morceau = rf_genre_morceau.id_morceau ORDER BY RAND() LIMIT 3";
						
					}
					else
					{
						$query = "SELECT  rf_artiste.id_artiste,rf_artiste.nom,rf_morceau.titre,rf_genre.nom_genre from rf_morceau join rf_genre_morceau on rf_genre_morceau.id_morceau = rf_morceau.id_morceau join rf_genre on rf_genre_morceau.id_genre = rf_genre.id_genre join rf_artiste on rf_morceau.id_artiste = rf_artiste.id_artiste where rf_morceau.id_morceau !=".$morceauActuel." and rf_genre.id_genre in (select rf_genre_morceau.id_genre from rf_genre_morceau where rf_genre_morceau.id_morceau =".$morceauActuel." )LIMIT 3";	
					
						//$query = "SELECT Distinct rf_artiste.id_artiste,  rf_artiste.nom,  rf_morceau.titre,  rf_genre.nom_genre FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_morceau != ".$morceauActuel." AND rf_genre.id_genre IN (Select rf_genre_morceau.id_genre from rf_genre_morceau where rf_genre_morceau.id_morceau = ".$morceauActuel.") AND rf_artiste.id_artiste in (Select rf_morceau.id_artiste from rf_morceau where rf_morceau.id_morceau =".$morceauActuel.") LIMIT 3";
					}
						$reponse = $bdd->query($query);
						while ($donnees = $reponse->fetch()){

							?>
							<script>
	   						 console.log(<? echo json_encode($donnees); ?>);
							</script>
					
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
				</div>
			</section>
			<input type="radio" name="mode" id="mode-local" value="local" class="invisible" />
			<!-- C'est ici qu'on lance les fichiers audio -->
			
	</div>


	<div id="page_map">
		<header>
			<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
			<h1 class="titre_page" id="titre_conteneur">La map</h1>
			<hr class="hr hrMap">
			<button class="info" id="btnTutoMap">i</button>
		</header>
		<!-- <object type="image/svg+xml" data="map_genre_vf.svg">
		Le navigateur ne peut lire cette map
		</object> -->
		<?php include 'php/map.php'; ?>
		
		<form id="form_timelineMap" action="php/timelineRange.php" method="POST">
			<input class="range-slider" id="timelineMap" name="timelineMap" type="hidden" value=<?php echo '"'.$periode.'"'; ?>/>
		</form>

		<div id="tableau_association"></div>
		<div id="nbmax"></div>

	</div>
	<div id="tutoMap">
		<header>
			<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
			<h1 class="titre_page" id="titre_conteneur">Aide Map</h1>
			<hr class="hr hrAideMap">
			<button class="info" id="closeTutoMap">x</button>
		</header>

		<ul class="slides">
    		<input type="radio" name="radio-btn" id="img-1" checked />
    		<li class="slide-container">
				<div class="slide">
					<img src="img/tuto/tuto_etape1.jpg" />
        		</div>
				<div class="nav">
					<label for="img-6" class="prev">&#x2039;</label>
					<label for="img-2" class="aft">&#x203a;</label>
				</div>
    		</li>

    		<input type="radio" name="radio-btn" id="img-2" />
    		<li class="slide-container">
        		<div class="slide">
          			<img src="img/tuto/tuto_etape2.jpg" />
        		</div>
				<div class="nav">
					<label for="img-1" class="prev">&#x2039;</label>
					<label for="img-3" class="aft">&#x203a;</label>
				</div>
    		</li>

    		<input type="radio" name="radio-btn" id="img-3" />
    		<li class="slide-container">
		        <div class="slide">
		          <img src="img/tuto/tuto_etape3.jpg" />
		        </div>
				<div class="nav">
					<label for="img-2" class="prev">&#x2039;</label>
					<label for="img-4" class="aft">&#x203a;</label>
				</div>
    		</li>

		    <input type="radio" name="radio-btn" id="img-4" />
		    <li class="slide-container">
		        <div class="slide">
		          <img src="img/tuto/tuto_etape4.jpg" />
		        </div>
				<div class="nav">
					<label for="img-3" class="prev">&#x2039;</label>
					<label for="img-1" class="aft">&#x203a;</label>
				</div>
		    </li>

		    

		    <li class="nav-dots">
		      <label for="img-1" class="nav-dot" id="img-dot-1"></label>
		      <label for="img-2" class="nav-dot" id="img-dot-2"></label>
		      <label for="img-3" class="nav-dot" id="img-dot-3"></label>
		      <label for="img-4" class="nav-dot" id="img-dot-4"></label>
		    </li>
		</ul>
	</div>
	<div id="tutoLab">
		<header>
			<a href="index.php"><img src="img/logo/logo_rock_2.png" alt="logo rockfort" id="logo"></a>
			<h1 class="titre_page" id="titre_conteneur">Aide Lab</h1>
			<hr class="hr hrAideLab">
			<button class="info" id="closeTutoLab">x</button>
		</header>
		<p>tuto lab</p>
	</div>
</div>

	<div class="media">
        <div class="logo-rockfort"></div>
            <h1 class="titre_page">Oups...</h1>
            <br/><h1 class="titre_page oupsTxt">Pour profiter pleinement de l'expérience rock, veuillez vous rendre sur une plus grande résolution d'écran.</h1>
    </div>

<div id="panel_right">
	<h2 class="titre_playlist">Playlist</h2>
	<img src="img/icones/casque.png" id="icocasque" alt="icone casque">
	
	<div id="playlist">

		 <section id="local">
        	<ul>
                <?php
						// On récupère tout le contenu de la table jeux_video
						$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND annee BETWEEN'.$annee[0].'AND'.$annee[1].'");
						/*$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND rf_genre_morceau.id_genre = rf_genre.id_genre AND annee BETWEEN'.$annee[0].'AND'.$annee[1].'");*/
						// On affiche chaque entrée une à une
						while ($donnees = $reponse->fetch()){
						?>
						
						<li <?php $morceauActuel = $donnees['id_morceau']; echo "onclick='songSelected(".$donnees['id_morceau'].")'";?> class="track" name="<?php echo "song/".$donnees['id_morceau'].".mp3"; ?>">
							<?php echo "<span name='song/".$donnees['id_morceau'].".mp3' class='playlistTitle'>".$donnees['titre']."</span> - <span name='song/".$donnees['id_morceau'].".mp3' class='playlistNom'>".$donnees['nom']."</span>"; ?>

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
		</section>

	</div>

	<section id="player" onclick="wavesurfer.playPause()"></section>
	<div id="waveform" style="display:none;"></div>

	<div class="onoffswitch">
		<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
		<label class="onoffswitch-label" for="myonoffswitch">
			<span class="onoffswitch-inner"></span>
			<span class="onoffswitch-switch"></span>
		</label>
	</div>
</div>
<script src="js/jquery-1.12.0.min.js"></script>
<script src="js/object.assign.js"></script>
<script src="js/performance.now.js"></script>
<script src="js/oscope.js"></script>
<script src="js/app_1_1.js"></script>
<script src="js/wavesurf.js"></script>
<script type="text/javascript" src="js/range.js"></script> 
<script type="text/javascript" src="js/stats.min.js"></script>
<script type="text/javascript" src="js/count.min.js" ></script>
<script type="text/javascript" src="js/script.js"></script>


<!-- fin script pour spectre -->
<script src="js/init.js"></script>
<script src="js/jquery.range.js"></script>
<script>App.init();</script>
</body>
</html>