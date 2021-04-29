import axios from 'axios';
import { SERVER_URL } from '../constants';
import { ResenjeOPP } from '../model';

export class ResenjeOPPService {


    async ucitajResenja(): Promise<ResenjeOPP[]> {

        const result = await axios.get(SERVER_URL + '/resenjeOPP');
        return result.data;

    }

}

const service = new ResenjeOPPService();

export default service;