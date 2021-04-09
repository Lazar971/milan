import axios from 'axios'
import { SERVER_URL } from '../constants';
import { Radnik } from '../model';

export class RadnikService {


    async ucitajRadnike(): Promise<Radnik[]> {

        const result = await axios.get(SERVER_URL + '/radnik');
        return result.data;

    }

}

const service = new RadnikService();

export default service;