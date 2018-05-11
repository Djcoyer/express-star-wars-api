import {injectable} from "inversify";
import {CharacterDao} from "../models/dao/CharacterDao";
import * as mongoose from 'mongoose';
import {Character} from '../models/mongoose/schemas';
import {convertFromDbObject} from "../functions/DbConverters";
import {patchDbObject} from "../functions/PatchFunctions";


@injectable()
export class CharacterRepository {

    public async createCharacter(characterDao: CharacterDao): Promise<CharacterDao> {
        let {name, age, era, movieIds, description, canon} = characterDao;
        return await new Character({
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
            .catch(err =>{
                if(err) {
                    console.log(err);
                    throw new Error("Failed to create character");
                }
            });
    }

    public async getCharacter(id: string): Promise<CharacterDao> {
        return Character.findOne({_id: id})
            .then(character => {
                if (character) {
                    let characterDao: CharacterDao = convertFromDbObject(character, new CharacterDao());
                    return characterDao;
                }
                return null;
            });
    }

    public async getCharacters(): Promise<CharacterDao[]> {
        return await Character.find()
            .then(characters => {
                let returnedCharacters: CharacterDao[] = [];
                if (characters && characters.length) {
                    characters.map(character => {
                        let characterDao: CharacterDao = convertFromDbObject(character, new CharacterDao());
                        if (characterDao)
                            returnedCharacters.push(characterDao);
                    });
                }
                return returnedCharacters;
            });
    }

    public async updateCharacter(requestObject: any, id: string): Promise<void> {
        return Character.findOne({_id: id})
            .then(character => {
                if (character) {
                    character = patchDbObject(requestObject, character, id);
                    character.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
    }

    public async deleteCharacter(id:string): Promise<void> {
        return await Character.findOneAndRemove({_id:id}, () => {})
            .catch(err => {
                if(err)
                    throw new Error("Could not remove character");
            });
    }
}