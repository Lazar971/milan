import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import OrganizacionaJedinica from "./OrganizacionaJedinica";

@Entity()
export default class Radnik {

    @PrimaryGeneratedColumn()
    sifraRadnika: number;

    @Column()
    ime: string;

    @Column()
    prezime: string;

    @Column({ type: 'varchar' })
    status: 'u izradi' | 'aktivan' | 'pasivan';

    @ManyToOne(type => OrganizacionaJedinica, { eager: true })
    radi: OrganizacionaJedinica;

    @ManyToOne(type => OrganizacionaJedinica, { eager: true })
    pripada: OrganizacionaJedinica;

    @OneToOne(type => OrganizacionaJedinica, oj => oj.rukovodi, { eager: true })
    rukovodi?: OrganizacionaJedinica;

}