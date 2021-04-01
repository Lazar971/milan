import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ResenjeOPP from "../entity/ResenjeOPP";

export default class ResenjeOPPController {


    private pOPRepository;


    public constructor() {
        this.pOPRepository = getRepository(ResenjeOPP)
    }

    async all(req: Request, res: Response) {
        return this.pOPRepository.find();

    }
}

