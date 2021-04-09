import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import RadnikTabela from '../components/RadnikTabela';
import { Radnik } from '../model';
import radnikService from '../service/RadnikService';

export default function RadnikPage() {

    const [radnici, setRadnici] = useState<Radnik[]>([]);
    const [activniIndex, setActivniIndex] = useState(-1);

    const onRowClick = (index: number) => {
        setActivniIndex(prev => {
            if (prev === index) {
                return -1;
            }
            return index;
        });
    }

    useEffect(() => {
        radnikService.ucitajRadnike().then(value => {
            setRadnici(value);
        })
    }, [])

    return (
        <Grid padded>
            <Grid.Row >

            </Grid.Row>
            <Grid.Row columns='16'>
                <Grid.Column width='8'>
                    <RadnikTabela radnici={radnici} activeIndex={activniIndex} onRowClick={onRowClick} />
                </Grid.Column >
                <Grid.Column width='8'>

                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}
