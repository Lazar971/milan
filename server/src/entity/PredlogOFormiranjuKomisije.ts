
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export default class PredlogOFormiranjuKomisije {
    @PrimaryGeneratedColumn()
    sifraPFK: number;

    @Column()
    datum: Date;

    @Column()
    opis: String;
}