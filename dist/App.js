"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const bodyParser = require("body-parser");
const types_1 = require("./constants/types");
require("./controllers/PeopleController");
const PersonService_1 = require("./services/PersonService");
let container = new inversify_1.Container();
container.bind(types_1.default.PersonService).to(PersonService_1.PersonService);
let server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig(app => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});
let serverInstance = server.build();
serverInstance.listen(3000);
console.log("Server started on port 3000 :)");
