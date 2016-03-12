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

//	$req2 = $bdd->query("SELECT COUNT(*) AS qte FROM rf_genre_morceau, rf_morceau, rf_genre WHERE rf_genre.id_genre = rf_genre_morceau.id_genre, rf_morceau.id_morceau = rf_genre_morceau.id_morceau");

 ?>