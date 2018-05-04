import 'reflect-metadata';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import * as bodyParser from 'body-parser';
import TYPES from './constants/types';
import './controllers/PeopleController';
import {PersonService} from "./services/PersonService";

let container = new Container();
container.bind<PersonService>(TYPES.PersonService).to(PersonService);

let server = new InversifyExpressServer(container);

server.setConfig(app => {
    app.use(bodyParser.urlencoded(
        {
            extended:true
        }));
    app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log("Server started on port 3000 :)");