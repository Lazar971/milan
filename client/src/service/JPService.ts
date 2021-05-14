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

}

const service = new JPService();

export default service;