import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import JPForma from '../components/JPForma'
import { JavniPoziv } from '../model';
import JPService from '../service/JPService';
export default withRouter(function IzmeniJavniPozivPage(props: RouteComponentProps) {
    const [javniPoziv, setJavniPoziv] = useState<JavniPoziv | undefined>(undefined)

    useEffect(() => {
        console.log(props);
        JPService.vratiJavniPoziv((props.match.params as any).id).then(setJavniPoziv);
    }, [])
    if (!javniPoziv) {
        return <></>
    }
    return (
        <JPForma onSubmit={JPService.izmeniJP} javniPoziv={javniPoziv} />
    )
})
