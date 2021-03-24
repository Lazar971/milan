import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Radnik from "./Radnik";

@Entity()
export default class OrganizacionaJedinica {

    @PrimaryGeneratedColumn()
    sifraOJ: number;

    @Column()
    naziv: string;

    @OneToOne(type => Radnik, radnik => radnik.rukovodi, { eager: false })
    @JoinColumn()
    rukovodi: Radnik;

    public constructor(sifraOJ: number, naziv: string, rukovodi: Radnik) {
        this.naziv = naziv;
        this.sifraOJ = sifraOJ;
        this.rukovodi = rukovodi;
    }

}