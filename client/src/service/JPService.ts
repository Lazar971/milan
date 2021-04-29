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

}

const service = new JPService();

export default service;