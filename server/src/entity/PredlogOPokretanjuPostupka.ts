import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PredlogOPokretanjuPostupka {

    @PrimaryGeneratedColumn()
    sifraPPP: number;

    @Column()
    datum: Date;

    @Column()
    opis: String;
}