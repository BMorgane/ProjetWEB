<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Informations concernant la base de données
$host = "localhost";
$db_name = "geograministe_base";
$username = "root";
$password = "root"; // Car travail sur MacOS, sinon "";

try{
    $db = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $db->exec("set names utf8");
}catch(PDOException $exception){
    echo "Erreur de connexion : " . $exception->getMessage();
}

// On récupère tous les élements de la table objet
$sql = "SELECT * FROM tbl_objets";

// On prépare la requête
$query = $db->prepare($sql);

// On exécute la requête
$query->execute();

while($row = $query->fetch(PDO::FETCH_ASSOC))
{
  $tableauObjet []= $row;
}

// On encode en json et on envoie, on ajoute JSON_NUMERIC_CHECK pour le bon encodage des nombres !
echo json_encode($tableauObjet, JSON_NUMERIC_CHECK);
?>
