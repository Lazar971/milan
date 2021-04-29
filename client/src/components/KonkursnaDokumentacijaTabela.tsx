import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { KonkursnaDokumentacija } from '../model'

interface Props {
    konkursneDokumentacije: KonkursnaDokumentacija[],
    onKreiraj: () => void,
    selDokumentacija?: KonkursnaDokumentacija,
    onRowSelect: (dok: KonkursnaDokumentacija | undefined) => void,
    onDelete: (dok: KonkursnaDokumentacija) => void
}
export default function KonkursnaDokumentacijaTabela(props: Props) {
    return (
        <>
            <h3>Konkursne dokumentacije</h3>
            <Table selectable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Sifra </Table.HeaderCell>
                        <Table.HeaderCell>Rok </Table.HeaderCell>
                        <Table.HeaderCell>Obavezan element </Table.HeaderCell>
                        <Table.HeaderCell>Tehnicka dokumentacija </Table.HeaderCell>
                        <Table.HeaderCell>Resenje OFK </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Button onClick={props.onKreiraj} primary fluid>{props.selDokumentacija ? 'Izmeni' : 'Kreiraj'}</Button>
                        </Table.HeaderCell>
                    </Table.Row>

                </Table.Header>
                <Table.Body>
                    {
                        props.konkursneDokumentacije.map(element => {
                            return (
                                <Table.Row active={element === props.selDokumentacija} onClick={() => {
                                    if (element === props.selDokumentacija) {
                                        props.onRowSelect(undefined)
                                    } else {
                                        props.onRowSelect(element);
                                    }
                                }}>
                                    <Table.Cell>{element.sifraKD || 'NA'}</Table.Cell>
                                    <Table.Cell>{(element.rok as any).substring(0, 10)}</Table.Cell>
                                    <Table.Cell>{element.obavezanElement}</Table.Cell>
                                    <Table.Cell>{element.sadrzi.opis}</Table.Cell>
                                    <Table.Cell>{element.resenje.potpis}</Table.Cell>
                                    <Table.Cell>
                                        <Button circular negative icon='x' onClick={() => {
                                            props.onDelete(element);
                                        }}></Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>

            </Table>
        </>
    )
}
