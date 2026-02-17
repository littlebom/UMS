-- MySQL dump 10.13  Distrib 9.5.0, for macos15.7 (arm64)
--
-- Host: localhost    Database: ums
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '134adc76-da23-11f0-889c-026d1b42f712:1-7740,
2e1b5858-c08f-11f0-90d3-ba299b910565:1-11110';

--
-- Table structure for table `_ClassSectionToStudentGroup`
--

DROP TABLE IF EXISTS `_ClassSectionToStudentGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ClassSectionToStudentGroup` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_ClassSectionToStudentGroup_AB_unique` (`A`,`B`),
  KEY `_ClassSectionToStudentGroup_B_index` (`B`),
  CONSTRAINT `_ClassSectionToStudentGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `ClassSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ClassSectionToStudentGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `StudentGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ClassSectionToStudentGroup`
--

LOCK TABLES `_ClassSectionToStudentGroup` WRITE;
/*!40000 ALTER TABLE `_ClassSectionToStudentGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ClassSectionToStudentGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AcademicTerm`
--

DROP TABLE IF EXISTS `AcademicTerm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AcademicTerm` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int NOT NULL,
  `semester` int NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `isCurrent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `AcademicTerm_year_semester_key` (`year`,`semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AcademicTerm`
--

LOCK TABLES `AcademicTerm` WRITE;
/*!40000 ALTER TABLE `AcademicTerm` DISABLE KEYS */;
/*!40000 ALTER TABLE `AcademicTerm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdmissionTrack`
--

DROP TABLE IF EXISTS `AdmissionTrack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdmissionTrack` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `typeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academicYear` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `openDate` datetime(3) NOT NULL,
  `closeDate` datetime(3) NOT NULL,
  `announceDate` datetime(3) DEFAULT NULL,
  `totalSeats` int NOT NULL,
  `filledSeats` int NOT NULL DEFAULT '0',
  `reservedSeats` int DEFAULT NULL,
  `enableWaitlist` tinyint(1) NOT NULL DEFAULT '0',
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `applicationFee` double DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `displayOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdmissionTrack_code_key` (`code`),
  KEY `AdmissionTrack_programId_idx` (`programId`),
  KEY `AdmissionTrack_typeId_idx` (`typeId`),
  KEY `AdmissionTrack_academicYear_idx` (`academicYear`),
  KEY `AdmissionTrack_isActive_isPublished_idx` (`isActive`,`isPublished`),
  KEY `AdmissionTrack_openDate_closeDate_idx` (`openDate`,`closeDate`),
  CONSTRAINT `AdmissionTrack_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AdmissionTrack_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `AdmissionTrackType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdmissionTrack`
--

LOCK TABLES `AdmissionTrack` WRITE;
/*!40000 ALTER TABLE `AdmissionTrack` DISABLE KEYS */;
INSERT INTO `AdmissionTrack` VALUES ('cmjstl6wr00025eq9djhhcu83','01-2026-99','รอบปกติ','Nomal Admission',NULL,'cmjstinqo00005eq934k5v2jk','cmja6squ3000ipoyezlzuvi87','2026','2026-01-01 16:46:00.000','2026-01-10 16:46:00.000','2025-12-30 16:46:00.000',50,0,10,1,NULL,NULL,1,0,0,'2025-12-30 16:47:05.019','2025-12-30 16:47:05.019');
/*!40000 ALTER TABLE `AdmissionTrack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdmissionTrackType`
--

DROP TABLE IF EXISTS `AdmissionTrackType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdmissionTrackType` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#3B82F6',
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Target',
  `displayOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isSystem` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AdmissionTrackType_code_key` (`code`),
  KEY `AdmissionTrackType_isActive_idx` (`isActive`),
  KEY `AdmissionTrackType_displayOrder_idx` (`displayOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdmissionTrackType`
--

LOCK TABLES `AdmissionTrackType` WRITE;
/*!40000 ALTER TABLE `AdmissionTrackType` DISABLE KEYS */;
INSERT INTO `AdmissionTrackType` VALUES ('cmjstinqo00005eq934k5v2jk','01','นักศึกษาปกติ','Nomal Student',NULL,'#3B82F6','Target',0,1,0,'2025-12-30 16:45:06.864','2025-12-30 16:45:06.864');
/*!40000 ALTER TABLE `AdmissionTrackType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AiConversation`
--

DROP TABLE IF EXISTS `AiConversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AiConversation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sessionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AiConversation`
--

LOCK TABLES `AiConversation` WRITE;
/*!40000 ALTER TABLE `AiConversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `AiConversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AiKnowledgeBase`
--

DROP TABLE IF EXISTS `AiKnowledgeBase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AiKnowledgeBase` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AiKnowledgeBase`
--

LOCK TABLES `AiKnowledgeBase` WRITE;
/*!40000 ALTER TABLE `AiKnowledgeBase` DISABLE KEYS */;
/*!40000 ALTER TABLE `AiKnowledgeBase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AiMessage`
--

DROP TABLE IF EXISTS `AiMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AiMessage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AiMessage_conversationId_fkey` (`conversationId`),
  CONSTRAINT `AiMessage_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `AiConversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AiMessage`
--

LOCK TABLES `AiMessage` WRITE;
/*!40000 ALTER TABLE `AiMessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `AiMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AiSettings`
--

DROP TABLE IF EXISTS `AiSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AiSettings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `botName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Nong Dee-Jai',
  `welcomeMessage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Hello! How can I help you today?',
  `personality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Friendly and helpful',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AiSettings`
--

LOCK TABLES `AiSettings` WRITE;
/*!40000 ALTER TABLE `AiSettings` DISABLE KEYS */;
INSERT INTO `AiSettings` VALUES ('cmja6rn30000011x1m4hdhwhx','Nong Dee-Jai','Hello! How can I help you today?','Friendly and helpful',1,'2025-12-17 15:48:23.581'),('cmja6rn31000111x1uof289ii','Nong Dee-Jai','Hello! How can I help you today?','Friendly and helpful',1,'2025-12-17 15:48:23.581');
/*!40000 ALTER TABLE `AiSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Announcement`
--

DROP TABLE IF EXISTS `Announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcement` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `target` enum('ALL','STUDENTS','INSTRUCTORS','STAFF') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ALL',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `publishedAt` datetime(3) DEFAULT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Announcement_authorId_fkey` (`authorId`),
  CONSTRAINT `Announcement_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcement`
--

LOCK TABLES `Announcement` WRITE;
/*!40000 ALTER TABLE `Announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `Announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Applicant`
--

DROP TABLE IF EXISTS `Applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applicant` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstNameTh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastNameTh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Thai',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `citizenId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthDate` datetime(3) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `subDistrict` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Applicant_userId_key` (`userId`),
  UNIQUE KEY `Applicant_citizenId_key` (`citizenId`),
  CONSTRAINT `Applicant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applicant`
--

LOCK TABLES `Applicant` WRITE;
/*!40000 ALTER TABLE `Applicant` DISABLE KEYS */;
INSERT INTO `Applicant` VALUES ('cmja6sqtr0007poye2smlkx93','cmja6sqtr0006poyebgnzex4a','Bob','Johnson',NULL,NULL,'Thai',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Applicant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Application`
--

DROP TABLE IF EXISTS `Application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Application` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trackId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('DRAFT','SUBMITTED','UNDER_REVIEW','DOCUMENT_VERIFIED','INTERVIEW_READY','INTERVIEW_COMPLETED','ACCEPTED','REJECTED','ENROLLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `submittedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Application_trackId_idx` (`trackId`),
  KEY `Application_programId_idx` (`programId`),
  KEY `Application_applicantId_idx` (`applicantId`),
  KEY `Application_status_idx` (`status`),
  CONSTRAINT `Application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Application_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Application_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `AdmissionTrack` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application`
--

LOCK TABLES `Application` WRITE;
/*!40000 ALTER TABLE `Application` DISABLE KEYS */;
/*!40000 ALTER TABLE `Application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassSchedule`
--

DROP TABLE IF EXISTS `ClassSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClassSchedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `day` enum('MON','TUE','WED','THU','FRI','SAT','SUN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instructorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `termId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClassSchedule_sectionId_fkey` (`sectionId`),
  KEY `ClassSchedule_roomId_fkey` (`roomId`),
  KEY `ClassSchedule_courseId_fkey` (`courseId`),
  KEY `ClassSchedule_instructorId_fkey` (`instructorId`),
  KEY `ClassSchedule_termId_fkey` (`termId`),
  CONSTRAINT `ClassSchedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ClassSchedule_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Personnel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ClassSchedule_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ClassSchedule_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ClassSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ClassSchedule_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassSchedule`
--

LOCK TABLES `ClassSchedule` WRITE;
/*!40000 ALTER TABLE `ClassSchedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClassSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassSection`
--

DROP TABLE IF EXISTS `ClassSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClassSection` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `termId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `instructorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClassSection_courseId_fkey` (`courseId`),
  KEY `ClassSection_termId_fkey` (`termId`),
  KEY `ClassSection_instructorId_fkey` (`instructorId`),
  CONSTRAINT `ClassSection_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ClassSection_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Personnel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ClassSection_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassSection`
--

LOCK TABLES `ClassSection` WRITE;
/*!40000 ALTER TABLE `ClassSection` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClassSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credits` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `learningOutcomes` text COLLATE utf8mb4_unicode_ci,
  `syllabusUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `minYearLevel` int DEFAULT NULL,
  `allowedStudentTypes` text COLLATE utf8mb4_unicode_ci,
  `allowedPrograms` text COLLATE utf8mb4_unicode_ci,
  `minGpax` double DEFAULT NULL,
  `prerequisiteCourses` text COLLATE utf8mb4_unicode_ci,
  `maxEnrollment` int DEFAULT NULL,
  `requiresApproval` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Course_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES ('cmja6squ5000lpoyekyzuut9s','CS101','การเขียนโปรแกรมเบื้องต้น','Introduction to Computer Science',3,'Fundamental concepts of computer science and programming',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('cmja6squ5000mpoyeqt025xyy','CS201','โครงสร้างข้อมูลและอัลกอริทึม','Data Structures and Algorithms',3,'Study of fundamental data structures and algorithms',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('cmja6squ5000npoye7sqai6kz','CS301','ระบบฐานข้อมูล','Database Systems',3,'Database design, SQL, and database management',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('cmja6squ5000opoyelkj5pqhv','EE101','การวิเคราะห์วงจรไฟฟ้า','Circuit Analysis',3,'Fundamental electrical circuit analysis',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('cmja6squ5000ppoyebcp0w27i','MATH101','แคลคูลัส 1','Calculus I',3,'Differential and integral calculus',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),('cmja6squ5000qpoyechlxaxdq','BUS101','หลักการจัดการ','Principles of Management',3,'Introduction to management principles and practices',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `facultyId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Department_facultyId_fkey` (`facultyId`),
  CONSTRAINT `Department_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES ('dept-cse-01','ภาควิชาวิทยาการคอมพิวเตอร์และวิศวกรรม','Department of Computer Science and Engineering',NULL,'cmja6sqtt0008poyeuiyjsbch'),('dept-ee-01','ภาควิชาวิศวกรรมไฟฟ้า','Department of Electrical Engineering',NULL,'cmja6sqtt0008poyeuiyjsbch'),('dept-math-02','ภาควิชาคณิตศาสตร์','Department of Mathematics',NULL,'cmja6sqtx0009poyeti33515r'),('dept-mgmt-03','ภาควิชาการจัดการ','Department of Management',NULL,'cmja6sqtz000apoyerneg11cj'),('dept-physics-02','ภาควิชาฟิสิกส์','Department of Physics',NULL,'cmja6sqtx0009poyeti33515r');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Document` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploadedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Document_applicationId_fkey` (`applicationId`),
  CONSTRAINT `Document_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EducationHistory`
--

DROP TABLE IF EXISTS `EducationHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EducationHistory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degreeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institution` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gpa` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `graduationYear` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `EducationHistory_applicantId_fkey` (`applicantId`),
  CONSTRAINT `EducationHistory_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `Applicant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EducationHistory`
--

LOCK TABLES `EducationHistory` WRITE;
/*!40000 ALTER TABLE `EducationHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `EducationHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enrollment`
--

DROP TABLE IF EXISTS `Enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enrollment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enrolledAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Enrollment_studentId_sectionId_key` (`studentId`,`sectionId`),
  KEY `Enrollment_sectionId_fkey` (`sectionId`),
  CONSTRAINT `Enrollment_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ClassSection` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Enrollment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrollment`
--

LOCK TABLES `Enrollment` WRITE;
/*!40000 ALTER TABLE `Enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamProctor`
--

DROP TABLE IF EXISTS `ExamProctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExamProctor` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `examSlotId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proctorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('CHIEF','ASSISTANT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ASSISTANT',
  `isConfirmed` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExamProctor_examSlotId_proctorId_key` (`examSlotId`,`proctorId`),
  KEY `ExamProctor_proctorId_idx` (`proctorId`),
  CONSTRAINT `ExamProctor_examSlotId_fkey` FOREIGN KEY (`examSlotId`) REFERENCES `ExamSlot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ExamProctor_proctorId_fkey` FOREIGN KEY (`proctorId`) REFERENCES `Personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamProctor`
--

LOCK TABLES `ExamProctor` WRITE;
/*!40000 ALTER TABLE `ExamProctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExamProctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamSchedule`
--

DROP TABLE IF EXISTS `ExamSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExamSchedule` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `termId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `examType` enum('MIDTERM','FINAL','QUIZ','MAKEUP') COLLATE utf8mb4_unicode_ci NOT NULL,
  `examDate` datetime(3) NOT NULL,
  `startTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endTime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `examFormat` enum('CLOSED_BOOK','OPEN_BOOK','TAKE_HOME','ONLINE','PRACTICAL') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CLOSED_BOOK',
  `instructions` text COLLATE utf8mb4_unicode_ci,
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExamSchedule_courseId_section_termId_examType_key` (`courseId`,`section`,`termId`,`examType`),
  KEY `ExamSchedule_termId_examType_idx` (`termId`,`examType`),
  KEY `ExamSchedule_examDate_idx` (`examDate`),
  CONSTRAINT `ExamSchedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ExamSchedule_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamSchedule`
--

LOCK TABLES `ExamSchedule` WRITE;
/*!40000 ALTER TABLE `ExamSchedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExamSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamSlot`
--

DROP TABLE IF EXISTS `ExamSlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExamSlot` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `examScheduleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `assignedCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ExamSlot_examScheduleId_idx` (`examScheduleId`),
  KEY `ExamSlot_roomId_idx` (`roomId`),
  CONSTRAINT `ExamSlot_examScheduleId_fkey` FOREIGN KEY (`examScheduleId`) REFERENCES `ExamSchedule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ExamSlot_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamSlot`
--

LOCK TABLES `ExamSlot` WRITE;
/*!40000 ALTER TABLE `ExamSlot` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExamSlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Faculty` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Faculty_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Faculty`
--

LOCK TABLES `Faculty` WRITE;
/*!40000 ALTER TABLE `Faculty` DISABLE KEYS */;
INSERT INTO `Faculty` VALUES ('cmja6sqtt0008poyeuiyjsbch','01','คณะวิศวกรรมศาสตร์','Faculty of Engineering','Leading faculty in engineering education and research',NULL),('cmja6sqtx0009poyeti33515r','02','คณะวิทยาศาสตร์','Faculty of Science','Excellence in scientific research and education',NULL),('cmja6sqtz000apoyerneg11cj','03','คณะบริหารธุรกิจ','Faculty of Business Administration','Preparing future business leaders',NULL);
/*!40000 ALTER TABLE `Faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HelpArticle`
--

DROP TABLE IF EXISTS `HelpArticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HelpArticle` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` enum('PUBLIC','STUDENT','INSTRUCTOR','STAFF','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PUBLIC',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `HelpArticle_categoryId_fkey` (`categoryId`),
  KEY `HelpArticle_authorId_fkey` (`authorId`),
  CONSTRAINT `HelpArticle_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `HelpArticle_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `HelpCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HelpArticle`
--

LOCK TABLES `HelpArticle` WRITE;
/*!40000 ALTER TABLE `HelpArticle` DISABLE KEYS */;
/*!40000 ALTER TABLE `HelpArticle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HelpCategory`
--

DROP TABLE IF EXISTS `HelpCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HelpCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HelpCategory`
--

LOCK TABLES `HelpCategory` WRITE;
/*!40000 ALTER TABLE `HelpCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `HelpCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InterviewFeedback`
--

DROP TABLE IF EXISTS `InterviewFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InterviewFeedback` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interviewResultId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `InterviewFeedback_interviewResultId_key` (`interviewResultId`),
  CONSTRAINT `InterviewFeedback_interviewResultId_fkey` FOREIGN KEY (`interviewResultId`) REFERENCES `InterviewResult` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InterviewFeedback`
--

LOCK TABLES `InterviewFeedback` WRITE;
/*!40000 ALTER TABLE `InterviewFeedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `InterviewFeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InterviewResult`
--

DROP TABLE IF EXISTS `InterviewResult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InterviewResult` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slotId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `isPassed` tinyint(1) DEFAULT NULL,
  `confirmedAt` datetime(3) DEFAULT NULL,
  `rescheduleRequested` tinyint(1) NOT NULL DEFAULT '0',
  `rescheduleReason` text COLLATE utf8mb4_unicode_ci,
  `checkedInAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `InterviewResult_applicationId_key` (`applicationId`),
  KEY `InterviewResult_slotId_fkey` (`slotId`),
  CONSTRAINT `InterviewResult_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `InterviewResult_slotId_fkey` FOREIGN KEY (`slotId`) REFERENCES `InterviewSlot` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InterviewResult`
--

LOCK TABLES `InterviewResult` WRITE;
/*!40000 ALTER TABLE `InterviewResult` DISABLE KEYS */;
/*!40000 ALTER TABLE `InterviewResult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InterviewSlot`
--

DROP TABLE IF EXISTS `InterviewSlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InterviewSlot` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinatorName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinatorPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `InterviewSlot_programId_fkey` (`programId`),
  CONSTRAINT `InterviewSlot_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InterviewSlot`
--

LOCK TABLES `InterviewSlot` WRITE;
/*!40000 ALTER TABLE `InterviewSlot` DISABLE KEYS */;
/*!40000 ALTER TABLE `InterviewSlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InterviewSlotInterviewer`
--

DROP TABLE IF EXISTS `InterviewSlotInterviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InterviewSlotInterviewer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slotId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interviewerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `InterviewSlotInterviewer_slotId_interviewerId_key` (`slotId`,`interviewerId`),
  KEY `InterviewSlotInterviewer_interviewerId_fkey` (`interviewerId`),
  CONSTRAINT `InterviewSlotInterviewer_interviewerId_fkey` FOREIGN KEY (`interviewerId`) REFERENCES `Personnel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `InterviewSlotInterviewer_slotId_fkey` FOREIGN KEY (`slotId`) REFERENCES `InterviewSlot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InterviewSlotInterviewer`
--

LOCK TABLES `InterviewSlotInterviewer` WRITE;
/*!40000 ALTER TABLE `InterviewSlotInterviewer` DISABLE KEYS */;
/*!40000 ALTER TABLE `InterviewSlotInterviewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Invoice` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `termId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `dueDate` datetime(3) NOT NULL,
  `status` enum('PENDING','PAID','CANCELLED','OVERDUE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Invoice_studentId_fkey` (`studentId`),
  KEY `Invoice_termId_fkey` (`termId`),
  CONSTRAINT `Invoice_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Invoice_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvoiceItem`
--

DROP TABLE IF EXISTS `InvoiceItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InvoiceItem` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `InvoiceItem_invoiceId_fkey` (`invoiceId`),
  CONSTRAINT `InvoiceItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvoiceItem`
--

LOCK TABLES `InvoiceItem` WRITE;
/*!40000 ALTER TABLE `InvoiceItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `InvoiceItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LeaveRequest`
--

DROP TABLE IF EXISTS `LeaveRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LeaveRequest` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `reviewedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviewedAt` datetime(3) DEFAULT NULL,
  `reviewNote` text COLLATE utf8mb4_unicode_ci,
  `documentUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `LeaveRequest_studentId_idx` (`studentId`),
  KEY `LeaveRequest_status_idx` (`status`),
  KEY `LeaveRequest_reviewedBy_fkey` (`reviewedBy`),
  CONSTRAINT `LeaveRequest_reviewedBy_fkey` FOREIGN KEY (`reviewedBy`) REFERENCES `Personnel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LeaveRequest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LeaveRequest`
--

LOCK TABLES `LeaveRequest` WRITE;
/*!40000 ALTER TABLE `LeaveRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `LeaveRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `slipUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paidAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `verifiedAt` datetime(3) DEFAULT NULL,
  `verifiedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Payment_invoiceId_fkey` (`invoiceId`),
  CONSTRAINT `Payment_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Personnel`
--

DROP TABLE IF EXISTS `Personnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Personnel` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facultyId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departmentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `expertise` text COLLATE utf8mb4_unicode_ci,
  `education` text COLLATE utf8mb4_unicode_ci,
  `publications` text COLLATE utf8mb4_unicode_ci,
  `officeHours` text COLLATE utf8mb4_unicode_ci,
  `officeLocation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isProfilePublic` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Personnel_userId_key` (`userId`),
  KEY `Personnel_facultyId_fkey` (`facultyId`),
  KEY `Personnel_departmentId_fkey` (`departmentId`),
  CONSTRAINT `Personnel_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Personnel_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Personnel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personnel`
--

LOCK TABLES `Personnel` WRITE;
/*!40000 ALTER TABLE `Personnel` DISABLE KEYS */;
INSERT INTO `Personnel` VALUES ('cmja6sqtk0001poyegsssnn9t','cmja6sqtk0000poye6vfbi4ze','Admin','User','Mr.','System Administrator',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-12-30 23:55:30.878','2025-12-30 23:55:30.878'),('cmja6sqtp0003poye74q5u7a9','cmja6sqtp0002poyeyd8klbhh','Staff','Member','Ms.','Registrar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-12-30 23:55:30.878','2025-12-30 23:55:30.878'),('cmja6sqtq0005poye0ppx11qd','cmja6sqtq0004poyeli68h5wd','John','Doe','Dr.','Associate Professor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-12-30 23:55:30.878','2025-12-30 23:55:30.878');
/*!40000 ALTER TABLE `Personnel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Program`
--

DROP TABLE IF EXISTS `Program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Program` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameEn` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degreeLevel` enum('BACHELOR','MASTER','DOCTORATE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `isAcceptingApplications` tinyint(1) NOT NULL DEFAULT '1',
  `credits` int DEFAULT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `objectives` text COLLATE utf8mb4_unicode_ci,
  `structure` text COLLATE utf8mb4_unicode_ci,
  `admissionRequirements` text COLLATE utf8mb4_unicode_ci,
  `careerOpportunities` text COLLATE utf8mb4_unicode_ci,
  `facultyId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departmentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Program_facultyId_fkey` (`facultyId`),
  KEY `Program_departmentId_fkey` (`departmentId`),
  CONSTRAINT `Program_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Program_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Program`
--

LOCK TABLES `Program` WRITE;
/*!40000 ALTER TABLE `Program` DISABLE KEYS */;
INSERT INTO `Program` VALUES ('cmja6squ0000cpoyedgvudfde','วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์','Bachelor of Science in Computer Science','BACHELOR','Comprehensive program in computer science covering software development, algorithms, and system design',1,132,'4 years','1. Develop strong foundation in computer science principles\n2. Master software development and engineering practices\n3. Prepare for careers in technology industry\n4. Foster innovation and problem-solving skills','Year 1-2: Core courses in programming, data structures, algorithms\nYear 3-4: Advanced courses and specialization tracks\nFinal year: Capstone project','- High school diploma with GPA 3.0 or above\n- Strong background in mathematics\n- Pass entrance examination\n- English proficiency (TOEFL 550 or IELTS 6.0)','- Software Engineer\n- Data Scientist\n- System Architect\n- IT Consultant\n- Technology Entrepreneur','cmja6sqtt0008poyeuiyjsbch','dept-cse-01'),('cmja6squ2000epoyeryk2n54i','วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไฟฟ้า','Bachelor of Engineering in Electrical Engineering','BACHELOR','Comprehensive electrical engineering program focusing on power systems, electronics, and control systems',1,140,'4 years',NULL,NULL,NULL,NULL,'cmja6sqtt0008poyeuiyjsbch','dept-ee-01'),('cmja6squ3000gpoye1fcdj096','วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์','Bachelor of Science in Mathematics','BACHELOR','Pure and applied mathematics program',1,128,'4 years',NULL,NULL,NULL,NULL,'cmja6sqtx0009poyeti33515r','dept-math-02'),('cmja6squ3000ipoyezlzuvi87','บริหารธุรกิจบัณฑิต','Bachelor of Business Administration','BACHELOR','Comprehensive business administration program',1,126,'4 years',NULL,NULL,NULL,NULL,'cmja6sqtz000apoyerneg11cj','dept-mgmt-03'),('cmja6squ4000kpoyeukjjqf0x','วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์','Master of Science in Computer Science','MASTER','Advanced computer science program for research and development',1,36,'2 years',NULL,NULL,NULL,NULL,'cmja6sqtt0008poyeuiyjsbch','dept-cse-01');
/*!40000 ALTER TABLE `Program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProgramCourse`
--

DROP TABLE IF EXISTS `ProgramCourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProgramCourse` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isRequired` tinyint(1) NOT NULL DEFAULT '1',
  `semester` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProgramCourse_programId_courseId_key` (`programId`,`courseId`),
  KEY `ProgramCourse_courseId_fkey` (`courseId`),
  CONSTRAINT `ProgramCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProgramCourse_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProgramCourse`
--

LOCK TABLES `ProgramCourse` WRITE;
/*!40000 ALTER TABLE `ProgramCourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProgramCourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Room`
--

DROP TABLE IF EXISTS `Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Room` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `building` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int NOT NULL,
  `capacity` int NOT NULL,
  `roomType` enum('LECTURE_ROOM','LABORATORY','COMPUTER_LAB','STUDIO','SEMINAR_ROOM','AUDITORIUM','SPORTS_FACILITY','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `facilities` text COLLATE utf8mb4_unicode_ci,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isAvailable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Room_code_key` (`code`),
  KEY `Room_building_floor_idx` (`building`,`floor`),
  KEY `Room_roomType_idx` (`roomType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room`
--

LOCK TABLES `Room` WRITE;
/*!40000 ALTER TABLE `Room` DISABLE KEYS */;
/*!40000 ALTER TABLE `Room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstNameTh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastNameTh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Thai',
  `citizenId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthDate` datetime(3) NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profileImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `subDistrict` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentType` enum('REGULAR','EXCHANGE','SCHOLARSHIP','SPECIAL','TRANSFER','INTERNATIONAL') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'REGULAR',
  `status` enum('STUDYING','ON_LEAVE','GRADUATED','WITHDRAWN','DISMISSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STUDYING',
  `gpax` double NOT NULL DEFAULT '0',
  `bio` text COLLATE utf8mb4_unicode_ci,
  `interests` text COLLATE utf8mb4_unicode_ci,
  `skills` text COLLATE utf8mb4_unicode_ci,
  `socialLinks` text COLLATE utf8mb4_unicode_ci,
  `isProfilePublic` tinyint(1) NOT NULL DEFAULT '1',
  `showGPA` tinyint(1) NOT NULL DEFAULT '0',
  `admissionYear` int DEFAULT NULL,
  `studentGroupId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Student_studentId_key` (`studentId`),
  UNIQUE KEY `Student_userId_key` (`userId`),
  KEY `Student_programId_fkey` (`programId`),
  KEY `Student_studentGroupId_fkey` (`studentGroupId`),
  CONSTRAINT `Student_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Student_studentGroupId_fkey` FOREIGN KEY (`studentGroupId`) REFERENCES `StudentGroup` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentGroup`
--

DROP TABLE IF EXISTS `StudentGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudentGroup` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admissionYear` int NOT NULL,
  `programId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `advisorId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `StudentGroup_programId_admissionYear_name_key` (`programId`,`admissionYear`,`name`),
  KEY `StudentGroup_programId_idx` (`programId`),
  KEY `StudentGroup_admissionYear_idx` (`admissionYear`),
  KEY `StudentGroup_advisorId_fkey` (`advisorId`),
  CONSTRAINT `StudentGroup_advisorId_fkey` FOREIGN KEY (`advisorId`) REFERENCES `Personnel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `StudentGroup_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentGroup`
--

LOCK TABLES `StudentGroup` WRITE;
/*!40000 ALTER TABLE `StudentGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudentGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SystemLog`
--

DROP TABLE IF EXISTS `SystemLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SystemLog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `ipAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `SystemLog_userId_fkey` (`userId`),
  CONSTRAINT `SystemLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SystemLog`
--

LOCK TABLES `SystemLog` WRITE;
/*!40000 ALTER TABLE `SystemLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `SystemLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SystemSettings`
--

DROP TABLE IF EXISTS `SystemSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SystemSettings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `universityName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'University MS',
  `universityNameTh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ระบบจัดการข้อมูลมหาวิทยาลัย',
  `logoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primaryColor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#033675',
  `secondaryColor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#03ccba',
  `backgroundColor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `studentIdFormat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STD{YEAR}{FACULTY}{NUMBER}',
  `defaultLanguage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `smtpHost` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpPort` int NOT NULL DEFAULT '587',
  `smtpUser` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpSecure` tinyint(1) NOT NULL DEFAULT '0',
  `smtpFromEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'noreply@ums.ac.th',
  `smtpFromName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'UMS Admissions',
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SystemSettings`
--

LOCK TABLES `SystemSettings` WRITE;
/*!40000 ALTER TABLE `SystemSettings` DISABLE KEYS */;
INSERT INTO `SystemSettings` VALUES ('cmja6rn7f000211x1s24pybll','University MS','ระบบจัดการข้อมูลมหาวิทยาลัย',NULL,'#033675','#03ccba','#ffffff','STD{YEAR}{FACULTY}{NUMBER}','en',NULL,587,NULL,NULL,0,'noreply@ums.ac.th','UMS Admissions','2025-12-17 15:48:23.739');
/*!40000 ALTER TABLE `SystemSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TeachingLoad`
--

DROP TABLE IF EXISTS `TeachingLoad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TeachingLoad` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `termId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lectureHours` double NOT NULL DEFAULT '0',
  `labHours` double NOT NULL DEFAULT '0',
  `totalHours` double NOT NULL DEFAULT '0',
  `courseCount` int NOT NULL DEFAULT '0',
  `isApproved` tinyint(1) NOT NULL DEFAULT '0',
  `approvedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TeachingLoad_instructorId_termId_key` (`instructorId`,`termId`),
  KEY `TeachingLoad_termId_idx` (`termId`),
  CONSTRAINT `TeachingLoad_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TeachingLoad_termId_fkey` FOREIGN KEY (`termId`) REFERENCES `AcademicTerm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TeachingLoad`
--

LOCK TABLES `TeachingLoad` WRITE;
/*!40000 ALTER TABLE `TeachingLoad` DISABLE KEYS */;
/*!40000 ALTER TABLE `TeachingLoad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Translation`
--

DROP TABLE IF EXISTS `Translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Translation` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `th` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `en` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Translation_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Translation`
--

LOCK TABLES `Translation` WRITE;
/*!40000 ALTER TABLE `Translation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Translation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','STAFF','INSTRUCTOR','STUDENT','APPLICANT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'APPLICANT',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `twoFactorSecret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twoFactorEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `twoFactorBackupCodes` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cmja6sqtk0000poye6vfbi4ze','admin@ums.ac.th','$2a$10$jdzZk51EhUzltu1vUgyk0eeMgjEULly8DiwWb9G93aZjQO584KBz6','ADMIN','2025-12-17 15:49:15.081','2025-12-17 15:49:15.081',NULL,0,NULL),('cmja6sqtp0002poyeyd8klbhh','staff@ums.ac.th','$2a$10$jdzZk51EhUzltu1vUgyk0eeMgjEULly8DiwWb9G93aZjQO584KBz6','STAFF','2025-12-17 15:49:15.085','2025-12-17 15:49:15.085',NULL,0,NULL),('cmja6sqtq0004poyeli68h5wd','instructor@ums.ac.th','$2a$10$jdzZk51EhUzltu1vUgyk0eeMgjEULly8DiwWb9G93aZjQO584KBz6','INSTRUCTOR','2025-12-17 15:49:15.087','2025-12-17 15:49:15.087',NULL,0,NULL),('cmja6sqtr0006poyebgnzex4a','applicant@ums.ac.th','$2a$10$jdzZk51EhUzltu1vUgyk0eeMgjEULly8DiwWb9G93aZjQO584KBz6','APPLICANT','2025-12-17 15:49:15.087','2025-12-17 15:49:15.087',NULL,0,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-17 19:46:53
