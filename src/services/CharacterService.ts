import {inject, injectable} from "inversify";
import Character from "../models/Character";
import {CharacterDao} from "../models/dao/CharacterDao";
import {CharacterRepository} from "../repositories/CharacterRepository";
import TYPES from "../constants/types";
import CreateCharacterRequest from "../models/requests/character/CreateCharacterRequest";
import {Eras} from "../constants/arrays";


@injectable()
export class CharacterService {
    constructor(@inject(TYPES.CharacterRepository) private characterRepository: CharacterRepository) {
    }

    public async createCharacter(request: any): Promise<Character> {
        let createCharacterRequest = this.formatCreateCharacterRequest(request);
        let {name, age, era, movieIds, description, canon} = createCharacterRequest;
        let characterDao = new CharacterDao(null, name, description, age, movieIds, era, canon);
        return await this.characterRepository.createCharacter(characterDao);
    }

    public async getCharacters(): Promise<Character[]> {
        return await this.characterRepository.getCharacters();
    }

    public async getCharacter(id: string): Promise<Character> {
        return await this.characterRepository.getCharacter(id).then(characterDao => {
            if(characterDao == null)
                throw new Error("Not found");
            let {id, name, description, canon, era, age, movieIds} = characterDao;
            let character = new Character(id, name, description, age, movieIds, era, canon);
            return character;
        })
    }

    public async updateCharacter(id: string, request: object): Promise<void> {
        return await this.characterRepository.updateCharacter(request, id);
    }



    public async deleteCharacter(id: string) {
        await this.characterRepository.deleteCharacter(id);
    }


    //region HELPERS

    private formatCreateCharacterRequest(request: any): CreateCharacterRequest{
        if(request== null || typeof request != "object")
            throw new Error();
        let keys = Object.keys(request);
        if(!keys || keys.length === 0) {
            throw new Error();
        }
        let createCharacterRequest = new CreateCharacterRequest();
        let expectedKeys = Object.keys(createCharacterRequest);
        keys.map(key => {
           if(expectedKeys.indexOf(key) > -1)
               createCharacterRequest[key] = request[key];
        });
        this.validateCreateCharacterRequest(createCharacterRequest);
        return createCharacterRequest;
    }

    private validateCreateCharacterRequest(request:CreateCharacterRequest) :void {
        if(request == null || Object.keys(request).length === 0)
            throw new Error("Request was null");
        if(request.name == null || request.name === "")
            throw new Error("Name cannot be null");
        if(request.age == null || request.age === 0)
            throw new Error("Age must be supplied");
        if(request.era) {
            let eraExists = false;
            Eras.map(era => {
                if(era.localeCompare(request.era) === 0)
                    eraExists = true;
            });
            if(!eraExists)
                throw new Error("Invalid value supplied for era");
        }
    }

    //endregion

}