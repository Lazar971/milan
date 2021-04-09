import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Ponudjac {

    @PrimaryColumn()
    maticniBroj: string;

    @Column()
    naziv: string;

    @Column()
    datum: Date;


    @Column()
    pib: string;
}