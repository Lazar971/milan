import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import RadnikForma from '../components/RadnikForma';
import RadnikModal from '../components/RadnikModal';
import RadnikTabela from '../components/RadnikTabela';
import { Radnik } from '../model';
import radnikService from '../service/RadnikService';

export default function RadnikPage() {

    const [radnici, setRadnici] = useState<Radnik[]>([]);
    const [activniIndex, setActivniIndex] = useState(-1);
    const [modalIndex, setModalIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const radnik = activniIndex > -1 ? radnici[activniIndex] : undefined;
    const modalRadnik = modalIndex > -1 ? radnici[modalIndex] : undefined;
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

    const kreirajRadnika = async (radnikData: Partial<Radnik>) => {
        const noviRadnik = await radnikService.kreirajRadnika(radnikData);
        setRadnici(prev => {
            return [...prev, noviRadnik];
        })
    }
    const izmeniRadnika = async (radnikData: Partial<Radnik>) => {
        if (activniIndex === -1) {
            return;
        }
        const id = radnici[activniIndex].sifraRadnika
        await radnikService.izmeniRadnika(radnikData, id);
        setRadnici(prev => {
            return prev.map(element => {
                if (element.sifraRadnika === id) {
                    return { ...element, ...radnikData };
                }
                return element;
            })
        })
    }
    const onSubmit = async (radnikData: Partial<Radnik>) => {
        if (activniIndex === -1) {
            kreirajRadnika(radnikData);
        }
        izmeniRadnika(radnikData);
    }
    const obrisiRadnika = async (id: number) => {
        radnikService.obrisiRadnika(id).then(() => {
            setRadnici(prev => {
                return prev.filter(element => {
                    return element.sifraRadnika !== id
                })
            })

        })
    }
    return (
        <Grid padded>

            <Grid.Row >
                {modalRadnik && (
                    <RadnikModal open={open} onClose={() => { setOpen(false); setModalIndex(-1); }} radnik={modalRadnik} />
                )}
            </Grid.Row>
            <Grid.Row columns='16'>
                <Grid.Column width='10'>
                    <RadnikTabela onDetail={(ind: number) => { setOpen(true); setModalIndex(ind) }} radnici={radnici} onDelete={obrisiRadnika} activeIndex={activniIndex} onRowClick={onRowClick} />
                </Grid.Column >
                <Grid.Column width='6'>
                    <RadnikForma onSubmit={onSubmit} radnik={activniIndex > -1 ? radnici[activniIndex] : undefined} />
                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}
