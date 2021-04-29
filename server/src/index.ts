import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors';
createConnection().then(async connection => {

    // create express app
    const app = express();

    app.use(cors());
    app.use(express.json());


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response) => {
            const result = (new (route.controller as any))[route.action](req, res);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.json(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(4000, () => {
        console.log('app is listening on http://localhost:4000')
    });

    // insert new users for test



}).catch(error => console.log(error));
