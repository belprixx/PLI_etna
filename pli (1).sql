-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 03 Mai 2017 à 13:25
-- Version du serveur :  5.7.17-0ubuntu0.16.04.1
-- Version de PHP :  7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pli`
--

-- --------------------------------------------------------

--
-- Structure de la table `cloud`
--

CREATE TABLE `cloud` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `app_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `cloud`
--

INSERT INTO `cloud` (`id`, `name`, `app_token`) VALUES
(1, 'google', ''),
(2, 'dropbox', '');

-- --------------------------------------------------------

--
-- Structure de la table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_cloud` int(11) NOT NULL,
  `access_token` varchar(2555) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `expiry_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `token`
--

INSERT INTO `token` (`id`, `id_user`, `id_cloud`, `access_token`, `token_type`, `expiry_date`, `code`) VALUES
(1, 5, 1, 'ya29.Gls9BBkhrAQj0JidzQvDH2tDkMrJ4UKH05tHq_AvnownK5ZzzpebrgHm6JiJ11MactePYq1eaptdmLUAETgJq6_vx2bb3ERL1GBrkZTWaLZD0kXo18y4cmyaZXcI', 'Bearer', '1493671283758', '4/YW6AHuBVHDEWqVAAAeasCY_zz9jUySzZ-TMFzNZncpA');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `roles` enum('user','admin') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `Firstname`, `Lastname`, `mail`, `password`, `roles`) VALUES
(1, 'theo', 'tison', 'theoTest@gmail.com', '098f6bcd4621d373cade4e832627b4f6', 'user'),
(2, 'theo', 'test', 'theo@gmail.com', 'f71dbe52628a3f83a77ab494817525c6', 'admin'),
(3, 'theo', 'tison', 'test@test.fr', '813ffe9e5f06a3a119e33e554de38e46', 'user'),
(4, 'sego', 'sego', 'sego@sego.fr', '13e69beb69b9e8fd523296d9c53b1d48', 'user'),
(5, 'sego', 'sego', 'sego@test.fr', '13e69beb69b9e8fd523296d9c53b1d48', 'user');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `cloud`
--
ALTER TABLE `cloud`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `cloud`
--
ALTER TABLE `cloud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
