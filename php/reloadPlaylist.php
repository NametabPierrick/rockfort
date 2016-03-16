<?php 
	session_start();
	require_once("connexion.php");
	$idselected = $_POST['idselected'];
	$new_periode = $_POST['new_periode'];
	$new_annee = explode(',', $new_periode);

	$request = $bdd->query("SELECT * FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND rf_genre_morceau.id_genre = rf_genre.id_genre AND rf_genre.nom_genre = '.$idselected.' AND annee BETWEEN'.$new_annee[0].'AND'.$new_annee[1].'");

	while ($donnees = $request->fetch()){
?>
	<li class="toggleSubMenu">
		<a <?php $morceauActuel = $donnees['id_morceau']; ?> >
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
	$request->closeCursor(); // Termine le traitement de la requête
?>