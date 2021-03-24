import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class KriterijumIzbora {

    @PrimaryGeneratedColumn()
    idKriterijuma: number;


    @Column()
    naziv: string;

}