import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
import { JavniPoziv } from '../model';
import JPService from '../service/JPService';

export default function JavniPozivPage() {
    const [javniPozivi, setJavniPozivi] = useState<JavniPoziv[]>([]);
    useEffect(() => {
        JPService.ucitajJP().then(val => {
            setJavniPozivi(val);
        })
    }, [])
    return (
        <Table  >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID javnog poziva</Table.HeaderCell>
                    <Table.HeaderCell>Datum</Table.HeaderCell>
                    <Table.HeaderCell>Sabloni</Table.HeaderCell>
                    <Table.HeaderCell>Radnik</Table.HeaderCell>
                    <Table.HeaderCell>Kriterijum</Table.HeaderCell>
                    <Table.HeaderCell>Resenje OPP</Table.HeaderCell>
                    <Table.HeaderCell>Detalji</Table.HeaderCell>
                    <Table.HeaderCell>Izmeni</Table.HeaderCell>
                    <Table.HeaderCell>Obrisi</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    javniPozivi.map(element => {
                        return <Table.Row key={element.idJavnogPoziva}>
                            <Table.Cell>{element.idJavnogPoziva}</Table.Cell>
                            <Table.Cell>{(element.datum as any).substring(0, 10)}</Table.Cell>
                            <Table.Cell>{element.sabloni}</Table.Cell>
                            <Table.Cell>{element.ima.ime + ' ' + element.ima.prezime}</Table.Cell>
                            <Table.Cell>{element.sadrzi.naziv}</Table.Cell>
                            <Table.Cell>{element.resenje.predlog.sifraPPP + ';' + element.resenje.radnik.ime + ' ' + element.resenje.radnik.prezime + ';' + (element.resenje.datumRPP as any).substring(0, 10)}</Table.Cell>
                            <Table.Cell >
                                <Link to='/jp'>
                                    Vidi
                                </Link>
                            </Table.Cell>
                            <Table.Cell >
                                <Link to='/jp'>
                                    Izmeni
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Button negative>
                                    Obrisi
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}
