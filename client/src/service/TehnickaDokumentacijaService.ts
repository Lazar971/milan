import axios from 'axios'
import { SERVER_URL } from '../constants';
import { OrganizacionaJedinica, TehnickaDokumentacija } from '../model';

export class TehnickaDokumentacijaService {


    async ucitajTehnickeDokumentacije(): Promise<TehnickaDokumentacija[]> {

        const result = await axios.get(SERVER_URL + '/dokumentacija');
        return result.data;

    }

}

const service = new TehnickaDokumentacijaService();

export default service;