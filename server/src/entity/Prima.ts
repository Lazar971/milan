import { Column, Entity, ManyToOne } from "typeorm";
import JavniPoziv from "./JavniPoziv";
import Ponudjac from "./Ponudjac";

@Entity()
export class Prima {

    @Column()
    datumPrimanja: Date;


    @ManyToOne(type => Ponudjac, { primary: true, onDelete: 'CASCADE' })
    ponudjac: Ponudjac;

    @ManyToOne(type => JavniPoziv, { primary: true, eager: true })
    javniPoziv: JavniPoziv;

}