import React, { useEffect, useState } from 'react'
import { Button, DropdownItemProps, Form, Grid, Radio } from 'semantic-ui-react'
import { JavniPoziv, KonkursnaDokumentacija, KriterijumIzbora, Radnik, ResenjeOPP } from '../model';
import radnikService from '../service/RadnikService'
import kriterijumService from '../service/KriterijumService'
import resenjeOPPService from '../service/ResenjeOPPService';
import KonkursnaDokumentacijaTabela from './KonkursnaDokumentacijaTabela';
import KonkurnsaDokumentacijaModal from './KonkurnsaDokumentacijaModal';
import { RouteComponentProps, withRouter } from 'react-router';
interface Props {

    onSubmit?: (jp: Partial<JavniPoziv>) => Promise<any>,
    javniPoziv?: JavniPoziv,
    prikaz?: boolean
}

export default withRouter(function JPForma(props: Props & RouteComponentProps) {


    const [radnici, setRadnici] = useState<Radnik[]>([]);
    const [kriterijumi, setKriterijumi] = useState<KriterijumIzbora[]>([]);
    const [resenja, setResenja] = useState<ResenjeOPP[]>([]);
    const [selRadnikIndex, setSelRadnikIndex] = useState(-1);
    const [selKriterijumIndex, setSelKriterijumIndex] = useState(-1);
    const [selResenjeIndex, setSelResenjeIndex] = useState(-1);
    const [datum, setDatum] = useState('');
    const [sabloni, setSabloni] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [konkursneDokumentacije, setKonkursneDokumentacije] = useState<KonkursnaDokumentacija[]>([]);
    const [selKonkursnaDokumentacija, setSelKonkursnaDokumentacija] = useState<KonkursnaDokumentacija | undefined>(undefined);
    useEffect(() => {
        radnikService.ucitajRadnike().then(val => {
            setRadnici(val);
        })
    }, [])
    useEffect(() => {
        kriterijumService.ucitajKriterijume().then(val => {
            setKriterijumi(val);
        })
    }, [])
    useEffect(() => {
        resenjeOPPService.ucitajResenja().then(val => {
            setResenja(val);
        })
    }, [])

    useEffect(() => {
        if (!props.javniPoziv) {
            setDatum('');
            setSabloni('');
            setKonkursneDokumentacije([]);
            setSelKonkursnaDokumentacija(undefined);
        } else {
            setSelRadnikIndex(radnici.findIndex(element => element.sifraRadnika === props.javniPoziv?.ima.sifraRadnika));
            setSelKriterijumIndex(kriterijumi.findIndex(element => element.idKriterijuma === props.javniPoziv?.sadrzi.idKriterijuma));
            setSelResenjeIndex(resenja.findIndex(element => element.datumRPP === props.javniPoziv?.resenje.datumRPP &&
                element.predlog.sifraPPP === props.javniPoziv?.resenje.predlog.sifraPPP && element.radnik.sifraRadnika === props.javniPoziv?.resenje.radnik.sifraRadnika));
            setDatum(props.javniPoziv.datum.toISOString());
            setSabloni(props.javniPoziv.sabloni);
            setKonkursneDokumentacije(props.javniPoziv.konkursneDokumentacija);
        }
    }, [props.javniPoziv, radnici, kriterijumi, resenja])
    useEffect(() => {

        setSelKonkursnaDokumentacija(konkursneDokumentacije.find(element => element === selKonkursnaDokumentacija))

    }, [konkursneDokumentacije])
    const izbaciStavku = (dok: KonkursnaDokumentacija) => {
        setKonkursneDokumentacije(prev => {
            if (!dok.sifraKD)
                return prev.filter(element => element !== dok);
            return prev.map(element => {
                if (element === dok) {
                    return { ...element, obrisan: true }
                }
                return element;
            })
        })
    }
    const sacuvajKonkursnuDokumentaciju = (dok: Partial<KonkursnaDokumentacija>) => {
        if (selKonkursnaDokumentacija) {
            setKonkursneDokumentacije(prev => {
                return prev.map(element => {
                    if (element === selKonkursnaDokumentacija) {
                        return { ...element, ...dok };
                    }
                    return element;

                })
            })
            setSelKonkursnaDokumentacija(undefined);
            setOpenModal(false);
            return;
        }
        setKonkursneDokumentacije(prev => {
            return [...prev, dok as KonkursnaDokumentacija]
        });
        setOpenModal(false);
    }
    return (
        <Grid padded centered>
            <KonkurnsaDokumentacijaModal prikaz={props.prikaz} konkursnaDokumentacija={selKonkursnaDokumentacija} onSubmit={sacuvajKonkursnuDokumentaciju} open={openModal} onClose={() => { setOpenModal(false) }} />
            <Grid.Row textAlign='center'>
                {
                    props.prikaz ? (
                        <h1>Pregled javnog poziva</h1>
                    ) : (
                        <h1>{props.javniPoziv ? 'Izmeni' : 'Kreiraj'} javni poziv</h1>
                    )
                }

            </Grid.Row>
            <Grid.Row columns='16'>
                <Grid.Column width='7'>
                    <Form  >
                        <Form.Input readOnly={props.prikaz} value={datum.substring(0, 10)} onChange={e => {
                            const value = e.currentTarget.value;
                            setDatum(value);
                        }} required type='date' label='Datum' />
                        <Form.Input readOnly={props.prikaz} value={sabloni} onChange={(e) => {
                            const value = e.currentTarget.value;
                            setSabloni(value);
                        }} required label='Sabloni' />
                        {
                            props.prikaz ? (
                                <Form.Input label='Radnik' value={selRadnikIndex === -1 ? '' : `${radnici[selRadnikIndex].ime} ${radnici[selRadnikIndex].prezime}`} />
                            ) :
                                (<Form.Dropdown selection value={selRadnikIndex} options={radnici.map((element, index) => {
                                    return {
                                        text: element.ime + ' ' + element.prezime,
                                        value: index,
                                        key: element.sifraRadnika,

                                        onClick: () => { setSelRadnikIndex(index) }
                                    } as DropdownItemProps
                                })} required label='Ima radnika' />)}
                        {
                            props.prikaz ? (
                                <Form.Input label='Kriterijum' value={selKriterijumIndex === -1 ? '' : kriterijumi[selKriterijumIndex].naziv} />
                            ) : (
                                <Form.Dropdown selection required value={selKriterijumIndex} options={kriterijumi.map((element, index) => {
                                    return {
                                        text: element.naziv,
                                        key: element.idKriterijuma,
                                        value: index,
                                        onClick: () => { setSelKriterijumIndex(index) }
                                    } as DropdownItemProps
                                })} label='Sadrzi kriterijum' />
                            )
                        }
                        {
                            props.prikaz ? (
                                <Form.Input label='Resenje' value={selResenjeIndex === -1 ? '' : `${resenja[selResenjeIndex].predlog.sifraPPP}  ; ${resenja[selResenjeIndex].radnik.ime}  ${resenja[selResenjeIndex].radnik.prezime}  ; ${(resenja[selResenjeIndex].datumRPP as any).substring(0, 10)}`} />
                            ) : (
                                <Form.Dropdown selection required label='Resenje' value={selResenjeIndex} options={resenja.map((element, index) => {
                                    return {
                                        text: element.predlog.sifraPPP + ';' + element.radnik.ime + ' ' + element.radnik.prezime + ';' + (element.datumRPP as any).substring(0, 10),
                                        value: index,
                                        key: index,
                                        onClick: () => { setSelResenjeIndex(index) }
                                    } as DropdownItemProps
                                })} />
                            )
                        }

                    </Form>
                </Grid.Column>
                <Grid.Column width='9'>
                    <KonkursnaDokumentacijaTabela onDelete={izbaciStavku} prikaz={props.prikaz} selDokumentacija={selKonkursnaDokumentacija} onRowSelect={setSelKonkursnaDokumentacija} onKreiraj={() => { setOpenModal(true) }} konkursneDokumentacije={konkursneDokumentacije.filter(element => !element.obrisan)} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {
                    !props.prikaz && (
                        <Button primary onClick={() => {
                            if (!props.onSubmit) {
                                return;
                            }
                            props.onSubmit({
                                datum: new Date(datum),
                                ima: (selKriterijumIndex > -1) ? radnici[selRadnikIndex] : undefined,
                                konkursneDokumentacija: konkursneDokumentacije,
                                sabloni: sabloni,
                                idJavnogPoziva: props.javniPoziv?.idJavnogPoziva,
                                resenje: (selResenjeIndex > -1) ? resenja[selResenjeIndex] : undefined,
                                sadrzi: (selKriterijumIndex > -1) ? kriterijumi[selKriterijumIndex] : undefined
                            }).then(val => {
                                alert('uspesno sacuvan javni poziv')
                                props.history.push('/javniPoziv')
                            })
                        }}>Sacuvaj</Button>
                    )
                }
                {
                    props.prikaz && (
                        <>
                            <Radio className='radio-margin' label='kreiran' checked={props.javniPoziv?.status === 'kreiran'} value='kreiran' name='status' />
                            <Radio className='radio-margin' label='izmenjen' checked={props.javniPoziv?.status === 'izmenjen'} value='izmenjen' name='status' />
                            <Radio className='radio-margin' label='poslat' checked={props.javniPoziv?.status === 'poslat'} value='poslat' name='status' />
                        </>
                    )
                }
            </Grid.Row>

        </Grid>
    )
})
