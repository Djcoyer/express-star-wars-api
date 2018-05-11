"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const CharacterDao_1 = require("../models/dao/CharacterDao");
const schemas_1 = require("../models/mongoose/schemas");
const DbConverters_1 = require("../functions/DbConverters");
const ValidationFunctions_1 = require("../functions/ValidationFunctions");
let CharacterRepository = class CharacterRepository {
    createCharacter(characterDao) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, age, era, movieIds, description, canon } = characterDao;
            return yield new schemas_1.Character({
                name,
                age,
                era,
                movieIds,
                description,
                canon
            }).save()
                .then(character => {
                console.log(character);
                characterDao.id = character._id;
                return characterDao;
            })
                .catch(err => {
                if (err) {
                    console.log(err);
                    throw new Error("Failed to create character");
                }
            });
        });
    }
    getCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return schemas_1.Character.findOne({ _id: id })
                .then(character => {
                if (character) {
                    let characterDao = DbConverters_1.convertFromDbObject(character, new CharacterDao_1.CharacterDao());
                    return characterDao;
                }
                return null;
            });
        });
    }
    getCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.Character.find()
                .then(characters => {
                let returnedCharacters = [];
                if (characters && characters.length) {
                    characters.map(character => {
                        let characterDao = DbConverters_1.convertFromDbObject(character, new CharacterDao_1.CharacterDao());
                        if (characterDao)
                            returnedCharacters.push(characterDao);
                    });
                }
                return returnedCharacters;
            });
        });
    }
    updateCharacter(requestObject, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return schemas_1.Character.findOne({ _id: id })
                .then(character => {
                if (character) {
                    character = ValidationFunctions_1.patchDbObject(requestObject, character, id);
                    character.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        });
    }
    deleteCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.Character.findOneAndRemove({ _id: id }, () => { })
                .catch(err => {
                if (err)
                    throw new Error("Could not remove character");
            });
        });
    }
};
CharacterRepository = __decorate([
    inversify_1.injectable()
], CharacterRepository);
exports.CharacterRepository = CharacterRepository;
