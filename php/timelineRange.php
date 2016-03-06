<?php 
	session_start();
    require_once('php/connexion.php'); 

    $str = $_POST['data'];
    $new_periode = explode(",",$str);
    $reponse = $bdd->query("SELECT * FROM rf_morceau, rf_artiste WHERE rf_morceau.id_artiste = rf_artiste.id_artiste AND annee BETWEEN'.$new_periode[0].'AND'.$new_periode[1].'");

?>