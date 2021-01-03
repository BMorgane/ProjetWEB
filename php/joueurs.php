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

// On récupère tous les élements de la table Utilisateurs en les classant par scores décroissants
$sql = "SELECT * FROM Utilisateurs ORDER BY score DESC";

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();

while($row = $query->fetch(PDO::FETCH_ASSOC))
{
  $tableauScore []= $row;
}

// On encode en json et on envoie, on ajoute JSON_NUMERIC_CHECK pour le bon encodage des nombres !
echo json_encode($tableauScore, JSON_NUMERIC_CHECK);
?>
