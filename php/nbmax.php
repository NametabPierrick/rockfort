<?php 
	session_start();
	require_once("connexion.php");
	$new_periode = $_POST['new_periode'];;
	$new_annee = explode(',', $new_periode);

	//filtre tableau genre_morceau par date
	$req1 = $bdd->query("DROP VIEW IF EXISTS fourchette");
	$req2 = $bdd->query("CREATE VIEW fourchette AS 
		SELECT rf_genre_morceau.id_genre, rf_genre_morceau.id_morceau, rf_genre.nom_genre
		FROM rf_genre_morceau, rf_morceau, rf_genre 
		WHERE rf_genre_morceau.id_morceau = rf_morceau.id_morceau
		AND rf_genre_morceau.id_genre = rf_genre.id_genre 
		AND rf_morceau.annee BETWEEN '.$new_annee[0].' and '.$new_annee[1].'");
	$req3 = $bdd->query("DROP VIEW IF EXISTS couteau");
	$req4 = $bdd->query("CREATE VIEW couteau AS
		SELECT nom_genre, id_genre, COUNT(id_morceau) AS compteur 
		FROM `fourchette` 
		GROUP BY id_genre");

	$nbmaxreq = $bdd->query("SELECT MAX(compteur) AS nbmaxrecup FROM couteau");

	//$nbmax = strval($nbmaxreq);

	$nbmax = $nbmaxreq->fetch();
	echo $nbmax['nbmaxrecup'];

	$nbmaxreq->closeCursor();

?>