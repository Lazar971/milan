/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.11-MariaDB : Database - milan2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`milan2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `milan2`;

/*Table structure for table `javni_poziv` */

DROP TABLE IF EXISTS `javni_poziv`;

CREATE TABLE `javni_poziv` (
  `idJavnogPoziva` int(11) NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `sabloni` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `imaSifraRadnika` int(11) DEFAULT NULL,
  `sadrziIdKriterijuma` int(11) DEFAULT NULL,
  `resenjeDatumRPP` datetime DEFAULT NULL,
  `resenjeRadnik` int(11) DEFAULT NULL,
  `resenjePredlog` int(11) DEFAULT NULL,
  PRIMARY KEY (`idJavnogPoziva`),
  KEY `FK_c66fc96ff5a4831622ce6904ee9` (`imaSifraRadnika`),
  KEY `FK_88ce540a0b7db07597e00b750a5` (`sadrziIdKriterijuma`),
  KEY `FK_1a44d5d3abee6b85465f02984ed` (`resenjeDatumRPP`,`resenjeRadnik`,`resenjePredlog`),
  CONSTRAINT `FK_1a44d5d3abee6b85465f02984ed` FOREIGN KEY (`resenjeDatumRPP`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_opp` (`datumRPP`, `radnikSifraRadnika`, `predlogSifraPPP`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_88ce540a0b7db07597e00b750a5` FOREIGN KEY (`sadrziIdKriterijuma`) REFERENCES `kriterijum_izbora` (`idKriterijuma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c66fc96ff5a4831622ce6904ee9` FOREIGN KEY (`imaSifraRadnika`) REFERENCES `radnik` (`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

/*Data for the table `javni_poziv` */

insert  into `javni_poziv`(`idJavnogPoziva`,`datum`,`sabloni`,`status`,`imaSifraRadnika`,`sadrziIdKriterijuma`,`resenjeDatumRPP`,`resenjeRadnik`,`resenjePredlog`) values 
(8,'2021-05-06 02:00:00','1afd\\f','izmenjen',1,3,'2021-04-20 15:06:17',1,1),
(16,'2021-05-06 02:00:00','izmena','izmenjen',1,3,'2021-04-20 15:06:17',1,1),
(17,'2021-05-06 02:00:00','izmena','izmenjen',1,3,'2021-04-20 15:06:17',1,1),
(18,'2021-05-06 02:00:00','izmena','izmenjen',1,3,'2021-04-20 15:06:17',1,1),
(19,'2021-05-20 02:00:00','novi','kreiran',1,2,'2021-04-20 15:06:17',1,1);

/*Table structure for table `konkursna_dokumentacija` */

DROP TABLE IF EXISTS `konkursna_dokumentacija`;

CREATE TABLE `konkursna_dokumentacija` (
  `sifraKD` int(11) NOT NULL AUTO_INCREMENT,
  `rok` datetime NOT NULL,
  `obavezanElement` varchar(255) NOT NULL,
  `sadrziIdTD` int(11) DEFAULT NULL,
  `javniPozivIdJavnogPoziva` int(11) NOT NULL,
  `resenjeDatumRFK` datetime DEFAULT NULL,
  `resenjeRadnik` int(11) DEFAULT NULL,
  `resenjePredlog` int(11) DEFAULT NULL,
  PRIMARY KEY (`sifraKD`,`javniPozivIdJavnogPoziva`),
  KEY `FK_c2a044b7e64c965070203d91519` (`javniPozivIdJavnogPoziva`),
  KEY `FK_df6abe8e3f97f3775321b123333` (`sadrziIdTD`),
  KEY `FK_82c108a828f034c997b9703e852` (`resenjeDatumRFK`,`resenjeRadnik`,`resenjePredlog`),
  CONSTRAINT `FK_82c108a828f034c997b9703e852` FOREIGN KEY (`resenjeDatumRFK`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_ofk` (`datumRFK`, `radnikSifraRadnika`, `predlogSifraPFK`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c2a044b7e64c965070203d91519` FOREIGN KEY (`javniPozivIdJavnogPoziva`) REFERENCES `javni_poziv` (`idJavnogPoziva`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_df6abe8e3f97f3775321b123333` FOREIGN KEY (`sadrziIdTD`) REFERENCES `tehnicka_dokumentacija` (`idTD`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

/*Data for the table `konkursna_dokumentacija` */

insert  into `konkursna_dokumentacija`(`sifraKD`,`rok`,`obavezanElement`,`sadrziIdTD`,`javniPozivIdJavnogPoziva`,`resenjeDatumRFK`,`resenjeRadnik`,`resenjePredlog`) values 
(8,'2021-05-11 02:00:00','afdsg',2,8,'1970-01-22 14:19:58',1,1),
(8,'2021-05-11 02:00:00','afdsg',2,16,'1970-01-22 14:19:58',1,1),
(8,'2021-05-11 02:00:00','afdsg',2,17,'1970-01-22 14:19:58',1,1),
(8,'2021-05-11 02:00:00','afdsg',2,18,'1970-01-22 14:19:58',1,1),
(9,'2021-05-11 02:00:00','afdsgafds',1,16,'1970-01-22 14:19:58',1,1),
(9,'2021-05-11 02:00:00','afdsgafds',1,17,'1970-01-22 14:19:58',1,1),
(12,'2021-05-11 02:00:00','afdsgafdsadsfdgh',2,17,'1970-01-11 14:20:01',1,2),
(14,'2021-05-11 02:00:00','afdsgfeatdhyrukilo;',1,8,'1970-01-22 14:19:58',1,1),
(15,'2021-05-11 02:00:00','afdsgfeatdhyrukilo;',1,8,'1970-01-22 14:19:58',1,1),
(19,'2021-05-05 02:00:00','DAF',1,19,'1970-01-22 14:19:58',1,1);

/*Table structure for table `kriterijum_izbora` */

DROP TABLE IF EXISTS `kriterijum_izbora`;

CREATE TABLE `kriterijum_izbora` (
  `idKriterijuma` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  PRIMARY KEY (`idKriterijuma`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `kriterijum_izbora` */

insert  into `kriterijum_izbora`(`idKriterijuma`,`naziv`) values 
(1,'adsfdg'),
(2,'afdsdg'),
(3,'grhtjy');

/*Table structure for table `nacin_dostavljanja_ponude` */

DROP TABLE IF EXISTS `nacin_dostavljanja_ponude`;

CREATE TABLE `nacin_dostavljanja_ponude` (
  `rb` int(11) NOT NULL AUTO_INCREMENT,
  `adresa` varchar(255) NOT NULL,
  `opis` varchar(255) NOT NULL,
  `dokumentacijaSifraKD` int(11) NOT NULL,
  `javniPozivId` int(11) NOT NULL,
  PRIMARY KEY (`rb`,`dokumentacijaSifraKD`,`javniPozivId`),
  KEY `nacin_dostavljanja_ponude_ibfk_1` (`dokumentacijaSifraKD`,`javniPozivId`),
  CONSTRAINT `nacin_dostavljanja_ponude_ibfk_1` FOREIGN KEY (`dokumentacijaSifraKD`, `javniPozivId`) REFERENCES `konkursna_dokumentacija` (`sifraKD`, `javniPozivIdJavnogPoziva`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `nacin_dostavljanja_ponude` */

insert  into `nacin_dostavljanja_ponude`(`rb`,`adresa`,`opis`,`dokumentacijaSifraKD`,`javniPozivId`) values 
(1,'afdgafesgrhtdyrjtukyil','afdsg',8,8),
(4,'adsfsg','afsdsf',12,17),
(5,'adsfsgafd','afsdsfafdsf',12,17),
(8,'afe','aefsg',14,8),
(9,'afe','aefsg',15,8),
(13,'sfdsg','sfd',8,8),
(14,'dfa','afsdg',19,19);

/*Table structure for table `organizaciona_jedinica` */

DROP TABLE IF EXISTS `organizaciona_jedinica`;

CREATE TABLE `organizaciona_jedinica` (
  `sifraOJ` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `rukovodiSifraRadnika` int(11) DEFAULT NULL,
  PRIMARY KEY (`sifraOJ`),
  UNIQUE KEY `REL_b6ee5fcb80634a28bee845fd3c` (`rukovodiSifraRadnika`),
  CONSTRAINT `FK_b6ee5fcb80634a28bee845fd3c8` FOREIGN KEY (`rukovodiSifraRadnika`) REFERENCES `radnik` (`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `organizaciona_jedinica` */

insert  into `organizaciona_jedinica`(`sifraOJ`,`naziv`,`rukovodiSifraRadnika`) values 
(1,'oj1',1),
(2,'oj2',NULL);

/*Table structure for table `ponudjac` */

DROP TABLE IF EXISTS `ponudjac`;

CREATE TABLE `ponudjac` (
  `maticniBroj` varchar(255) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `datum` datetime NOT NULL,
  `pib` varchar(255) NOT NULL,
  PRIMARY KEY (`maticniBroj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `ponudjac` */

/*Table structure for table `predlog_o_formiranju_komisije` */

DROP TABLE IF EXISTS `predlog_o_formiranju_komisije`;

CREATE TABLE `predlog_o_formiranju_komisije` (
  `sifraPFK` int(11) NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `opis` varchar(255) NOT NULL,
  PRIMARY KEY (`sifraPFK`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `predlog_o_formiranju_komisije` */

insert  into `predlog_o_formiranju_komisije`(`sifraPFK`,`datum`,`opis`) values 
(1,'2021-04-22 17:23:53','dfxgfbcnvh'),
(2,'2021-04-27 17:23:57','afdg');

/*Table structure for table `predlog_o_pokretanju_postupka` */

DROP TABLE IF EXISTS `predlog_o_pokretanju_postupka`;

CREATE TABLE `predlog_o_pokretanju_postupka` (
  `sifraPPP` int(11) NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `opis` varchar(255) NOT NULL,
  PRIMARY KEY (`sifraPPP`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `predlog_o_pokretanju_postupka` */

insert  into `predlog_o_pokretanju_postupka`(`sifraPPP`,`datum`,`opis`) values 
(1,'2021-04-21 15:06:06','zfdcgh');

/*Table structure for table `prima` */

DROP TABLE IF EXISTS `prima`;

CREATE TABLE `prima` (
  `datumPrimanja` datetime NOT NULL,
  `ponudjacMaticniBroj` varchar(255) NOT NULL,
  `javniPozivIdJavnogPoziva` int(11) NOT NULL,
  PRIMARY KEY (`ponudjacMaticniBroj`,`javniPozivIdJavnogPoziva`),
  KEY `FK_8d49bbcd401e2d881105999b5da` (`javniPozivIdJavnogPoziva`),
  CONSTRAINT `FK_8d49bbcd401e2d881105999b5da` FOREIGN KEY (`javniPozivIdJavnogPoziva`) REFERENCES `javni_poziv` (`idJavnogPoziva`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_94666e89d251c105970bb6b83a9` FOREIGN KEY (`ponudjacMaticniBroj`) REFERENCES `ponudjac` (`maticniBroj`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `prima` */

/*Table structure for table `radnik` */

DROP TABLE IF EXISTS `radnik`;

CREATE TABLE `radnik` (
  `sifraRadnika` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `radiSifraOJ` int(11) DEFAULT NULL,
  `pripadaSifraOJ` int(11) DEFAULT NULL,
  PRIMARY KEY (`sifraRadnika`),
  KEY `FK_1eb437df0ec473d159484714f7f` (`radiSifraOJ`),
  KEY `FK_10f7dbdda5d4dc848b43dda5a62` (`pripadaSifraOJ`),
  CONSTRAINT `FK_10f7dbdda5d4dc848b43dda5a62` FOREIGN KEY (`pripadaSifraOJ`) REFERENCES `organizaciona_jedinica` (`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_1eb437df0ec473d159484714f7f` FOREIGN KEY (`radiSifraOJ`) REFERENCES `organizaciona_jedinica` (`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `radnik` */

insert  into `radnik`(`sifraRadnika`,`ime`,`prezime`,`status`,`radiSifraOJ`,`pripadaSifraOJ`) values 
(1,'ime1fds','prezime1adsfs','aktivan',2,1);

/*Table structure for table `resenje_ofk` */

DROP TABLE IF EXISTS `resenje_ofk`;

CREATE TABLE `resenje_ofk` (
  `datumRFK` datetime NOT NULL,
  `potpis` varchar(255) NOT NULL,
  `radnikSifraRadnika` int(11) NOT NULL,
  `predlogSifraPFK` int(11) NOT NULL,
  PRIMARY KEY (`datumRFK`,`radnikSifraRadnika`,`predlogSifraPFK`),
  KEY `FK_0f880a68f1cbbf27232214072dc` (`radnikSifraRadnika`),
  KEY `FK_95c725d3741c6f3acedeb07d2e6` (`predlogSifraPFK`),
  CONSTRAINT `FK_0f880a68f1cbbf27232214072dc` FOREIGN KEY (`radnikSifraRadnika`) REFERENCES `radnik` (`sifraRadnika`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_95c725d3741c6f3acedeb07d2e6` FOREIGN KEY (`predlogSifraPFK`) REFERENCES `predlog_o_formiranju_komisije` (`sifraPFK`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `resenje_ofk` */

insert  into `resenje_ofk`(`datumRFK`,`potpis`,`radnikSifraRadnika`,`predlogSifraPFK`) values 
('1970-01-11 14:20:01','potpis1',1,2),
('1970-01-22 14:19:58','potpis2',1,1);

/*Table structure for table `resenje_opp` */

DROP TABLE IF EXISTS `resenje_opp`;

CREATE TABLE `resenje_opp` (
  `datumRPP` datetime NOT NULL,
  `potpis` varchar(255) NOT NULL,
  `radnikSifraRadnika` int(11) NOT NULL,
  `predlogSifraPPP` int(11) NOT NULL,
  PRIMARY KEY (`datumRPP`,`radnikSifraRadnika`,`predlogSifraPPP`),
  KEY `FK_fc2cf64ba9b601a2290c499326e` (`radnikSifraRadnika`),
  KEY `FK_9a03aed9044dae11e47fe57a614` (`predlogSifraPPP`),
  CONSTRAINT `FK_9a03aed9044dae11e47fe57a614` FOREIGN KEY (`predlogSifraPPP`) REFERENCES `predlog_o_pokretanju_postupka` (`sifraPPP`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_fc2cf64ba9b601a2290c499326e` FOREIGN KEY (`radnikSifraRadnika`) REFERENCES `radnik` (`sifraRadnika`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `resenje_opp` */

insert  into `resenje_opp`(`datumRPP`,`potpis`,`radnikSifraRadnika`,`predlogSifraPPP`) values 
('2021-04-20 15:06:17','dafsg',1,1);

/*Table structure for table `tehnicka_dokumentacija` */

DROP TABLE IF EXISTS `tehnicka_dokumentacija`;

CREATE TABLE `tehnicka_dokumentacija` (
  `idTD` int(11) NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `opis` varchar(255) NOT NULL,
  PRIMARY KEY (`idTD`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tehnicka_dokumentacija` */

insert  into `tehnicka_dokumentacija`(`idTD`,`datum`,`opis`) values 
(1,'2021-04-13 17:20:21','afsdg'),
(2,'2021-04-20 17:20:25','ertr4thjyu');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
