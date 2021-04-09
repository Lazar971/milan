import { MigrationInterface, QueryRunner } from "typeorm";

export class KreirajNacinDostavljanja1617969116745 implements MigrationInterface {
    name = 'KreirajNacinDostavljanja1617969116745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `nacin_dostavljanja_ponude` (`rb` int NOT NULL AUTO_INCREMENT, `adresa` varchar(255) NOT NULL, `opis` varchar(255) NOT NULL, `dokumentacijaSifraKD` int NOT NULL, `dokumentacijaJavniPozivIdJavnogPoziva` int NOT NULL, PRIMARY KEY (`rb`, `dokumentacijaSifraKD`,`dokumentacijaJavniPozivIdJavnogPoziva`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` DROP FOREIGN KEY `FK_b6ee5fcb80634a28bee845fd3c8`");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` CHANGE `rukovodiSifraRadnika` `rukovodiSifraRadnika` int NULL");
        await queryRunner.query("ALTER TABLE `radnik` DROP FOREIGN KEY `FK_1eb437df0ec473d159484714f7f`");
        await queryRunner.query("ALTER TABLE `radnik` DROP FOREIGN KEY `FK_10f7dbdda5d4dc848b43dda5a62`");
        await queryRunner.query("ALTER TABLE `radnik` CHANGE `radiSifraOJ` `radiSifraOJ` int NULL");
        await queryRunner.query("ALTER TABLE `radnik` CHANGE `pripadaSifraOJ` `pripadaSifraOJ` int NULL");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` DROP FOREIGN KEY `FK_df6abe8e3f97f3775321b123333`");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` DROP FOREIGN KEY `FK_82c108a828f034c997b9703e852`");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `sadrziIdTD` `sadrziIdTD` int NULL");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjeDatumRFK` `resenjeDatumRFK` datetime NULL");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjeRadnik` `resenjeRadnik` int NULL");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjePredlog` `resenjePredlog` int NULL");
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_c66fc96ff5a4831622ce6904ee9`");
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_88ce540a0b7db07597e00b750a5`");
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_1a44d5d3abee6b85465f02984ed`");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `imaSifraRadnika` `imaSifraRadnika` int NULL");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `sadrziIdKriterijuma` `sadrziIdKriterijuma` int NULL");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjeDatumRPP` `resenjeDatumRPP` datetime NULL");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjeRadnik` `resenjeRadnik` int NULL");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjePredlog` `resenjePredlog` int NULL");
        await queryRunner.query("ALTER TABLE `nacin_dostavljanja_ponude` ADD CONSTRAINT `FK_f3822755f974ba33f6995161793` FOREIGN KEY (`dokumentacijaSifraKD`,`dokumentacijaJavniPozivIdJavnogPoziva`) REFERENCES `konkursna_dokumentacija`(`sifraKD`,`javniPozivIdJavnogPoziva`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` ADD CONSTRAINT `FK_b6ee5fcb80634a28bee845fd3c8` FOREIGN KEY (`rukovodiSifraRadnika`) REFERENCES `radnik`(`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `radnik` ADD CONSTRAINT `FK_1eb437df0ec473d159484714f7f` FOREIGN KEY (`radiSifraOJ`) REFERENCES `organizaciona_jedinica`(`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `radnik` ADD CONSTRAINT `FK_10f7dbdda5d4dc848b43dda5a62` FOREIGN KEY (`pripadaSifraOJ`) REFERENCES `organizaciona_jedinica`(`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` ADD CONSTRAINT `FK_df6abe8e3f97f3775321b123333` FOREIGN KEY (`sadrziIdTD`) REFERENCES `tehnicka_dokumentacija`(`idTD`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` ADD CONSTRAINT `FK_82c108a828f034c997b9703e852` FOREIGN KEY (`resenjeDatumRFK`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_ofk`(`datumRFK`,`radnikSifraRadnika`,`predlogSifraPFK`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_c66fc96ff5a4831622ce6904ee9` FOREIGN KEY (`imaSifraRadnika`) REFERENCES `radnik`(`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_88ce540a0b7db07597e00b750a5` FOREIGN KEY (`sadrziIdKriterijuma`) REFERENCES `kriterijum_izbora`(`idKriterijuma`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_1a44d5d3abee6b85465f02984ed` FOREIGN KEY (`resenjeDatumRPP`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_opp`(`datumRPP`,`radnikSifraRadnika`,`predlogSifraPPP`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_1a44d5d3abee6b85465f02984ed`");
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_88ce540a0b7db07597e00b750a5`");
        await queryRunner.query("ALTER TABLE `javni_poziv` DROP FOREIGN KEY `FK_c66fc96ff5a4831622ce6904ee9`");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` DROP FOREIGN KEY `FK_82c108a828f034c997b9703e852`");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` DROP FOREIGN KEY `FK_df6abe8e3f97f3775321b123333`");
        await queryRunner.query("ALTER TABLE `radnik` DROP FOREIGN KEY `FK_10f7dbdda5d4dc848b43dda5a62`");
        await queryRunner.query("ALTER TABLE `radnik` DROP FOREIGN KEY `FK_1eb437df0ec473d159484714f7f`");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` DROP FOREIGN KEY `FK_b6ee5fcb80634a28bee845fd3c8`");
        await queryRunner.query("ALTER TABLE `nacin_dostavljanja_ponude` DROP FOREIGN KEY `FK_f3822755f974ba33f6995161793`");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjePredlog` `resenjePredlog` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjeRadnik` `resenjeRadnik` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `resenjeDatumRPP` `resenjeDatumRPP` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `sadrziIdKriterijuma` `sadrziIdKriterijuma` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `javni_poziv` CHANGE `imaSifraRadnika` `imaSifraRadnika` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_1a44d5d3abee6b85465f02984ed` FOREIGN KEY (`resenjeDatumRPP`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_opp`(`datumRPP`,`radnikSifraRadnika`,`predlogSifraPPP`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_88ce540a0b7db07597e00b750a5` FOREIGN KEY (`sadrziIdKriterijuma`) REFERENCES `kriterijum_izbora`(`idKriterijuma`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `javni_poziv` ADD CONSTRAINT `FK_c66fc96ff5a4831622ce6904ee9` FOREIGN KEY (`imaSifraRadnika`) REFERENCES `radnik`(`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjePredlog` `resenjePredlog` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjeRadnik` `resenjeRadnik` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `resenjeDatumRFK` `resenjeDatumRFK` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` CHANGE `sadrziIdTD` `sadrziIdTD` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` ADD CONSTRAINT `FK_82c108a828f034c997b9703e852` FOREIGN KEY (`resenjeDatumRFK`, `resenjeRadnik`, `resenjePredlog`) REFERENCES `resenje_ofk`(`datumRFK`,`radnikSifraRadnika`,`predlogSifraPFK`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `konkursna_dokumentacija` ADD CONSTRAINT `FK_df6abe8e3f97f3775321b123333` FOREIGN KEY (`sadrziIdTD`) REFERENCES `tehnicka_dokumentacija`(`idTD`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `radnik` CHANGE `pripadaSifraOJ` `pripadaSifraOJ` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `radnik` CHANGE `radiSifraOJ` `radiSifraOJ` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `radnik` ADD CONSTRAINT `FK_10f7dbdda5d4dc848b43dda5a62` FOREIGN KEY (`pripadaSifraOJ`) REFERENCES `organizaciona_jedinica`(`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `radnik` ADD CONSTRAINT `FK_1eb437df0ec473d159484714f7f` FOREIGN KEY (`radiSifraOJ`) REFERENCES `organizaciona_jedinica`(`sifraOJ`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` CHANGE `rukovodiSifraRadnika` `rukovodiSifraRadnika` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `organizaciona_jedinica` ADD CONSTRAINT `FK_b6ee5fcb80634a28bee845fd3c8` FOREIGN KEY (`rukovodiSifraRadnika`) REFERENCES `radnik`(`sifraRadnika`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `nacin_dostavljanja_ponude`");
    }

}
