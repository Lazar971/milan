import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TehnickaDokumentacija {

    @PrimaryGeneratedColumn()
    idTD: number;

    @Column()
    datum: Date;

    @Column()
    opis: string;
}