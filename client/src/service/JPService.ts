import axios from 'axios';
import { SERVER_URL } from '../constants';
import { JavniPoziv } from '../model';

export class JPService {


    async ucitajJP(): Promise<JavniPoziv[]> {

        const result = await axios.get(SERVER_URL + '/javniPoziv');
        return result.data;

    }
    async obrisiJP(id: number): Promise<void> {
        await axios.delete(SERVER_URL + '/javniPoziv/' + id)
    }
    async kreirajJP(javniPoziv: Partial<JavniPoziv>) {



        if (javniPoziv.sabloni === '') {
            return 'Popunite sablone'
        }
        if (!javniPoziv.ima) {
            return 'Popunite radnika'
        }
        if (!javniPoziv.sadrzi) {
            return 'Popunite kriterijum'
        }
        if (!javniPoziv.resenje) {
            return 'Popunite resenje'
        }
        const res = await axios.post(SERVER_URL + '/javniPoziv', javniPoziv);
        console.log(res);
        return res.data;

    }
    async izmeniJP(javniPoziv: Partial<JavniPoziv>) {
        const res = await axios.patch(SERVER_URL + '/javniPoziv/' + javniPoziv.idJavnogPoziva, javniPoziv);
        console.log(res);
        return res.data;
    }
    async vratiJavniPoziv(id: number | string) {
        const data = (await axios.get(SERVER_URL + '/javniPoziv/' + id)).data;
        data.datum = new Date(data.datum);
        return data;
    }
}

const service = new JPService();

export default service;