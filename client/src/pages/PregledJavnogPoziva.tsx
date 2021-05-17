import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Grid } from 'semantic-ui-react';
import JPForma from '../components/JPForma';
import { JavniPoziv } from '../model';
import JPService from '../service/JPService';

export default withRouter(function PregledJavnogPoziva(props: RouteComponentProps) {
    const [javniPoziv, setJavniPoziv] = useState<JavniPoziv | undefined>(undefined)

    useEffect(() => {
        console.log(props);
        JPService.vratiJavniPoziv((props.match.params as any).id).then(setJavniPoziv);
    }, [])
    if (!javniPoziv) {
        return <></>
    }
    return (
        <JPForma prikaz={true} javniPoziv={javniPoziv} />
    )
})
