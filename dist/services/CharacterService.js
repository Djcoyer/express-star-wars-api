"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Character_1 = require("../models/Character");
const CharacterDao_1 = require("../models/dao/CharacterDao");
const CharacterRepository_1 = require("../repositories/CharacterRepository");
const types_1 = require("../constants/types");
const CreateCharacterRequest_1 = require("../models/requests/character/CreateCharacterRequest");
const enums_1 = require("../constants/enums");
let CharacterService = class CharacterService {
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }
    createCharacter(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let createCharacterRequest = this.formatCreateCharacterRequest(request);
            let { name, age, era, movieIds, description, canon } = createCharacterRequest;
            let characterDao = new CharacterDao_1.CharacterDao(null, name, description, age, movieIds, era, canon);
            return yield this.characterRepository.createCharacter(characterDao);
        });
    }
    getCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.characterRepository.getCharacters();
        });
    }
    getCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.characterRepository.getCharacter(id).then(characterDao => {
                if (characterDao == null)
                    throw new Error("Not found");
                let { id, name, description, canon, era, age, movieIds } = characterDao;
                let character = new Character_1.default(id, name, description, age, movieIds, era, canon);
                return character;
            });
        });
    }
    updateCharacter(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.characterRepository.updateCharacter(request, id);
        });
    }
    deleteCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.characterRepository.deleteCharacter(id);
        });
    }
    //region HELPERS
    formatCreateCharacterRequest(request) {
        if (request == null || typeof request != "object")
            throw new Error();
        let keys = Object.keys(request);
        if (!keys || keys.length === 0) {
            throw new Error();
        }
        let createCharacterRequest = new CreateCharacterRequest_1.default();
        let expectedKeys = Object.keys(createCharacterRequest);
        keys.map(key => {
            if (expectedKeys.indexOf(key) > -1)
                createCharacterRequest[key] = request[key];
        });
        this.validateCreateCharacterRequest(createCharacterRequest);
        return createCharacterRequest;
    }
    validateCreateCharacterRequest(request) {
        if (request == null || Object.keys(request).length === 0)
            throw new Error("Request was null");
        if (request.name == null || request.name === "")
            throw new Error("Name cannot be null");
        if (request.age == null || request.age === 0)
            throw new Error("Age must be supplied");
        if (request.era) {
            let eraExists = false;
            enums_1.test.map(era => {
                if (era.localeCompare(request.era) === 0)
                    eraExists = true;
            });
            if (!eraExists)
                throw new Error("Invalid value supplied for era");
        }
    }
};
CharacterService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.CharacterRepository)),
    __metadata("design:paramtypes", [CharacterRepository_1.CharacterRepository])
], CharacterService);
exports.CharacterService = CharacterService;
