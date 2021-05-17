import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { NacinDostavljanjaPonude } from '../model'
interface Props {
    nacini: NacinDostavljanjaPonude[],
    onDelete: (nacin: NacinDostavljanjaPonude) => void,
    onRowClick: (nacin: NacinDostavljanjaPonude | undefined) => void,
    acticeNacin: NacinDostavljanjaPonude | undefined,
    prikaz?: boolean
}
export default function NacinDostavljanjaPonudeTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Rb</Table.HeaderCell>
                    <Table.HeaderCell>Adresa</Table.HeaderCell>
                    <Table.HeaderCell>Opis</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.nacini.map(element => {
                        return (
                            <Table.Row active={element === props.acticeNacin} onClick={() => {
                                props.onRowClick(element);
                            }}>
                                <Table.Cell>{element.rb || 'NA'}</Table.Cell>
                                <Table.Cell>{element.adresa}</Table.Cell>
                                <Table.Cell>{element.opis}</Table.Cell>
                                {
                                    !props.prikaz && (
                                        <Table.Cell>
                                            <Button circular negative icon='x' onClick={() => {
                                                props.onDelete(element);
                                            }}></Button>
                                        </Table.Cell>
                                    )
                                }
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
