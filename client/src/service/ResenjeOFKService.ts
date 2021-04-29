import axios from 'axios';
import { SERVER_URL } from '../constants';
import { ResenjeOFK } from '../model';

export class ResenjeOFKService {


    async ucitajResenja(): Promise<ResenjeOFK[]> {

        const result = await axios.get(SERVER_URL + '/resenjeOFK');
        return result.data;

    }

}

const service = new ResenjeOFKService();

export default service;