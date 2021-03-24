import RadnikController from "./controller/RadnikController";


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
    }

];