-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 05:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bankdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `acno` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `pin` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`acno`, `id`, `fname`, `email`, `phone`, `gender`, `country`, `state`, `city`, `amount`, `pin`, `name`) VALUES
('SBI101', 1, 'Mr', 'neha@neha.com', 2147483647, 'Female', 'India', 'Uttrakhand', 'Dehradun', 2590, 1235, 'neha'),
('SBI102', 2, 'Mr', 'Shad@shad.com', 95478612, 'male', 'India', 'UP', 'Moradabad', 3210, 2234, 'Shad'),
('SBI103', 3, 'MR', 'raj@raj.com', 845632456, 'Male', 'India', 'Delhi', 'sector', 6000, 4556, 'Raj'),
('SBI104', 4, 'Mr', 'tushar@tushar.com', 87456325, 'Male', 'India', 'Uttrakhand', 'dehradun', 2000, 7894, 'Tushar'),
('SBI105', 5, 'Mr', 'tushar@tushar.com', 87456325, 'Male', 'India', 'Uttrakhand', 'dehradun', 2000, 7894, 'Tushar'),
('SBI106', 6, 'Mr', 'tushar@tushar.com', 87456325, 'Male', 'India', 'Uttrakhand', 'dehradun', 2000, 7894, 'Tushar'),
('SBI107', 7, 'Mr', 'rajesh@rajesh.com', 75698423, 'Male', 'India', 'Uk', 'UK', 7000, 7531, 'rajesh'),
('SBI108', 8, 'MR', 'sakshi@sakshi.com', 2147483647, 'Female', 'India', 'UK', 'UK', 800, 4567, 'sakshi'),
('SBI109', 9, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI110', 10, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI111', 11, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI112', 12, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI113', 13, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI114', 14, 'Mr', 'anisha@anisha.com', 1234567890, 'Female', 'India', 'UK', 'UK', 4000, 1238, 'Anisha'),
('SBI115', 15, 'MR', 'MR@MR.com', 789456123, 'Male', 'INdia', 'Uk', 'uK', 8000, 1234, 'MR');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transactionId` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL,
  `acno` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transactionId`, `description`, `amount`, `date`, `time`, `acno`) VALUES
(1, 'withdrawl', 100, '2023-06-12', '15:11:02', 'SBI101'),
(2, 'Deposit', 100, '2023-06-12', '16:03:02', 'SBI101'),
(3, 'Transfered', 100, '2023-06-12', '23:16:40', 'SBI101'),
(4, 'Recieved', 100, '2023-06-12', '23:16:40', 'SBI102'),
(5, 'Transfered', 100, '2023-06-12', '23:28:12', 'SBI101'),
(6, 'Recieved', 100, '2023-06-12', '23:28:12', 'SBI102');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transactionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
