import React from 'react'
import JPForma from '../components/JPForma'
import javniPozivService from '../service/JPService'

export default function KreirajJPPage() {
    return (
        <JPForma onSubmit={javniPozivService.kreirajJP} />
    )
}
