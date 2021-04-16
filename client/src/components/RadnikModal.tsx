import React from 'react'
import { Form, Modal, Radio } from 'semantic-ui-react'
import { Radnik } from '../model'

interface Props {
    radnik: Radnik,
    open: boolean,
    onClose: () => void
}

export default function RadnikModal(props: Props) {
    return (
        <Modal open={props.open} onClose={props.onClose} closeIcon size='large'>
            <Modal.Header>Pregled radnika</Modal.Header>
            <Modal.Content >
                <Form disabled>
                    <Form.Input label='Sifra radnika' value={props.radnik.sifraRadnika} />
                    <Form.Input label='Ime radnika' value={props.radnik.ime} />
                    <Form.Input label='Prezime radnika' value={props.radnik.prezime} />
                    <Form.Input label='Radi' value={props.radnik.radi.naziv} />
                    <Form.Input label='Pripada' value={props.radnik.pripada.naziv} />
                    <Radio className='radio-margin' label='U izradi' checked={props.radnik.status === 'u izradi'} value='u izradi' name='status' />
                    <Radio className='radio-margin' label='Aktivan' checked={props.radnik.status === 'aktivan'} value='aktivan' name='status' />
                    <Radio className='radio-margin' label='Pasivan' checked={props.radnik.status === 'pasivan'} value='pasivan' name='status' />
                </Form>
            </Modal.Content>
        </Modal>
    )
}
