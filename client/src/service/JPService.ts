import axios from 'axios';
import { SERVER_URL } from '../constants';
import { JavniPoziv } from '../model';

export class JPService {


    async ucitajJP(): Promise<JavniPoziv[]> {

        const result = await axios.get(SERVER_URL + '/javniPoziv');
        return result.data;

    }

}

const service = new JPService();

export default service;