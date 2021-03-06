import 'reflect-metadata';
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import * as bodyParser from 'body-parser';
import TYPES from './constants/types';
import './controllers/CharacterController';
import {CharacterService} from "./services/CharacterService";
import {mongoURI} from "./config/Keys";
import {CharacterRepository} from "./repositories/CharacterRepository";
const mongoose = require('mongoose');

let container = new Container();
container.bind<CharacterService>(TYPES.CharacterService).to(CharacterService);
container.bind<CharacterRepository>(TYPES.CharacterRepository).to(CharacterRepository);


mongoose.connect(mongoURI);
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