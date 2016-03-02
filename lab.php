<?php
session_start();
require_once('php/connexion.php');
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Rockfort | Le Lab</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/style.css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="js/jquery.range.css">
        <script src="js/jquery-1.12.0.min.js"></script>
        <script type="text/javascript" src="js/soundmanager2.js"></script>
        <script src="js/bar-ui.js"></script>
        <link rel="stylesheet" href="css/bar-ui.css" />
        <link rel="icon" type="image/png" href="img/favicon/favicon-196x196.png" sizes="196x196" /><link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96" /><link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32" /><link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16" /><link rel="icon" type="image/png" href="img/favicon/favicon-128.png" sizes="128x128" /><meta name="msapplication-TileImage" content="mstile-144x144.png" /><meta name="msapplication-square70x70logo" content="mstile-70x70.png" /><meta name="msapplication-square150x150logo" content="mstile-150x150.png" /><meta name="msapplication-wide310x150logo" content="mstile-310x150.png" /><meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
        <!-- demo for this page only, you don't need this stuff -->
        <script src="js/demo.js"></script>
        <link rel="stylesheet" href="css/demo.css" />
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
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
        });
        } ) ;
        </script>
    </head>
    <body id="leLab">
        <div id="contentLab">
            <div id="lab">
                <a href="index.html"><img id="logo" src="img/logo/logo_rock_2.png" /></a>
                <h1>LE LAB</h1>
                <hr/>
                <button id="info">i</button>
                
                <div id="equalizer">
                    <div id="viz_equalizer"></div>
                    <h3>Paramètres</h3>
                    <div id="parametre"></div>
                </div>
                
                <div id="mots"></div>
                
                
                <div id="suggestion">
                    <h3>Ecoute aussi...</h3>
                    <div id="sug1" >
                        <img src="img/pochette-bdd.jpg"/>
                        <h4 class="artiste">The Rolling Stone</h4>
                        <h4 class="titre">Angie</h4>
                        <br/>
                        <h5 class="genre">Genre</h5>
                    </div>
                    <div id="sug2" >
                        <img src="img/pochette-bdd.jpg"/>
                        <h4 class="artiste">The Rolling Stone</h4>
                        <h4 class="titre">Angie</h4>
                        <br/>
                        <h5 class="genre">Genre</h5>
                    </div>
                    <div id="sug3" >
                        <img src="img/pochette-bdd.jpg"/>
                        <h4 class="artiste">The Rolling Stone</h4>
                        <h4 class="titre">Angie</h4>
                        <br/>
                        <h5 class="genre">Genre</h5>
                    </div>
                </div>
            </div>
        </div>
        <div id="playlist">
            <h2>Playlist</h2> <img id="icoCasque"src="img/icones/casque.png" />
            <div class="sm2-bar-ui fixed playlist-open flat">
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
                            <a href="#play" class="sm2-inline-button play-pause">Play / pause</a>
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
                <div class="bd sm2-playlist-drawer sm2-element">
                    <!-- playlist content is mirrored here -->
                    <div class="sm2-playlist-wrapper">
                        <ul class="sm2-playlist-bd">
                            <!-- standard one-line items -->
                            
                                <?php
                                // On récupère tout le contenu de la table jeux_video
                                $reponse = $bdd->query('SELECT * FROM rf_morceau, rf_artiste WHERE rf_morceau.id_artiste = rf_artiste.id_artiste');
                                // On affiche chaque entrée une à une
                                while ($donnees = $reponse->fetch()){
                                ?>
                                
                            <li class="toggleSubMenu">
                                <a href="mp3/004-MarvinGaye-WhatsGoingOn.mp3">
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
                        </ul>
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
    </body>
</html>