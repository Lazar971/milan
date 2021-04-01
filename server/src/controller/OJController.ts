import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import OrganizacionaJedinica from "../entity/OrganizacionaJedinica";

export default class OJController {


    private oJRepository;


    public constructor() {
        this.oJRepository = getRepository(OrganizacionaJedinica)
    }

    async all(req: Request, res: Response) {
        return this.oJRepository.find();

    }
}

