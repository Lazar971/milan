import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import JavniPoziv from "./JavniPoziv";
import NacinDostavljanjaPonude from "./NacinDostavljanjaPonude";
import ResenjeOFK from "./ResenjeOFK";
import TehnickaDokumentacija from "./TehnickaDokumentacija";

@Entity()
export default class KonkursnaDokumentacija {


    @PrimaryGeneratedColumn()
    sifraKD: number;

    @Column()
    rok: Date;


    @Column()
    obavezanElement: string;

    @ManyToOne(type => TehnickaDokumentacija, { eager: true })
    sadrzi: TehnickaDokumentacija;

    @ManyToOne(type => JavniPoziv, (j) => j.konkursneDokumentacija, {
        eager: true, onDelete: 'CASCADE', primary: true
    })

    javniPoziv: JavniPoziv;

    @ManyToOne(type => ResenjeOFK, { eager: true })
    resenje: ResenjeOFK;

    @OneToMany(type => NacinDostavljanjaPonude, n => n.dokumentacija, { eager: false, primary: true })
    nacini: NacinDostavljanjaPonude[];
}