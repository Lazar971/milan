import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import PredlogOFormiranjuKomisije from "./PredlogOFormiranjuKomisije";
import Radnik from "./Radnik";


@Entity()
export default class ResenjeOFK {
    @Column({ primary: true })
    datumRFK: Date;

    @Column()
    potpis: string;



    @ManyToOne(type => Radnik, { eager: true, primary: true, onDelete: 'CASCADE' })
    radnik: Radnik

    @ManyToOne(type => PredlogOFormiranjuKomisije, { eager: true, primary: true, onDelete: 'CASCADE' })
    predlog: PredlogOFormiranjuKomisije

}