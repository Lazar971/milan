import { Request, Response } from "express";
import { getRepository } from "typeorm";
import PredlogOPokretanjuPostupka from "../entity/PredlogOPokretanjuPostupka";

export default class POPController {


    private pOPRepository;


    public constructor() {
        this.pOPRepository = getRepository(PredlogOPokretanjuPostupka)
    }

    async all(req: Request, res: Response) {
        return this.pOPRepository.find();

    }
}

