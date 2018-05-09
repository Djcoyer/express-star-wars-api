import * as express from 'express';
import {response, requestParam, controller, httpGet, httpPost, httpPut, httpPatch} from 'inversify-express-utils';
import {inject} from "inversify";

import Character from "../models/Character";
import {CharacterService} from "../services/CharacterService";
import TYPES from "../constants/types";


@controller('/characters')
export class CharacterController {
    constructor(@inject(TYPES.CharacterService) private characterService: CharacterService) {
    }

    @httpGet('/')
    public async getCharacters(): Promise<Character[]> {
        return await this.characterService.getCharacters().then(characters => {
            return characters;
        });
    }

    @httpGet('/:id')
    public async getCharacter(request: express.Request): Promise<Character> {
        return await this.characterService.getCharacter(request.params.id).then(character => {
            return character;
        });
    }

    @httpPatch('/:id')
    public async updateCharacter(request: express.Request): Promise<object> {
        return await this.characterService.updateCharacter(request.params.id, request.body)
            .then(response => {
                return {id: request.params.id}
            });
    }

    @httpPost('/')
    public createCharacter(request: express.Request): Character {
        return this.characterService.createCharacter(request.body);
    }
}