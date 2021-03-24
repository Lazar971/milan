import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import KonkursnaDokumentacija from "./KonkursnaDokumentacija";
import KriterijumIzbora from "./KriterijumIzbora";
import Radnik from "./Radnik";
import ResenjeOPP from "./ResenjeOPP";

@Entity()
export default class JavniPoziv {

    @PrimaryGeneratedColumn()
    idJavnogPoziva: number;

    @Column()
    datum: Date;

    @Column()
    sabloni: string;


    @ManyToOne(type => Radnik, { eager: true })
    ima: Radnik

    @ManyToOne(type => KriterijumIzbora, { eager: true })
    sadrzi: KriterijumIzbora;

    @OneToMany(type => KonkursnaDokumentacija, (k) => k.javniPoziv)
    konkursneDokumentacija: KonkursnaDokumentacija[];

    @ManyToOne(type => ResenjeOPP, { eager: true })
    resenje: ResenjeOPP
}