<?php 
	session_start();
	require_once("connexion.php");
	$new_periode = $_POST['new_periode'];;
	$new_annee = explode(',', $new_periode);

	$req = $bdd->query("SELECT COUNT(*) AS nb FROM rf_morceau WHERE annee BETWEEN'.$new_annee[0].'AND'.$new_annee[1].'");

//	$resultat = $bdd->query("SELECT * FROM rf_genre, rf_morceau, rf_genre_morceau WHERE rf_genre.id_genre = rf_genre_morceau.id_genre, rf_genre_morceau.id_morceau = rf_morceau.id_morceau AND annee BETWEEN'.$new_annee[0].'AND'.$new_annee[1].'");

	$result = $req->fetch();
	$nbmax = $result['nb'];
	echo($nbmax);

	//filtre tableau genre_morceau par date
	$req2 = $bdd->query("DROP VIEW IF EXISTS `fourchette`;
		CREATE VIEW fourchette AS 
		SELECT rf_genre_morceau.id_genre, rf_genre_morceau.id_morceau, rf_genre.nom_genre
		FROM `rf_genre_morceau`, rf_morceau, rf_genre 
		WHERE rf_genre_morceau.id_morceau = rf_morceau.id_morceau
		AND rf_genre_morceau.id_genre = rf_genre.id_genre 
		AND rf_morceau.annee BETWEEN '.$new_annee[0].' and '.$new_annee[1].';
		SELECT nom_genre, id_genre, COUNT(id_morceau) 
		FROM `fourchette` 
		GROUP BY id_genre");



 ?>