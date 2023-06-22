-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 23, 2023 at 12:26 AM
-- Server version: 10.5.21-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yacfsbjb_huma`
--

-- --------------------------------------------------------

--
-- Table structure for table `amis`
--

CREATE TABLE `amis` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `etat_acc` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `amis`
--

INSERT INTO `amis` (`id`, `id_user1`, `id_user2`, `etat_acc`) VALUES
(14, 6, 5, 1),
(32, 1, 21, 1),
(35, 1, 20, 1),
(30, 19, 6, 1),
(29, 5, 1, 2),
(27, 1, 6, 1),
(36, 1, 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `annonces`
--

CREATE TABLE `annonces` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `link_vedio` text NOT NULL,
  `court_description` varchar(300) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `auteur` varchar(100) NOT NULL,
  `adresse` varchar(300) NOT NULL,
  `Departement` varchar(100) NOT NULL,
  `Ville` varchar(100) NOT NULL,
  `Region` varchar(100) NOT NULL,
  `codePostal` varchar(10) NOT NULL,
  `latitude` text NOT NULL,
  `longitude` text NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `type` varchar(80) NOT NULL DEFAULT '1',
  `categorie` varchar(80) NOT NULL DEFAULT '5',
  `nbre_vue` int(11) NOT NULL,
  `etat` int(11) NOT NULL DEFAULT 1,
  `propos_livraison` int(11) NOT NULL DEFAULT 0,
  `qty` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `annonces`
--

INSERT INTO `annonces` (`id`, `user_id`, `titre`, `link_vedio`, `court_description`, `description`, `auteur`, `adresse`, `Departement`, `Ville`, `Region`, `codePostal`, `latitude`, `longitude`, `Date`, `type`, `categorie`, `nbre_vue`, `etat`, `propos_livraison`, `qty`) VALUES
(1, 1, 'fdfffff', '', 'fffff', 'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu\'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.', 'nasri.najah@gmail.com', 'El Kram, Tunis, Tunisie', 'ffff', 'ddd', 'ffff', '44555', '36.846806', '10.291934', '2022-03-04', '5', '5', 513, 0, 0, 1),
(2, 5, 'annonce foued', '', 'vgbhjnk,', 'vghbjnk,', 'foued.chnini@gmail.com', 'Sidi Daoud, Marsa, Tunis, Tunisie', 'ghbjnk,l', 'hbjnk,', 'fghbjk', '5852', '36.865865', '10.304371', '0000-00-00', '4', '4', 34, 1, 0, 1),
(3, 1, 'ffff', '', 'ffff', 'ddd', 'nasri.najah@gmail.com', 'La Soukra, Tunis, Tunisie', 'dddd', 'dddd', 'ddd', '444', '36.864583', '10.276251', '2022-03-05', '2', '2', 20, 1, 0, 1),
(4, 1, 'eeee²', '', 'eee', '', 'nasri.najah@gmail.com', 'Aouina, Rue Cheikh Mohamed Enneifer, Tunis 2036', 'zzzz', 'zzzzz', 'zzzz', '5052', '36.862466', '10.268842', '2022-03-07', '5', '5', 7, 1, 0, 1),
(5, 1, 'ss', '', 'sssssss', '', 'nasri.najah@gmail.com', 'Tunis, Tunisie', 'jjj', 'hjj', 'jjj', '5522', '36.850280', '10.229929', '2022-03-07', '5', '4', 12, 1, 0, 1),
(9, 1, 'eeee', '', 'eeee', '', 'nasri.najah@gmail.com', 'Les Jardins de l\'Aouina', '', '', '', '', '36.851860', '10.254004', '2022-03-15', '3', '47', 10, 1, 0, 1),
(10, 1, 'fsdfsdf', '', 'dfds', '', 'nasri.najah@gmail.com', 'Dar Fadhal, Tunis, Tunisie', '', '', '', '', '36.860926', '10.240213', '2022-03-15', '2', '124', 3, 1, 0, 1),
(11, 1, 'hhhhhhhh', '', 'hhhhhhhh', 'jjjjjjjjjjjjjjjjjjjjjjjj\nkkkkkk**bold**hhhhh**bold**', 'nasri.najah@gmail.com', 'La Soukra, Tunis, Tunisie', '', '', '', '', '36.872864', '10.224764', '2022-03-15', '1', '124', 9, 1, 0, 1),
(12, 1, 'cgfhbjkl,l;,kk', '', 'k,k,k,k,k', 'k,k,k,kk', 'nasri.najah@gmail.com', 'El Marsa, Tunis, Tunisie', '', '', '', '', '36.877274', '10.278117', '2022-05-06', '1', '5', 0, 1, 0, 1),
(13, 1, 'njdngjjn', '', 'dgfijdfi', 'k,kok', 'nasri.najah@gmail.com', 'La Soukra, Tunis, Tunisie', '', '', '', '', '36.872965', '10.265774', '2022-05-09', '1', '5', 2, 1, 0, 1),
(14, 1, 'rftgyhj', '', 'dcfvghbjnk', 'fvghbjn', 'nasri.najah@gmail.com', 'Manouba, Oued Ellil', '', '', '', '', '36.828199', '10.073457', '2022-05-09', '1', '5', 2, 1, 0, 1),
(15, 1, 'bhk,l', '', 'BNJKLM', 'HJKL', 'nasri.najah@gmail.com', 'Avenue Tayeb Mhiri Route Gp5 Km 14, Mornaguia 1110', '', '', '', '', '36.763003', '10.008836', '2022-05-09', '1', '5', 1, 1, 0, 1),
(16, 1, 'iuuçuçiçiç', '', 'ççççiçiç', 'çççççç', 'nasri.najah@gmail.com', 'Boumhel El Bassatine, Tunis, Tunisie', '', '', '', '', '36.702387', '10.295177', '2022-05-09', '1', '5', 1, 1, 0, 1),
(17, 1, 'vvv', '', 'vvv', 'cvv', 'nasri.najah@gmail.com', 'Av. de l\'UMA, Ariana, Tunisie', '', '', '', '', '36.861596', '10.217586', '2022-05-09', '1', '5', 1, 1, 0, 1),
(18, 1, 'VETEMENT', '', 'VET VET VET', 'VET VET VETVET VET VETVET VET VETVET VET VETVET VET VETVET VET VETVET VET VET', 'nasri.najah@gmail.com', 'Avenue Mongi Slim Residence Rania M10 El Aouina, L\'aouina 2045, Tunis, Tunisie', '', '', '', '', '36.857751', '10.252604', '2022-05-09', '1', '157', 7, 1, 0, 1),
(19, 1, 'FFTFT', '', 'KJKJK', 'JBJJ', 'nasri.najah@gmail.com', 'Ctre Urbain Nord , Tunis, Tunisie', '', '', '', '', '36.848581', '10.195393', '2022-05-09', '1', '157', 0, 1, 0, 1),
(20, 1, 'hhh', '', 'hhh', 'hhhh', 'nasri.najah@gmail.com', 'Ctre Urbain Nord, Tunis, Tunisie', '', '', '', '', '36.849416', '10.197050', '2022-05-09', '1', '157', 3, 1, 0, 1),
(21, 1, 'dddd', '', 'dddd', 'ddddd', 'nasri.najah@gmail.com', 'Ctre Urbain Nord, Tunis, Tunisie', '', '', '', '', '36.850570', '10.193624', '2022-05-09', '1', '157', 1, 1, 0, 1),
(23, 1, 'llllll', '', 'jjjjj', 'ol,n', 'nasri.najah@gmail.com', 'La Charguia II , Tunis, Tunisie', '', '', '', '', '36.856894', '10.209942', '2022-05-09', '1', '157', 0, 1, 0, 1),
(24, 1, 'yuoikpl', '', 'trftguyhjik', 'tyuijkl', 'nasri.najah@gmail.com', 'Gp 10, Av. Taieb Mhiri, Ariana 2080, Tunisie', '', '', '', '', '36.858906', '10.198614', '2022-05-09', '1', '157', 0, 1, 0, 1),
(25, 1, 'ccccc', '', 'ccccc', 'ccccc', 'nasri.najah@gmail.com', 'Av. de l\'UMA, Tunis, La Soukra', '', '', '', '', '36.862614', '10.212176', '2022-05-09', '1', '157', 0, 1, 0, 1),
(26, 1, 'fgbhnj', '', 'bhjnk,l', 'hjk,l;', 'nasri.najah@gmail.com', 'La Soukra, Ariana, Tunisie', '', '', '', '', '36.870748', '10.251372', '2022-05-09', '1', '157', 1, 1, 0, 1),
(27, 1, 'dddddd', '', 'ddddd', 'ddddd', 'nasri.najah@gmail.com', 'Cité Taïeb Mhiri, El Aouina , Tunis, Tunisie', '', '', '', '', '36.854117', '10.264823', '2022-05-09', '1', '157', 2, 1, 0, 1),
(28, 1, 'VBN?', '', 'BNNN', 'BNNN', 'nasri.najah@gmail.com', 'Avenue De La Bourse, Tunis, Tunisie', '', '', '', '', '36.848101', '10.267802', '2022-05-09', '1', '157', 0, 1, 0, 1),
(29, 1, 'Echange avec spadri ou jogging!', '', 'je voudrais bien échanger avec vous ces articles pour un spadri  ou jogging nike authentique', 'je voudrais bien échanger avec vous ces articles pour un spadri  ou jogging nike authentique\r\nPointure : 43\r\nTaille: L/XL', 'nasri.najah@gmail.com', 'avenue abdelaziz saoud El Manar 3, 37 Rue Ali Zlitni, Tunis', '', '', '', '', '36.842431', '10.162825', '2022-05-10', '1', '157', 0, 3, 0, 1),
(30, 5, 'Tt', '', 'Gty', '', 'foued.chnini@gmail.com', '19 Rue Ahmed Toulane, 1 1004', '', '', '', '', '36.840310\r\n\r\n', '10.180935', '2022-06-27', '1', '5', 3, 1, 0, 1),
(31, 5, 'Tt', '', 'Tt', '', 'foued.chnini@gmail.com', 'Rue De Béja, Ariana, Tunisie', '', '', '', '', '36.855884', '10.200805', '2022-06-27', '1', '5', 2, 1, 0, 1),
(32, 5, 'Tt', '', 'Ttt', 'Tttt', 'foued.chnini@gmail.com', 'Borj Louizir, Ariana, Tunisie', '', '', '', '', '36.861871', '10.205289', '2022-08-12', '1', '138', 0, 1, 0, 1),
(33, 5, 'Tt adr', '', 'Tt', 'Tt', 'foued.chnini@gmail.com', 'La Soukra, Tunis, Tunisie', '', '', '', '', '36.864697', '10.254631', '2022-08-12', '1', '138', 1, 1, 0, 1),
(34, 5, 'Tttrrtr', '', 'Xhgugjc', 'Gugugj', 'foued.chnini@gmail.com', '8 Rue De Monastir, El Aouina, Tunis, Tunisie', '', '', '', '', '36.851980', '10.267740', '2022-08-12', '1', '138', 1, 1, 0, 1),
(35, 5, 'Ttyy', '', 'Gtg', 'Cch', 'foued.chnini@gmail.com', '28 Rue de Paris, Boulogne-Billancourt, France', '', '', '', '', '48.839531', '2.248431', '2022-08-12', '1', '138', 0, 1, 0, 1),
(36, 5, 'Qalut ', '', 'Courte description pour qalut', '<div><b>bonjour </b>je suis <i>Nejeh&nbsp;</i></div><div><ol><li>N</li><li>E</li><li>j</li><li>e</li></ol><div><ol><li>h</li></ol></div><div></div><div></div><div></div><div><div></div></div><div></div></div>', 'foued.chnini@gmail.com', 'France R21 - Dubaï - Émirats arabes unis', '', '', '', '', '25.162359', '55.397247', '2022-08-18', '1', '138', 1, 1, 0, 1),
(37, 6, 'Hjj', '', 'Ggh', 'fyjbbbkltuikjjttyucgjbbghhhhjjghjj', 'nasri_nejah@yahoo.fr', 'Saudi Arabia - Dubaï - Émirats arabes unis', '', '', '', '', '25.225267', '55.174198', '2022-08-18', '1', '138', 1, 1, 0, 1),
(38, 5, 'Bb', '', 'Jh', '<b>hyuj</b><div><b><i>hhjjb</i></b></div><div><div><ul><li><b><i>huijj</i></b></li><li><b><i>hyuj</i></b></li></ul><div><ul><li><b><i>huujjj</i></b></li></ul><div><div><b><i><strike>juujvgyh</strike></i></b></div></div></div></div></div>', 'foued.chnini@gmail.com', 'Gafsa Palace hotel, Gafsa, Tunisie', '', '', '', '', '34.434040', '8.820525', '2022-08-18', '1', '164', 1, 1, 0, 1),
(39, 5, 'Voiture', '', 'Belle occasion', '<div><b>BMW </b>année 2005&nbsp;</div><div><ul><li>4 cylindre&nbsp;</li></ul><div><ul><li>1.7l</li></ul><div><ul><li>système alarme&nbsp;</li></ul><div><ul><li>climatisation&nbsp;</li></ul><div><i>à cause de déménagement&nbsp;</i></div></div></div></div></div>', 'foued.chnini@gmail.com', 'Belgique, Rue du Marché Aux Herbes, Bruxelles, Belgique', '', '', '', '', '50.847125', '4.353564', '2022-08-18', '1', '129', 29, 1, 0, 1),
(40, 5, 'soins médical', '', 'soins à domiciles', '', 'foued.chnini@gmail.com', '4 Les Pres du Roi, 59530 Le Quesnoy, France', '', '', '', '', '50.259611', '3.632836', '2022-09-12', '1', '88', 150, 1, 0, 1),
(41, 5, 'FF', '', 'FF', '', 'foued.chnini@gmail.com', 'Parc Astérix, Plailly, France', '', '', '', '', '49.134219', '2.570973', '2022-09-20', '1', '88', 2, 1, 0, 1),
(42, 5, 'kk', '', 'kk', '', 'foued.chnini@gmail.com', 'Paris Las Vegas, South Las Vegas Boulevard, Las Vegas, Nevada, États-Unis', '', '', '', '', '36.1123993', '-115.1708278', '2022-09-20', '1', '88', 1, 1, 0, 1),
(43, 5, 'ee', '', 'eeee', '', 'foued.chnini@gmail.com', '75015 Paris, France', '', '', '', '', '48.842817', '2.293188', '2022-09-20', '1', '88', 0, 1, 0, 1),
(44, 5, 'dd', '', 'dd', '', 'foued.chnini@gmail.com', 'Paris, 75, France', '', '', '', '', '48.852960', '2.352869', '2022-09-20', '1', '90', 1, 1, 0, 1),
(45, 5, 'rr', '', 'rr', '', 'foued.chnini@gmail.com', 'Frankfurt am Main, Allemagne', '', '', '', '', '50.129492', '8.597417', '2022-09-21', '1', '90', 2, 1, 0, 1),
(46, 5, 'jjj', '', 'jj', '', 'foued.chnini@gmail.com', '23 rue salambou ain, zaghouan', '', '', '', '', '36.852590', '10.282995', '2022-09-21', '1', '91', 1, 1, 0, 1),
(47, 5, 'ff', '', 'dd', '', 'foued.chnini@gmail.com', 'SSKM Hospital & PG OPD Counter, Bhowanipore, Calcutta, Bengale-Occidental, Inde', '', '', '', '', '22.540760', '88.342473', '2022-09-21', '1', '152', 0, 1, 0, 1),
(48, 5, 'ff', '', 'dd', '', 'foued.chnini@gmail.com', 'DD Hills, Devarayana Durga, Karnataka, Inde', '', '', '', '', '13.374127', '77.212277', '2022-09-21', '1', '112', 2, 1, 0, 1),
(49, 5, 'gg', '', 'ff', '', 'foued.chnini@gmail.com', 'SS2, Petaling Jaya, Selangor, Malaisie', '', '', '', '', '3.120666', '101.623333', '2022-09-21', '1', '112', 1, 1, 0, 1),
(50, 5, 'll', '', 'll', '', 'foued.chnini@gmail.com', 'Lloret de Mar, Espagne', '', '', '', '', '41.705559', '2.834000', '2022-09-21', '4', '47', 0, 1, 0, 1),
(51, 5, 'rr', '', 'ddd', '', 'foued.chnini@gmail.com', 'Eemshaven, Pays-Bas', '', '', '', '', '53.436973', '6.843054', '2022-09-21', '4', '47', 0, 1, 0, 1),
(52, 5, 'ttt', '', 'tt', '', 'foued.chnini@gmail.com', 'The Dubai Mall - Dubaï - Émirats arabes unis', '', '', '', '', '25.197380', '55.279283', '2022-09-21', '4', '47', 1, 1, 0, 1),
(53, 5, 'rr', '', 'rr', '', 'foued.chnini@gmail.com', '21000 Dijon France', '', '', '', '', '47.318283', '5.045591', '2022-09-27', '1', '110', 1, 1, 0, 1),
(54, 5, 'ss', '', 'ss', '', 'foued.chnini@gmail.com', 'Frankfurt am Main, Allemagne', '', '', '', '', '50.158975', '8.369108', '2022-09-27', '1', '127', 8, 1, 0, 1),
(55, 5, 'dd', '', 'ss', '', 'foued.chnini@gmail.com', 'Frankfurt am Main, Allemagne', '', '', '', '', '50.123329', '8.681875', '2022-09-27', '1', '124', 5, 1, 0, 1),
(56, 5, 'mecanicien', '', 'ddd', '', 'foued.chnini@gmail.com', 'Paris, France', '', '', '', '', '48.846751', '2.346967', '2022-09-27', '1', '47', 12, 1, 0, 1),
(57, 5, 'ss', '', 'ss', '', 'foued.chnini@gmail.com', 'France', '', '', '', '', '46.501256', '2.430156', '2022-09-27', '2', '133', 305, 1, 0, 1),
(78, 5, 'sssssssssss', '', 'sssssssssssssssssssssssss', '', 'foued.chnini@gmail.com', 'Bizerte, Tunisie', '', '', '', '', '37.292524', '9.861327', '2023-01-11', '1', '134', 14, 0, 0, 1),
(79, 5, 'cccccccccccc', '', 'ddddddddddd', '', 'foued.chnini@gmail.com', 'Bizerte, Tunisie', '', '', '', '', '37.284193', '9.854633', '2023-01-11', '1', '138', 5, 1, 0, 1),
(80, 5, 'fffa', '', 'dddd', '', 'foued.chnini@gmail.com', 'Tozeur, Tunisie', '', '', '', '', '33.920100', '8.112373', '2023-01-12', '1', '133', 3, 1, 0, 1),
(81, 5, 'xxxxxxxxxxx', '', 'xxxxxxxxxxxx', '', 'foued.chnini@gmail.com', 'Bizerte, Tunisie', '', '', '', '', '37.293543', '9.857370', '2023-01-12', '1', '133', 3, 1, 0, 1),
(82, 5, 'fffffffffffff', '', 'sssssssssssssssss', '', 'foued.chnini@gmail.com', 'Bizerte, Tunisie', '', '', '', '', '37.293691', '9.855374', '2023-01-12', '1', '133', 7, 1, 0, 1),
(83, 5, 'xxxxxxxxxxxxxx', '', 'ssssssssssssssss', '', 'foued.chnini@gmail.com', 'Bizerte, Tunisie', '', '', '', '', '37.293539', '9.855434', '2023-01-12', '1', '133', 154, 1, 0, 1),
(84, 5, 'wwww', '', 'CXWCX', '', 'foued.chnini@gmail.com', 'El Aouina, Tunis', '', '', '', '', '36.855226', '10.261778', '2023-01-12', '1', '88', 3796, 3, 0, 1),
(85, 1, 'Transporteur de personnes', '', 'covoiturage pour personnes ', 'covoiturage <div>pour <b>de personnes</b></div><div><b>ponctualité</b></div><div>professionnalisme</div><div><br></div>', 'nasri.najah@gmail.com', 'Bizerte, Rue Charles de Gaulle, Tunis, Tunisie', '', '', '', '', '36.797690', '10.177777', '2023-01-27', '1', '66', 76, 4, 0, 1),
(86, 6, 'Fruits bio', '', 'fruits bio de saisons', '', 'nasri_nejah@yahoo.fr', '800 N King St, Leesburg, VA 20176, États-Unis', '', '', '', '', '39.130439', '-77.551312', '2023-02-01', '1', '6', 106, 1, 0, 1),
(127, 1, 'Légumes de saisons', '', 'légumes bio frais', '', 'nasri.najah@gmail.com', 'Gaziantep, Turquie', '', '', '', '', '37.054915', '37.394554', '2023-02-20', '1', '7', 9, 1, 0, 1),
(128, 1, 'Borj Lella', 'youtu.be/YLqz1zAjsl4', 'Borj Lella fromge bio', '<div><b><i>Borj Lella</i></b></div><div><ul><li><b><i>Fromage à différents types</i></b></li></ul><div><div><ul><li><b><i>fromage sans matières grasses</i></b></li></ul></div></div></div>', 'nasri.najah@gmail.com', 'Béja, Tunisie', '', '', '', '', '36.733075', '9.186228', '2023-02-25', '4', '14', 1, 1, 0, 1),
(131, 1, 'Épices ', '', 'Plantes épices', '<div>Vente plante épices&nbsp;</div><div><b>plantes riches et bien élaboré</b></div>', 'nasri.najah@gmail.com', 'Tozeur, Tunisie', '', '', '', '', '33.925655', '8.126191', '2023-02-27', '4', '16', 1, 1, 0, 1),
(132, 5, 'Fff', '', 'Dddd', '', 'foued.chnini@gmail.com', 'Ain Zaghouen Nord, Tunis, Tunisie', '', '', '', '', '36.8626346', '10.2866556', '2023-04-07', '1', '13', 32, 1, 0, 1),
(136, 22, 'Amandier', '', 'Amandier', '', 'Ch.foued@tunisip.com', 'Sened, Tunisie', '', '', '', '', '34.5388811', '9.250843699999999', '2023-06-01', '1', '19', 123, 3, 0, 1),
(137, 21, 'Prêt de Brouette', '', 'Je recherche un prêt de brouette ', '', 'al@labonnequipe.fr', 'Larmor-Plage, France', '', '', '', '', '47.705771999999996', '-3.3835219999999997', '2023-06-16', '2', '65', 20, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `annonce_favoris`
--

CREATE TABLE `annonce_favoris` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_annonce` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `annonce_favoris`
--

