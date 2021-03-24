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
}