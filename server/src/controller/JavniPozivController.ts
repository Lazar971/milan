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

        const noveDokumentacije = await Promise.all(dok.map(async element => {
            element.javniPoziv = undefined;
            const result = await getManager().query('SELECT rb, adresa, opis FROM nacin_dostavljanja_ponude WHERE dokumentacijaSifraKD=? AND javniPozivId=?', [element.sifraKD, jp.idJavnogPoziva]);
            element.nacini = result.map((res: any) => {
                return {
                    adresa: res.adresa,
                    opis: res.opis,
                    rb: res.rb
                }
            });
            return element;
        }))
        jp.konkursneDokumentacija = noveDokumentacije;
        res.json(jp);

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



        const dokumentacije = data.konkursneDokumentacija;

        const javniPoziv = this.manager.transaction(async (manager) => {

            const jp = await manager.save(JavniPoziv, {
                ...data,
                status: 'kreiran'
            }) as JavniPoziv;
            for (let dok of dokumentacije) {
                const rok = dok.rok;
                const obavezanElement = dok.obavezanElement;
                const sadrzi = dok.sadrzi;
                const resenje = dok.resenje;

                const dokumentacija = await manager.save(KonkursnaDokumentacija, {
                    javniPoziv: {
                        idJavnogPoziva: jp.idJavnogPoziva
                    },
                    rok: rok,
                    obavezanElement: obavezanElement,
                    sadrzi: sadrzi,
                    resenje: resenje
                }) as any;
                console.log(jp.idJavnogPoziva);
                console.log(dokumentacija.sifraKD)
                for (let nacin of dok.nacini) {
                    /* await manager.save(NacinDostavljanjaPonude, {
                        adresa: nacin.adresa,
                        opis: nacin.opis,
                        dokumentacija: dokumentacija
                    }) */
                    await manager.query(`INSERT INTO nacin_dostavljanja_ponude (adresa,opis,dokumentacijaSifraKD,javniPozivId) VALUES (?,?,?,?)`, [
                        nacin.adresa, nacin.opis, dokumentacija.sifraKD, jp.idJavnogPoziva
                    ])
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

            console.log('saving jp');
            const jp = await manager.save(JavniPoziv, {
                idJavnogPoziva: jp1.idJavnogPoziva,
                datum: datum || jp1.datum,
                ima: ima || jp1.ima.sifraRadnika,
                status: 'izmenjen',
                resenje: resenje || jp1.resenje,
                sadrzi: sadrzi || jp1.sadrzi.idKriterijuma,
                sabloni: sabloni || jp1.sabloni,

            } as JavniPoziv) as JavniPoziv;
            console.log('saved jp');
            for (let dok of dokumentacije) {

                const obrisan = dok.obrisan;
                if (obrisan) {
                    console.log('brisanje dok');
                    console.log(dok.sifraKD);
                    console.log(jp1.idJavnogPoziva);
                    await manager.delete(KonkursnaDokumentacija, {
                        sifraKD: dok.sifraKD,
                        javniPoziv: {
                            idJavnogPoziva: jp1.idJavnogPoziva
                        }
                    } as FindConditions<KonkursnaDokumentacija>)
                } else {
                    let dokumentacija: Partial<KonkursnaDokumentacija>;


                    const { nacini, ...rest } = dok;


                    dokumentacija = await manager.save(KonkursnaDokumentacija, { ...rest, javniPoziv: jp });


                    for (let nacinData of dok.nacini) {
                        if (nacinData.obrisan) {
                            await manager.query('DELETE FROM nacin_dostavljanja_ponude WHERE rb=? AND dokumentacijaSifraKD=? AND javniPozivId=?', [
                                nacinData.rb,
                                dokumentacija.sifraKD,
                                jp.idJavnogPoziva
                            ])
                        } else {
                            if (nacinData.rb) {

                                let s = '';
                                let niz = [];
                                if (nacinData.adresa) {
                                    s = 'adresa = ?';
                                    niz.push(nacinData.adresa);
                                }
                                if (nacinData.opis) {
                                    s = s + ((nacinData.adresa) ? ', ' : '') + 'opis = ?';
                                    niz.push(nacinData.opis);
                                }
                                s = 'UPDATE nacin_dostavljanja_ponude SET ' + s + ' WHERE rb=? AND dokumentacijaSifraKD=? AND javniPozivId=?';

                                if (s !== '') {
                                    await manager.query(s, [...niz, nacinData.rb, dokumentacija.sifraKD, jp.idJavnogPoziva]);
                                }
                            } else {

                                await manager.query('INSERT INTO nacin_dostavljanja_ponude(adresa,opis,dokumentacijaSifraKD,javniPozivId) VALUES (?,?,?,?)', [
                                    nacinData.adresa, nacinData.opis, dokumentacija.sifraKD, jp.idJavnogPoziva
                                ])
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