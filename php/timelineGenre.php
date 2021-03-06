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

	$requete = $bdd->query("SELECT * FROM couteau");

	$nbmax = $bdd->query("SELECT MAX(compteur) FROM couteau");

	$unwantedchars = array('-','\'',' ');
	$unwantedchars2 = array('é','è','ê','ë');
?>	
	<table id="tabassos">
<?php
	while ($resultat = $requete->fetch()){
?>
		<tr class="genreassociation">
			<td class="iddugenre"><?php echo strtolower(str_replace($unwantedchars2, 'e', str_replace($unwantedchars, '', $resultat["nom_genre"]))); ?></td>
			<td class="compteurdugenre"><?php echo $resultat["compteur"]; ?></td>
		</tr>
	
<?php	
	} 
	$requete->closeCursor();
?>
	</table>