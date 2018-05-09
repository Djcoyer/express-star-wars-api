"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const bodyParser = require("body-parser");
const types_1 = require("./constants/types");
require("./controllers/CharacterController");
const CharacterService_1 = require("./services/CharacterService");
const Keys_1 = require("./config/Keys");
const CharacterRepository_1 = require("./repositories/CharacterRepository");
const mongoose = require('mongoose');
let container = new inversify_1.Container();
container.bind(types_1.default.CharacterService).to(CharacterService_1.CharacterService);
container.bind(types_1.default.CharacterRepository).to(CharacterRepository_1.CharacterRepository);
mongoose.connect(Keys_1.mongoURI);
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
