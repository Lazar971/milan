import { Request, Response } from "express";
import { getRepository } from "typeorm";
import PredlogOFormiranjuKomisije from "../entity/PredlogOFormiranjuKomisije";

export default class PFKController {


    private pFKRepository;


    public constructor() {
        this.pFKRepository = getRepository(PredlogOFormiranjuKomisije)
    }

    async all(req: Request, res: Response) {
        return this.pFKRepository.find();

    }
}

