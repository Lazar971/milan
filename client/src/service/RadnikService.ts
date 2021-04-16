import axios from 'axios'
import { SERVER_URL } from '../constants';
import { Radnik } from '../model';

export class RadnikService {


    async ucitajRadnike(): Promise<Radnik[]> {

        const result = await axios.get(SERVER_URL + '/radnik');
        return result.data;

    }
    async kreirajRadnika(radnikData: Partial<Radnik>): Promise<Radnik> {

        const result = await axios.post(SERVER_URL + '/radnik', radnikData);
        return result.data;
    }
    async obrisiRadnika(id: number): Promise<void> {
        await axios.delete(SERVER_URL + '/radnik/' + id)
    }
    async izmeniRadnika(radnikData: Partial<Radnik>, id: number): Promise<Radnik> {

        const result = await axios.patch(SERVER_URL + '/radnik/' + id, radnikData);
        return result.data;
    }
}

const service = new RadnikService();

export default service;