import React, { useEffect, useState } from 'react'
import { Button, DropdownItemProps, Form, Grid } from 'semantic-ui-react'
import { JavniPoziv, KonkursnaDokumentacija, KriterijumIzbora, Radnik, ResenjeOPP } from '../model';
import radnikService from '../service/RadnikService'
import kriterijumService from '../service/KriterijumService'
import resenjeOPPService from '../service/ResenjeOPPService';
import KonkursnaDokumentacijaTabela from './KonkursnaDokumentacijaTabela';
import KonkurnsaDokumentacijaModal from './KonkurnsaDokumentacijaModal';
interface Props {

    onSubmit: (jp: Partial<JavniPoziv>) => Promise<any>
}

export default function JPForma(props: Props) {


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
        setKonkursneDokumentacije(prev => {
            return [...prev, dok as KonkursnaDokumentacija]
        })
    }
    return (
        <Grid padded centered>
            <KonkurnsaDokumentacijaModal konkursnaDokumentacija={selKonkursnaDokumentacija} onSubmit={sacuvajKonkursnuDokumentaciju} open={openModal} onClose={() => { setOpenModal(false) }} />
            <Grid.Row textAlign='center'>
                <h1>Kreiraj javni poziv</h1>
            </Grid.Row>
            <Grid.Row columns='16'>
                <Grid.Column width='7'>
                    <Form  >
                        <Form.Input value={datum.substring(0, 10)} onChange={e => {
                            const value = e.currentTarget.value;
                            setDatum(value);
                        }} required type='date' label='Datum' />
                        <Form.Input value={sabloni} onChange={(e) => {
                            const value = e.currentTarget.value;
                            setSabloni(value);
                        }} required label='Sabloni' />
                        <Form.Dropdown selection value={selRadnikIndex} options={radnici.map((element, index) => {
                            return {
                                text: element.ime + ' ' + element.prezime,
                                value: index,
                                key: element.sifraRadnika,

                                onClick: () => { setSelRadnikIndex(index) }
                            } as DropdownItemProps
                        })} required label='Ima radnika' />
                        <Form.Dropdown selection required value={selKriterijumIndex} options={kriterijumi.map((element, index) => {
                            return {
                                text: element.naziv,
                                key: element.idKriterijuma,
                                value: index,
                                onClick: () => { setSelKriterijumIndex(index) }
                            } as DropdownItemProps
                        })} label='Sadrzi kriterijum' />
                        <Form.Dropdown selection required label='Resenje' value={selResenjeIndex} options={resenja.map((element, index) => {
                            return {
                                text: element.predlog.sifraPPP + ';' + element.radnik.ime + ' ' + element.radnik.prezime + ';' + (element.datumRPP as any).substring(0, 10),
                                value: index,
                                key: index,
                                onClick: () => { setSelResenjeIndex(index) }
                            } as DropdownItemProps
                        })} />

                    </Form>
                </Grid.Column>
                <Grid.Column width='9'>
                    <KonkursnaDokumentacijaTabela onDelete={izbaciStavku} selDokumentacija={selKonkursnaDokumentacija} onRowSelect={setSelKonkursnaDokumentacija} onKreiraj={() => { setOpenModal(true) }} konkursneDokumentacije={konkursneDokumentacije.filter(element => !element.obrisan)} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Button primary onClick={() => {
                    props.onSubmit({
                        datum: new Date(datum),
                        ima: (selKriterijumIndex > -1) ? radnici[selRadnikIndex] : undefined,
                        konkursneDokumentacija: konkursneDokumentacije,
                        sabloni: sabloni,
                        resenje: (selResenjeIndex > -1) ? resenja[selResenjeIndex] : undefined,
                        sadrzi: (selKriterijumIndex > -1) ? kriterijumi[selKriterijumIndex] : undefined
                    }).then(val => {
                        alert(val);
                    })
                }}>Sacuvaj</Button>
            </Grid.Row>

        </Grid>
    )
}
