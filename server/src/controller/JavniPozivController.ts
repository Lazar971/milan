import { EntityManager, FindConditions, getManager, getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import JavniPoziv from "../entity/JavniPoziv";
import KonkursnaDokumentacija from "../entity/KonkursnaDokumentacija";
import NacinDostavljanjaPonude from "../entity/NacinDostavljanjaPonude";
import { Prima } from "../entity/Prima";


export default class JavniPozivController {

    private jpRepository: Repository<JavniPoziv>;
    private kdRepository: Repository<KonkursnaDokumentacija>
    private manager: EntityManager;
    public constructor() {
        this.jpRepository = getRepository(JavniPoziv);
        this.kdRepository = getRepository(KonkursnaDokumentacija);
        this.manager = getManager();
    }

    async all(req: Request, res: Response) {
        return this.jpRepository.find();

    }
    async one(req: Request, res: Response) {

        const id = parseInt(req.params.id);
        const jp = await this.jpRepository.findOne(id);
        const dok = await this.kdRepository.find({
            where: {
                javniPoziv: {
                    idJavnogPoziva: jp.idJavnogPoziva
                }
            }
        });
        jp.konkursneDokumentacija = dok;

    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const jp = await this.jpRepository.findOne(id);
        if (!jp) {
            res.sendStatus(404);

        } else {
            await this.jpRepository.delete(id);
            res.sendStatus(204);

        }
        return undefined;
    }
    async create(req: Request, res: Response) {

        const data = req.body;

        const datum = new Date(data.datum);
        const sabloni = data.sabloni;
        //id radnika
        const ima = data.radnik;
        //id kriterijuma
        const sadrzi = data.sadrzi;
        //objekat sa atributima: datumRPP, radnik(id radnika), predlog(id predloga)
        const resenje = data.resenje;


        const dokumentacije = data.konkursneDokumentacija;

        const javniPoziv = this.manager.transaction(async (manager) => {

            const jp = await manager.save(JavniPoziv, {
                datum: datum,
                ima: ima,
                resenje: resenje,
                sadrzi: sadrzi,
                status: 'kreiran',
                sabloni: sabloni
            }) as JavniPoziv;
            for (let dok of dokumentacije) {
                const rok = dok.rok;
                const obavezanElement = dok.obavezanElement;
                const sadrzi = dok.sadrzi;
                const resenje = dok.resenje;

                const dokumentacija = await manager.save(KonkursnaDokumentacija, {
                    javniPoziv: jp.idJavnogPoziva as any,
                    rok: rok,
                    obavezanElement: obavezanElement,
                    sadrzi: sadrzi,
                    resenje: resenje
                });
                for (let nacin of dok.nacini) {
                    await manager.save(NacinDostavljanjaPonude, {
                        adresa: nacin.adresa,
                        opis: nacin.opis,
                        dokumentacija: dokumentacija
                    })
                }

            }
            return jp;

        });
        return javniPoziv;

    }
    async update(req: Request, res: Response) {

        const data = req.body;
        const jp1 = await this.jpRepository.findOne(req.params.id);
        if (!jp1) {
            res.sendStatus(404);
            return undefined;
        }

        const datum = (data.datum) ? new Date(data.datum) : undefined;
        const sabloni = data.sabloni;
        //id radnika
        const ima = data.radnik;
        //id kriterijuma
        const sadrzi = data.sadrzi;
        //objekat sa atributima: datumRPP, radnik(id radnika), predlog(id predloga)
        const resenje = data.resenje;


        const dokumentacije = data.konkursneDokumentacija;

        const javniPoziv = this.manager.transaction(async (manager) => {


            const jp = await manager.save(JavniPoziv, {
                idJavnogPoziva: jp1.idJavnogPoziva,
                datum: datum || jp1.datum,
                ima: ima || jp1.ima.sifraRadnika,
                status: 'izmenjen',
                resenje: resenje || jp1.resenje,
                sadrzi: sadrzi || jp1.sadrzi.idKriterijuma,
                sabloni: sabloni || jp1.sabloni,

            } as JavniPoziv) as JavniPoziv;
            for (let dok of dokumentacije) {

                const obrisana = dok.obrisana;
                if (obrisana) {
                    manager.delete(KonkursnaDokumentacija, {
                        sifraKD: dok.sifraKD,
                        javniPoziv: {
                            idJavnogPoziva: jp.idJavnogPoziva
                        }
                    } as FindConditions<KonkursnaDokumentacija>)
                } else {
                    let dokumentacija: Partial<KonkursnaDokumentacija>;
                    if (dok.sifraKD) {

                        const dok1 = await manager.findOne(KonkursnaDokumentacija, {
                            where: {
                                sifraKD: dok.sifraKD,
                                javniPoziv: {
                                    idJavnogPoziva: jp.idJavnogPoziva
                                }
                            }
                        });
                        dokumentacija = await manager.save(KonkursnaDokumentacija, { ...dok1, ...dok });

                    } else {
                        const rok = dok.rok;
                        const obavezanElement = dok.obavezanElement;
                        const sadrzi = dok.sadrzi;
                        const resenje = dok.resenje;

                        dokumentacija = await manager.save(KonkursnaDokumentacija, {
                            javniPoziv: jp.idJavnogPoziva as any,
                            rok: rok,
                            obavezanElement: obavezanElement,
                            sadrzi: sadrzi,
                            resenje: resenje
                        })
                    }
                    for (let nacinData of dok.nacini) {
                        if (nacinData.obrisan) {
                            await manager.delete(NacinDostavljanjaPonude, {
                                rb: nacinData.rb,
                                dokumentacija: dokumentacija
                            })
                        } else {
                            if (nacinData.rb) {
                                const nacin = await manager.findOne(NacinDostavljanjaPonude, {
                                    where: {
                                        rb: nacinData.rb,
                                        dokumentacija: dokumentacija
                                    }
                                });
                                await manager.save(NacinDostavljanjaPonude, { ...nacin, ...nacinData });
                            } else {
                                await manager.save(NacinDostavljanjaPonude, { ...nacinData, dokumentacija: dokumentacija });
                            }

                        }
                    }
                }



            }
            return jp;

        });
        return javniPoziv;

    }

    async posalji(req: Request, res: Response) {

        const id = parseInt(req.params.id);
        const ponudjaci = req.body;

        await this.manager.transaction(async manager => {

            for (let ponudjac of ponudjaci) {
                await manager.save(Prima, {
                    ponudjac: {
                        maticniBroj: ponudjac
                    },
                    javniPoziv: {
                        idJavnogPoziva: id
                    },
                    datumPrimanja: new Date()
                })
            }
            await manager.update(JavniPoziv, id, { status: 'poslat' })
        });
        res.sendStatus(204);
        return undefined;
    }


}