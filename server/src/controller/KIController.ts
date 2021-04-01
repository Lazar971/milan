import { Request, Response } from "express";
import { getRepository } from "typeorm";
import KriterijumIzbora from "../entity/KriterijumIzbora";

export default class KIController {


    private kIRepository;


    public constructor() {
        this.kIRepository = getRepository(KriterijumIzbora)
    }

    async all(req: Request, res: Response) {
        return this.kIRepository.find();

    }
}

