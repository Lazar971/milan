import React from 'react'
import { Table } from 'semantic-ui-react'
import { Radnik } from '../model'

interface Props {
    radnici: Radnik[],
    activeIndex: number,
    onRowClick: (index: number) => void
}

export default function RadnikTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Sifra</Table.HeaderCell>
                    <Table.HeaderCell>Ime</Table.HeaderCell>
                    <Table.HeaderCell>Prezime</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Radi</Table.HeaderCell>
                    <Table.HeaderCell>Pripada</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.radnici.map((element, index) => {
                        return (
                            <Table.Row key={element.sifraRadnika} active={index === props.activeIndex} onClick={() => {
                                props.onRowClick(index);
                            }}>
                                <Table.Cell>{element.sifraRadnika}</Table.Cell>
                                <Table.Cell>{element.ime}</Table.Cell>
                                <Table.Cell>{element.prezime}</Table.Cell>
                                <Table.Cell>{element.status}</Table.Cell>
                                <Table.Cell>{element.radi.naziv}</Table.Cell>
                                <Table.Cell>{element.pripada.naziv}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
