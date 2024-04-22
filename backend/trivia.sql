-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2024 at 07:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trivia`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `QuestionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `question` varchar(100) DEFAULT NULL,
  `incorrect_answers` varchar(1024) DEFAULT NULL,
  `correct_answer` varchar(300) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `repeat` tinyint(1) DEFAULT 0,
  `showUser` tinyint(1) NOT NULL DEFAULT 1,
  `viewed` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`QuestionID`, `UserID`, `question`, `incorrect_answers`, `correct_answer`, `category`, `repeat`, `showUser`, `viewed`, `createdAt`, `updatedAt`) VALUES
(2, 2, 'test ', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:24:24', '2024-04-13 12:24:24'),
(3, 2, 'SS', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:31:46', '2024-04-13 12:31:46'),
(4, 2, 'DD', '1%02%03', '4', 19, 0, 1, 0, '2024-04-13 12:32:31', '2024-04-13 12:32:31'),
(5, 2, 'test3', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:24:24', '2024-04-13 13:33:45'),
(6, 2, 'test4', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:24:24', '2024-04-13 13:33:59'),
(7, 2, 'test5', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:24:24', '2024-04-13 13:34:06'),
(8, 2, 'test3', '1%02%03', '4', 12, 0, 1, 0, '2024-04-13 12:24:24', '2024-04-13 13:32:40'),
(9, 2, 'pdf', '1%02%03', '4', 19, 0, 1, 0, '2024-04-13 12:32:31', '2024-04-13 13:34:20'),
(23, 2, 'Which%20item%20of%20clothing%20is%20usually%20worn%20by%20a%20Scotsman%20at%20a%20wedding%3F', 'Skirt%0Dress%0Rhobes', 'Kilt', 9, 1, 0, 1, '2024-04-16 16:42:13', '2024-04-17 16:30:29');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240409192715-create-users.js'),
('20240413093409-create-questions.js'),
('20240413094404-create-user-reports.js');

-- --------------------------------------------------------

--
-- Table structure for table `userreports`
--

CREATE TABLE `userreports` (
  `UserReportsID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `no_of_question` int(11) DEFAULT NULL,
  `incorrect_answers` int(11) DEFAULT NULL,
  `correct_answer` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `repeated_question` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userreports`
--

INSERT INTO `userreports` (`UserReportsID`, `UserID`, `no_of_question`, `incorrect_answers`, `correct_answer`, `category`, `repeated_question`, `createdAt`, `updatedAt`) VALUES
(1, 2, 13, NULL, NULL, 9, NULL, '2024-04-17 16:30:29', '2024-04-17 16:30:29'),
(2, 2, 9, NULL, NULL, 14, NULL, '2024-04-17 16:40:32', '2024-04-17 16:40:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `VerifiedEmail` tinyint(1) DEFAULT 0,
  `Token` varchar(100) DEFAULT NULL,
  `TokenExpired` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Email`, `Password`, `VerifiedEmail`, `Token`, `TokenExpired`, `createdAt`, `updatedAt`) VALUES
(2, 'page ragan', 'page.wav@gmail.com', '$2b$10$veEUTtCH0YPe4wSStuUKPOtzq08w5Otz8I54mHHMvxLFspod78zlO', 1, NULL, NULL, '2024-04-13 12:04:12', '2024-04-16 16:33:52'),
(3, 'john test', 'johntestuser06@gmail.com', '$2b$10$HlKacFZ0nXwhxhkrEo1wlurzDz7gxZb.1dTVw/.E6UmAUMmUxYIK.', 0, '67498b2c-477e-42fc-b8d9-f7a440cfa4b6', '2024-04-16 17:36:05', '2024-04-16 17:31:05', '2024-04-16 17:31:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`QuestionID`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `userreports`
--
ALTER TABLE `userreports`
  ADD PRIMARY KEY (`UserReportsID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `QuestionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `userreports`
--
ALTER TABLE `userreports`
  MODIFY `UserReportsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
