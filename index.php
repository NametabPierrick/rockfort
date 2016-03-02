<?php
    session_start();
    require_once('php/connexion.php');
    echo $_SESSION['periode'];
?>

<!DOCTYPE HTML>
<html>

<head>
    <title>Rockfort</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="js/jquery.range.css">
    <script src="js/jquery-1.12.0.min.js"></script>
    <link rel="icon" type="image/png" href="img/favicon/favicon-196x196.png" sizes="196x196" /><link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96" /><link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32" /><link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16" /><link rel="icon" type="image/png" href="img/favicon/favicon-128.png" sizes="128x128" /><meta name="msapplication-TileImage" content="mstile-144x144.png" /><meta name="msapplication-square70x70logo" content="mstile-70x70.png" /><meta name="msapplication-square150x150logo" content="mstile-150x150.png" /><meta name="msapplication-wide310x150logo" content="mstile-310x150.png" /><meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
</head>

<body id="home">
    
    <div id="overlay"></div>
    
    <button id="credit">Crédits</button>

    <div id="table">
        <div id="table-cell">
            <div id="contentHome">
                 <div class="logo-rockfort"></div>

                <p> Toi, petit amateur de la musique, tu as forcément déjà entendu les grands noms de la musique rock, mais les connais-tu vraiment ? Tu t’apprêtes à découvrir les 250 chansons rock du classement Rolling Stones sous un nouveau jour. Nous t’avons préparé des informations inédites à travers une expérience originale et interactive. <br><br>Pour commencer ton voyage, selectionne une période à l’aide de la timeline ci-dessous. Es-tu prêt ?</p> 
    
                <input class="range-slider" type="hidden" value="1949,2009"/>
   
                <button id="submit"><a href="lab.php">Let's Rock</a></button>
            </div>
        </div>
    </div>

   

    <script src="js/jquery.range.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $('.single-slider').jRange({
                from: -2.0,
                to: 2.0,
                step: 0.5,
                scale: [-2.0,-1.0,0.0,1.0,2.0],
                format: '%s',
                width: 300,
                showLabels: true,
                snap: true
            });
            $('.range-slider').jRange({
                from: 1949,
                to: 2009,
                step: 1,
                scale: [1949,2009],
                format: '%s',
                width: 600,
                showLabels: true,
                isRange : true
            });
        });
    </script>

</body>
</html>