import axios from 'axios'
import { SERVER_URL } from '../constants';
import { OrganizacionaJedinica } from '../model';

export class OJService {


    async ucitajOJ(): Promise<OrganizacionaJedinica[]> {

        const result = await axios.get(SERVER_URL + '/organizacionaJedinica');
        return result.data;

    }

}

const service = new OJService();

export default service;