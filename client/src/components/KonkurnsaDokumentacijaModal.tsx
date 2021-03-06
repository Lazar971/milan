import React, { useEffect, useState } from 'react'
import { Button, DropdownItemProps, Form, Grid, Modal } from 'semantic-ui-react'
import tehnickaDokumentacijaService from '../service/TehnickaDokumentacijaService'
import ResenjeOFKService from '../service/ResenjeOFKService'
import { KonkursnaDokumentacija, NacinDostavljanjaPonude, ResenjeOFK, TehnickaDokumentacija } from '../model'
import NacinDostavljanjaPonudeTabela from './NacinDostavljanjaPonudeTabela'
import FormaNacin from './FormaNacin'
interface Props {
    open: boolean,
    onClose: () => void,
    onSubmit: (dokumentacija: Partial<KonkursnaDokumentacija>) => void,
    konkursnaDokumentacija?: KonkursnaDokumentacija,
    prikaz?: boolean

}
export default function KonkurnsaDokumentacijaModal(props: Props) {

    const [tehnickeDokumentacije, setTehnickeDokumentacije] = useState<TehnickaDokumentacija[]>([]);
    const [resenjaOFK, setResenjaOFK] = useState<ResenjeOFK[]>([])
    const [selTehDocIndex, setSelTehDocIndex] = useState(-1);
    const [selResenjeOFKIndex, setSelResenjeOFKIndex] = useState(-1)
    const [rok, setRok] = useState('');
    const [obavezanElement, setobavezanElement] = useState('');
    const [selNacin, setSelNacin] = useState<NacinDostavljanjaPonude | undefined>(undefined)
    const [nacini, setNacini] = useState<NacinDostavljanjaPonude[]>([])
    useEffect(() => {
        tehnickaDokumentacijaService.ucitajTehnickeDokumentacije().then(val => {
            setTehnickeDokumentacije(val);
        })
    }, [])
    useEffect(() => {
        ResenjeOFKService.ucitajResenja().then(val => {
            setResenjaOFK(val);
        })
    }, [])

    useEffect(() => {
        setSelNacin(nacini.find(element => element === selNacin));
    }, [nacini, selNacin])
    useEffect(() => {
        if (props.konkursnaDokumentacija) {
            setSelTehDocIndex(tehnickeDokumentacije.findIndex(element => element.idTD === props.konkursnaDokumentacija?.sadrzi.idTD));
            setSelResenjeOFKIndex(resenjaOFK.findIndex(element => element.datumRFK === props.konkursnaDokumentacija?.resenje.datumRFK && element.predlog.sifraPFK === props.konkursnaDokumentacija.resenje.predlog.sifraPFK && element.radnik.sifraRadnika === props.konkursnaDokumentacija.resenje.radnik.sifraRadnika))

        }
        setRok(props.konkursnaDokumentacija?.rok.toString() || '');
        setobavezanElement(props.konkursnaDokumentacija?.obavezanElement || '');
        setNacini(props.konkursnaDokumentacija?.nacini || []);
    }, [props.konkursnaDokumentacija])


    return (
        <Modal size='large' open={props.open} onClose={props.onClose}>
            <Modal.Header>Kreiraj konkursnu dokumentaciju</Modal.Header>
            <Modal.Content>
                <Grid padded>
                    <Grid.Row columns='16'>
                        <Grid.Column width='6'>
                            <Form>
                                <Form.Input readOnly={props.prikaz} value={rok.substring(0, 10)} type='date' onChange={e => {
                                    const value = e.currentTarget.value;
                                    setRok(value);
                                }} required label='Rok' />
                                <Form.Input readOnly={props.prikaz} value={obavezanElement} onChange={e => {
                                    const value = e.currentTarget.value;
                                    setobavezanElement(value);
                                }} required label='Obavezan element' />
                                {
                                    props.prikaz ? (
                                        <Form.Input label='Tehnicka dokumentacija' value={selTehDocIndex === -1 ? '' : tehnickeDokumentacije[selTehDocIndex].opis} />
                                    ) : (
                                        <Form.Dropdown selection required label='Tehnicka dokumentacija' value={selTehDocIndex}
                                            options={tehnickeDokumentacije.map((element, index) => {
                                                return {
                                                    text: element.opis,
                                                    value: index,
                                                    onClick: () => { setSelTehDocIndex(index) },
                                                    key: index
                                                } as DropdownItemProps
                                            })} />
                                    )
                                }
                                {
                                    props.prikaz ? (
                                        <Form.Input label='Resenje OFK' value={selResenjeOFKIndex === -1 ? '' : resenjaOFK[selResenjeOFKIndex].potpis} />
                                    ) : (
                                        <Form.Dropdown selection required label='Resenje OFK' value={selResenjeOFKIndex}
                                            options={resenjaOFK.map((element, index) => {
                                                return {
                                                    value: index,
                                                    onClick: () => setSelResenjeOFKIndex(index),
                                                    text: element.potpis
                                                } as DropdownItemProps
                                            })} />
                                    )
                                }
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={props.prikaz ? '10' : '5'}>
                            <NacinDostavljanjaPonudeTabela
                                prikaz={props.prikaz}
                                acticeNacin={selNacin}
                                onRowClick={(nacin) => {
                                    setSelNacin(prev => {
                                        if (prev === nacin) {
                                            return undefined;
                                        }
                                        return nacin;
                                    })
                                }}
                                onDelete={nacin => {
                                    setNacini(prev => {
                                        if (nacin.rb) {
                                            return prev.map(element => {
                                                if (element === nacin)
                                                    return { ...element, obrisan: true };
                                                return element;
                                            });
                                        }
                                        return prev.filter(element => element !== nacin)
                                    })

                                }} nacini={nacini.filter(element => !element.obrisan)} />
                        </Grid.Column>
                        {!props.prikaz &&
                            <Grid.Column width='5'>
                                <FormaNacin
                                    nacin={selNacin}
                                    onSubmit={(nacin) => {
                                        if (selNacin) {
                                            setNacini(prev => {
                                                return prev.map(element => {
                                                    if (element === selNacin) {
                                                        return { ...element, ...nacin };
                                                    }
                                                    return element;
                                                })
                                            })
                                        } else {
                                            setNacini(prev => {
                                                return [...prev, nacin as NacinDostavljanjaPonude];
                                            })
                                        }
                                    }} />
                            </Grid.Column>
                        }
                    </Grid.Row>

                </Grid>
            </Modal.Content>
            {!props.prikaz &&
                <Modal.Actions>
                    <Button onClick={() => {
                        props.onSubmit({
                            nacini: nacini,
                            obavezanElement: obavezanElement,
                            rok: rok as any,
                            sadrzi: (selTehDocIndex > -1) ? tehnickeDokumentacije[selTehDocIndex] : undefined,
                            resenje: (selResenjeOFKIndex > -1) ? resenjaOFK[selResenjeOFKIndex] : undefined

                        })
                    }}>Sacuvaj</Button>
                </Modal.Actions>}
        </Modal>
    )
}
