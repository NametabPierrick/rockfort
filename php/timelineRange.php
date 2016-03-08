<?php 
	session_start();
    require_once('connexion.php'); 

    $new_periode = $_POST['new_periode'];;
    $new_annee = explode(',', $new_periode);
	// On récupère tout le contenu de la table jeux_video
	$reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND annee BETWEEN'.$new_annee[0].'AND'.$new_annee[1].'");
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
				<img style="float: left; margin-right: 10px; margin-bottom: 10px;"src="img/nirvana.png">
				<p style="font-size: 20px; margin-top: 20px;"><?php echo $donnees['annee']; ?></p>
				<p style="font-size: 20px; line-height: 57px;"><?php echo $donnees['id_morceau']; ?></p>
				<p>La chanson devient un hymne de la génération X et fait accéder le groupe à la célébrité internationale, une notoriété que ses membres, et Kurt Cobain en particulier, ont du mal à assumer.</p>
			</li>
		</ul>
	</li>
<?php
}
$reponse->closeCursor(); // Termine le traitement de la requête
?>