INSERT INTO `annonce_favoris` (`id`, `id_user`, `id_annonce`, `date`) VALUES
(32, 22, 9, '2023-06-01 16:56:16'),
(33, 1, 137, '2023-06-23 00:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `avis`
--

CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_user_notant` int(11) NOT NULL,
  `nbre_etoile` int(11) NOT NULL,
  `commentaire` varchar(200) NOT NULL,
  `id_annonce` int(11) NOT NULL,
  `id_offre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avis`
--

INSERT INTO `avis` (`id`, `id_user`, `id_user_notant`, `nbre_etoile`, `commentaire`, `id_annonce`, `id_offre`) VALUES
(1, 5, 1, 5, 'bien passé!', 0, 0),
(2, 5, 6, 4, 'Personne responsable et à l\'ecoute!', 0, 0),
(3, 5, 3, 5, 'très bien passé! Membre PRO', 0, 0),
(4, 5, 1, 5, 'Bon collaborateur ', 0, 0),
(5, 5, 1, 5, 'Great', 0, 0),
(6, 5, 1, 5, 'Good', 0, 0),
(7, 6, 1, 5, 'Yes!!', 0, 0),
(8, 6, 1, 5, 'Yes!!', 0, 0),
(9, 1, 0, 4, 'Bon profile', 0, 0),
(10, 5, 1, 5, 'Bon prestataire ', 0, 0),
(11, 5, 1, 5, 'Membre sincère et respectueux !', 0, 0),
(12, 20, 1, 5, 'Bon prestatire', 0, 0),
(13, 5, 0, 5, 'Goooog', 0, 0),
(14, 22, 1, 5, 'Prestataire sérieux ', 0, 0),
(15, 21, 5, 5, 'Bien', 0, 0),
(16, 22, 1, 4, 'Ffgg', 0, 0),
(17, 22, 1, 4, 'Ffgg', 0, 0),
(18, 22, 1, 4, 'Ffgg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `titre` varchar(80) NOT NULL,
  `slug` varchar(80) NOT NULL,
  `parent` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `titre`, `slug`, `parent`) VALUES
(1, 'Alimentation', 'alimentation', 0),
(2, 'Services Domestiques', 'services_domestiques', 0),
(3, 'Services à la Personne', 'services_a_la_personne', 0),
(4, 'Cours', 'cours', 0),
(5, 'Divers', 'divers', 0),
(6, 'Fruits', 'fruits', 1),
(7, 'Légumes', 'legumes', 1),
(8, 'Pain', 'pain', 1),
(9, 'Confitures', 'confitures', 1),
(10, 'Plats préparés', 'plats_prepares', 1),
(11, 'Conserves Maison', 'conserves_maison', 1),
(12, 'Viandes', 'viandes', 1),
(13, 'Œufs', 'oeufs', 1),
(14, 'Fromages', 'fromages', 1),
(15, 'Salaisons', 'salaisons', 1),
(16, 'Epices', 'epices', 1),
(17, 'Graines & Semences', 'graines_semences', 1),
(18, 'Plants & Plantes', 'plants_plantes', 1),
(19, 'Arbres Fruitiers', 'arbres_fruitiers', 1),
(20, 'Animaux de Ferme', 'animaux_de_ferme', 1),
(21, 'Boissons', 'boissons', 1),
(22, 'Paniers Hüma', 'paniers_huma', 1),
(23, 'Offres Commerçants', 'offres_commerçants', 1),
(24, 'Restaurants', 'restaurants', 1),
(25, 'Autres Produits Alimentaires', 'autres_produits_alimentaires', 1),
(46, 'Transports', 'transports', 2),
(47, 'Mécanique', 'mecanique', 2),
(48, 'Electricité', 'electricite', 2),
(49, 'Soudure', 'soudure', 2),
(50, 'Menuiserie', 'menuiserie', 2),
(51, 'Plomberie', 'plomberie', 2),
(53, 'Carrelage', 'carrelage', 2),
(54, 'Maçonnerie', 'maconnerie', 2),
(55, 'Cordonnerie', 'cordonnerie', 2),
(56, 'Dépannage Electro-Ménager', 'depannage_electro_menager', 2),
(57, 'Services Informatiques', 'services_informatiques', 2),
(58, 'Comptabilité', 'comptabilite', 2),
(59, 'Traduction', 'traduction', 2),
(60, 'Autres Dépannages ', 'autres_depannages', 2),
(61, 'Coup de Main', 'coup_de_main', 2),
(62, 'Déménagement', 'demenagement', 2),
(63, 'Installations & Réparations', 'installations_reparations ', 2),
(64, 'Garde d\'Animaux', 'garde_animaux', 2),
(65, 'Autres Services Domestiques', 'autres_services_domestiques', 2),
(66, 'Personnes', 'personnes', 46),
(67, 'Marchandises', 'marchandises', 46),
(68, 'Animaux', 'animaux', 46),
(88, 'Soins', 'soins', 3),
(89, 'S\'inviter', 'inviter', 3),
(90, 'Ménage', 'menage', 3),
(91, 'Cuisine', 'cuisine', 3),
(92, 'Repassage', 'repassage', 3),
(93, 'Jardinage', 'jardinage', 3),
(94, 'Courses à Domicile', 'courses_a_domicile', 3),
(95, 'Musique à Domicile', 'musique_a_domicile', 3),
(96, 'Assistance Administrative', 'assistance_administrative', 3),
(97, 'Assistance Juridique', 'assistance_juridique', 3),
(98, 'Traductions', 'traductions3', 3),
(99, 'Esthétique', 'esthetique', 3),
(100, 'Coiffure', 'coiffure', 3),
(101, 'Couture', 'couture', 3),
(102, 'Garde d\'Enfants', 'garde_enfants', 3),
(103, 'Garde de Nuit à Domicile', 'garde_de_nuit_a_domicile', 3),
(104, 'Covoiturage', 'covoiturage', 3),
(105, 'Autres Services à la Personne', 'autres_services_a_la_personne', 3),
(106, 'à Déjeuner', 'dejeuner', 89),
(107, 'à Cuisiner', 'cuisiner', 89),
(108, 'à Discuter', 'discuter', 89),
(109, 'à Jouer', 'jouer', 89),
(110, 'à se Promener', 'se_promener', 89),
(111, 'Autres raisons', 'autres_raisons', 89),
(112, 'Coaching', 'coaching', 4),
(113, 'Cours Individuels', 'cours_individuels', 4),
(114, 'Cours Collectifs', 'cours_collectifs', 4),
(115, 'Soutien Scolaire', 'soutien_scolaire', 4),
(116, 'Autres Cours', 'autres_cours', 4),
(117, 'Formations', 'formations', 4),
(123, 'Musique', 'musique', 113),
(124, 'Sports', 'sports', 113),
(125, 'Arts Plastiques', 'arts_plastiques', 113),
(126, 'Cuisine', 'cuisine2', 113),
(127, 'Danse', 'danse', 113),
(128, 'Musique', 'musique3', 114),
(129, 'Sports', 'sports3', 114),
(130, 'Arts Plastiques', 'arts_plastiques3', 114),
(131, 'Cuisine', 'cuisine3', 114),
(132, 'Danse', 'danse3', 114),
(133, 'Art', 'art', 5),
(134, 'Artisanat', 'artisanat', 5),
(135, 'Loisirs', 'loisirs', 5),
(136, 'Habillement', 'habillement', 5),
(137, 'Hébergement ', 'hebergement ', 5),
(138, 'Locations & Colocations', 'locations_colocations', 5),
(139, 'Multimédia & Téléphonie', 'multimedia_telephonie', 5),
(140, 'Electro-Ménager', 'electro_menager', 5),
(141, 'Multimédia', 'multimedia', 5),
(142, 'Accessoires de Cuisine', 'accessoires_de_cuisine', 5),
(143, 'Meubles', 'meubles', 5),
(144, 'Animaux Domestiques', 'animaux_domestiques', 5),
(145, 'Matériels & Outillage', 'materiels_outillage', 5),
(146, 'Matériaux de Construction', 'materiaux_de_construction', 5),
(147, 'Pièces détachées', 'pieces_detachees', 5),
(148, 'Véhicules', 'vehicules', 5),
(149, 'Nautisme', 'nautisme', 5),
(150, 'Bois de Chauffage', 'bois_de_chauffage', 5),
(151, 'Autres', 'autres', 5),
(152, 'Equipements', 'equipements', 135),
(153, 'Accessoires', 'Accessoires', 135),
(154, 'Livres', 'livres', 135),
(155, 'Objets déco', 'Objets_deco', 135),
(156, 'Autres Loisirs', 'autres_loisirs ', 135),
(157, 'Vêtements', 'vetements', 136),
(158, 'Chaussures', 'chaussures', 136),
(159, 'Accessoires', 'accessoires2', 136),
(160, 'Gîtes', 'gites', 137),
(161, 'Chambre d\'Hôtes', 'chambre_d_hotes', 137),
(162, 'Hotels', 'hotels', 137),
(163, 'Chez l\'Habitant', 'chez_l_habitant', 137),
(164, 'Echange Appartement/Maison', 'echange_appartement_maison ', 137),
(165, 'Camping-Car', 'camping_car', 137),
(166, 'Parking', 'parking', 137),
(167, 'Emplacement tente', 'emplacement_tente', 137),
(168, 'Autres', 'autres2', 137),
(169, 'Echafaudages', 'echafaudages', 137),
(170, 'Matériels', 'materiels', 137),
(171, 'Matériaux', 'materiaux', 137),
(172, 'Electro-Portatifs', 'electro_portatifs', 137);

-- --------------------------------------------------------

--
-- Table structure for table `historique`
--

CREATE TABLE `historique` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `activite` text NOT NULL,
  `id_activite` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `historique`
--

INSERT INTO `historique` (`id`, `id_user`, `activite`, `id_activite`, `date`) VALUES
(1, 5, 'Vous avez modifié votre profil!', 0, '2023-02-03 23:32:10'),
(2, 6, 'Vous avez modifié votre profil!', 0, '2023-02-03 23:32:50'),
(3, 1, 'Vous avez modifié votre profil!', 0, '2023-02-03 23:34:22'),
(4, 1, 'Vous avez envoyé une invitation à 6', 6, '2023-02-04 00:02:38'),
(5, 1, 'Vous avez envoyé une invitation à 6', 6, '2023-02-04 00:04:47'),
(6, 1, 'Vous avez proposé une offre pour la demande 30', 30, '2023-02-04 00:11:44'),
(7, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-04 01:37:24'),
(8, 6, 'Vous avez proposé une offre pour la demande 87', 87, '2023-02-04 13:27:50'),
(9, 1, 'Vous avez annuler une invitation de 6', 6, '2023-02-07 23:27:02'),
(10, 1, 'Vous avez envoyé une invitation à 6', 6, '2023-02-07 23:27:12'),
(11, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:27:42'),
(12, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:27:45'),
(13, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:27:50'),
(14, 6, 'Vous avez accepté une invitation de 1', 0, '2023-02-07 23:27:53'),
(15, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:27:59'),
(16, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:28:01'),
(17, 6, 'Vous avez accepté une invitation de 1', 1, '2023-02-07 23:28:05'),
(18, 1, 'Vous avez envoyé une invitation à 5', 5, '2023-02-08 16:43:15'),
(19, 5, 'Vous avez accepté une invitation de 1', 5, '2023-02-08 16:43:42'),
(20, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 16:45:36'),
(21, 5, 'Vous avez accepté une invitation de 1', 1, '2023-02-08 18:09:28'),
(22, 5, 'Vous avez accepté une invitation de 1', 1, '2023-02-08 18:14:49'),
(23, 5, 'Vous avez proposé une offre pour la demande 87', 87, '2023-02-08 18:48:52'),
(24, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 18:52:45'),
(25, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 19:52:07'),
(26, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:04:53'),
(27, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:11:01'),
(28, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:14:26'),
(29, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:18:31'),
(30, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:26:21'),
(31, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:36:05'),
(32, 5, 'Vous avez annuler une invitation de 1', 1, '2023-02-08 22:36:29'),
(33, 5, 'Vous avez envoyé une invitation à 1', 1, '2023-02-08 22:36:30'),
(34, 5, 'Vous avez modifié votre profil!', 0, '2023-02-08 22:43:50'),
(35, 1, 'Vous avez modifié votre profil!', 0, '2023-02-08 23:47:35'),
(36, 1, 'Vous avez modifié votre profil!', 0, '2023-02-08 23:49:48'),
(37, 1, 'Vous avez accepté une invitation de 5', 5, '2023-02-09 01:36:54'),
(38, 19, 'Vous avez modifié votre profil!', 0, '2023-02-13 11:56:39'),
(39, 19, 'Vous avez proposé une offre pour la demande 89', 89, '2023-02-13 11:58:19'),
(40, 19, 'Vous avez envoyé une invitation à 6', 6, '2023-02-13 11:59:32'),
(41, 1, 'Vous avez modifié votre profil!', 0, '2023-02-13 15:15:19'),
(42, 1, 'Vous avez modifié votre profil!', 0, '2023-02-14 19:12:54'),
(43, 1, 'Vous avez modifié votre profil!', 0, '2023-02-14 19:13:49'),
(44, 1, 'Vous avez modifié votre profil!', 0, '2023-02-15 16:26:19'),
(45, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 13:09:12'),
(46, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 13:37:21'),
(47, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 13:40:16'),
(48, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 13:46:15'),
(49, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 14:58:27'),
(50, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 14:59:27'),
(51, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 15:05:17'),
(52, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 15:06:00'),
(53, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 15:12:42'),
(54, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 15:16:37'),
(55, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 17:33:12'),
(56, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 17:33:42'),
(57, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 17:33:49'),
(58, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 18:49:30'),
(59, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 19:20:33'),
(60, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 19:30:57'),
(61, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 19:36:18'),
(62, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 19:44:02'),
(63, 1, 'Vous avez modifié votre profil!', 0, '2023-02-17 19:55:55'),
(64, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-17 20:03:48'),
(65, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-20 09:24:12'),
(66, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-20 10:03:04'),
(67, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-20 10:28:12'),
(68, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 10:34:12'),
(69, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 10:37:13'),
(70, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 10:54:39'),
(71, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 10:56:16'),
(72, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 10:58:13'),
(73, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-20 11:02:15'),
(74, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:26:29'),
(75, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:26:41'),
(76, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:37:01'),
(77, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:48:34'),
(78, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:52:44'),
(79, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:54:07'),
(80, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 17:57:13'),
(81, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 18:02:35'),
(82, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 18:04:27'),
(83, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 18:09:35'),
(84, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 18:35:25'),
(85, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 18:49:12'),
(86, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:09:35'),
(87, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:21:45'),
(88, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:28:38'),
(89, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:30:37'),
(90, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:32:17'),
(91, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 19:34:23'),
(92, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:02:53'),
(93, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:05:18'),
(94, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:30:38'),
(95, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:32:29'),
(96, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:37:48'),
(97, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 21:40:41'),
(98, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 22:40:13'),
(99, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 22:44:45'),
(100, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 22:45:18'),
(101, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 22:46:56'),
(102, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 22:50:19'),
(103, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 23:03:30'),
(104, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 23:04:00'),
(105, 1, 'Vous avez modifié votre profil!', 0, '2023-02-20 23:04:27'),
(106, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-20 23:08:01'),
(107, 20, 'Vous avez proposé une offre pour la demande 127', 127, '2023-02-21 09:38:08'),
(108, 20, 'Vous avez modifié votre profil!', 0, '2023-02-21 09:38:46'),
(109, 20, 'Vous avez modifié votre profil!', 0, '2023-02-21 09:38:59'),
(110, 20, 'Vous avez proposé une offre pour la demande 86', 86, '2023-02-21 10:18:13'),
(111, 1, 'Vous avez envoyé une invitation à 20', 20, '2023-02-25 15:09:54'),
(112, 1, 'Vous avez annuler une invitation de 20', 20, '2023-02-25 15:10:00'),
(113, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-25 15:12:29'),
(114, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-25 15:12:36'),
(115, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-25 15:12:41'),
(116, 1, 'Vous avez modifié votre profil!', 0, '2023-02-25 15:15:01'),
(117, 1, 'Vous avez envoyé une invitation à 21', 21, '2023-02-27 09:00:32'),
(118, 1, 'Vous avez modifié votre profil!', 0, '2023-02-27 09:04:49'),
(119, 21, 'Vous avez proposé une offre pour la demande 1', 1, '2023-02-27 09:13:12'),
(120, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-27 09:16:33'),
(121, 21, 'Vous avez modifié votre profil!', 0, '2023-02-27 09:20:30'),
(122, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-27 09:22:27'),
(123, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-27 10:23:15'),
(124, 1, 'Vous avez envoyé une invitation à 20', 20, '2023-02-27 10:29:47'),
(125, 1, 'Vous avez annuler une invitation de 20', 20, '2023-02-27 10:29:48'),
(126, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-02-27 11:15:26'),
(127, 6, 'Vous avez proposé une offre pour la demande 2', 2, '2023-03-02 15:35:05'),
(128, 6, 'Vous avez proposé une offre pour la demande 2', 2, '2023-03-02 15:35:30'),
(129, 5, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-04-07 01:34:40'),
(130, 1, 'Vous avez proposé une offre pour la demande 132', 132, '2023-05-15 11:38:56'),
(131, 1, 'Vous avez modifié votre profil!', 0, '2023-05-15 11:41:08'),
(132, 1, 'Vous avez modifié votre profil!', 0, '2023-05-15 11:43:30'),
(133, 1, 'Vous avez envoyé une invitation à 20', 20, '2023-05-31 23:56:39'),
(134, 1, 'Vous avez annuler une invitation de 20', 20, '2023-05-31 23:56:46'),
(135, 1, 'Vous avez envoyé une invitation à 20', 20, '2023-05-31 23:56:51'),
(136, 1, 'Vous avez modifié votre profil!', 0, '2023-05-31 23:57:35'),
(137, 1, 'Vous avez proposé une offre pour la demande 80', 80, '2023-06-01 00:00:29'),
(138, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-06-01 00:06:37'),
(139, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-06-01 00:08:36'),
(140, 1, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-06-01 00:08:46'),
(141, 22, 'Vous avez proposé une offre pour la demande 9', 9, '2023-06-01 16:56:34'),
(142, 22, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-06-01 16:58:51'),
(143, 22, 'Vous avez modifié votre profil!', 0, '2023-06-01 18:00:34'),
(144, 22, 'Vous avez modifié votre profil!', 0, '2023-06-01 18:00:41'),
(145, 1, 'Vous avez envoyé une invitation à 22', 22, '2023-06-01 18:01:13'),
(146, 1, 'Vous avez proposé une offre pour la demande 136', 136, '2023-06-01 18:02:31'),
(147, 1, 'Vous avez envoyé une invitation à 19', 19, '2023-06-02 00:20:25'),
(148, 1, 'Vous avez annuler une invitation de 19', 19, '2023-06-02 00:20:33'),
(149, 1, 'Vous avez envoyé une invitation à 19', 19, '2023-06-02 11:19:04'),
(150, 1, 'Vous avez annuler une invitation de 19', 19, '2023-06-02 11:19:08'),
(151, 1, 'Vous avez modifié votre profil!', 0, '2023-06-03 17:02:53'),
(152, 1, 'Vous avez modifié votre profil!', 0, '2023-06-05 14:43:35'),
(155, 1, 'Vous avez modifié votre profil!', 0, '2023-06-07 00:24:55'),
(154, 1, 'Vous avez modifié votre profil!', 0, '2023-06-06 11:49:53'),
(153, 1, 'Vous avez modifié votre profil!', 0, '2023-06-05 17:26:53'),
(156, 5, 'Vous avez modifié votre profil!', 0, '2023-06-07 10:49:15'),
(157, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 00:58:12'),
(158, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 01:04:05'),
(159, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:12:12'),
(160, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:45:59'),
(161, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:46:41'),
(162, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:47:25'),
(163, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:48:21'),
(164, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:51:08'),
(165, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:51:45'),
(166, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 12:51:48'),
(167, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 17:02:20'),
(168, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 17:03:51'),
(169, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 17:05:47'),
(170, 1, 'Votre annonce est bien modifié!', 0, '2023-06-08 17:24:27'),
(171, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 22:59:33'),
(172, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:00:32'),
(173, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:01:31'),
(174, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:01:54'),
(175, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:29:52'),
(176, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:31:49'),
(177, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:32:26'),
(178, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:35:49'),
(179, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:43:20'),
(180, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:43:49'),
(181, 1, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:45:05'),
(182, 5, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:46:26'),
(183, 6, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:47:17'),
(184, 20, 'Vous avez modifié votre profil!', 0, '2023-06-08 23:48:55'),
(185, 1, 'Votre annonce est bien modifié!', 0, '2023-06-09 00:28:20'),
(186, 1, 'Votre annonce est bien modifié!', 0, '2023-06-09 00:29:51'),
(187, 1, 'Votre annonce est bien modifié!', 0, '2023-06-09 01:00:35'),
(188, 1, 'Votre annonce est bien modifié!', 0, '2023-06-09 01:01:57'),
(189, 1, 'Vous avez proposé une offre pour la demande 83', 0, '2023-06-09 17:31:44'),
(190, 1, 'Vous avez proposé une offre pour la demande 79', 0, '2023-06-09 17:37:25'),
(191, 1, 'Vous avez proposé une offre pour la demande 78', 0, '2023-06-09 17:38:33'),
(192, 5, 'Vous avez envoyé une invitation à 21', 0, '2023-06-09 22:52:52'),
(193, 5, 'Vous avez annulé une invitation de 21', 0, '2023-06-09 22:53:06'),
(194, 5, 'Vous avez proposé une offre pour la demande 127', 0, '2023-06-09 22:57:15'),
(195, 1, 'Votre annonce est bien modifié!', 0, '2023-06-13 01:23:50'),
(196, 1, 'Vous avez modifié votre profil!', 0, '2023-06-13 19:57:47'),
(197, 22, 'Vous avez modifié votre profil!', 0, '2023-06-13 19:58:39'),
(198, 22, 'Vous avez modifié votre profil!', 0, '2023-06-13 19:58:49'),
(199, 22, 'Vous avez modifié votre profil!', 0, '2023-06-13 19:58:54'),
(200, 1, 'Vous avez modifié votre profil!', 0, '2023-06-13 20:00:06'),
(201, 1, 'Vous avez modifié votre profil!', 0, '2023-06-13 22:18:07'),
(202, 21, 'Vous avez modifier votre profile!', 0, '2023-06-14 22:38:23'),
(203, 21, 'Vous avez modifier votre profile!', 0, '2023-06-14 22:40:08'),
(204, 21, 'Vous avez modifier votre profile!', 0, '2023-06-14 22:42:47'),
(205, 21, 'Vous avez modifier votre profile!', 0, '2023-06-14 22:46:15'),
(206, 21, 'Vous avez ajouter une nouvelle annonce!', 0, '2023-06-16 10:52:04'),
(207, 1, 'Vous avez modifié votre profil!', 0, '2023-06-20 13:20:07'),
(208, 1, 'Vous avez modifié votre profil!', 0, '2023-06-20 13:21:24'),
(209, 1, 'Vous avez modifié votre profil!', 0, '2023-06-22 19:29:15');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `message` text NOT NULL,
  `lu` int(11) NOT NULL DEFAULT 1,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `id_user1`, `id_user2`, `message`, `lu`, `date`) VALUES
(1, 5, 1, 'bonjour najah', 0, '2022-07-12 15:36:34'),
(2, 5, 1, 'rr', 0, '2022-07-12 18:51:04'),
(3, 5, 6, 'salut', 0, '2022-07-12 21:28:00'),
(4, 1, 5, 'salut', 0, '2022-07-12 21:28:12'),
(5, 5, 1, 'ee', 0, '2022-07-13 14:36:23'),
(6, 1, 5, 'oo', 0, '2022-07-13 19:54:10'),
(7, 5, 1, 'Cc', 0, '2022-07-13 20:58:42'),
(8, 1, 5, 'Tt', 0, '2022-07-14 12:02:50'),
(9, 1, 5, 'Hey', 0, '2022-07-14 12:25:33'),
(10, 6, 5, 'gg', 0, '2022-07-25 13:41:55'),
(11, 5, 1, 'ddd', 0, '2022-08-04 14:02:54'),
(12, 1, 5, 'kk', 0, '2022-12-06 10:30:09'),
(13, 5, 1, 'ccccc', 0, '2023-01-12 20:03:05'),
(14, 5, 1, 'bb', 0, '2023-01-27 22:27:49'),
(15, 1, 5, 'Bb', 0, '2023-01-27 23:49:31'),
(16, 1, 5, 'Bbc', 0, '2023-01-27 23:49:46'),
(17, 1, 5, 'Bbc', 0, '2023-01-27 23:49:50'),
(18, 1, 5, 'Jhhh', 0, '2023-01-27 23:52:20'),
(19, 1, 5, 'Jhhh', 0, '2023-01-27 23:52:22'),
(20, 5, 1, 'xxxxx', 0, '2023-02-01 17:26:48'),
(21, 5, 6, 'jjjjjj', 0, '2023-02-01 17:49:20'),
(22, 6, 1, 'XXXX', 0, '2023-02-01 18:39:34'),
(23, 1, 5, 'Hhhh', 0, '2023-02-02 15:28:04'),
(24, 1, 5, 'Hhhh', 0, '2023-02-02 15:28:04'),
(25, 1, 5, 'Hhhh', 0, '2023-02-02 15:28:04'),
(26, 1, 6, 'Gtjb', 0, '2023-02-02 21:01:04'),
(27, 1, 5, 'Cc', 0, '2023-02-03 00:07:33'),
(28, 5, 1, 'Jhg', 0, '2023-02-03 00:48:47'),
(29, 1, 5, 'kk', 0, '2023-02-03 00:55:14'),
(30, 1, 5, 'kkn', 0, '2023-02-03 00:55:40'),
(31, 1, 6, 'Alou', 0, '2023-02-03 17:04:33'),
(32, 6, 1, 'Hgjb', 0, '2023-02-04 01:37:31'),
(33, 1, 5, 'Bbb', 0, '2023-02-09 01:37:07'),
(34, 1, 5, 'Bbb', 0, '2023-02-09 01:37:09'),
(35, 1, 5, 'Bonjour ', 0, '2023-02-21 14:35:40'),
(36, 1, 5, 'Bonjour ', 0, '2023-02-21 14:35:42'),
(37, 1, 5, 'Hi', 0, '2023-02-24 08:04:18'),
(38, 1, 5, 'jjj', 0, '2023-03-15 08:23:28'),
(39, 1, 6, 'jko', 0, '2023-03-15 08:59:54'),
(40, 5, 1, 'Bonjour ', 0, '2023-03-15 12:30:16'),
(41, 1, 5, 'Cc', 0, '2023-05-31 23:54:37'),
(42, 1, 5, 'Cc', 0, '2023-05-31 23:54:39'),
(43, 1, 5, 'dd', 0, '2023-06-02 19:53:57'),
(44, 1, 6, 'dd', 0, '2023-06-02 19:58:45'),
(45, 1, 5, 'nn', 0, '2023-06-02 20:00:09'),
(46, 1, 5, 'vv', 0, '2023-06-02 20:02:07'),
(47, 1, 6, 'kil', 0, '2023-06-02 20:09:30'),
(48, 1, 5, 'Tt', 0, '2023-06-02 20:15:30'),
(49, 1, 6, 'ok', 0, '2023-06-02 20:22:47'),
(50, 1, 5, '????', 0, '2023-06-02 21:00:04'),
(51, 1, 5, '????', 0, '2023-06-02 21:00:04'),
(52, 1, 5, 'Ggh', 0, '2023-06-02 21:00:20'),
(53, 1, 5, 'ki', 0, '2023-06-02 21:12:20'),
(54, 1, 5, 'kil', 0, '2023-06-02 21:14:45'),
(55, 1, 5, 'kilol', 0, '2023-06-02 21:14:52'),
(56, 1, 5, 'lokl', 0, '2023-06-02 21:15:26'),
(57, 1, 5, 'Salut', 0, '2023-06-03 17:02:03'),
(58, 1, 5, 'gtgik', 0, '2023-06-05 13:39:41'),
(59, 1, 5, 'nn', 0, '2023-06-05 13:44:54'),
(60, 1, 5, 'nnuu', 0, '2023-06-05 13:47:26'),
(61, 1, 5, 'Bonjour ', 0, '2023-06-06 21:16:41'),
(62, 1, 5, 'Bonjour ', 0, '2023-06-06 21:16:44'),
(63, 1, 5, 'Salut', 0, '2023-06-06 23:36:36'),
(64, 1, 5, 'Salutf', 0, '2023-06-06 23:38:18'),
(65, 1, 5, 'Salutfhh', 0, '2023-06-06 23:39:34'),
(66, 1, 5, 'Salutfhhhu', 0, '2023-06-06 23:42:29'),
(67, 1, 5, 'Salut', 0, '2023-06-08 17:27:16'),
(68, 1, 5, 'Oo', 0, '2023-06-09 14:04:05'),
(69, 5, 1, 'Hfy', 0, '2023-06-12 11:53:55'),
(70, 1, 5, 'Tt', 0, '2023-06-12 20:31:13'),
(71, 1, 5, 'Ttgh', 0, '2023-06-12 20:32:26'),
(72, 1, 5, 'Xhvv', 0, '2023-06-12 20:42:06'),
(73, 1, 5, 'Guj', 0, '2023-06-12 21:01:38'),
(74, 1, 5, 'Guj', 0, '2023-06-12 21:02:04'),
(75, 1, 5, 'Xghbjjj', 0, '2023-06-12 21:44:34'),
(76, 1, 5, 'Salut', 0, '2023-06-12 22:02:32'),
(77, 1, 5, 'Hfyhghj', 0, '2023-06-13 00:34:14'),
(78, 1, 5, 'Ghbvc', 0, '2023-06-13 00:40:27'),
(79, 1, 5, 'Deffk', 0, '2023-06-13 01:11:08'),
(80, 1, 5, 'DeffkvzgDvndc', 0, '2023-06-13 01:12:50'),
(81, 1, 5, 'Gthhku', 0, '2023-06-13 01:19:30'),
(82, 1, 5, 'Alou', 0, '2023-06-13 20:02:27'),
(83, 1, 5, 'Ss', 0, '2023-06-13 22:17:34'),
(84, 1, 5, 'Salut', 0, '2023-06-14 13:47:15'),
(85, 1, 5, 'Salut', 0, '2023-06-14 13:47:19'),
(86, 1, 5, 'Ghvc', 0, '2023-06-14 13:50:50'),
(87, 1, 5, 'Ghvc', 0, '2023-06-14 13:50:52'),
(88, 1, 5, ' Gtfr', 0, '2023-06-14 13:52:26'),
(89, 5, 1, 'Ghjh', 0, '2023-06-14 15:18:17'),
(90, 1, 5, 'Bonjour ', 0, '2023-06-14 16:58:12'),
(91, 5, 6, 'Gjbcg', 0, '2023-06-15 15:12:38'),
(92, 6, 5, 'Fff', 0, '2023-06-15 15:18:44'),
(93, 6, 1, 'Ggg', 0, '2023-06-15 15:19:30'),
(94, 1, 5, 'Bbbb', 0, '2023-06-15 17:11:48');

-- --------------------------------------------------------

--
-- Table structure for table `nature_historique`
--

CREATE TABLE `nature_historique` (
  `id` int(11) NOT NULL,
  `nature` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `nature_historique`
--

INSERT INTO `nature_historique` (`id`, `nature`) VALUES
(1, 'filter'),
(2, 'avis_commentaire'),
(3, 'vu_annonce'),
(4, 'offre_annonce'),
(5, 'accepete_offre'),
(6, 'accepte_livraison'),
(7, 'demande_amitie'),
(8, 'accepte_dmd_amitie'),
(9, 'creer_annonce'),
(10, 'ajt_favoris_annonce'),
(11, 'add_favoris_offre'),
(12, 'chat_amis'),
(13, 'valider_proc_livraison'),
(14, 'valider_fin_livraison'),
(15, 'valider_recpetion');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `type_activite` text NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_users` text NOT NULL DEFAULT '0',
  `notification` text NOT NULL,
  `etat` int(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `date_lecture` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `id_activite`, `type_activite`, `id_user1`, `id_users`, `notification`, `etat`, `date`, `date_lecture`) VALUES
(1, 40, 'create-annonce', 5, '6,1', ' a ajouté un nouveau annonce!', 0, '2022-09-12 17:27:00', '0000-00-00 00:00:00'),
(2, 1, 'anulation-validation-offre', 1, '5', ' a annulé d\'avoir accepté votre offre!', 0, '2022-10-05 22:51:35', '0000-00-00 00:00:00'),
(3, 1, 'validation-offre', 1, '5', ' a accepté votre offre', 0, '2022-10-05 23:02:20', '0000-00-00 00:00:00'),
(4, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-10-11 19:22:50', '0000-00-00 00:00:00'),
(5, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-10-11 19:23:49', '0000-00-00 00:00:00'),
(6, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-10-11 19:26:48', '0000-00-00 00:00:00'),
(7, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-10-11 19:28:55', '0000-00-00 00:00:00'),
(8, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-10-11 19:31:51', '0000-00-00 00:00:00'),
(9, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:34:02', '0000-00-00 00:00:00'),
(10, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:34:02', '0000-00-00 00:00:00'),
(11, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:34:02', '0000-00-00 00:00:00'),
(12, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:36:59', '0000-00-00 00:00:00'),
(13, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:36:59', '0000-00-00 00:00:00'),
(14, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 19:36:59', '0000-00-00 00:00:00'),
(15, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-10-11 20:02:51', '0000-00-00 00:00:00'),
(16, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-11 20:03:46', '0000-00-00 00:00:00'),
(17, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-12 11:18:49', '0000-00-00 00:00:00'),
(18, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-10-14 13:20:38', '0000-00-00 00:00:00'),
(19, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-11-17 15:15:58', '0000-00-00 00:00:00'),
(20, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-11-21 21:57:20', '0000-00-00 00:00:00'),
(21, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-11-21 22:04:40', '0000-00-00 00:00:00'),
(22, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-11-21 22:05:47', '0000-00-00 00:00:00'),
(23, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-01 09:28:34', '0000-00-00 00:00:00'),
(24, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-01 09:28:37', '0000-00-00 00:00:00'),
(25, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:40:02', '0000-00-00 00:00:00'),
(26, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:42:42', '0000-00-00 00:00:00'),
(27, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:45:56', '0000-00-00 00:00:00'),
(28, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:48:09', '0000-00-00 00:00:00'),
(29, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:48:35', '0000-00-00 00:00:00'),
(30, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 10:49:39', '0000-00-00 00:00:00'),
(31, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:04:19', '0000-00-00 00:00:00'),
(32, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:04:54', '0000-00-00 00:00:00'),
(33, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:04:56', '0000-00-00 00:00:00'),
(34, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:04:58', '0000-00-00 00:00:00'),
(35, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:05:01', '0000-00-00 00:00:00'),
(36, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:11:08', '0000-00-00 00:00:00'),
(37, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:11:36', '0000-00-00 00:00:00'),
(38, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:11:38', '0000-00-00 00:00:00'),
(39, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:11:40', '0000-00-00 00:00:00'),
(40, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:11:42', '0000-00-00 00:00:00'),
(41, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:12:11', '0000-00-00 00:00:00'),
(42, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:13:17', '0000-00-00 00:00:00'),
(43, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:13:18', '0000-00-00 00:00:00'),
(44, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:13:22', '0000-00-00 00:00:00'),
(45, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:14:07', '0000-00-00 00:00:00'),
(46, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:14:08', '0000-00-00 00:00:00'),
(47, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:17:35', '0000-00-00 00:00:00'),
(48, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:31:50', '0000-00-00 00:00:00'),
(49, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:09', '0000-00-00 00:00:00'),
(50, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:10', '0000-00-00 00:00:00'),
(51, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:13', '0000-00-00 00:00:00'),
(52, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:15', '0000-00-00 00:00:00'),
(53, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:25', '0000-00-00 00:00:00'),
(54, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-01 11:42:31', '0000-00-00 00:00:00'),
(55, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:31', '0000-00-00 00:00:00'),
(56, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:36', '0000-00-00 00:00:00'),
(57, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-01 11:42:52', '0000-00-00 00:00:00'),
(58, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:42:52', '0000-00-00 00:00:00'),
(59, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:43:07', '0000-00-00 00:00:00'),
(60, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:44:08', '0000-00-00 00:00:00'),
(61, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:44:18', '0000-00-00 00:00:00'),
(62, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-01 11:44:21', '0000-00-00 00:00:00'),
(63, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:44:24', '0000-00-00 00:00:00'),
(64, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:44:30', '0000-00-00 00:00:00'),
(65, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:50:07', '0000-00-00 00:00:00'),
(66, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:50:22', '0000-00-00 00:00:00'),
(67, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:50:30', '0000-00-00 00:00:00'),
(68, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:13', '0000-00-00 00:00:00'),
(69, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:15', '0000-00-00 00:00:00'),
(70, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:19', '0000-00-00 00:00:00'),
(71, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:26', '0000-00-00 00:00:00'),
(72, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:26', '0000-00-00 00:00:00'),
(73, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:27', '0000-00-00 00:00:00'),
(74, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:54:35', '0000-00-00 00:00:00'),
(75, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:57:45', '0000-00-00 00:00:00'),
(76, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 11:58:29', '0000-00-00 00:00:00'),
(77, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:00:25', '0000-00-00 00:00:00'),
(78, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:00:28', '0000-00-00 00:00:00'),
(79, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:17:20', '0000-00-00 00:00:00'),
(80, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:18:17', '0000-00-00 00:00:00'),
(81, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:20:04', '0000-00-00 00:00:00'),
(82, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:20:22', '0000-00-00 00:00:00'),
(83, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:20:27', '0000-00-00 00:00:00'),
(84, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:20:48', '0000-00-00 00:00:00'),
(85, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:21:00', '0000-00-00 00:00:00'),
(86, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 12:21:49', '0000-00-00 00:00:00'),
(87, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:10:43', '0000-00-00 00:00:00'),
(88, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:10:45', '0000-00-00 00:00:00'),
(89, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:10:49', '0000-00-00 00:00:00'),
(90, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:17:22', '0000-00-00 00:00:00'),
(91, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:17:29', '0000-00-00 00:00:00'),
(92, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:17:29', '0000-00-00 00:00:00'),
(93, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 13:46:05', '0000-00-00 00:00:00'),
(94, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 16:10:49', '0000-00-00 00:00:00'),
(95, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-01 16:19:37', '0000-00-00 00:00:00'),
(96, 57, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2022-12-01 19:24:04', '0000-00-00 00:00:00'),
(97, 1, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2022-12-01 22:16:18', '0000-00-00 00:00:00'),
(98, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 12:51:32', '0000-00-00 00:00:00'),
(99, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 12:51:48', '0000-00-00 00:00:00'),
(100, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 12:51:59', '0000-00-00 00:00:00'),
(101, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:33:39', '0000-00-00 00:00:00'),
(102, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:45:20', '0000-00-00 00:00:00'),
(103, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:46:33', '0000-00-00 00:00:00'),
(104, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:46:36', '0000-00-00 00:00:00'),
(105, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:46:38', '0000-00-00 00:00:00'),
(106, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:47:43', '0000-00-00 00:00:00'),
(107, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:51:50', '0000-00-00 00:00:00'),
(108, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:51:55', '0000-00-00 00:00:00'),
(109, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:51:59', '0000-00-00 00:00:00'),
(110, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:52:02', '0000-00-00 00:00:00'),
(111, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 14:52:18', '0000-00-00 00:00:00'),
(112, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:10:23', '0000-00-00 00:00:00'),
(113, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:10:24', '0000-00-00 00:00:00'),
(114, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:10:25', '0000-00-00 00:00:00'),
(115, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:10:27', '0000-00-00 00:00:00'),
(116, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:10:28', '0000-00-00 00:00:00'),
(117, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:11:24', '0000-00-00 00:00:00'),
(118, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:11:27', '0000-00-00 00:00:00'),
(119, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:12:39', '0000-00-00 00:00:00'),
(120, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:12:41', '0000-00-00 00:00:00'),
(121, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 15:21:05', '0000-00-00 00:00:00'),
(122, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 16:19:24', '0000-00-00 00:00:00'),
(123, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 16:42:45', '0000-00-00 00:00:00'),
(124, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 17:50:56', '0000-00-00 00:00:00'),
(125, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 18:14:10', '0000-00-00 00:00:00'),
(126, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-07 18:44:51', '0000-00-00 00:00:00'),
(127, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-07 18:56:00', '0000-00-00 00:00:00'),
(128, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-07 18:56:01', '0000-00-00 00:00:00'),
(129, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-07 18:56:02', '0000-00-00 00:00:00'),
(130, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-07 18:56:11', '0000-00-00 00:00:00'),
(131, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2022-12-28 13:19:05', '0000-00-00 00:00:00'),
(132, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2022-12-28 13:19:23', '0000-00-00 00:00:00'),
(133, 2, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-01-12 20:02:21', '0000-00-00 00:00:00'),
(134, 84, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-02-01 10:49:08', '0000-00-00 00:00:00'),
(135, 84, 'validation-offre', 1, '5', ' a validé son offre!', 0, '2023-02-01 10:50:07', '0000-00-00 00:00:00'),
(136, 85, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-02-01 11:43:38', '0000-00-00 00:00:00'),
(137, 85, 'annulation-offre', 5, '1', ' a annulé son offre!', 0, '2023-02-01 11:45:48', '0000-00-00 00:00:00'),
(138, 85, 'validation-offre', 5, '1', ' a validé son offre!', 0, '2023-02-01 11:49:44', '0000-00-00 00:00:00'),
(139, 85, 'annulation-offre', 5, '1', ' a annulé son offre!', 0, '2023-02-01 11:52:01', '0000-00-00 00:00:00'),
(140, 85, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2023-02-01 12:05:36', '0000-00-00 00:00:00'),
(141, 85, 'validation-offre', 6, '1', ' a validé son offre!', 0, '2023-02-01 12:08:50', '0000-00-00 00:00:00'),
(142, 85, 'retiration-offre', 6, '1', ' a retiré son offre!', 0, '2023-02-01 21:13:42', '0000-00-00 00:00:00'),
(143, 6, 'annulation_invitation', 1, '6', 'a annulé son invitation', 0, '2023-02-04 00:01:55', '0000-00-00 00:00:00'),
(144, 6, 'annulation_invitation', 1, '6', 'a annulé son invitation', 0, '2023-02-04 00:04:45', '0000-00-00 00:00:00'),
(145, 6, 'ajout_amis', 1, '6', 'Vous a envoyé une invitation amitié', 0, '2023-02-04 00:04:47', '0000-00-00 00:00:00'),
(146, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-04 01:37:24', '0000-00-00 00:00:00'),
(147, 6, 'annulation_invitation', 1, '6', 'a annulé son invitation', 0, '2023-02-07 23:27:02', '0000-00-00 00:00:00'),
(148, 6, 'ajout_amis', 1, '6', 'Vous a envoyé une invitation amitié', 0, '2023-02-07 23:27:12', '0000-00-00 00:00:00'),
(149, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:27:42', '0000-00-00 00:00:00'),
(150, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:27:45', '0000-00-00 00:00:00'),
(151, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:27:50', '0000-00-00 00:00:00'),
(152, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:27:53', '0000-00-00 00:00:00'),
(153, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:27:59', '0000-00-00 00:00:00'),
(154, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:28:01', '0000-00-00 00:00:00'),
(155, 1, 'accept_amis', 6, '1', 'a accepté votre invitation', 0, '2023-02-07 23:28:05', '0000-00-00 00:00:00'),
(156, 87, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2023-02-07 23:29:47', '0000-00-00 00:00:00'),
(157, 87, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2023-02-07 23:29:50', '0000-00-00 00:00:00'),
(158, 87, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2023-02-07 23:30:16', '0000-00-00 00:00:00'),
(159, 87, 'validation-offre', 6, '1', ' a validé son offre!', 0, '2023-02-07 23:30:28', '0000-00-00 00:00:00'),
(160, 5, 'ajout_amis', 1, '5', 'Vous a envoyé une invitation amitié', 0, '2023-02-08 16:43:15', '0000-00-00 00:00:00'),
(161, 1, 'accept_amis', 5, '1', 'a accepté votre invitation', 0, '2023-02-08 16:43:42', '0000-00-00 00:00:00'),
(162, 1, 'accept_amis', 5, '1', 'a accepté votre invitation', 0, '2023-02-08 18:09:27', '0000-00-00 00:00:00'),
(163, 5, 'accept_amis', 5, '1', 'a accepté votre invitation', 0, '2023-02-08 18:14:49', '0000-00-00 00:00:00'),
(164, 5, 'annulation_invitation', 5, '1', 'a annulé son invitation', 0, '2023-02-08 22:36:29', '0000-00-00 00:00:00'),
(165, 5, 'ajout_amis', 5, '1', 'Vous a envoyé une invitation amitié', 0, '2023-02-08 22:36:30', '0000-00-00 00:00:00'),
(166, 1, 'accept_amis', 1, '5', 'a accepté votre invitation', 0, '2023-02-09 01:36:54', '0000-00-00 00:00:00'),
(167, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-10 19:53:01', '0000-00-00 00:00:00'),
(168, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-10 20:09:57', '0000-00-00 00:00:00'),
(169, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-10 20:12:22', '0000-00-00 00:00:00'),
(170, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-10 20:37:26', '0000-00-00 00:00:00'),
(171, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-10 20:37:27', '0000-00-00 00:00:00'),
(172, 19, 'ajout_amis', 19, '6', 'Vous a envoyé une invitation amitié', 0, '2023-02-13 11:59:32', '0000-00-00 00:00:00'),
(173, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-21 09:25:14', '0000-00-00 00:00:00'),
(174, 127, 'acceptation-offre', 1, '20', ' A accepté votre offre', 0, '2023-02-21 14:30:51', '0000-00-00 00:00:00'),
(175, 84, 'annulation-offre', 1, '5', ' a annulé son offre!', 0, '2023-02-21 14:35:01', '0000-00-00 00:00:00'),
(176, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-21 14:35:25', '0000-00-00 00:00:00'),
(177, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-24 08:03:45', '0000-00-00 00:00:00'),
(178, 1, 'ajout_amis', 1, '20', 'Vous a envoyé une invitation amitié', 0, '2023-02-25 15:09:54', '0000-00-00 00:00:00'),
(179, 1, 'annulation_invitation', 1, '20', 'a annulé son invitation', 0, '2023-02-25 15:10:00', '0000-00-00 00:00:00'),
(180, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-02-25 15:10:18', '0000-00-00 00:00:00'),
(181, 1, 'ajout_amis', 1, '21', 'Vous a envoyé une invitation amitié', 0, '2023-02-27 09:00:32', '0000-00-00 00:00:00'),
(182, 1, 'acceptation-offre', 1, '6', ' A accepté votre offre', 0, '2023-02-27 10:03:22', '0000-00-00 00:00:00'),
(183, 1, 'ajout_amis', 1, '20', 'Vous a envoyé une invitation amitié', 0, '2023-02-27 10:29:46', '0000-00-00 00:00:00'),
(184, 1, 'annulation_invitation', 1, '20', 'a annulé son invitation', 0, '2023-02-27 10:29:48', '0000-00-00 00:00:00'),
(185, 127, 'acceptation-offre', 1, '20', ' A accepté votre offre', 0, '2023-03-02 15:08:49', '0000-00-00 00:00:00'),
(186, 1, 'validation-offre', 6, '1', ' a validé son offre!', 0, '2023-03-02 15:16:00', '0000-00-00 00:00:00'),
(187, 1, 'annulation-offre', 6, '1', ' a annulé son offre!', 0, '2023-03-02 15:16:10', '0000-00-00 00:00:00'),
(188, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-05-24 16:24:53', '0000-00-00 00:00:00'),
(189, 1, 'ajout_amis', 1, '20', 'Vous a envoyé une invitation amitié', 0, '2023-05-31 23:56:39', '0000-00-00 00:00:00'),
(190, 1, 'annulation_invitation', 1, '20', 'a annulé son invitation', 0, '2023-05-31 23:56:45', '0000-00-00 00:00:00'),
(191, 1, 'ajout_amis', 1, '20', 'Vous a envoyé une invitation amitié', 0, '2023-05-31 23:56:51', '0000-00-00 00:00:00'),
(192, 1, 'ajout_amis', 1, '22', 'Vous a envoyé une invitation amitié', 0, '2023-06-01 18:01:13', '0000-00-00 00:00:00'),
(193, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-06-01 18:01:45', '0000-00-00 00:00:00'),
(194, 136, 'acceptation-offre', 22, '1', ' A accepté votre offre', 0, '2023-06-01 18:02:55', '0000-00-00 00:00:00'),
(195, 136, 'validation-offre', 1, '22', ' a validé son offre!', 0, '2023-06-01 18:04:19', '0000-00-00 00:00:00'),
(196, 1, 'ajout_amis', 1, '19', 'Vous a envoyé une invitation amitié', 0, '2023-06-02 00:20:25', '0000-00-00 00:00:00'),
(197, 1, 'annulation_invitation', 1, '19', 'a annulé son invitation', 0, '2023-06-02 00:20:32', '0000-00-00 00:00:00'),
(198, 1, 'ajout_amis', 1, '19', 'Vous a envoyé une invitation amitié', 0, '2023-06-02 11:19:04', '0000-00-00 00:00:00'),
(199, 1, 'annulation_invitation', 1, '19', 'a annulé son invitation', 0, '2023-06-02 11:19:07', '0000-00-00 00:00:00'),
(200, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:27:59', '0000-00-00 00:00:00'),
(201, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:28:04', '0000-00-00 00:00:00'),
(202, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:45:40', '0000-00-00 00:00:00'),
(203, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:45:43', '0000-00-00 00:00:00'),
(204, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:51:50', '0000-00-00 00:00:00'),
(205, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 13:55:41', '0000-00-00 00:00:00'),
(206, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 14:01:08', '0000-00-00 00:00:00'),
(207, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 14:05:02', '0000-00-00 00:00:00'),
(208, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-02 14:05:38', '0000-00-00 00:00:00'),
(209, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-03 17:04:02', '0000-00-00 00:00:00'),
(210, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-03 17:04:28', '0000-00-00 00:00:00'),
(211, 119, 'acceptation-offre', 22, 'undefined', ' A accepté votre offre', 0, '2023-06-05 17:43:22', '0000-00-00 00:00:00'),
(212, 119, 'acceptation-offre', 22, 'undefined', ' A accepté votre offre', 0, '2023-06-05 17:43:41', '0000-00-00 00:00:00'),
(213, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-06 22:05:40', '0000-00-00 00:00:00'),
(214, 1, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-06 22:05:59', '0000-00-00 00:00:00'),
(215, 127, 'acceptation-offre', 1, '20', ' A accepté votre offre', 0, '2023-06-08 13:22:10', '0000-00-00 00:00:00'),
(216, 29, 'validation-offre', 1, '1', ' a validé son offre!', 0, '2023-06-08 18:33:12', '0000-00-00 00:00:00'),
(217, 29, 'annulation-offre', 1, '1', ' a annulé son offre!', 0, '2023-06-08 18:33:23', '0000-00-00 00:00:00'),
(218, 136, 'annulation-offre', 1, '22', ' a annulé son offre!', 0, '2023-06-09 17:30:35', '0000-00-00 00:00:00'),
(219, 83, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 17:39:37', '0000-00-00 00:00:00'),
(220, 83, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 17:45:10', '0000-00-00 00:00:00'),
(221, 83, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 17:46:34', '0000-00-00 00:00:00'),
(222, 83, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 17:46:40', '0000-00-00 00:00:00'),
(223, 78, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 17:49:49', '0000-00-00 00:00:00'),
(224, 5, 'ajout_amis', 5, '21', 'Vous a envoyé une invitation amitié', 0, '2023-06-09 22:52:51', '0000-00-00 00:00:00'),
(225, 5, 'annulation_invitation', 5, '21', 'a annulé son invitation', 0, '2023-06-09 22:53:05', '0000-00-00 00:00:00'),
(226, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-06-09 22:53:33', '0000-00-00 00:00:00'),
(227, 132, 'acceptation-offre', 5, '1', ' A accepté votre offre', 0, '2023-06-09 22:56:05', '0000-00-00 00:00:00'),
(228, 11, 'acceptation-offre', 1, '5', ' A accepté votre offre', 0, '2023-06-12 16:40:31', '0000-00-00 00:00:00'),
(229, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-06-22 23:14:58', '0000-00-00 00:00:00'),
(230, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-06-22 23:15:03', '0000-00-00 00:00:00'),
(231, 0, 'evaluation', 0, 'undefined', 'Vous a évalué', 0, '2023-06-22 23:15:07', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `offres`
--

CREATE TABLE `offres` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_annonce` int(11) NOT NULL,
  `detaille` varchar(300) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `etat_acc` int(11) NOT NULL,
  `favoris` int(11) NOT NULL,
  `porpos_livraison` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offres`
--

INSERT INTO `offres` (`id`, `id_user`, `id_annonce`, `detaille`, `date`, `etat_acc`, `favoris`, `porpos_livraison`) VALUES
(2, 6, 1, 'ssss', '2022-04-14 00:41:35', 3, 1, 0),
(10, 5, 2, 'ftftftnajah taw', '2022-05-11 19:15:14', 0, 0, 0),
(11, 1, 2, 'idiidididididi', '2022-05-11 19:19:56', 1, 1, 0),
(12, 1, 2, 'idiidididididi', '2022-05-11 20:02:40', 0, 0, 0),
(14, 1, 2, 'kakik', '2022-05-11 20:05:36', 0, 0, 0),
(15, 1, 19, 'kdkdk', '2022-05-11 20:07:06', 0, 0, 0),
(16, 4, 2, ';cv,xcvx;v', '2022-05-11 21:49:29', 0, 0, 0),
(20, 1, 4, 'ghjnk', '2022-05-12 14:34:32', 0, 1, 0),
(22, 1, 29, 'je voudrais bien ces articles !', '2022-05-16 20:19:26', 3, 1, 0),
(23, 1, 29, 'ok', '2022-06-16 15:18:14', 0, 0, 0),
(24, 1, 29, 'bien', '2022-06-16 15:29:25', 0, 0, 0),
(25, 1, 29, 'jolie offre!', '2022-06-16 15:32:12', 0, 0, 0),
(26, 1, 29, 'je voudrais transporter ces articles gratuitement!', '2022-06-16 15:33:20', 0, 0, 0),
(29, 1, 29, 'waaw!', '2022-06-16 15:36:04', 0, 0, 0),
(31, 1, 3, 'bb', '2022-06-16 15:46:21', 1, 0, 0),
(32, 1, 3, 'bbh', '2022-06-16 15:46:28', 0, 0, 0),
(33, 1, 2, 'bien', '2022-06-16 15:48:27', 0, 0, 0),
(34, 1, 3, 'ss', '2022-06-16 16:15:57', 0, 0, 0),
(38, 1, 29, 'jj', '2022-06-16 19:10:47', 0, 0, 0),
(39, 1, 29, 'zz', '2022-06-16 19:13:46', 0, 0, 0),
(40, 1, 4, 'Yy', '2022-06-27 19:35:40', 0, 0, 0),
(41, 1, 2, 'test refresh', '2022-07-01 11:21:53', 0, 0, 0),
(42, 1, 2, 'test refresh2', '2022-07-01 11:23:42', 0, 0, 0),
(43, 1, 2, 'test refresh2d', '2022-07-01 11:23:50', 0, 0, 0),
(44, 1, 2, 'ok', '2022-07-01 16:04:24', 0, 0, 0),
(49, 5, 2, 'parfait', '2022-07-01 16:24:13', 0, 0, 0),
(50, 1, 2, 'Oui je confirme ', '2022-07-01 16:28:31', 0, 1, 0),
(51, 5, 2, 'rr', '2022-07-01 16:36:40', 0, 0, 0),
(56, 5, 11, 'ezzzd', '2022-10-03 23:47:04', 1, 0, 0),
(57, 5, 9, 'bonjour', '2022-11-15 11:22:47', 0, 0, 0),
(58, 5, 11, 'bonjour', '2022-11-15 11:24:33', 0, 0, 0),
(69, 1, 57, 'salut', '2022-11-29 23:21:02', 0, 0, 0),
(72, 1, 57, 'kkk', '2022-11-30 10:58:58', 0, 0, 0),
(80, 1, 57, 'jhhuj', '2022-11-30 20:02:00', 0, 0, 0),
(81, 1, 57, 'DDD', '2022-11-30 20:06:15', 0, 0, 0),
(82, 1, 57, 'gggg', '2022-11-30 20:29:13', 0, 0, 0),
(83, 1, 57, 'cvbn,', '2022-11-30 20:49:24', 1, 1, 0),
(84, 1, 57, 'bbbbkkmmm', '2022-11-30 20:56:34', 0, 0, 0),
(85, 1, 57, 'jj', '2022-11-30 21:03:50', 0, 0, 0),
(86, 1, 56, 'cccc', '2022-11-30 21:24:24', 0, 0, 0),
(87, 1, 57, 'xxx', '2022-11-30 22:44:02', 0, 0, 0),
(92, 5, 66, 'hhhh', '2023-01-27 09:29:15', 0, 0, 0),
(93, 5, 73, ',,,,,,,,,', '2023-01-27 09:30:02', 0, 0, 0),
(103, 5, 1, 'hhhhjjj', '2023-01-27 21:10:00', 0, 0, 0),
(104, 1, 84, 'yyyyy', '2023-02-01 10:46:52', 3, 0, 0),
(105, 5, 85, 'ghjkolo', '2023-02-01 11:12:10', 3, 0, 0),
(106, 6, 85, 'eeeee', '2023-02-01 12:03:48', 4, 0, 0),
(108, 1, 86, 'Offre modifié!!!', '2023-02-02 23:49:16', 0, 0, 0),
(110, 1, 30, 'bbb', '2023-02-04 00:11:44', 0, 0, 0),
(111, 6, 87, 'سلام', '2023-02-04 13:27:50', 2, 0, 0),
(112, 5, 87, 'Bonjour ', '2023-02-08 18:48:52', 0, 0, 0),
(113, 19, 89, 'Je vous propose une voiture en contre partie ', '2023-02-13 11:58:19', 0, 0, 0),
(114, 20, 127, 'Je voudrais bien une quantité de 20 kg', '2023-02-21 09:38:07', 1, 1, 0),
(115, 20, 86, 'Je vais bien échanger 10 kg de fruits avec 10kg des légumes ', '2023-02-21 10:18:13', 0, 0, 0),
(116, 1, 132, 'je peux vous proposer un échange avec un lot de légumes', '2023-05-15 11:38:55', 1, 0, 0),
(117, 1, 80, 'Hhhhh', '2023-06-01 00:00:28', 0, 0, 0),
(118, 22, 9, 'Gratos', '2023-06-01 16:56:34', 0, 0, 0),
(119, 1, 136, 'Je vous propose Olivier ', '2023-06-01 18:02:31', 3, 1, 0),
(120, 1, 83, 'Gtjvv', '2023-06-09 17:31:44', 1, 0, 0),
(121, 1, 79, 'Fhbv', '2023-06-09 17:37:25', 0, 0, 0),
(122, 1, 78, 'Guk fg', '2023-06-09 17:38:33', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `email_user` varchar(70) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `avatar` varchar(1000) NOT NULL,
  `photo` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publicites`
--

CREATE TABLE `publicites` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `titre` text NOT NULL,
  `lien` text NOT NULL,
  `image` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `publicites`
--

INSERT INTO `publicites` (`id`, `id_user`, `titre`, `lien`, `image`, `date`) VALUES
(3, 1, 'adidas', 'www.adidas.fr', 'publicite-1_3_U1', '2023-03-30 12:18:08'),
(1, 6, 'SOIB', 'www.soib.com.tn/', 'publicite-1_1_U6', '2023-02-02 00:11:25'),
(2, 6, 'zara', 'www.zara.com', 'publicite-1_2_U6', '2023-02-02 00:16:24'),
(4, 1, 'Lotto', 'www.lotto.it', 'publicite-1_4_U1', '2023-03-30 12:18:08'),
(6, 5, 'mac', 'www.maccosmetics.fr', 'publicite-1_6_U5', '2023-03-30 13:03:18'),
(7, 5, 'lancôme', 'www.lancome.fr/maquillage', 'publicite-1_7_U5', '2023-03-30 13:03:43');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id_user` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id_user`) VALUES
(22),
(21),
(21),
(5),
(1),
(1);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type`) VALUES
(4, 'Bons Plans'),
(3, 'Dons'),
(1, 'Echanges'),
(6, 'Infos'),
(2, 'Prêts'),
(5, 'Transports');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(70) NOT NULL,
  `nom` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `adresse` varchar(200) NOT NULL,
  `age` int(11) NOT NULL,
  `Transporteur` int(11) NOT NULL DEFAULT 0,
  `PointDolmen` int(11) NOT NULL DEFAULT 0,
  `VIP` int(11) NOT NULL DEFAULT 0,
  `etat_actv` int(11) NOT NULL DEFAULT 1,
  `connecte` int(11) NOT NULL DEFAULT 0,
  `cache` int(11) NOT NULL DEFAULT 0,
  `Date_inscrp` date NOT NULL DEFAULT current_timestamp(),
  `img_prof` text NOT NULL,
  `img_couverture` text NOT NULL,
  `nbre_visite` int(11) NOT NULL DEFAULT 0,
  `date_abonnement` date NOT NULL,
  `Userlongitude` text NOT NULL,
  `Userlatitude` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `nom`, `password`, `tel`, `adresse`, `age`, `Transporteur`, `PointDolmen`, `VIP`, `etat_actv`, `connecte`, `cache`, `Date_inscrp`, `img_prof`, `img_couverture`, `nbre_visite`, `date_abonnement`, `Userlongitude`, `Userlatitude`) VALUES
(1, 'nasri.najah@gmail.com', 'najahdev', '11223344', '50947680', 'Aouina, Tunis, Tunisie', 36, 1, 0, 3, 1, 0, 0, '2022-02-01', 'Profile-_U1.jpeg', 'Couverture-_U1.jpeg', 100, '2023-06-20', '10.2565524', '36.8593792'),
(5, 'foued.chnini@gmail.com', 'fouad', '1122334455', '26883374', 'Aouina, Tunis, Tunisie', 37, 1, 1, 0, 1, 0, 0, '2022-02-01', 'Profile-_U5.jpeg', 'Couverture-_U5.jpg', 2718, '0000-00-00', '10.2565524', '36.8593792'),
(6, 'nasri_nejah@yahoo.fr', 'Najiba', '11223344', '11', 'Sfax 2000, Avenue des Martyrs, Sfax, Tunisie', 32, 0, 0, 1, 1, 0, 0, '2022-02-01', '', '', 46, '0000-00-00', '10.76018', '34.740565'),
(19, 'Dali.april@gmail.com', 'Dali april', '11223344', '28282828', '75015 Paris, France', 28, 0, 0, 0, 1, 0, 1, '2023-02-13', '', 'Couverture-_U19.jpg', 5, '0000-00-00', '', ''),
(20, 'patrick.alice@gmail.com', 'Patrick Alice', 'aabbccddff', '546789098', 'Lille, France', 53, 0, 1, 1, 1, 0, 0, '2023-02-21', 'Profile-_U20.jpeg', '', 13, '2023-02-21', '3.057256', '50.62925'),
(21, 'al@labonnequipe.fr', 'Andi56', 'Didi@#%15Lap', '0659133185', 'France', 44, 1, 1, 0, 1, 0, 1, '2023-02-27', 'Profile-_U21.jpeg', 'Couverture-_U21.jpeg', 15, '0000-00-00', 'undefined', 'undefined'),
(22, 'Ch.foued@tunisip.com', 'Chnini foued', 'Alpha12', '26883374', 'Avenue Hédi Chaker, Tunis', 37, 1, 0, 0, 1, 0, 0, '2023-06-01', 'Profile-_U22.jpeg', '', 14, '0000-00-00', '10.1782381', '36.8142141');

-- --------------------------------------------------------

--
-- Table structure for table `users_file`
--

CREATE TABLE `users_file` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_annonce` int(11) NOT NULL,
  `file_src` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_file`
--

INSERT INTO `users_file` (`id`, `id_user`, `id_annonce`, `file_src`) VALUES
(1, 0, 0, '0'),
(2, 0, 0, 'http://127.0.0.1:3000/images/136110442_4726333940729596_7185466306584018897_n.png'),
(3, 0, 0, 'http://127.0.0.1:3000/images/136037577_4726333857396271_2765249875862414274_n.png'),
(4, 0, 0, 'http://127.0.0.1:3000/images/[object File]'),
(5, 0, 0, 'http://127.0.0.1:3000/images/[object File]'),
(6, 0, 0, 'http://127.0.0.1:3000/images/kisspng-gift-wrapping-computer-icons-christmas-clip-art-5ae31500ac9506.5967039615248314887069.jpg'),
(7, 0, 0, 'http://127.0.0.1:3000/images/template.png'),
(8, 0, 0, 'http://127.0.0.1:3000/images/kisspng-gift-wrapping-computer-icons-christmas-clip-art-5ae31500ac9506.5967039615248314887069.jpg'),
(9, 0, 0, 'http://127.0.0.1:3000/images/out.png'),
(10, 0, 0, 'http://127.0.0.1:3000/images/photonn.png'),
(11, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651095314081.png'),
(12, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651095330283.png'),
(13, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651098784326.jpeg'),
(14, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651098859804.jpeg'),
(15, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651099035024.jpeg'),
(16, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651099135520.jpeg'),
(17, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651099342731.jpeg'),
(18, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651099702299.png'),
(19, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651224582019.png'),
(20, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651264699081.png'),
(21, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651264705860.png'),
(22, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651270439870.png'),
(23, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651272457330.png'),
(24, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651272484312.png'),
(25, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651273696798.png'),
(26, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651667626305.png'),
(27, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651686321282.png'),
(28, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651686330159.png'),
(29, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651687714111.png'),
(30, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651688028446.png'),
(31, 0, 0, 'http://127.0.0.1:3000/images/annonce_1651790806862.png'),
(32, 1, 0, 'http://127.0.0.1:3000/images/annonce_1_1651846963272.png'),
(33, 1, 0, 'http://127.0.0.1:3000/images/annonce_1_1651851466967.png'),
(34, 1, 28, 'http://127.0.0.1:3000/images/annonce_28_U1_1652136684970.png'),
(35, 1, 29, 'http://127.0.0.1:3000/images/annonce_29_U1_1652167046182.png'),
(36, 1, 29, 'http://127.0.0.1:3000/images/annonce_29_U1_1652167046189.png'),
(37, 1, 29, 'http://127.0.0.1:3000/images/annonce-1_29_U1.png'),
(38, 5, 47, 'https://huma.bzh/images/annonce-1_47_U5.png'),
(39, 5, 48, 'https://huma.bzh/images/annonce-1_48_U5.png'),
(40, 5, 49, 'https://huma.bzh/images/annonce-1_49_U5.png'),
(41, 5, 50, 'https://huma.bzh/images/annonce-1_50_U5.png'),
(42, 5, 51, 'https://huma.bzh/images/annonce-1_51_U5.png'),
(43, 5, 52, 'https://huma.bzh/images/annonce-1_52_U5.png'),
(44, 5, 53, 'https://huma.bzh/images/annonce-1_53_U5.png'),
(45, 5, 54, 'https://huma.bzh/images/annonce-1_54_U5.png'),
(46, 5, 55, 'https://huma.bzh/images/annonce-1_55_U5.png'),
(47, 5, 57, 'https://huma.bzh/images/annonce-1_57_U5.png'),
(48, 1, 58, 'https://huma.bzh/images/annonce-2_58_U1.png'),
(49, 1, 58, 'https://huma.bzh/images/annonce-1_58_U1.png'),
(50, 1, 58, 'https://huma.bzh/images/annonce-3_58_U1.png'),
(51, 1, 59, 'https://huma.bzh/images/annonce-1_59_U1.png'),
(52, 1, 59, 'https://huma.bzh/images/annonce-3_59_U1.png'),
(53, 1, 59, 'https://huma.bzh/images/annonce-2_59_U1.png'),
(54, 1, 62, 'https://huma.bzh/images/annonce-1_62_U1.jpg'),
(55, 1, 63, 'https://huma.bzh/images/annonce-1_63_U1.jpg'),
(56, 5, 82, 'https://huma.bzh/images/annonce-1_82_U5.jpg'),
(57, 5, 83, 'https://huma.bzh/images/annonce-1_83_U5.jpg'),
(58, 5, 84, 'https://huma.bzh/images/annonce-2_84_U5.jpg'),
(59, 5, 84, 'https://huma.bzh/images/annonce-3_84_U5.jpg'),
(60, 5, 84, 'https://huma.bzh/images/annonce-1_84_U5.jpg'),
(61, 6, 86, 'https://huma.bzh/images/annonce-3_86_U6.jpg'),
(62, 6, 86, 'https://huma.bzh/images/annonce-2_86_U6.jpg'),
(71, 1, 127, 'https://huma.bzh/images/annonce-1_127_U1.jpeg'),
(72, 1, 128, 'https://huma.bzh/images/annonce-1_128_U1.jpeg'),
(73, 1, 128, 'https://huma.bzh/images/annonce-2_128_U1.jpeg'),
(74, 3, 128, 'https://huma.bzh/images/annonce-3_128_U1.jpeg'),
(75, 1, 131, 'https://huma.bzh/images/annonce-2_131_U1.jpeg'),
(76, 1, 131, 'https://huma.bzh/images/annonce-1_131_U1.jpeg'),
(77, 1, 131, 'https://huma.bzh/images/annonce-3_131_U1.jpeg'),
(78, 22, 136, 'https://huma.bzh/images/annonce-1_136_U22.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amis`
--
ALTER TABLE `amis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `annonce_favoris`
--
ALTER TABLE `annonce_favoris`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nature_historique`
--
ALTER TABLE `nature_historique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offres`
--
ALTER TABLE `offres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `email_user` (`email_user`);

--
-- Indexes for table `publicites`
--
ALTER TABLE `publicites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_file`
--
ALTER TABLE `users_file`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amis`
--
ALTER TABLE `amis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `annonces`
--
ALTER TABLE `annonces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `annonce_favoris`
--
ALTER TABLE `annonce_favoris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `historique`
--
ALTER TABLE `historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `nature_historique`
--
ALTER TABLE `nature_historique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `offres`
--
ALTER TABLE `offres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publicites`
--
ALTER TABLE `publicites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users_file`
--
ALTER TABLE `users_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
