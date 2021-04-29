import axios from 'axios';
import { SERVER_URL } from '../constants';
import { KriterijumIzbora } from '../model';

export class KriterijumService {


    async ucitajKriterijume(): Promise<KriterijumIzbora[]> {

        const result = await axios.get(SERVER_URL + '/kriterijumIzbora');
        return result.data;

    }

}

const service = new KriterijumService();

export default service;