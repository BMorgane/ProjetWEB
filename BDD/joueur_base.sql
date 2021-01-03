-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : Dim 03 jan. 2021 à 14:13
-- Version du serveur :  5.7.30
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données : `joueur_base`
--

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateurs`
--

CREATE TABLE `Utilisateurs` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(15) NOT NULL,
  `dateInscription` date NOT NULL,
  `score` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Utilisateurs`
--

INSERT INTO `Utilisateurs` (`ID`, `pseudo`, `dateInscription`, `score`) VALUES
(1, 'Blop', '2020-12-29', 100),
(2, 'Momo', '2020-12-29', 32),
(3, 'Zoz', '2020-12-30', 80),
(4, 'Mumu', '2021-01-02', 90),
(5, 'Tom', '2021-01-02', 75),
(6, 'Hugo', '2021-01-02', 33),
(7, 'Valentin', '2021-01-02', 5),
(8, 'Antoine', '2021-01-02', 50),
(9, 'Antho', '2021-01-02', 15),
(10, 'Eyzelt', '2021-01-02', 83),
(11, 'Nanohr', '2021-01-02', 100),
(12, 'Bgdu95', '2021-01-02', 81),
(13, 'Nico', '2021-01-02', 99),
(14, 'Sophie', '2021-01-02', 38),
(15, 'Leti', '2021-01-02', 75),
(16, 'Greg', '2021-01-03', 95),
(17, 'Lola', '2021-01-03', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
