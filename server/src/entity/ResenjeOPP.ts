import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import PredlogOPokretanjuPostupka from "./PredlogOPokretanjuPostupka";
import Radnik from "./Radnik";

@Entity()
export default class ResenjeOPP {


    @PrimaryColumn()
    datumRPP: Date;


    @Column()
    potpis: string;

    @ManyToOne(type => Radnik, { eager: true, primary: true, onDelete: 'CASCADE' })
    radnik: Radnik

    @ManyToOne(type => PredlogOPokretanjuPostupka, { eager: true, primary: true, onDelete: 'CASCADE' })
    predlog: PredlogOPokretanjuPostupka
}