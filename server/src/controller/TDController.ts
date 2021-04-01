import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ResenjeOFK from "../entity/ResenjeOFK";
import TehnickaDokumentacija from "../entity/TehnickaDokumentacija";

export default class TDController {


    private pOPRepository;


    public constructor() {
        this.pOPRepository = getRepository(TehnickaDokumentacija)
    }

    async all(req: Request, res: Response) {
        return this.pOPRepository.find();

    }
}

