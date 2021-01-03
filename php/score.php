<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Informations concernant la base de données
$host = "localhost";
$db_name = "joueur_base";
$username = "root";
$password = "root"; // Car travail sur MacOS, sinon "";

try{
    $db = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $db->exec("set names utf8");
}catch(PDOException $exception){
    echo "Erreur de connexion : " . $exception->getMessage();
}


// On récupère les informations du fichier js
$myarray = &$_POST ;

$pseudo=$myarray["pseudo"];
$score=$myarray["score"];

$today = date("y-m-d");

// On insère les informations du joueur dans la BDD
$sql = "INSERT INTO `Utilisateurs` (`ID`, `pseudo`, `dateInscription`, `score`) VALUES (NULL, '$pseudo', '$today', '$score')";

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();

?>
