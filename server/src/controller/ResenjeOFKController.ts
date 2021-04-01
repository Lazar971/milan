import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ResenjeOFK from "../entity/ResenjeOFK";

export default class ResenjeOFKController {


    private pOPRepository;


    public constructor() {
        this.pOPRepository = getRepository(ResenjeOFK)
    }

    async all(req: Request, res: Response) {
        return this.pOPRepository.find();

    }
}

