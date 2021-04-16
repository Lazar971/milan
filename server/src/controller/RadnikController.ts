import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Radnik from "../entity/Radnik";


export default class RadnikController {
    private radnikRepository: Repository<Radnik>;

    public constructor() {
        this.radnikRepository = getRepository(Radnik);
    }

    async all(req: Request, res: Response) {
        return this.radnikRepository.find();

    }
    async one(req: Request, res: Response) {

        return this.radnikRepository.findOne(req.params.id);

    }
    async create(req: Request, res: Response) {
        const data = req.body;
        const insertResult = await this.radnikRepository.insert({ ...data, status: 'u izradi' });
        const id = insertResult.identifiers[0].sifraRadnika;
        return await this.radnikRepository.findOne(id);


    }
    async update(req: Request, res: Response) {
        const data = req.body;
        const id = parseInt(req.params.id);
        const radnik = await this.radnikRepository.findOne(id);
        if (!radnik) {
            res.sendStatus(404);
            return undefined;
        }
        await this.radnikRepository.update(id, { ...data, status: 'aktivan' });
        return await this.radnikRepository.findOne(id);

    }
    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const radnik = await this.radnikRepository.findOne(id);
        if (!radnik) {
            res.sendStatus(404);

        } else {
            await this.radnikRepository.delete(id);
            res.sendStatus(204);

        }
        return undefined;
    }
}