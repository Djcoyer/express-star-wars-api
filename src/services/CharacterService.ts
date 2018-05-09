import {inject, injectable} from "inversify";
import Character from "../models/Character";
import {patchObject} from "../functions/ValidationFunctions";
import UuidStatic = require("uuid");
import {CharacterDao} from "../models/dao/CharacterDao";
import {CharacterRepository} from "../repositories/CharacterRepository";
import TYPES from "../constants/types";


@injectable()
export class CharacterService {
    constructor(@inject(TYPES.CharacterRepository) private characterRepository: CharacterRepository){}
    private characterStorage:Character[] = [
        new Character("5104707d-9c5a-4088-96ba-c14a79df2cc3", "Luke Skywalker", "A young farmboy who was destined to be a great jedi master", 20, [], "Original Trilogy", true),
        new Character("5104707d-9c5a-4088-96ba-w9398fhah134", "Han Solo", "A rugged smuggler ", 30, [], "Original Trilogy", true)

    ];

    public async getCharacters(): Promise<Character[]> {
        return await this.characterRepository.getCharacters();
    }

    public async getCharacter(id:string): Promise<Character> {
        return await this.characterRepository.getCharacter(id).then(character => {
            return character;
        })
    }

    public async updateCharacter(id: string, request:object): Promise<Character> {
        return await this.getCharacter(id).then(character => {
            if(character == null)
                return null;
            character = patchObject(character, request);
            this.characterStorage.splice(this.characterStorage.findIndex(p => p.id === id), 1, character);
            return character;
        });

    }

    public createCharacter(request:any): Character {
        let character = request as Character;
        let {name, age, era, movieIds, description, canon} = character;
        let characterDao = new CharacterDao(null,name,description,age,movieIds,era,canon);
        this.characterRepository.createCharacter(characterDao);
        return null;
    }


}