import JavniPozivController from "./controller/JavniPozivController";
import KIController from "./controller/KIController";
import OJController from "./controller/OJController";
import PFKController from "./controller/PFKController";
import POPController from "./controller/POPController";
import RadnikController from "./controller/RadnikController";
import ResenjeOFKController from "./controller/ResenjeOFKController";
import ResenjeOPPController from "./controller/ResenjeOPPController";
import TDController from "./controller/TDController";


interface Route {
    method: string,
    route: string,
    controller: any;
    action: string
}

export const Routes: Route[] = [
    {
        route: '/radnik',
        method: 'get',
        controller: RadnikController,
        action: 'all'
    },
    {
        route: '/radnik/:id',
        method: 'get',
        controller: RadnikController,
        action: 'one'
    },
    {
        route: '/radnik',
        method: 'post',
        controller: RadnikController,
        action: 'create'
    },
    {
        route: '/radnik/:id',
        method: 'patch',
        controller: RadnikController,
        action: 'update'
    },
    {
        route: '/radnik/:id',
        method: 'delete',
        controller: RadnikController,
        action: 'delete'
    },
    {
        route: '/javniPoziv',
        method: 'get',
        controller: JavniPozivController,
        action: 'all'
    },
    {
        route: '/javniPoziv/:id',
        method: 'get',
        controller: JavniPozivController,
        action: 'one'
    },
    {
        route: '/javniPoziv',
        method: 'post',
        controller: JavniPozivController,
        action: 'create'
    },
    {
        route: '/javniPoziv/:id',
        method: 'patch',
        controller: JavniPozivController,
        action: 'update'
    },
    {
        route: '/javniPoziv/:id',
        method: 'delete',
        controller: JavniPozivController,
        action: 'delete'
    },
    {
        route: '/organizacionaJedinica',
        method: 'get',
        controller: OJController,
        action: 'all'
    },
    {
        route: '/kriterijumIzbora',
        method: 'get',
        controller: KIController,
        action: 'all'
    },
    {
        route: '/pof',
        method: 'get',
        controller: PFKController,
        action: 'all'
    },
    {
        route: '/pop',
        method: 'get',
        controller: POPController,
        action: 'all'
    },
    {
        route: '/resenjeOFK',
        method: 'get',
        controller: ResenjeOFKController,
        action: 'all'
    },
    {
        route: '/resenjeOPP',
        method: 'get',
        controller: ResenjeOPPController,
        action: 'all'
    },
    {
        route: '/dokumentacija',
        method: 'get',
        controller: TDController,
        action: 'all'
    }

];