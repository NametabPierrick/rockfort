<?php
	session_start();
	require_once('connexion.php');
	$new_periode = $_POST['new_periode'];;
	$new_annee = explode(',', $new_periode);
	$genreselectionner = $_POST['genreselectionner'];

	if(empty($genreselectionner)){
		$reponse = $bdd->query("SELECT * 
		FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre
		WHERE rf_morceau.id_morceau = rf_genre_morceau.id_morceau
		AND rf_morceau.id_artiste = rf_artiste.id_artiste
		AND rf_genre_morceau.id_genre = rf_genre.id_genre
		AND rf_morceau.annee
		BETWEEN  '$new_annee[0]'
		AND '$new_annee[1]'
        ORDER BY rf_morceau.id_morceau");
	}else{
		$reponse = $bdd->query("SELECT * 
		FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre
		WHERE rf_morceau.id_morceau = rf_genre_morceau.id_morceau
		AND rf_morceau.id_artiste = rf_artiste.id_artiste
		AND rf_genre_morceau.id_genre = rf_genre.id_genre
		AND rf_genre.nom_genre =  '".$genreselectionner."'
		AND rf_morceau.annee
		BETWEEN '$new_annee[0]'
		AND '$new_annee[1]'
        ORDER BY rf_morceau.id_morceau");
	}

	/*$reponse = $bdd->query("SELECT * 
		FROM rf_morceau, rf_artiste, rf_genre_morceau, rf_genre
		WHERE rf_morceau.id_morceau = rf_genre_morceau.id_morceau
		AND rf_morceau.id_artiste = rf_artiste.id_artiste
		AND rf_genre_morceau.id_genre = rf_genre.id_genre
		AND rf_genre.nom_genre =  '".$genreselectionner."'
		AND rf_morceau.annee
		BETWEEN  '$new_annee[0]'
		AND  '$new_annee[1]'");*/
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
                <p class="infoSong invisible"><?php echo $donnees['id_morceau']; ?></p>
                <img id="medaille" src="img/medaille.png"><p class="infoSong"><?php echo $donnees['id_morceau']; ?></p>
                <p><?php echo $donnees['anecdote']; ?></p>
            </li>
        </ul>
    </li>

    <?php
	}
	$reponse->closeCursor(); // Termine le traitement de la requête
?>