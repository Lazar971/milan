import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { NacinDostavljanjaPonude } from '../model'


interface Props {
    onSubmit: (nacin: Partial<NacinDostavljanjaPonude>) => void,
    nacin?: NacinDostavljanjaPonude
}


export default function FormaNacin(props: Props) {

    const [adresa, setAdresa] = useState('');
    const [opis, setOpis] = useState('')

    useEffect(() => {
        setAdresa(props.nacin?.adresa || '');
        setOpis(props.nacin?.opis || '');
    }, [props.nacin])

    return (
        <Form onSubmit={() => {
            console.log('submit')
            props.onSubmit({
                adresa: adresa,
                opis: opis
            })
        }}>
            <Form.Input required value={adresa} onChange={e => {
                const value = e.currentTarget.value;
                setAdresa(value);
            }} label='Adresa' />
            <Form.TextArea required value={opis} onChange={e => {
                const value = e.currentTarget.value;
                setOpis(value);
            }} label='Opis' />
            <Form.Button positive>Sacuvaj</Form.Button>
        </Form>
    )
}
