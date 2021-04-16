import React, { useEffect, useState } from 'react'
import { DropdownItemProps, Form } from 'semantic-ui-react'
import { OrganizacionaJedinica, Radnik } from '../model'
import OJService from '../service/OJService';

interface Props {
    onSubmit: (radnikData: Partial<Radnik>) => Promise<void>,
    radnik?: Radnik
}

export default function RadnikForma(props: Props) {

    const [organizacioneJedinice, setOrganizacioneJedinice] = useState<OrganizacionaJedinica[]>([]);
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [radiIndex, setRadiIndex] = useState(-1);
    const [pripadaIndex, setPripadaIndex] = useState(-1);


    useEffect(() => {
        if (!props.radnik) {
            setIme('');
            setPrezime('');
        } else {
            setIme(props.radnik.ime);
            setPrezime(props.radnik.prezime);
            setRadiIndex(organizacioneJedinice.findIndex(element => element.sifraOJ === props.radnik?.radi.sifraOJ));
            setPripadaIndex(organizacioneJedinice.findIndex(element => element.sifraOJ === props.radnik?.pripada.sifraOJ));
        }
    }, [props.radnik])

    useEffect(() => {
        OJService.ucitajOJ().then(value => {
            setOrganizacioneJedinice(value);
        })
    }, [])
    const ojDropdown = (setState: (ind: number) => void) => organizacioneJedinice.map((element, index): DropdownItemProps => {
        return {
            text: element.naziv,
            value: index,
            key: element.sifraOJ,
            onClick: (e) => {
                setState(index);
            }
        }
    })
    return (
        <Form onSubmit={e => {
            props.onSubmit({
                ime: ime,
                prezime: prezime,
                pripada: (pripadaIndex > -1) ? organizacioneJedinice[pripadaIndex] : undefined,
                radi: (radiIndex > -1) ? organizacioneJedinice[radiIndex] : undefined
            })
        }}>
            <h3>{props.radnik ? 'Izmeni' : 'Kreiraj'} radnika</h3>
            {
                props.radnik && (
                    <Form.Input label='Sifra radnika' disabled value={props.radnik.sifraRadnika} />
                )
            }
            <Form.Input value={ime} onChange={(e) => {
                const value = e.currentTarget.value;
                setIme(value);
            }} required label='Ime radnika' />
            <Form.Input value={prezime} onChange={e => {
                const value = e.currentTarget.value;
                setPrezime(value);
            }} required label='Prezime radnika' />
            <Form.Dropdown value={radiIndex} required selection label='Radi' options={ojDropdown(setRadiIndex)} />
            <Form.Dropdown value={pripadaIndex} options={ojDropdown(setPripadaIndex)} selection required label='Pripada' />
            <Form.Button primary fluid>Sacuvaj</Form.Button>
        </Form>
    )
}
