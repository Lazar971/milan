import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import JavniPoziv from "./JavniPoziv";
import KonkursnaDokumentacija from "./KonkursnaDokumentacija";

@Entity()
export default class NacinDostavljanjaPonude {

    @PrimaryGeneratedColumn()
    rb: number;

    @Column()
    adresa: string;

    @Column()
    opis: string;


    @ManyToOne(type => KonkursnaDokumentacija, d => d.nacini, { eager: true, primary: true, onDelete: 'CASCADE' })

    dokumentacija: KonkursnaDokumentacija;

}