-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : Dim 03 jan. 2021 à 14:12
-- Version du serveur :  5.7.30
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données : `geograministe_base`
--

-- --------------------------------------------------------

--
-- Structure de la table `tbl_objets`
--

CREATE TABLE `tbl_objets` (
  `id` int(20) NOT NULL,
  `type` text NOT NULL,
  `nom` text NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `minZoom` int(20) NOT NULL,
  `image` text NOT NULL,
  `iconLrg` float NOT NULL,
  `iconHtr` float NOT NULL,
  `indice` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tbl_objets`
--

INSERT INTO `tbl_objets` (`id`, `type`, `nom`, `lat`, `lng`, `minZoom`, `image`, `iconLrg`, `iconHtr`, `indice`) VALUES
(1, 'demarrage', 'Enveloppe', 48.841, 2.58782, 17, 'assets/Enveloppe_Debut_Filtre.png', 100, 72.63, 'Clique sur moi pour m\'ouvrir'),
(2, 'bloqueparobjet', 'Lettre', 48.841, 2.58782, 17, 'assets/Lettre_Debut.png', 100, 140.77, 'Pour me lire, tu as besoin d\'une paire de lunettes magique qui se trouve à la Cité des Sciences'),
(3, 'recuperable', 'Lunettes', 48.8956, 2.38796, 13, 'assets/Lunettes.png', 200, 80.1, 'Ramène moi à l\'ENSG'),
(4, 'objet', 'Eurostar', 48.8823, 2.35601, 17, 'assets/Eurostar.png', 300, 105.21, 'Direction l\'Angleterre'),
(5, 'bloqueparobjet', 'Caisse', 51.5333, -0.1333, 13, 'assets/Malle.png', 100, 48.27, 'Pour m\'ouvir, tu dois récuperer une clé.\nCette clé se trouve au niveau de l\'école primaire de la femme dont tu dois trouver l\'identité.\nPour savoir de qu\'il s\'agit, rend toi au niveau de l\'horloge la plus célèbre du monde.'),
(6, 'objet', 'bigben', 51.5007, -0.124625, 17, 'assets/Bigben.png', 86.84, 300, 'Actrice née à Paris, elle a défendue à l\'ONU que le féminisme n\'est pas qu\'une histoire de femmes.\nElle est rendue célèbre pour avoir incarné la meilleure amie du jeune Harry Potter'),
(7, 'recuperable', 'Clé', 51.7681, -1.25636, 17, 'assets/Cle.png', 262.7, 100, 'Clique sur moi pour me récupérer'),
(8, 'recuperable', 'Lettre', 51.5333, -0.1333, 13, 'assets/Lettre_Caisse.png', 200, 46.88, 'Récupère moi, puis file à l\'aéroport le plus important du Royaume Unis pour atteindre ta prochaine destination.'),
(9, 'objet', 'avion', 51.47, -0.4542, 17, 'assets/Avion_USA.png', 430.58, 200, 'Direction les USA'),
(10, 'bloqueparcode', 'Caisse2', 37.0902, -95.7129, 13, 'assets/Malle_2.png', 100, 48.27, 'Pour m\'ouvrir tu dois décoder un message, le nom d\'une ex-first Lady. Pour cela, procure-toi un dictionnaire dans ce qui fût sa maison pendant 8 ans'),
(11, 'libereunobjet', 'dictionnaire', 38.8966, -77.0365, 17, 'assets/Dictionnaire_Ferme.png', 300, 422.31, 'Ouvre moi'),
(12, 'libereunobjet', 'dictionnaire', 38.8966, -77.0365, 17, 'assets/Dictionnaire_Ouvert.png', 500, 575.08, 'Lis moi avec attention pour retenir mon système'),
(13, 'recuperable', 'Cassette', 37.0902, -95.7129, 13, 'assets/Cassette.png', 100, 48.27, 'Ajoute moi dans ta valise puis trouve, dans la ville de naissance de cette First Lady, une voiture qui t\'emmènera à la prochaine étape'),
(14, 'objet', 'voiture', 41.8781, -87.6298, 17, 'assets/Voiture.png', 199, 107, 'Direction Houston'),
(15, 'bloqueparobjet', 'papiercadeau', 29.798, -95.398, 13, 'assets/Cadeau.png', 100, 100, 'Trouve une paire de ciseaux, tombée au fond du Lac américain E.V. Spence, pour m\'ouvrir et découvrir mon contenu !'),
(16, 'recuperable', 'Ciseaux', 31.9125, -100.549, 17, 'assets/Ciseaux.png', 147, 143.5, '...'),
(17, 'recuperable', 'Micro', 29.798, -95.398, 13, 'assets/Micro.png', 152, 124, 'Va jusqu\'à l\'aéroport international Hartsfield Jackson d\'Atlanta pour l\'une des dernières étapes.'),
(18, 'objet', 'avionbamako', 33.6407, -84.4277, 17, 'assets/Avion_Bamako.png', 430.58, 300, 'Direction Bamako'),
(19, 'code', 'caisse3', 12.5409, -7.948, 13, 'assets/Malle.png', 100, 48.7, 'J\'éspère que tu te souviens du dictionnaire de la Maison Blanche...\n Tu en auras besion pour m\'ouvrir'),
(20, 'recuperable', 'Telephone', 12.5409, -7.948, 13, 'assets/Telephone.png', 71.33, 130.66, 'Je te félicite, tu as récupéré tous les objets ! Maintenant file les donner à la Chancelière que tu trouveras sur son lieu de travail'),
(21, 'objet', 'parlement', 52.5177, 13.3765, 17, 'assets/Angela.png', 377, 464, 'Le monde est sauvé ! Ouf, on a eu chaud...');
